#!/bin/bash

# COMMANDES D'IMPORTATION À EXÉCUTER SUR LE SERVEUR DISTANT
# Serveur: 37.59.121.40 | Utilisateur: ubuntu | Mot de passe: Catilo

echo "🚀 COMMANDES D'IMPORTATION POUR SERVEUR DISTANT"
echo "=============================================="
echo ""

echo "📋 ÉTAPES À SUIVRE SUR LE SERVEUR DISTANT (37.59.121.40):"
echo ""

echo "1️⃣  CONNEXION AU SERVEUR:"
echo "   ssh ubuntu@37.59.121.40"
echo "   (mot de passe: Catilo)"
echo ""

echo "2️⃣  TÉLÉCHARGEMENT DU FICHIER DUMP:"
echo "   mkdir -p /home/ubuntu/dumps"
echo "   cd /home/ubuntu/dumps"
echo "   wget http://172.28.114.141:8888/supabase_dump_20251028_164145.sql"
echo ""

echo "3️⃣  INSTALLATION POSTGRESQL (si nécessaire):"
echo "   sudo apt update"
echo "   sudo apt install -y postgresql postgresql-contrib"
echo ""

echo "4️⃣  DÉMARRAGE SERVICE POSTGRESQL:"
echo "   sudo systemctl start postgresql"
echo "   sudo systemctl enable postgresql"
echo ""

echo "5️⃣  CRÉATION BASE DE DONNÉES:"
echo "   sudo -u postgres createdb clubcreole_db"
echo ""

echo "6️⃣  IMPORTATION DES DONNÉES:"
echo "   sudo -u postgres psql -d clubcreole_db -f supabase_dump_20251028_164145.sql"
echo ""

echo "7️⃣  VÉRIFICATION:"
echo "   sudo -u postgres psql -d clubcreole_db -c '\\dt'"
echo "   sudo -u postgres psql -d clubcreole_db -c 'SELECT COUNT(*) FROM profiles;'"
echo ""

echo "🔧 ALTERNATIVE - SCRIPT AUTOMATIQUE:"
echo "   Si vous avez transféré le script import_database.sh:"
echo "   chmod +x import_database.sh"
echo "   ./import_database.sh"
echo ""

echo "📊 INFORMATIONS DE CONNEXION FINALE:"
echo "   - Hôte: localhost"
echo "   - Base: clubcreole_db"
echo "   - Utilisateur: postgres"
echo "   - Port: 5432"
echo ""

echo "🔍 SCRIPT DE VÉRIFICATION DISPO:"
echo "   Si vous avez transféré verify_database.sh:"
echo "   chmod +x verify_database.sh"
echo "   ./verify_database.sh"
echo ""

echo "⚠️  PRÉREQUIS:"
echo "   - Le serveur HTTP doit être démarré localement:"
echo "     cd /home/laurent/mesprojets/clubcreole"
echo "     python3 -m http.server 8888 --directory transfer_files"