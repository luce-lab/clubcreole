#!/bin/bash

# Couleurs pour les messages
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Étape 1: Build de l'application React...${NC}"
pnpm build

# Vérifier si le build a réussi
if [ $? -ne 0 ]; then
    echo -e "${RED}Erreur lors du build de l'application.${NC}"
    exit 1
fi

echo -e "${YELLOW}Étape 2: Construction de l'image Docker Nginx...${NC}"
docker build -t club-app-nginx -f Dockerfile.nginx .

echo -e "${YELLOW}Étape 3: Arrêt du conteneur existant (s'il existe)...${NC}"
docker stop club-app-container 2>/dev/null || true
docker rm club-app-container 2>/dev/null || true

echo -e "${YELLOW}Étape 4: Démarrage du nouveau conteneur...${NC}"
docker run -d -p 8080:80 --name club-app-container club-app-nginx

echo -e "${GREEN}Déploiement terminé !${NC}"
echo -e "${GREEN}L'application est accessible à l'adresse: http://localhost:8080${NC}" 