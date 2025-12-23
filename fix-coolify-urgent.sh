#!/bin/bash
# ============================================
# Correction URGENTE - Coolify 450% CPU
# ============================================

echo "=========================================="
echo "CORRECTION URGENTE COOLIFY"
echo "=========================================="
echo ""

echo "🔴 PROBLÈME DÉTECTÉ :"
echo "  - coolify utilise 450% CPU"
echo "  - 2 instances Supabase actives (dev + prod)"
echo "  - 37 conteneurs au total"
echo ""

echo "=========================================="
echo "ÉTAPE 1 : Diagnostic Coolify"
echo "=========================================="
echo "Logs Coolify récents :"
docker logs --tail 50 coolify 2>&1 | tail -20
echo ""

echo "=========================================="
echo "ÉTAPE 2 : Redémarrage Coolify"
echo "=========================================="
echo "Arrêt de Coolify..."
docker stop coolify

echo "Attente 5 secondes..."
sleep 5

echo "Démarrage de Coolify..."
docker start coolify

echo "Attente 10 secondes pour stabilisation..."
sleep 10

echo ""
echo "=========================================="
echo "ÉTAPE 3 : Vérification CPU après redémarrage"
echo "=========================================="
docker stats --no-stream | grep -E "(CONTAINER|coolify|supabase-analytics|supabase-meta|supabase-studio)"
echo ""

echo "=========================================="
echo "ÉTAPE 4 : Optimisation Docker"
echo "=========================================="
echo "Limitation des logs..."
if [ ! -f /etc/docker/daemon.json ]; then
    sudo tee /etc/docker/daemon.json > /dev/null <<'EOF'
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "storage-driver": "overlay2",
  "live-restore": true
}
EOF
    echo "✅ Configuration créée"
    sudo systemctl restart docker
else
    echo "ℹ️  Configuration existe déjà"
fi
echo ""

echo "=========================================="
echo "ÉTAPE 5 : Suggestions"
echo "=========================================="
echo ""
echo "🔸 Si Coolify utilise encore > 100% CPU :"
echo "   docker restart coolify coolify-redis coolify-db"
echo ""
echo "🔸 Pour arrêter une instance Supabase non utilisée :"
echo "   docker ps | grep supabase  # Identifier l'instance dev ou prod"
echo "   docker compose -f /path/to/supabase/docker-compose.yml down"
echo ""
echo "🔸 Vérifier l'utilisation finale :"
echo "   docker stats --no-stream | head -10"
echo ""
echo "✅ Correction terminée !"
