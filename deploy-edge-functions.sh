#!/bin/bash
# Script de déploiement des Edge Functions vers Supabase auto-hébergé
# Usage: ./deploy-edge-functions.sh [password]

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

# Vérifier si sshpass est disponible
if command -v sshpass &> /dev/null && [ -n "$1" ]; then
    SSH_CMD="sshpass -p '$1' ssh -o StrictHostKeyChecking=no"
    SCP_CMD="sshpass -p '$1' scp -o StrictHostKeyChecking=no"
    RSYNC_CMD="sshpass -p '$1' rsync"
else
    SSH_CMD="ssh"
    SCP_CMD="scp"
    RSYNC_CMD="rsync"
    echo "Note: Mot de passe SSH sera demandé pour chaque commande"
    echo ""
fi

echo "1. Copie des fonctions vers le serveur distant..."
$RSYNC_CMD -avz --delete \
    supabase/functions/ \
    ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}/functions/

echo ""
echo "2. Copie du fichier docker-compose.edge-functions.yml..."
$SCP_CMD docker-compose.edge-functions.yml ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}/

echo ""
echo "3. Redémarrage du conteneur edge-functions..."
$SSH_CMD ${REMOTE_USER}@${REMOTE_HOST} << 'ENDSSH'
cd /home/ubuntu/supabase

# Vérifier si le réseau supabase-network existe
if ! docker network ls | grep -q supabase-network; then
    echo "Création du réseau supabase-network..."
    docker network create supabase-network
fi

# Redémarrer le conteneur edge-functions
echo "Arrêt du conteneur existant..."
docker compose -f docker-compose.edge-functions.yml down 2>/dev/null || true

echo "Démarrage du nouveau conteneur..."
docker compose -f docker-compose.edge-functions.yml up -d

echo ""
echo "Statut du conteneur:"
docker compose -f docker-compose.edge-functions.yml ps

echo ""
echo "Logs récents:"
docker compose -f docker-compose.edge-functions.yml logs --tail=20
ENDSSH

echo ""
echo "=== Déploiement terminé ==="
echo "Les Edge Functions sont maintenant disponibles sur le port 8082"
echo "URL: http://${REMOTE_HOST}:8082"
