#!/bin/bash
set -e

# Script de migration directe via PostgreSQL
echo "=== MIGRATION DIRECTE POSTGRESQL ==="
echo "Migration des données de Supabase Cloud vers Supabase Local"
echo ""

# Configuration
SOURCE_DB="postgresql://postgres.psryoyugyimibjhwhvlh:KZUBqVrTYHQUuH5u@aws-0-eu-west-3.pooler.supabase.com:6543/postgres"
TARGET_DB="postgresql://postgres:KZUBqVrTYHQUuH5u@localhost:5432/postgres"

# Tables à migrer dans l'ordre
TABLES=(
    "profiles"
    "partners"
    "accommodations"
    "restaurants"
    "car_rentals"
    "leisure_activities"
    "activities"
    "accommodation_rooms"
    "travel_packages"
    "subscriptions"
    "accommodation_bookings"
    "restaurant_reservations"
    "car_rental_bookings"
    "activity_bookings"
    "travel_reservations"
    "partner_accommodations"
)

echo "📋 Test de connexion à la source..."
if PGPASSWORD=KZUBqVrTYHQUuH5u psql "postgresql://postgres.psryoyugyimibjhwhvlh@aws-0-eu-west-3.pooler.supabase.com:6543/postgres" -c "\dt" > /dev/null 2>&1; then
    echo "✅ Connexion source OK"
else
    echo "❌ Impossible de se connecter à la base source"
    exit 1
fi

echo "📋 Test de connexion à la cible..."
if PGPASSWORD=KZUBqVrTYHQUuH5u psql "postgresql://postgres@localhost:5432/postgres" -c "\dt" > /dev/null 2>&1; then
    echo "✅ Connexion cible OK"
else
    echo "❌ Impossible de se connecter à la base cible"
    exit 1
fi

# Créer un dossier de sauvegarde
BACKUP_DIR="./migration-backups/$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"
echo "📁 Dossier de sauvegarde: $BACKUP_DIR"

# Fonction de migration d'une table
migrate_table() {
    local table=$1
    echo ""
    echo "📋 Migration de la table: $table"
    
    # Exporter les données de la source
    echo "  → Export depuis la source..."
    PGPASSWORD=KZUBqVrTYHQUuH5u pg_dump \
        "postgresql://postgres.psryoyugyimibjhwhvlh@aws-0-eu-west-3.pooler.supabase.com:6543/postgres" \
        --table="public.$table" \
        --data-only \
        --no-owner \
        --no-privileges \
        --file="$BACKUP_DIR/${table}.sql" 2>/dev/null
    
    if [ $? -eq 0 ]; then
        echo "  ✅ Export réussi"
    else
        echo "  ⚠️ Erreur lors de l'export (table peut-être vide)"
        return
    fi
    
    # Compter les lignes dans le fichier SQL
    local lines=$(grep -c "INSERT INTO" "$BACKUP_DIR/${table}.sql" 2>/dev/null || echo "0")
    echo "  → $lines enregistrement(s) à migrer"
    
    if [ "$lines" -gt 0 ]; then
        # Nettoyer la table cible
        echo "  → Nettoyage de la table cible..."
        PGPASSWORD=KZUBqVrTYHQUuH5u psql \
            "postgresql://postgres@localhost:5432/postgres" \
            -c "TRUNCATE TABLE public.$table CASCADE;" 2>/dev/null
        
        # Importer dans la cible
        echo "  → Import dans la cible..."
        PGPASSWORD=KZUBqVrTYHQUuH5u psql \
            "postgresql://postgres@localhost:5432/postgres" \
            --file="$BACKUP_DIR/${table}.sql" \
            --quiet 2>/dev/null
        
        if [ $? -eq 0 ]; then
            echo "  ✅ Table $table migrée avec succès"
        else
            echo "  ❌ Erreur lors de l'import de $table"
        fi
    else
        echo "  ℹ️ Aucune donnée à migrer pour $table"
    fi
}

# Migrer toutes les tables
echo ""
echo "=== DÉBUT DE LA MIGRATION ==="
for table in "${TABLES[@]}"; do
    migrate_table "$table"
done

# Rapport final
echo ""
echo "=== MIGRATION TERMINÉE ==="
echo "📁 Sauvegarde disponible dans: $BACKUP_DIR"
echo ""
echo "Pour basculer l'application vers la base locale, mettez à jour le .env:"
echo "  VITE_SUPABASE_URL=http://localhost:8000"
echo ""
echo "✅ Migration complète!"