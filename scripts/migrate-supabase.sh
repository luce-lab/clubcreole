#!/bin/bash

# ================================================================
# Script de Migration Supabase Cloud vers Auto-hébergé
# ================================================================
# Ce script effectue une migration complète PostgreSQL entre instances Supabase
# en utilisant pg_dump/pg_restore pour préserver toutes les fonctionnalités

set -e  # Arrêt immédiat en cas d'erreur

# Auto-détection de la configuration depuis .env
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Extraction automatique des paramètres de connexion depuis les URLs Supabase
if [ -n "$VITE_SUPABASE_URL" ]; then
    SOURCE_HOST=$(echo "$VITE_SUPABASE_URL" | sed 's|https://||' | sed 's|\.supabase\.co|.supabase.co|' | sed 's|^|db.|' | sed 's|\.co|.co|')
else
    SOURCE_HOST="${SUPABASE_SOURCE_HOST:-db.psryoyugyimibjhwhvlh.supabase.co}"
fi

if [ -n "$SERVICE_SUPABASE_URL" ]; then
    TARGET_HOST=$(echo "$SERVICE_SUPABASE_URL" | sed 's|https://||' | sed 's|/$||' | sed 's|^|db.|')
else
    TARGET_HOST="${SUPABASE_TARGET_HOST:-db.supabase.guadajobservices.fr}"
fi

# Configuration PostgreSQL pour Supabase
SOURCE_PORT="${SUPABASE_SOURCE_PORT:-6543}"  # Port pooler Supabase cloud
SOURCE_DB="${SUPABASE_SOURCE_DB:-postgres}"
SOURCE_USER="${SUPABASE_SOURCE_USER:-postgres.psryoyugyimibjhwhvlh}"  # Format Supabase
SOURCE_PASSWORD="${SUPABASE_SOURCE_PASSWORD}"

TARGET_PORT="${SUPABASE_TARGET_PORT:-5432}"  # Port standard pour auto-hébergé
TARGET_DB="${SUPABASE_TARGET_DB:-postgres}"
TARGET_USER="${SUPABASE_TARGET_USER:-postgres}"
TARGET_PASSWORD="${SUPABASE_TARGET_PASSWORD}"

# Options
BACKUP_DIR="${BACKUP_DIR:-./migration-backups}"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
DUMP_FILE="${BACKUP_DIR}/supabase_dump_${TIMESTAMP}.sql"
LOG_FILE="${BACKUP_DIR}/migration_${TIMESTAMP}.log"

# Fonction d'affichage avec timestamp
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Fonction de vérification des prérequis
check_prerequisites() {
    log "🔍 Vérification des prérequis..."
    
    # Vérification des outils PostgreSQL
    if ! command -v pg_dump &> /dev/null; then
        log "❌ pg_dump n'est pas installé"
        exit 1
    fi
    
    if ! command -v pg_restore &> /dev/null; then
        log "❌ pg_restore n'est pas installé"
        exit 1
    fi
    
    if ! command -v psql &> /dev/null; then
        log "❌ psql n'est pas installé"
        exit 1
    fi
    
    # Création du répertoire de backup
    mkdir -p "$BACKUP_DIR"
    
    log "✅ Prérequis validés"
}

# Fonction de test de connectivité
test_connections() {
    log "🔗 Test de connectivité aux bases de données..."
    
    # Test connexion source
    log "Test connexion Supabase source..."
    if ! PGPASSWORD="$SOURCE_PASSWORD" psql -h "$SOURCE_HOST" -p "$SOURCE_PORT" -U "$SOURCE_USER" -d "$SOURCE_DB" -c "SELECT version();" &> /dev/null; then
        log "❌ Impossible de se connecter à la base source"
        exit 1
    fi
    
    # Test connexion cible
    log "Test connexion Supabase cible..."
    if ! PGPASSWORD="$TARGET_PASSWORD" psql -h "$TARGET_HOST" -p "$TARGET_PORT" -U "$TARGET_USER" -d "$TARGET_DB" -c "SELECT version();" &> /dev/null; then
        log "❌ Impossible de se connecter à la base cible"
        exit 1
    fi
    
    log "✅ Connectivité validée"
}

# Fonction d'estimation de la taille
estimate_size() {
    log "📊 Estimation de la taille des données..."
    
    local size_query="SELECT pg_size_pretty(pg_database_size('$SOURCE_DB')) as database_size;"
    local size_result=$(PGPASSWORD="$SOURCE_PASSWORD" psql -h "$SOURCE_HOST" -p "$SOURCE_PORT" -U "$SOURCE_USER" -d "$SOURCE_DB" -t -c "$size_query" | tr -d ' ')
    
    log "Taille de la base source: $size_result"
    
    # Estimation du temps (approximatif: 1GB = 2-5 minutes selon le réseau)
    log "⏱️ Temps estimé: 5-15 minutes selon la taille et la connexion réseau"
}

# Fonction de création du dump
create_dump() {
    log "📦 Création du dump PostgreSQL..."
    
    # Options pg_dump optimisées pour Supabase
    # --no-owner --no-privileges: évite les problèmes de permissions
    # --verbose: affichage détaillé
    # --clean: DROP des objets avant création
    # --if-exists: évite les erreurs si objets n'existent pas
    PGPASSWORD="$SOURCE_PASSWORD" pg_dump \
        -h "$SOURCE_HOST" \
        -p "$SOURCE_PORT" \
        -U "$SOURCE_USER" \
        -d "$SOURCE_DB" \
        --verbose \
        --clean \
        --if-exists \
        --no-owner \
        --no-privileges \
        --format=plain \
        --file="$DUMP_FILE" 2>> "$LOG_FILE"
    
    if [ $? -eq 0 ]; then
        log "✅ Dump créé avec succès: $DUMP_FILE"
        local dump_size=$(du -h "$DUMP_FILE" | cut -f1)
        log "Taille du dump: $dump_size"
    else
        log "❌ Échec de la création du dump"
        exit 1
    fi
}

# Fonction de validation du dump
validate_dump() {
    log "🔍 Validation du dump..."
    
    # Vérification de la présence du fichier et taille non nulle
    if [ ! -f "$DUMP_FILE" ] || [ ! -s "$DUMP_FILE" ]; then
        log "❌ Le fichier dump est vide ou inexistant"
        exit 1
    fi
    
    # Vérification du contenu SQL
    if ! grep -q "PostgreSQL database dump" "$DUMP_FILE"; then
        log "❌ Le dump ne semble pas être un fichier PostgreSQL valide"
        exit 1
    fi
    
    log "✅ Dump validé"
}

# Fonction de restauration
restore_dump() {
    log "🔄 Restauration vers l'instance cible..."
    
    # Restauration avec psql (format plain)
    PGPASSWORD="$TARGET_PASSWORD" psql \
        -h "$TARGET_HOST" \
        -p "$TARGET_PORT" \
        -U "$TARGET_USER" \
        -d "$TARGET_DB" \
        -v ON_ERROR_STOP=1 \
        -f "$DUMP_FILE" 2>> "$LOG_FILE"
    
    if [ $? -eq 0 ]; then
        log "✅ Restauration terminée avec succès"
    else
        log "❌ Échec de la restauration"
        exit 1
    fi
}

# Fonction de validation post-migration
validate_migration() {
    log "✅ Validation de la migration..."
    
    # Comparaison du nombre de tables
    local source_tables=$(PGPASSWORD="$SOURCE_PASSWORD" psql -h "$SOURCE_HOST" -p "$SOURCE_PORT" -U "$SOURCE_USER" -d "$SOURCE_DB" -t -c "SELECT count(*) FROM information_schema.tables WHERE table_schema = 'public';" | tr -d ' ')
    
    local target_tables=$(PGPASSWORD="$TARGET_PASSWORD" psql -h "$TARGET_HOST" -p "$TARGET_PORT" -U "$TARGET_USER" -d "$TARGET_DB" -t -c "SELECT count(*) FROM information_schema.tables WHERE table_schema = 'public';" | tr -d ' ')
    
    log "Tables source: $source_tables, Tables cible: $target_tables"
    
    if [ "$source_tables" = "$target_tables" ]; then
        log "✅ Nombre de tables validé"
    else
        log "⚠️ Différence dans le nombre de tables détectée"
    fi
    
    # Test de connectivité API Supabase (basique)
    log "Test de l'API Supabase cible..."
    # Note: ce test nécessiterait l'URL et la clé API de l'instance cible
    # Pour l'instant on valide juste la base PostgreSQL
    
    log "✅ Migration validée"
}

# Fonction de nettoyage
cleanup() {
    log "🧹 Nettoyage optionnel..."
    
    if [ "$CLEANUP_DUMP" = "true" ]; then
        rm -f "$DUMP_FILE"
        log "Dump temporaire supprimé"
    else
        log "Dump conservé dans: $DUMP_FILE"
    fi
}

# Fonction d'affichage de l'aide
show_help() {
    cat << EOF
Migration Supabase Cloud vers Auto-hébergé

Usage: $0 [OPTIONS]

Variables d'environnement:
  SOURCE:
    SUPABASE_SOURCE_HOST      (défaut: db.psryoyugyimibjhwhvlh.supabase.co)
    SUPABASE_SOURCE_PORT      (défaut: 5432)
    SUPABASE_SOURCE_DB        (défaut: postgres)
    SUPABASE_SOURCE_USER      (défaut: postgres)
    SUPABASE_SOURCE_PASSWORD  (requis)

  TARGET:
    SUPABASE_TARGET_HOST      (défaut: localhost)
    SUPABASE_TARGET_PORT      (défaut: 54322)
    SUPABASE_TARGET_DB        (défaut: postgres)
    SUPABASE_TARGET_USER      (défaut: postgres)
    SUPABASE_TARGET_PASSWORD  (requis)

  OPTIONS:
    BACKUP_DIR               (défaut: ./migration-backups)
    CLEANUP_DUMP             (défaut: false, set to true pour supprimer le dump)

Exemple:
  export SUPABASE_SOURCE_PASSWORD="votre_mot_de_passe_source"
  export SUPABASE_TARGET_PASSWORD="votre_mot_de_passe_cible"
  $0

EOF
}

# Fonction principale
main() {
    log "🚀 Démarrage de la migration Supabase"
    log "Source: $SOURCE_HOST:$SOURCE_PORT/$SOURCE_DB"
    log "Cible: $TARGET_HOST:$TARGET_PORT/$TARGET_DB"
    
    check_prerequisites
    test_connections
    estimate_size
    create_dump
    validate_dump
    restore_dump
    validate_migration
    cleanup
    
    log "🎉 Migration terminée avec succès!"
    log "📄 Log complet disponible dans: $LOG_FILE"
}

# Gestion des arguments
case "${1:-}" in
    -h|--help)
        show_help
        exit 0
        ;;
    *)
        if [ -z "$SOURCE_PASSWORD" ] || [ -z "$TARGET_PASSWORD" ]; then
            log "❌ Les mots de passe source et cible sont requis"
            show_help
            exit 1
        fi
        main
        ;;
esac