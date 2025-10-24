#!/bin/bash

# Script pour créer un dump du schéma de base de données à partir des migrations Supabase
# Ce script combine toutes les migrations SQL en un seul fichier

OUTPUT_FILE="database-schema-dump.sql"
MIGRATIONS_DIR="supabase/migrations"

echo "=== Création du dump du schéma de base de données ===" > "$OUTPUT_FILE"
echo "-- Généré le: $(date)" >> "$OUTPUT_FILE"
echo "-- Source: Migrations Supabase du projet ClubCreole" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Compter les fichiers de migration
MIGRATION_COUNT=$(find "$MIGRATIONS_DIR" -name "*.sql" | wc -l)
echo "-- Nombre de migrations trouvées: $MIGRATION_COUNT" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Parcourir les fichiers de migration dans l'ordre chronologique
find "$MIGRATIONS_DIR" -name "*.sql" | sort | while read migration_file; do
    filename=$(basename "$migration_file")
    echo "" >> "$OUTPUT_FILE"
    echo "-- ============================================" >> "$OUTPUT_FILE"
    echo "-- Migration: $filename" >> "$OUTPUT_FILE"
    echo "-- ============================================" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    cat "$migration_file" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
done

echo "✓ Dump du schéma créé avec succès: $OUTPUT_FILE"
echo "✓ $MIGRATION_COUNT migrations ont été consolidées"
