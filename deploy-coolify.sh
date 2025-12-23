#!/bin/bash
# ============================================
# Script de déploiement vers Coolify
# ============================================

echo "=========================================="
echo "DÉPLOIEMENT VERS COOLIFY"
echo "=========================================="
echo ""

# Vérifier que les variables sont définies
if [ ! -f .env ]; then
    echo "❌ Erreur : Fichier .env non trouvé"
    echo ""
    echo "Créez le fichier .env avec :"
    echo "  VITE_SUPABASE_URL=https://..."
    echo "  VITE_SUPABASE_ANON_KEY=eyJ..."
    exit 1
fi

echo "✅ Fichier .env trouvé"
echo ""

# Vérifier les changements git
echo "📋 Statut Git :"
git status --short
echo ""

# Demander confirmation
read -p "Continuer le déploiement ? (o/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Oo]$ ]]
then
    echo "Annulé."
    exit 1
fi

echo ""
echo "🔄 1. Commit des changements..."
git add .
git commit -m "chore: deployment to Coolify"

echo ""
echo "⬆️  2. Push vers GitHub..."
git push origin main

echo ""
echo "=========================================="
echo "✅ DÉPLOIEMENT LANCÉ !"
echo "=========================================="
echo ""
echo "Coolify va automatiquement :"
echo "  - Détecter le nouveau commit"
echo "  - Lancer le build Docker"
echo "  - Déployer la nouvelle version"
echo ""
echo "Surveillez le déploiement dans votre interface Coolify"
echo "=========================================="
