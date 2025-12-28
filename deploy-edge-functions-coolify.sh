#!/bin/bash
# Script de déploiement des Edge Functions vers Supabase géré par Coolify
# Usage: ./deploy-edge-functions-coolify.sh
#
# Ce script déploie les edge functions sur le serveur Coolify.

set -e

# Configuration
REMOTE_USER="ubuntu"
REMOTE_HOST="37.59.121.40"
COOLIFY_SERVICE_ID="woss0wcw0k00k8ocogwc0c0k"
FUNCTIONS_PATH="/data/coolify/services/${COOLIFY_SERVICE_ID}/volumes/functions"

# Variables d'environnement requises (à définir avant exécution)
# STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
: "${STRIPE_SECRET_KEY:?Variable STRIPE_SECRET_KEY requise}"
: "${STRIPE_WEBHOOK_SECRET:?Variable STRIPE_WEBHOOK_SECRET requise}"
: "${SUPABASE_ANON_KEY:?Variable SUPABASE_ANON_KEY requise}"
: "${SUPABASE_SERVICE_ROLE_KEY:?Variable SUPABASE_SERVICE_ROLE_KEY requise}"

echo "=== Déploiement des Edge Functions vers Coolify ==="
echo "Serveur: ${REMOTE_USER}@${REMOTE_HOST}"
echo "Service ID: ${COOLIFY_SERVICE_ID}"
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
rsync -avz \
    -e "ssh -o StrictHostKeyChecking=no" \
    --rsync-path="sudo rsync" \
    supabase/functions/ \
    ${REMOTE_USER}@${REMOTE_HOST}:${FUNCTIONS_PATH}/

echo ""
echo "2. Configuration et redémarrage du conteneur edge-functions..."
ssh -o StrictHostKeyChecking=no ${REMOTE_USER}@${REMOTE_HOST} << ENDSSH
set -e

CONTAINER_NAME="supabase-edge-functions-${COOLIFY_SERVICE_ID}"
NETWORK="${COOLIFY_SERVICE_ID}"

echo "Vérification du conteneur \${CONTAINER_NAME}..."

# Vérifier si le conteneur existe et fonctionne
if docker ps -a --format '{{.Names}}' | grep -q "^\${CONTAINER_NAME}\$"; then
    echo "Conteneur trouvé, vérification de l'état..."

    # Vérifier si les variables Stripe sont configurées
    if ! docker exec \${CONTAINER_NAME} env 2>/dev/null | grep -q "STRIPE_SECRET_KEY"; then
        echo "Variables Stripe manquantes, recréation du conteneur..."

        # Arrêter et supprimer le conteneur existant
        docker stop \${CONTAINER_NAME} 2>/dev/null || true
        docker rm \${CONTAINER_NAME} 2>/dev/null || true

        # Recréer avec les bonnes variables
        docker run -d \\
            --name \${CONTAINER_NAME} \\
            --network \${NETWORK} \\
            --restart unless-stopped \\
            -e STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY} \\
            -e STRIPE_WEBHOOK_SECRET=${STRIPE_WEBHOOK_SECRET} \\
            -e SUPABASE_URL=http://supabase-kong-${COOLIFY_SERVICE_ID}:8000 \\
            -e SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY} \\
            -e SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY} \\
            -v ${FUNCTIONS_PATH}:/home/deno/functions:ro \\
            supabase/edge-runtime:v1.67.4 start --main-service /home/deno/functions/main

        # Ajouter l'alias réseau
        docker network disconnect \${NETWORK} \${CONTAINER_NAME} 2>/dev/null || true
        docker network connect --alias supabase-edge-functions \${NETWORK} \${CONTAINER_NAME}

        echo "Conteneur recréé avec les variables Stripe"
    else
        echo "Variables Stripe présentes, redémarrage simple..."
        docker restart \${CONTAINER_NAME}
    fi
else
    echo "Conteneur non trouvé, création..."

    docker run -d \\
        --name \${CONTAINER_NAME} \\
        --network \${NETWORK} \\
        --restart unless-stopped \\
        -e STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY} \\
        -e STRIPE_WEBHOOK_SECRET=${STRIPE_WEBHOOK_SECRET} \\
        -e SUPABASE_URL=http://supabase-kong-${COOLIFY_SERVICE_ID}:8000 \\
        -e SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY} \\
        -e SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY} \\
        -v ${FUNCTIONS_PATH}:/home/deno/functions:ro \\
        supabase/edge-runtime:v1.67.4 start --main-service /home/deno/functions/main

    # Ajouter l'alias réseau
    docker network connect --alias supabase-edge-functions \${NETWORK} \${CONTAINER_NAME}
fi

# Vérifier l'alias réseau
echo ""
echo "Vérification de l'alias réseau..."
if docker network inspect \${NETWORK} 2>/dev/null | grep -q "supabase-edge-functions"; then
    echo "✓ Alias 'supabase-edge-functions' configuré"
else
    echo "Configuration de l'alias..."
    docker network disconnect \${NETWORK} \${CONTAINER_NAME} 2>/dev/null || true
    docker network connect --alias supabase-edge-functions \${NETWORK} \${CONTAINER_NAME}
fi

echo ""
echo "3. Vérification finale..."
echo ""
echo "État du conteneur:"
docker ps --filter "name=\${CONTAINER_NAME}" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo ""
echo "Variables d'environnement Stripe:"
docker exec \${CONTAINER_NAME} env 2>/dev/null | grep -E "STRIPE|SUPABASE" | sed 's/=.*/=***/'

echo ""
echo "Logs récents:"
docker logs \${CONTAINER_NAME} --tail=10 2>&1

ENDSSH

echo ""
echo "=== Déploiement terminé ==="
echo ""
echo "Les Edge Functions sont disponibles sur:"
echo "  https://mybase.clubcreole.fr/functions/v1/<function-name>"
echo ""
echo "Test rapide:"
echo "  curl -X POST https://mybase.clubcreole.fr/functions/v1/check-subscription \\"
echo "    -H 'apikey: \$SUPABASE_ANON_KEY' \\"
echo "    -H 'Content-Type: application/json'"
