#!/bin/bash

# SCRIPT DE VÉRIFICATION POST-IMPORTATION
# À exécuter sur le serveur distant après l'importation

echo "🔍 VÉRIFICATION POST-IMPORTATION SUPABASE"
echo "======================================="
echo ""

DB_NAME="clubcreole_db"
DB_USER="postgres"

echo "Connexion à la base de données..."
echo ""

# Vérification 1: Tables créées
echo "📋 Étape 1: Vérification des tables créées"
echo "==========================================="

sudo -u postgres psql -d $DB_NAME -c "
SELECT
    schemaname,
    tablename,
    n_tup_ins as enregistrements_insérés,
    n_tup_upd as enregistrements_modifiés,
    n_tup_del as enregistrements_supprimés
FROM pg_stat_user_tables
ORDER BY schemaname, tablename;"

echo ""
echo "📊 Étape 2: Statistiques globales"
echo "================================"

sudo -u postgres psql -d $DB_NAME -c "
SELECT
    'Total enregistrements' as métrique,
    SUM(n_tup_ins) as valeur
FROM pg_stat_user_tables
WHERE schemaname = 'public'

UNION ALL

SELECT
    'Tables publiques' as métrique,
    COUNT(*) as valeur
FROM pg_tables
WHERE schemaname = 'public'

UNION ALL

SELECT
    'Schémas auth' as métrique,
    COUNT(DISTINCT schemaname) as valeur
FROM pg_tables
WHERE schemaname LIKE 'auth%';"

echo ""
echo "🔐 Étape 3: Vérification schéma auth (utilisateurs)"
echo "=================================================="

sudo -u postgres psql -d $DB_NAME -c "
SELECT
    'Utilisateurs auth' as table,
    COUNT(*) as enregistrements
FROM auth.users

UNION ALL

SELECT
    'Sessions auth' as table,
    COUNT(*) as enregistrements
FROM auth.sessions

UNION ALL

SELECT
    'Refresh tokens' as table,
    COUNT(*) as enregistrements
FROM auth.refresh_tokens;"

echo ""
echo "🏨 Étape 4: Vérification tables métier principales"
echo "================================================"

sudo -u postgres psql -d $DB_NAME -c "
SELECT
    tablename as table,
    COUNT(*) as enregistrements
FROM (
    SELECT 'accommodations' as tablename FROM public.accommodations LIMIT 1
    UNION ALL
    SELECT 'restaurants' FROM public.restaurants LIMIT 1
    UNION ALL
    SELECT 'activities' FROM public.activities LIMIT 1
    UNION ALL
    SELECT 'users' FROM public.users LIMIT 1
) tables
LEFT JOIN (
    SELECT 'accommodations' as table_name, COUNT(*) as cnt FROM public.accommodations
    UNION ALL
    SELECT 'restaurants', COUNT(*) FROM public.restaurants
    UNION ALL
    SELECT 'activities', COUNT(*) FROM public.activities
    UNION ALL
    SELECT 'users', COUNT(*) FROM public.users
) counts ON tables.tablename = counts.table_name
GROUP BY tablename;"

echo ""
echo "✅ VÉRIFICATION TERMINÉE"
echo ""
echo "📝 Résumé:"
echo "- Base de données: $DB_NAME"
echo "- Utilisateur: $DB_USER"
echo "- Hôte: localhost:5432"
echo ""
echo "🔧 Pour explorer la base:"
echo "sudo -u postgres psql -d $DB_NAME"
echo ""
echo "🔍 Commandes utiles dans psql:"
echo "\dt                    # Lister les tables"
echo "\d nom_table          # Décrire une table"
echo "SELECT COUNT(*) FROM nom_table;"