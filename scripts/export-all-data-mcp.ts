#!/usr/bin/env node
/**
 * Script d'Export Complet via MCP Supabase
 * ========================================
 * Utilise les outils MCP Supabase pour récupérer toutes les données
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Configuration Supabase Cloud
const SOURCE_URL = 'https://psryoyugyimibjhwhvlh.supabase.co';
const SOURCE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzcnlveXVneWltaWJqaHdodmxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4NTM2NDMsImV4cCI6MjA0OTQyOTY0M30.HqVFT7alWrZtjf1cHxeAeqpsWMjVEnnXfVtwesYga-0';

const client = createClient(SOURCE_URL, SOURCE_KEY);

function log(message: string, level: 'info' | 'success' | 'error' | 'warn' = 'info') {
  const timestamp = new Date().toISOString();
  const symbols = { info: '📋', success: '✅', error: '❌', warn: '⚠️' };
  console.log(`[${timestamp}] ${symbols[level]} ${message}`);
}

// Toutes les tables de la base selon CLAUDE.md
const ALL_TABLES = [
  // Tables de base
  'profiles',
  'partners',
  
  // Tables principales
  'accommodations',
  'accommodation_rooms',
  'restaurants',
  'car_rentals',
  'leisure_activities',
  'activities',
  'travel_packages',
  'subscriptions',
  
  // Tables de réservations/bookings
  'accommodation_bookings',
  'restaurant_reservations', 
  'car_rental_bookings',
  'activity_bookings',
  'travel_reservations',
  
  // Tables de relations
  'partner_accommodations',
  
  // Tables système (si accessibles)
  'auth.users',
  'auth.sessions',
  'auth.refresh_tokens'
];

async function getAllTableData(tableName: string): Promise<any[]> {
  try {
    // Gérer les tables du schéma auth différemment
    const isAuthTable = tableName.startsWith('auth.');
    const actualTableName = isAuthTable ? tableName.split('.')[1] : tableName;
    
    if (isAuthTable) {
      // Les tables auth nécessitent souvent des permissions spéciales
      log(`Table auth ${tableName} ignorée (permissions requises)`, 'warn');
      return [];
    }
    
    log(`Récupération de ${tableName}...`, 'info');
    
    // Récupérer toutes les données sans limite
    let allData: any[] = [];
    let from = 0;
    const limit = 1000; // Batch de 1000
    
    while (true) {
      const { data, error } = await client
        .from(actualTableName)
        .select('*')
        .range(from, from + limit - 1);
      
      if (error) {
        if (error.code === 'PGRST116') {
          log(`Table ${tableName} n'existe pas`, 'warn');
          return [];
        }
        log(`Erreur ${tableName}: ${error.message}`, 'error');
        return [];
      }
      
      if (!data || data.length === 0) {
        break;
      }
      
      allData = allData.concat(data);
      log(`  ${tableName}: ${allData.length} enregistrements récupérés...`, 'info');
      
      if (data.length < limit) {
        break; // Dernière page
      }
      
      from += limit;
    }
    
    if (allData.length > 0) {
      log(`✅ ${tableName}: ${allData.length} enregistrements total`, 'success');
    }
    
    return allData;
    
  } catch (error) {
    log(`Erreur inattendue ${tableName}: ${error}`, 'error');
    return [];
  }
}

async function getTableStructure(tableName: string): Promise<any> {
  try {
    // Obtenir la structure de la table via une requête avec limit 0
    const { data, error } = await client
      .from(tableName)
      .select('*')
      .limit(0);
    
    if (error) {
      return null;
    }
    
    // Obtenir un échantillon pour analyser les types
    const { data: sample } = await client
      .from(tableName)
      .select('*')
      .limit(1);
    
    if (sample && sample.length > 0) {
      const columns = Object.keys(sample[0]).map(key => ({
        name: key,
        type: typeof sample[0][key],
        nullable: sample[0][key] === null,
        sampleValue: sample[0][key]
      }));
      
      return {
        tableName,
        columns,
        sampleRecord: sample[0]
      };
    }
    
    return { tableName, columns: [], sampleRecord: null };
    
  } catch (error) {
    return null;
  }
}

async function main() {
  log('=== EXPORT COMPLET DES DONNÉES SUPABASE ===', 'info');
  log(`Source: ${SOURCE_URL}`, 'info');
  
  // Créer le dossier d'export
  const exportDir = './data-export';
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const exportPath = path.join(exportDir, `export-${timestamp}`);
  
  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir, { recursive: true });
  }
  fs.mkdirSync(exportPath, { recursive: true });
  
  log(`Dossier d'export: ${exportPath}`, 'info');
  
  // Export des données et structures
  const exportSummary: any = {
    timestamp: new Date().toISOString(),
    source: SOURCE_URL,
    tables: {},
    totalRecords: 0,
    exportPath
  };
  
  for (const table of ALL_TABLES) {
    // Récupérer les données
    const data = await getAllTableData(table);
    
    // Récupérer la structure
    const structure = await getTableStructure(table);
    
    if (data.length > 0 || structure) {
      // Sauvegarder les données
      if (data.length > 0) {
        const dataFile = path.join(exportPath, `${table}.json`);
        fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
        log(`Données sauvées: ${table}.json`, 'info');
      }
      
      // Sauvegarder la structure
      if (structure) {
        const structureFile = path.join(exportPath, `${table}.structure.json`);
        fs.writeFileSync(structureFile, JSON.stringify(structure, null, 2));
        log(`Structure sauvée: ${table}.structure.json`, 'info');
      }
      
      // Mettre à jour le résumé
      exportSummary.tables[table] = {
        recordCount: data.length,
        hasStructure: !!structure,
        columns: structure?.columns?.length || 0
      };
      
      exportSummary.totalRecords += data.length;
    }
  }
  
  // Sauvegarder le résumé
  const summaryFile = path.join(exportPath, 'export-summary.json');
  fs.writeFileSync(summaryFile, JSON.stringify(exportSummary, null, 2));
  
  // Créer un fichier SQL d'import
  await generateSQLImport(exportPath, exportSummary);
  
  // Rapport final
  log('=== EXPORT TERMINÉ ===', 'info');
  log(`Total des enregistrements: ${exportSummary.totalRecords}`, 'success');
  log(`Tables exportées: ${Object.keys(exportSummary.tables).length}`, 'success');
  log(`Dossier: ${exportPath}`, 'info');
  
  // Créer un archive ZIP si possible
  try {
    const archiver = require('archiver');
    const archive = archiver('zip');
    const output = fs.createWriteStream(`${exportPath}.zip`);
    
    archive.pipe(output);
    archive.directory(exportPath, false);
    await archive.finalize();
    
    log(`Archive créée: ${exportPath}.zip`, 'success');
  } catch (error) {
    log('Archive ZIP non créée (archiver non installé)', 'warn');
  }
}

async function generateSQLImport(exportPath: string, summary: any): Promise<void> {
  const sqlFile = path.join(exportPath, 'import.sql');
  let sqlContent = `-- Script d'import généré automatiquement
-- Date: ${new Date().toISOString()}
-- Source: ${summary.source}
-- Total records: ${summary.totalRecords}

BEGIN;

`;

  for (const [tableName, info] of Object.entries(summary.tables) as [string, any][]) {
    if (info.recordCount > 0) {
      sqlContent += `-- Import table ${tableName} (${info.recordCount} enregistrements)
-- TRUNCATE TABLE ${tableName}; -- Décommentez pour vider la table
-- \\copy ${tableName} FROM '${tableName}.json' WITH (FORMAT json);

`;
    }
  }
  
  sqlContent += `
COMMIT;

-- Instructions:
-- 1. Copier ce dossier sur le serveur cible
-- 2. Adapter les chemins dans les commandes \\copy
-- 3. Exécuter: psql -f import.sql
`;
  
  fs.writeFileSync(sqlFile, sqlContent);
  log('Script SQL généré: import.sql', 'info');
}

// Exécution
main().catch(error => {
  log(`Erreur fatale: ${error}`, 'error');
  process.exit(1);
});