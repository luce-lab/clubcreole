#!/usr/bin/env node
/**
 * Script d'Import de Données Extraites
 * ====================================
 * Importe les données JSON extraites vers l'instance Supabase cible
 * quand elle sera disponible
 */

import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load environment variables
config();

async function importData(extractionDir: string) {
  // Configuration cible
  let targetUrl = process.env.SUPABASE_TARGET_URL;
  let targetKey = process.env.SUPABASE_TARGET_KEY;
  
  // Auto-détection de la cible depuis SERVICE_*
  if (!targetUrl && process.env.SERVICE_SUPABASE_ANON_KEY) {
    targetUrl = 'https://services-supabase.clubcreole.fr';
  }
  if (!targetKey && process.env.SERVICE_SUPABASE_ANON_KEY) {
    targetKey = process.env.SERVICE_SUPABASE_ANON_KEY;
  }

  if (!targetUrl || !targetKey) {
    console.error('❌ Configuration cible manquante');
    console.error('Variables requises: SUPABASE_TARGET_URL, SUPABASE_TARGET_KEY');
    process.exit(1);
  }

  const client = createClient(targetUrl, targetKey);
  
  // Lire le résumé d'extraction
  const summaryPath = path.join(extractionDir, 'extraction_summary.json');
  if (!fs.existsSync(summaryPath)) {
    console.error(`❌ Résumé non trouvé: ${summaryPath}`);
    process.exit(1);
  }

  const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
  
  console.log(`🚀 Import vers instance cible`);
  console.log(`📂 Source: ${extractionDir}`);
  console.log(`🎯 Cible: ${targetUrl}`);
  console.log(`📅 Extraction: ${summary.timestamp}`);

  let importedTables = 0;
  let totalRecords = 0;

  for (const [tableName, recordCount] of Object.entries(summary.tables) as [string, number][]) {
    if (recordCount <= 0) {
      console.log(`⏭️ ${tableName}: ignoré (${recordCount === 0 ? 'vide' : 'erreur'})`);
      continue;
    }

    const dataPath = path.join(extractionDir, `${tableName}.json`);
    if (!fs.existsSync(dataPath)) {
      console.error(`❌ ${tableName}: fichier manquant ${dataPath}`);
      continue;
    }

    try {
      console.log(`🔄 Import: ${tableName} (${recordCount} enregistrements)`);
      
      const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      
      // Vider la table cible d'abord (optionnel)
      const { error: deleteError } = await client
        .from(tableName)
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');

      if (deleteError && !deleteError.message.includes('no rows')) {
        console.warn(`⚠️ Vidage ${tableName}: ${deleteError.message}`);
      }

      // Importer les données
      const { error: insertError } = await client
        .from(tableName)
        .insert(data);

      if (insertError) {
        console.error(`❌ ${tableName}: ${insertError.message}`);
        continue;
      }

      console.log(`✅ ${tableName}: ${recordCount} enregistrements importés`);
      importedTables++;
      totalRecords += recordCount;
      
    } catch (error) {
      console.error(`❌ ${tableName}: ${error}`);
    }
  }

  console.log(`\n📊 RÉSUMÉ DE L'IMPORT`);
  console.log(`✅ Tables importées: ${importedTables}`);
  console.log(`📊 Total enregistrements: ${totalRecords}`);
  console.log(`🎯 Instance cible: ${targetUrl}`);
}

// Usage
const extractionDir = process.argv[2] || findLatestExtraction();

function findLatestExtraction(): string {
  const backupDir = './migration-backups';
  if (!fs.existsSync(backupDir)) {
    console.error('❌ Aucun répertoire de sauvegarde trouvé');
    process.exit(1);
  }

  const extractionDirs = fs.readdirSync(backupDir)
    .filter(name => name.startsWith('extraction_'))
    .map(name => ({
      name,
      path: path.join(backupDir, name),
      mtime: fs.statSync(path.join(backupDir, name)).mtime
    }))
    .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());

  if (extractionDirs.length === 0) {
    console.error('❌ Aucune extraction trouvée');
    console.log('💡 Exécutez d\'abord: npx vite-node scripts/extract-supabase-data.ts');
    process.exit(1);
  }

  const latest = extractionDirs[0];
  console.log(`📂 Extraction détectée: ${latest.name}`);
  return latest.path;
}

if (!extractionDir) {
  console.error('❌ Répertoire d\'extraction requis');
  console.log('Usage: npx vite-node scripts/import-extracted-data.ts [répertoire]');
  process.exit(1);
}

importData(extractionDir).catch(console.error);