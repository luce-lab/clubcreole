#!/bin/bash

# Script d'importation du dump Supabase sur le serveur distant
# À exécuter sur le serveur 37.59.121.40

echo "=== SCRIPT D'IMPORTATION SUPABASE ==="
echo ""

# Configuration
DB_NAME="clubcreole_db"
DB_USER="postgres"
DUMP_FILE="/home/ubuntu/dumps/supabase_dump_20251028_164145.sql"

# Vérification du fichier dump
echo "🔍 Étape 1: Vérification du fichier dump"
if [ -f "$DUMP_FILE" ]; then
    echo "✅ Fichier dump trouvé: $DUMP_FILE"
    echo "📏 Taille du fichier: $(du -h $DUMP_FILE | cut -f1)"
    echo "📅 Date de modification: $(stat -c %y $DUMP_FILE)"
else
    echo "❌ Fichier dump non trouvé: $DUMP_FILE"
    echo "Veuillez d'abord transférer le fichier avec:"
    echo "mkdir -p /home/ubuntu/dumps"
    echo "cd /home/ubuntu/dumps"
    echo "wget http://172.28.114.141:8888/supabase_dump_20251028_164145.sql"
    exit 1
fi

echo ""
echo "🔍 Étape 2: Vérification de PostgreSQL"
if command -v psql &> /dev/null; then
    echo "✅ PostgreSQL trouvé: $(psql --version)"
else
    echo "❌ PostgreSQL non trouvé"
    echo "Installation requise:"
    echo "sudo apt update"
    echo "sudo apt install -y postgresql postgresql-contrib"
    exit 1
fi

# Vérification du service PostgreSQL
echo ""
echo "🔍 Étape 3: Vérification du service PostgreSQL"
if systemctl is-active --quiet postgresql; then
    echo "✅ Service PostgreSQL actif"
else
    echo "❌ Service PostgreSQL non actif"
    echo "Démarrage du service:"
    echo "sudo systemctl start postgresql"
    echo "sudo systemctl enable postgresql"
fi

echo ""
echo "🔍 Étape 4: Vérification de l'utilisateur PostgreSQL"
if sudo -u postgres psql -tAc "SELECT 1 FROM pg_roles WHERE rolname='$DB_USER'" | grep -q 1; then
    echo "✅ Utilisateur $DB_USER existe"
else
    echo "⚠️  Utilisateur $DB_USER n'existe pas, création..."
    echo "sudo -u postgres createuser -s $DB_USER"
fi

echo ""
echo "🗄️  Étape 5: Création de la base de données"
if sudo -u postgres psql -lqt | cut -d \| -f 1 | grep -qw $DB_NAME; then
    echo "✅ Base de données $DB_NAME existe déjà"
    echo "⚠️  Suppression de l'ancienne base de données..."
    sudo -u postgres dropdb $DB_NAME
fi

echo "📝 Création de la base de données $DB_NAME..."
sudo -u postgres createdb -O $DB_USER $DB_NAME

echo ""
echo "📥 Étape 6: Importation du dump"
echo "Début de l'importation (peut prendre plusieurs minutes)..."

# Commande d'importation
IMPORT_CMD="sudo -u postgres psql -d $DB_NAME -f $DUMP_FILE"

echo "Commande: $IMPORT_CMD"
echo ""

# Exécution de l'importation
if $IMPORT_CMD; then
    echo ""
    echo "✅ Importation réussie !"
else
    echo ""
    echo "❌ Erreur lors de l'importation"
    echo "Vérification des erreurs communes:"
    echo "1. Permissions: sudo chown postgres:postgres $DUMP_FILE"
    echo "2. Encodage: file $DUMP_FILE"
    echo "3. Vérifier le contenu: head -20 $DUMP_FILE"
    exit 1
fi

echo ""
echo "🔍 Étape 7: Vérification de l'importation"
echo "Liste des tables importées:"
sudo -u postgres psql -d $DB_NAME -c "\dt"

echo ""
echo "Compte des enregistrements par table:"
sudo -u postgres psql -d $DB_NAME -c "
SELECT 
    schemaname,
    tablename,
    n_tup_ins as nombre_enregistrements
FROM pg_stat_user_tables 
ORDER BY n_tup_ins DESC;
"

echo ""
echo "🎉 Étape 8: Configuration finale"
echo "Base de données prête !"
echo ""
echo "Informations de connexion:"
echo "- Hôte: localhost"
echo "- Base: $DB_NAME"
echo "- Utilisateur: $DB_USER"
echo "- Port: 5432"
echo ""
echo "Commande de connexion:"
echo "psql -h localhost -U $DB_USER -d $DB_NAME"