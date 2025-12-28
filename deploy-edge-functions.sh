#!/bin/bash
# Script de déploiement des Edge Functions vers Supabase auto-hébergé
# Usage: ./deploy-edge-functions.sh
#
# Ce script déploie les edge functions sur le serveur distant.
# Exécutez-le depuis le dossier du projet clubcreole.

set -e

# Configuration du serveur distant
REMOTE_USER="ubuntu"
REMOTE_HOST="37.59.121.40"
REMOTE_PATH="/home/ubuntu/supabase"

echo "=== Déploiement des Edge Functions vers Supabase auto-hébergé ==="
echo "Serveur: ${REMOTE_USER}@${REMOTE_HOST}"
echo ""

# Vérifier que les fichiers existent
if [ ! -d "supabase/functions" ]; then
    echo "Erreur: Le dossier supabase/functions n'existe pas"
    exit 1
fi

echo "Fonctions à déployer:"
ls -d supabase/functions/*/ 2>/dev/null | xargs -I {} basename {} || echo "Aucune fonction trouvée"
echo ""

echo "1. Copie des fonctions vers le serveur distant..."
rsync -avz --delete \
    -e "ssh -o StrictHostKeyChecking=no" \
    supabase/functions/ \
    ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}/functions/

echo ""
echo "2. Copie des fichiers de configuration..."
scp -o StrictHostKeyChecking=no docker-compose.edge-functions.yml ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}/
scp -o StrictHostKeyChecking=no kong.yml ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}/

echo ""
echo "3. Redémarrage des conteneurs..."
ssh -o StrictHostKeyChecking=no ${REMOTE_USER}@${REMOTE_HOST} << 'ENDSSH'
cd /home/ubuntu/supabase

# Vérifier si le réseau supabase-network existe
if ! docker network ls | grep -q supabase-network; then
    echo "Création du réseau supabase-network..."
    docker network create supabase-network
fi

# Créer le fichier .env s'il n'existe pas
if [ ! -f .env ]; then
    echo "ATTENTION: Fichier .env manquant!"
    echo "Créez le fichier /home/ubuntu/supabase/.env avec les variables:"
    echo "  SUPABASE_URL=http://supabase-kong:8000"
    echo "  SUPABASE_ANON_KEY=<votre_anon_key>"
    echo "  SUPABASE_SERVICE_ROLE=<votre_service_role_key>"
    echo "  STRIPE_SECRET_KEY=<votre_stripe_secret_key>"
    echo "  STRIPE_WEBHOOK_SECRET=<votre_webhook_secret>"
    echo "  SUPABASE_JWT_SECRET=<votre_jwt_secret>"
fi

# Redémarrer les conteneurs edge-functions
echo "Redémarrage du conteneur edge-functions..."
docker compose -f docker-compose.edge-functions.yml down 2>/dev/null || true
docker compose -f docker-compose.edge-functions.yml up -d

# Recharger la configuration Kong si nécessaire
if docker ps | grep -q supabase-kong; then
    echo "Rechargement de la configuration Kong..."
    docker exec supabase-kong kong reload 2>/dev/null || echo "Kong reload non nécessaire"
fi

echo ""
echo "Statut du conteneur:"
docker compose -f docker-compose.edge-functions.yml ps

echo ""
echo "Logs récents:"
docker compose -f docker-compose.edge-functions.yml logs --tail=20
ENDSSH

echo ""
echo "=== Déploiement terminé ==="
echo ""
echo "Les Edge Functions sont disponibles via Kong sur:"
echo "  https://mybase.clubcreole.fr/functions/v1/<function-name>"
echo ""
echo "Exemple de test:"
echo "  curl -X POST https://mybase.clubcreole.fr/functions/v1/create-checkout \\"
echo "    -H 'Authorization: Bearer <user_token>' \\"
echo "    -H 'apikey: <anon_key>' \\"
echo "    -H 'Content-Type: application/json' \\"
echo "    -d '{\"priceType\": \"passionne\"}'"
