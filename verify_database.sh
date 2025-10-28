#!/bin/bash

# Script de vérification de la base de données après importation
# À exécuter sur le serveur distant pour vérifier l'intégrité

echo "🔍 SCRIPT DE VÉRIFICATION DE LA BASE DE DONNÉES"
echo "============================================"
echo ""

DB_NAME="clubcreole_db"
DB_USER="postgres"

echo "📊 État du service PostgreSQL:"
systemctl is-active postgresql && echo "✅ Actif" || echo "❌ Inactif"

echo ""
echo "🗄️  Base de données disponibles:"
sudo -u postgres psql -l | head -10

echo ""
echo "📋 Tables dans $DB_NAME:"
if sudo -u postgres psql -d $DB_NAME -c "\dt" >/dev/null 2>&1; then
    echo "✅ Base accessible"
    sudo -u postgres psql -d $DB_NAME -c "\dt" | head -15
else
    echo "❌ Base non accessible ou vide"
fi

echo ""
echo "📈 Statistiques des tables:"
sudo -u postgres psql -d $DB_NAME -c "
SELECT 
    schemaname,
    tablename,
    n_tup_ins as insérés,
    n_tup_upd as mis_à_jour,
    n_tup_del as supprimés
FROM pg_stat_user_tables 
WHERE n_tup_ins > 0
ORDER BY n_tup_ins DESC
LIMIT 10;" 2>/dev/null || echo "⚠️  Impossible d'obtenir les statistiques"

echo ""
echo "👥 Utilisateurs (table profiles si existe):"
sudo -u postgres psql -d $DB_NAME -c "SELECT COUNT(*) as utilisateurs FROM profiles;" 2>/dev/null || echo "⚠️  Table profiles non trouvée"

echo ""
echo "🏨 Hébergements (table accommodations si existe):"
sudo -u postgres psql -d $DB_NAME -c "SELECT COUNT(*) as hébergements FROM accommodations;" 2>/dev/null || echo "⚠️  Table accommodations non trouvée"

echo ""
echo "🍽️  Restaurants (table restaurants si existe):"
sudo -u postgres psql -d $DB_NAME -c "SELECT COUNT(*) as restaurants FROM restaurants;" 2>/dev/null || echo "⚠️  Table restaurants non trouvée"

echo ""
echo "🚗 Locations de voitures (table car_rentals si existe):"
sudo -u postgres psql -d $DB_NAME -c "SELECT COUNT(*) as locations FROM car_rentals;" 2>/dev/null || echo "⚠️  Table car_rentals non trouvée"

echo ""
echo "🎯 Informations de connexion:"
echo "- psql -U $DB_USER -d $DB_NAME"
echo "- Hôte: localhost"
echo "- Port: 5432"
echo ""
echo "🔧 Commandes utiles:"
echo "# Voir toutes les tables:"
echo "\\dt"
echo ""
echo "# Voir structure d'une table:"
echo "\\d nom_table"
echo ""
echo "# Requêter une table:"
echo "SELECT * FROM nom_table LIMIT 10;"