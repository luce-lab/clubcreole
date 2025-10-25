#!/bin/bash

# Import Direct dans PostgreSQL depuis les fichiers JSON
# =======================================================

set -e

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

# Vérifier l'argument
if [ $# -ne 1 ]; then
    error "Usage: $0 <extraction_directory>"
    exit 1
fi

EXTRACTION_DIR="$1"

if [ ! -d "$EXTRACTION_DIR" ]; then
    error "Le répertoire d'extraction n'existe pas: $EXTRACTION_DIR"
    exit 1
fi

log "🚀 Import direct dans PostgreSQL"
log "📂 Source: $EXTRACTION_DIR"

# Fonction pour importer un fichier JSON dans PostgreSQL
import_json_table() {
    local json_file="$1"
    local table_name="$2"
    
    if [ ! -f "$json_file" ]; then
        warning "Fichier non trouvé: $json_file"
        return 1
    fi
    
    # Vérifier si le fichier contient des données
    local records=$(cat "$json_file" | jq '. | length' 2>/dev/null || echo "0")
    
    if [ "$records" = "0" ] || [ "$records" = "[]" ]; then
        log "⏭️ $table_name: vide ou invalide"
        return 0
    fi
    
    log "🔄 Import de $table_name ($records enregistrements)"
    
    # Créer un script SQL temporaire pour l'import
    local temp_sql="/tmp/import_${table_name}.sql"
    
    # Début de la transaction
    echo "BEGIN;" > "$temp_sql"
    echo "SET session_replication_role = 'replica';" >> "$temp_sql"
    
    # Vider la table
    echo "TRUNCATE TABLE $table_name CASCADE;" >> "$temp_sql"
    
    # Générer les INSERT depuis le JSON
    cat "$json_file" | jq -r '.[] | 
        @json | 
        "INSERT INTO '"$table_name"' SELECT * FROM json_populate_record(NULL::'"$table_name"', '\''\(.)'\''::json) ON CONFLICT DO NOTHING;"
    ' >> "$temp_sql" 2>/dev/null || {
        warning "Impossible de parser le JSON pour $table_name"
        return 1
    }
    
    # Fin de la transaction
    echo "SET session_replication_role = 'origin';" >> "$temp_sql"
    echo "COMMIT;" >> "$temp_sql"
    
    # Exécuter le script SQL
    if docker compose -f docker-compose.supabase.yml exec -T supabase-db psql -U postgres -d postgres < "$temp_sql" 2>/dev/null; then
        log "✅ $table_name importé avec succès"
        rm -f "$temp_sql"
        return 0
    else
        warning "Erreur lors de l'import de $table_name"
        rm -f "$temp_sql"
        return 1
    fi
}

# Tables à importer dans l'ordre (respect des dépendances)
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

# Compteurs
SUCCESS=0
FAILED=0

# Importer chaque table
for table in "${TABLES[@]}"; do
    json_file="$EXTRACTION_DIR/${table}.json"
    if import_json_table "$json_file" "$table"; then
        ((SUCCESS++))
    else
        ((FAILED++))
    fi
done

# Résumé
echo ""
log "📊 RÉSUMÉ DE L'IMPORT"
log "✅ Tables importées avec succès: $SUCCESS"
if [ $FAILED -gt 0 ]; then
    warning "❌ Tables échouées: $FAILED"
fi

# Vérifier les comptages
log "🔍 Vérification des données importées:"
for table in "${TABLES[@]}"; do
    count=$(docker compose -f docker-compose.supabase.yml exec -T supabase-db psql -U postgres -d postgres -t -c "SELECT COUNT(*) FROM $table;" 2>/dev/null | tr -d ' \n')
    if [ -n "$count" ] && [ "$count" != "0" ]; then
        log "  ✅ $table: $count enregistrements"
    fi
done

log "✨ Import terminé!"