#!/bin/bash
#
# Script de test d'import - Importe uniquement categories.sql
#

set -e

# Configuration
SUPABASE_URL="db.psryoyugyimibjhwhvlh.supabase.co"
SUPABASE_DB="postgres"
SUPABASE_USER="postgres"

echo "========================================="
echo "Test d'importation - categories.sql"
echo "========================================="
echo ""
echo "Configuration:"
echo "  Host: $SUPABASE_URL"
echo "  Database: $SUPABASE_DB"
echo ""

# Demander le mot de passe
echo "Veuillez entrer votre mot de passe Supabase:"
echo "(Trouvable dans: Supabase Dashboard > Settings > Database > Connection string)"
read -s -p "Password: " SUPABASE_PASSWORD
echo ""
echo ""

# Test de connexion
echo "1. Test de connexion..."
if PGPASSWORD="$SUPABASE_PASSWORD" psql -h "$SUPABASE_URL" -U "$SUPABASE_USER" -d "$SUPABASE_DB" -c "SELECT version();" > /dev/null 2>&1; then
    echo "   ✓ Connexion réussie"
else
    echo "   ✗ Erreur de connexion"
    echo ""
    echo "Vérifiez:"
    echo "  - Le mot de passe est correct"
    echo "  - L'host est: $SUPABASE_URL"
    echo "  - L'utilisateur est: $SUPABASE_USER"
    exit 1
fi

# Vérifier si la table existe
echo ""
echo "2. Vérification de la table 'categories'..."
TABLE_EXISTS=$(PGPASSWORD="$SUPABASE_PASSWORD" psql -h "$SUPABASE_URL" -U "$SUPABASE_USER" -d "$SUPABASE_DB" -t -c "SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'categories');")

if [ "$TABLE_EXISTS" = " t" ]; then
    echo "   ✓ Table 'categories' existe"

    # Compter les enregistrements existants
    EXISTING_COUNT=$(PGPASSWORD="$SUPABASE_PASSWORD" psql -h "$SUPABASE_URL" -U "$SUPABASE_USER" -d "$SUPABASE_DB" -t -c "SELECT COUNT(*) FROM public.categories;")
    echo "   → Enregistrements existants: $EXISTING_COUNT"

    # Demander si on veut continuer
    echo ""
    read -p "Voulez-vous continuer l'import (les données existantes seront conservées) ? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Import annulé"
        exit 0
    fi
else
    echo "   ⚠ Table 'categories' n'existe pas - L'import pourrait échouer"
    echo ""
    read -p "Continuer quand même ? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Import annulé"
        exit 0
    fi
fi

# Importer le fichier
echo ""
echo "3. Import de categories.sql..."
echo "   Fichier: sql_import/categories.sql"

if PGPASSWORD="$SUPABASE_PASSWORD" psql -h "$SUPABASE_URL" -U "$SUPABASE_USER" -d "$SUPABASE_DB" -f sql_import/categories.sql; then
    echo "   ✓ Import terminé"
else
    echo "   ✗ Erreur lors de l'import"
    exit 1
fi

# Vérifier l'import
echo ""
echo "4. Vérification de l'import..."
NEW_COUNT=$(PGPASSWORD="$SUPABASE_PASSWORD" psql -h "$SUPABASE_URL" -U "$SUPABASE_USER" -d "$SUPABASE_DB" -t -c "SELECT COUNT(*) FROM public.categories;")
echo "   → Total enregistrements dans categories: $NEW_COUNT"

# Afficher les données
echo ""
echo "5. Données importées:"
PGPASSWORD="$SUPABASE_PASSWORD" psql -h "$SUPABASE_URL" -U "$SUPABASE_USER" -d "$SUPABASE_DB" -c "SELECT id, name, slug FROM public.categories ORDER BY id;"

echo ""
echo "========================================="
echo "✓ Test d'import réussi !"
echo "========================================="
echo ""
echo "Vous pouvez maintenant importer tous les fichiers avec:"
echo "  ./sql_import/import_supabase.sh --full"
