#!/bin/bash
# ============================================
# Script d'optimisation Docker pour Coolify
# ============================================

echo "=========================================="
echo "OPTIMISATION DOCKER - COOLIFY"
echo "=========================================="
echo ""

echo "⚠️  ATTENTION : Ce script va :"
echo "  - Nettoyer les conteneurs arrêtés"
echo "  - Nettoyer les images non utilisées"
echo "  - Optimiser la configuration Docker"
echo "  - Redémarrer Docker"
echo ""
read -p "Continuer ? (o/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Oo]$ ]]
then
    echo "Annulé."
    exit 1
fi

echo ""
echo "1. Arrêt des conteneurs en état exited..."
docker container prune -f

echo "2. Suppression des images non utilisées (dangling)..."
docker image prune -f

echo "3. Nettoyage des volumes non utilisés..."
docker volume prune -f

echo "4. Nettoyage du cache Docker..."
docker system prune -f

echo "5. Sauvegarde de la configuration actuelle..."
if [ -f /etc/docker/daemon.json ]; then
    sudo cp /etc/docker/daemon.json /etc/docker/daemon.json.backup.$(date +%Y%m%d_%H%M%S)
fi

echo "6. Création de la configuration optimisée..."
sudo tee /etc/docker/daemon.json > /dev/null <<EOF
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "storage-driver": "overlay2",
  "live-restore": true,
  "max-concurrent-downloads": 3,
  "max-concurrent-uploads": 3,
  "debug": false
}
EOF

echo "7. Rechargement de la configuration systemd..."
sudo systemctl daemon-reload

echo "8. Redémarrage de Docker..."
sudo systemctl restart docker

echo "9. Attente du démarrage de Docker (10 secondes)..."
sleep 10

echo "10. Vérification de l'état de Docker..."
sudo systemctl status docker --no-pager

echo ""
echo "=========================================="
echo "✅ OPTIMISATION TERMINÉE"
echo "=========================================="
echo ""
echo "Vérifiez maintenant la consommation CPU avec :"
echo "  top -bn1 | grep dockerd"
echo ""
echo "Ou relancez le diagnostic :"
echo "  bash diagnose-docker.sh"
