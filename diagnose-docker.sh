#!/bin/bash
# ============================================
# Script de diagnostic Docker pour Coolify
# ============================================

echo "=========================================="
echo "DIAGNOSTIC DOCKER - COOLIFY"
echo "=========================================="
echo ""

echo "1. Liste des conteneurs actifs :"
echo "-----------------------------------"
docker ps
echo ""

echo "2. Nombre de conteneurs actifs :"
echo "-----------------------------------"
docker ps -q | wc -l
echo ""

echo "3. Statistiques CPU des conteneurs :"
echo "-----------------------------------"
timeout 10 docker stats --no-stream 2>/dev/null || echo "Impossible d'obtenir les stats"
echo ""

echo "4. 10 plus gros conteneurs par taille :"
echo "-----------------------------------"
docker ps -s --format "table {{.Names}}\t{{.Size}}" | head -11
echo ""

echo "5. Espace disque utilisé par Docker :"
echo "-----------------------------------"
docker system df
echo ""

echo "6. Utilisation CPU de dockerd :"
echo "-----------------------------------"
ps aux | grep dockerd | grep -v grep
echo ""

echo "7. Mémoire utilisée par Docker :"
echo "-----------------------------------"
free -h
echo ""

echo "8. Charge CPU du système :"
echo "-----------------------------------"
top -bn1 | head -20
echo ""

echo "9. Logs Docker récents :"
echo "-----------------------------------"
sudo journalctl -u docker -n 50 --no-pager
echo ""

echo "=========================================="
echo "FIN DU DIAGNOSTIC"
echo "=========================================="
