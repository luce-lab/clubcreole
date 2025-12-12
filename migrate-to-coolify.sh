#!/bin/bash
# =============================================================================
# Script de Migration: Supabase Cloud -> Coolify Supabase Self-hosted
# =============================================================================

set -e

# Configuration SOURCE (Supabase Cloud)
SOURCE_HOST="db.psryoyugyimibjhwhvlh.supabase.co"
SOURCE_PORT="6543"
SOURCE_USER="postgres.psryoyugyimibjhwhvlh"
SOURCE_DB="postgres"

# Configuration CIBLE (Coolify Supabase)
TARGET_HOST="168.231.74.5"
TARGET_PORT="5432"
TARGET_USER="postgres"
TARGET_DB="postgres"
TARGET_PASSWORD="CydNhVPJ2ekAkAcX4FQiaKUZdDjJTcGw"

# Fichiers
BACKUP_DIR="migration-backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
DUMP_FILE="${BACKUP_DIR}/supabase_dump_${TIMESTAMP}.sql"
LOG_FILE="${BACKUP_DIR}/migration_${TIMESTAMP}.log"

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log() {
    echo -e "${GREEN}[$(date '+%H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[ERREUR]${NC} $1" | tee -a "$LOG_FILE"
}

warn() {
    echo -e "${YELLOW}[ATTENTION]${NC} $1" | tee -a "$LOG_FILE"
}

# Creation du repertoire
mkdir -p "$BACKUP_DIR"

echo "=============================================="
echo "  Migration Supabase Cloud -> Coolify"
echo "=============================================="
echo ""
echo "Source: ${SOURCE_HOST}:${SOURCE_PORT}"
echo "Cible:  ${TARGET_HOST}:${TARGET_PORT}"
echo ""

# Etape 1: Demander le mot de passe source
log "Etape 1: Connexion a la base source"
read -sp "Entrez le mot de passe PostgreSQL Supabase Cloud: " SOURCE_PASSWORD
echo ""

# Test connexion source
log "Test de connexion a la source..."
if ! PGPASSWORD="$SOURCE_PASSWORD" psql -h "$SOURCE_HOST" -p "$SOURCE_PORT" -U "$SOURCE_USER" -d "$SOURCE_DB" -c "SELECT 1;" > /dev/null 2>&1; then
    error "Impossible de se connecter a la base source. Verifiez le mot de passe."
    exit 1
fi
log "Connexion source OK"

# Test connexion cible
log "Test de connexion a la cible..."
if ! PGPASSWORD="$TARGET_PASSWORD" psql -h "$TARGET_HOST" -p "$TARGET_PORT" -U "$TARGET_USER" -d "$TARGET_DB" -c "SELECT 1;" > /dev/null 2>&1; then
    error "Impossible de se connecter a la base cible."
    exit 1
fi
log "Connexion cible OK"

# Etape 2: Estimation taille
log "Etape 2: Estimation de la taille des donnees..."
SIZE=$(PGPASSWORD="$SOURCE_PASSWORD" psql -h "$SOURCE_HOST" -p "$SOURCE_PORT" -U "$SOURCE_USER" -d "$SOURCE_DB" -t -c "SELECT pg_size_pretty(pg_database_size('$SOURCE_DB'));" | tr -d ' ')
log "Taille de la base source: $SIZE"

# Etape 3: Dump
log "Etape 3: Creation du dump (cela peut prendre quelques minutes)..."
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
    --exclude-schema=auth \
    --exclude-schema=storage \
    --exclude-schema=realtime \
    --exclude-schema=supabase_functions \
    --exclude-schema=supabase_migrations \
    --exclude-schema=extensions \
    --exclude-schema=graphql \
    --exclude-schema=graphql_public \
    --exclude-schema=net \
    --exclude-schema=pgsodium \
    --exclude-schema=pgsodium_masks \
    --exclude-schema=vault \
    -f "$DUMP_FILE" 2>> "$LOG_FILE"

DUMP_SIZE=$(du -h "$DUMP_FILE" | cut -f1)
log "Dump cree: $DUMP_FILE ($DUMP_SIZE)"

# Etape 4: Import
log "Etape 4: Import vers la base cible..."
warn "Ceci va ecraser les donnees existantes dans le schema public!"
read -p "Continuer? (oui/non): " CONFIRM
if [ "$CONFIRM" != "oui" ]; then
    log "Import annule par l'utilisateur"
    exit 0
fi

log "Import en cours..."
PGPASSWORD="$TARGET_PASSWORD" psql \
    -h "$TARGET_HOST" \
    -p "$TARGET_PORT" \
    -U "$TARGET_USER" \
    -d "$TARGET_DB" \
    -f "$DUMP_FILE" 2>> "$LOG_FILE"

log "Import termine"

# Etape 5: Validation
log "Etape 5: Validation..."

# Compter les tables
SOURCE_TABLES=$(PGPASSWORD="$SOURCE_PASSWORD" psql -h "$SOURCE_HOST" -p "$SOURCE_PORT" -U "$SOURCE_USER" -d "$SOURCE_DB" -t -c "SELECT count(*) FROM information_schema.tables WHERE table_schema = 'public';" | tr -d ' ')
TARGET_TABLES=$(PGPASSWORD="$TARGET_PASSWORD" psql -h "$TARGET_HOST" -p "$TARGET_PORT" -U "$TARGET_USER" -d "$TARGET_DB" -t -c "SELECT count(*) FROM information_schema.tables WHERE table_schema = 'public';" | tr -d ' ')

log "Tables source: $SOURCE_TABLES | Tables cible: $TARGET_TABLES"

if [ "$SOURCE_TABLES" = "$TARGET_TABLES" ]; then
    log "Nombre de tables: OK"
else
    warn "Difference dans le nombre de tables detectee"
fi

# Compter quelques tables importantes
for TABLE in accommodations restaurants activities users; do
    SOURCE_COUNT=$(PGPASSWORD="$SOURCE_PASSWORD" psql -h "$SOURCE_HOST" -p "$SOURCE_PORT" -U "$SOURCE_USER" -d "$SOURCE_DB" -t -c "SELECT count(*) FROM $TABLE;" 2>/dev/null | tr -d ' ' || echo "N/A")
    TARGET_COUNT=$(PGPASSWORD="$TARGET_PASSWORD" psql -h "$TARGET_HOST" -p "$TARGET_PORT" -U "$TARGET_USER" -d "$TARGET_DB" -t -c "SELECT count(*) FROM $TABLE;" 2>/dev/null | tr -d ' ' || echo "N/A")
    log "Table $TABLE: source=$SOURCE_COUNT, cible=$TARGET_COUNT"
done

echo ""
echo "=============================================="
log "Migration terminee avec succes!"
echo "=============================================="
echo ""
echo "Prochaines etapes:"
echo "1. Mettre a jour .env avec:"
echo "   VITE_SUPABASE_URL=http://supabasekong-o0cwk88gwkk8o0ss0s4o8o8c.168.231.74.5.sslip.io"
echo "   VITE_SUPABASE_ANON_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2NTQ1NTg0MCwiZXhwIjo0OTIxMTI5NDQwLCJyb2xlIjoiYW5vbiJ9.9EV9qQ5zUttYzhN6hZwi4rlZvKoq02RzE-OJVI_pIbE"
echo ""
echo "2. Reconstruire l'application: npm run build"
echo ""
echo "Log complet: $LOG_FILE"
