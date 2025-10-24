#!/usr/bin/env node
/**
 * Script pour exporter les données de la base Supabase
 * Ce script exporte toutes les données des tables principales au format SQL INSERT
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Configuration Supabase (depuis .env)
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

// Liste des tables à exporter (selon CLAUDE.md)
const TABLES_TO_EXPORT = [
  'profiles',
  'accommodations',
  'accommodation_rooms',
  'accommodation_bookings',
  'restaurants',
  'restaurant_reservations',
  'car_rentals',
  'car_rental_bookings',
  'leisure_activities',
  'activities',
  'activity_bookings',
  'travel_packages',
  'travel_reservations',
  'subscriptions',
  'partners',
  'partner_accommodations',
];

/**
 * Échappe une valeur pour l'utilisation dans une requête SQL
 */
function escapeSqlValue(value: any): string {
  if (value === null || value === undefined) {
    return 'NULL';
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  if (typeof value === 'object') {
    return `'${JSON.stringify(value).replace(/'/g, "''")}'`;
  }
  return `'${String(value).replace(/'/g, "''")}'`;
}

/**
 * Génère des instructions INSERT pour une table
 */
async function exportTable(tableName: string): Promise<string> {
  try {
    console.log(`Exportation de la table: ${tableName}...`);

    const { data, error } = await supabase
      .from(tableName)
      .select('*');

    if (error) {
      console.error(`Erreur lors de l'exportation de ${tableName}:`, error.message);
      return `-- Erreur lors de l'exportation de ${tableName}: ${error.message}\n`;
    }

    if (!data || data.length === 0) {
      console.log(`  → Table ${tableName} vide`);
      return `-- Table ${tableName} est vide\n`;
    }

    console.log(`  → ${data.length} lignes trouvées`);

    let sql = `\n-- ============================================\n`;
    sql += `-- Données de la table: ${tableName}\n`;
    sql += `-- Nombre de lignes: ${data.length}\n`;
    sql += `-- ============================================\n\n`;

    // Générer les INSERT statements
    for (const row of data) {
      const columns = Object.keys(row);
      const values = columns.map(col => escapeSqlValue(row[col]));

      sql += `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${values.join(', ')});\n`;
    }

    return sql + '\n';
  } catch (err: any) {
    console.error(`Erreur inattendue pour ${tableName}:`, err.message);
    return `-- Erreur inattendue pour ${tableName}: ${err.message}\n`;
  }
}

/**
 * Fonction principale
 */
async function main() {
  console.log('=== Exportation des données Supabase ===\n');

  const outputFile = 'database-data-dump.sql';

  let sqlDump = `-- =================================================\n`;
  sqlDump += `-- Dump des données de la base ClubCreole\n`;
  sqlDump += `-- Généré le: ${new Date().toISOString()}\n`;
  sqlDump += `-- Source: ${supabaseUrl}\n`;
  sqlDump += `-- =================================================\n\n`;

  // Exporter chaque table
  for (const table of TABLES_TO_EXPORT) {
    const tableSql = await exportTable(table);
    sqlDump += tableSql;
  }

  // Sauvegarder le fichier
  fs.writeFileSync(outputFile, sqlDump);

  console.log('\n=== Exportation terminée ===');
  console.log(`✓ Fichier créé: ${outputFile}`);
  console.log(`✓ ${TABLES_TO_EXPORT.length} tables exportées\n`);
}

main().catch(console.error);
