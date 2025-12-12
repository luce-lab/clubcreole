#!/bin/bash
# Script de dump Supabase Cloud vers fichier local
# Usage: ./dump-supabase.sh

set -e

# Configuration source (Supabase Cloud)
SOURCE_HOST="db.psryoyugyimibjhwhvlh.supabase.co"
SOURCE_PORT="6543"
SOURCE_USER="postgres.psryoyugyimibjhwhvlh"
SOURCE_DB="postgres"

# Fichier de sortie
BACKUP_DIR="migration-backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
DUMP_FILE="${BACKUP_DIR}/supabase_dump_${TIMESTAMP}.sql"

echo "=== Dump Supabase Cloud ==="
echo "Source: ${SOURCE_HOST}:${SOURCE_PORT}/${SOURCE_DB}"
echo "Fichier: ${DUMP_FILE}"
echo ""

# Demander le mot de passe
read -sp "Entrez le mot de passe PostgreSQL Supabase: " SOURCE_PASSWORD
echo ""

# Création du répertoire
mkdir -p "$BACKUP_DIR"

echo "Dump en cours..."
PGPASSWORD="$SOURCE_PASSWORD" pg_dump \
  -h "$SOURCE_HOST" \
  -p "$SOURCE_PORT" \
  -U "$SOURCE_USER" \
  -d "$SOURCE_DB" \
  --verbose --clean --if-exists \
  --no-owner --no-privileges \
  -f "$DUMP_FILE" 2>&1

if [ $? -eq 0 ]; then
  DUMP_SIZE=$(du -h "$DUMP_FILE" | cut -f1)
  echo ""
  echo "Dump termine avec succes!"
  echo "Fichier: $DUMP_FILE"
  echo "Taille: $DUMP_SIZE"
  echo ""
  echo "Prochaine etape: Importer vers l'instance cible"
else
  echo "Erreur lors du dump"
  exit 1
fi
