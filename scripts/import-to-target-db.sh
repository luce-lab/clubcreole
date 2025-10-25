#!/bin/bash

# Import vers Base PostgreSQL Cible
# =================================

set -e

# Configuration
TARGET_DB="postgresql://postgres:f2IXGmb97vF8GiUT7EVFFfp0W85vAytI@37.59.121.40:5432/postgres"
EXTRACTION_DIR="${1:-migration-backups/extraction_2025-10-25T09-08-16-478Z}"

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m'

log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ❌ $1${NC}"
}

warning() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] ⚠️  $1${NC}"
}

# Vérifier que le répertoire existe
if [ ! -d "$EXTRACTION_DIR" ]; then
    error "Le répertoire d'extraction n'existe pas: $EXTRACTION_DIR"
    exit 1
fi

log "🚀 Import vers base PostgreSQL cible"
log "📂 Source: $EXTRACTION_DIR"
log "🎯 Cible: ${TARGET_DB//:*@/:***@}"

# Vérifier la connexion
if ! psql "$TARGET_DB" -c "SELECT 1;" >/dev/null 2>&1; then
    error "Impossible de se connecter à la base cible"
    exit 1
fi

log "✅ Connexion à la base cible établie"

# Tables à importer dans l'ordre
TABLES=(
    "partners"
    "accommodations" 
    "restaurants"
    "activities"
    "leisure_activities"
    "profiles"
    "subscriptions"
    "restaurant_reservations"
    "travel_reservations"
)

# Fonction d'import
import_table() {
    local table="$1"
    local json_file="$EXTRACTION_DIR/${table}.json"
    
    if [ ! -f "$json_file" ]; then
        warning "Fichier non trouvé: $json_file"
        return 1
    fi
    
    local records=$(cat "$json_file" | jq '. | length' 2>/dev/null || echo "0")
    
    if [ "$records" = "0" ] || [ "$records" = "null" ]; then
        log "⏭️ $table: vide"
        return 0
    fi
    
    log "🔄 Import de $table ($records enregistrements)"
    
    # Créer un script SQL temporaire
    local temp_sql="/tmp/import_${table}_$(date +%s).sql"
    
    cat > "$temp_sql" << EOF
BEGIN;
SET session_replication_role = 'replica';
TRUNCATE TABLE $table CASCADE;
EOF
    
    # Générer les INSERT depuis le JSON
    cat "$json_file" | jq -r --arg table "$table" '
        .[] | 
        @json | 
        "INSERT INTO " + $table + " SELECT * FROM json_populate_record(NULL::" + $table + ", '\''\(.)'\''::json) ON CONFLICT DO NOTHING;"
    ' >> "$temp_sql" 2>/dev/null || {
        warning "Impossible de parser le JSON pour $table"
        rm -f "$temp_sql"
        return 1
    }
    
    cat >> "$temp_sql" << EOF
SET session_replication_role = 'origin';
COMMIT;
EOF
    
    # Exécuter le script
    if psql "$TARGET_DB" < "$temp_sql" 2>/dev/null; then
        log "✅ $table importé avec succès"
        rm -f "$temp_sql"
        return 0
    else
        warning "Erreur lors de l'import de $table"
        rm -f "$temp_sql"
        return 1
    fi
}

# Compteurs
SUCCESS=0
FAILED=0

# Importer chaque table
for table in "${TABLES[@]}"; do
    if import_table "$table"; then
        ((SUCCESS++))
    else
        ((FAILED++))
    fi
done

# Résumé
echo ""
log "📊 RÉSUMÉ DE L'IMPORT"
log "✅ Tables importées: $SUCCESS"
if [ $FAILED -gt 0 ]; then
    warning "❌ Tables échouées: $FAILED"
fi

# Vérification
log "🔍 Vérification des données importées:"
for table in "${TABLES[@]}"; do
    count=$(psql "$TARGET_DB" -t -c "SELECT COUNT(*) FROM $table;" 2>/dev/null | tr -d ' \n')
    if [ -n "$count" ] && [ "$count" != "0" ]; then
        log "  ✅ $table: $count enregistrements"
    fi
done

log "✨ Import terminé!"