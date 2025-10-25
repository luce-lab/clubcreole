#!/usr/bin/env node
/**
 * Script d'Import Direct PostgreSQL
 * ================================
 * Importe les données extraites vers la base PostgreSQL cible
 */

import { config } from 'dotenv';
import { Client } from 'pg';
import fs from 'fs';
import path from 'path';

// Load environment variables
config();

const TARGET_DB_URL = 'postgresql://postgres:f2IXGmb97vF8GiUT7EVFFfp0W85vAytI@37.59.121.40:5432/postgres';

const TABLES = [
  'partners', 'accommodations', 'restaurants', 'activities',
  'leisure_activities', 'profiles', 'subscriptions',
  'restaurant_reservations', 'travel_reservations'
];

async function importToPostgreSQL(extractionDir: string) {
  const client = new Client({
    connectionString: TARGET_DB_URL,
  });

  try {
    await client.connect();
    console.log('🔌 Connexion à la base PostgreSQL établie');

    // Lire le résumé d'extraction
    const summaryPath = path.join(extractionDir, 'extraction_summary.json');
    if (!fs.existsSync(summaryPath)) {
      throw new Error(`Résumé non trouvé: ${summaryPath}`);
    }

    const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
    
    console.log(`🚀 Import des données`);
    console.log(`📂 Source: ${extractionDir}`);
    console.log(`🎯 Cible: ${TARGET_DB_URL.replace(/:[^:@]*@/, ':***@')}`);
    console.log(`📅 Extraction: ${summary.timestamp}`);

    let importedTables = 0;
    let totalRecords = 0;

    for (const tableName of TABLES) {
      const recordCount = summary.tables[tableName];
      
      if (!recordCount || recordCount <= 0) {
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
        
        if (!Array.isArray(data) || data.length === 0) {
          console.log(`⏭️ ${tableName}: aucune donnée valide`);
          continue;
        }

        // Commencer une transaction
        await client.query('BEGIN');
        
        try {
          // Désactiver temporairement les contraintes de clés étrangères
          await client.query('SET session_replication_role = replica');
          
          // Vider la table
          await client.query(`TRUNCATE TABLE ${tableName} CASCADE`);
          
          // Insérer les données ligne par ligne pour gérer les erreurs
          let inserted = 0;
          for (const record of data) {
            try {
              const columns = Object.keys(record);
              const values = Object.values(record);
              const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');
              
              const query = `
                INSERT INTO ${tableName} (${columns.join(', ')}) 
                VALUES (${placeholders})
                ON CONFLICT DO NOTHING
              `;
              
              await client.query(query, values);
              inserted++;
            } catch (recordError) {
              console.warn(`⚠️ Erreur enregistrement ${tableName}:`, recordError);
            }
          }
          
          // Réactiver les contraintes
          await client.query('SET session_replication_role = origin');
          
          // Valider la transaction
          await client.query('COMMIT');
          
          console.log(`✅ ${tableName}: ${inserted}/${data.length} enregistrements importés`);
          importedTables++;
          totalRecords += inserted;
          
        } catch (error) {
          await client.query('ROLLBACK');
          throw error;
        }
        
      } catch (error) {
        console.error(`❌ ${tableName}:`, error);
      }
    }

    console.log(`\n📊 RÉSUMÉ DE L'IMPORT`);
    console.log(`✅ Tables importées: ${importedTables}`);
    console.log(`📊 Total enregistrements: ${totalRecords}`);
    
    // Vérification finale
    console.log(`\n🔍 Vérification des données importées:`);
    for (const tableName of TABLES) {
      try {
        const result = await client.query(`SELECT COUNT(*) FROM ${tableName}`);
        const count = parseInt(result.rows[0].count);
        if (count > 0) {
          console.log(`  ✅ ${tableName}: ${count} enregistrements`);
        }
      } catch (error) {
        console.log(`  ❌ ${tableName}: erreur de vérification`);
      }
    }

  } catch (error) {
    console.error('❌ Erreur lors de l\'import:', error);
    throw error;
  } finally {
    await client.end();
    console.log('🔌 Connexion fermée');
  }
}

// Usage
const extractionDir = process.argv[2] || findLatestExtraction();

function findLatestExtraction(): string {
  const backupDir = './migration-backups';
  if (!fs.existsSync(backupDir)) {
    throw new Error('Aucun répertoire de sauvegarde trouvé');
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
    throw new Error('Aucune extraction trouvée');
  }

  const latest = extractionDirs[0];
  console.log(`📂 Extraction détectée: ${latest.name}`);
  return latest.path;
}

if (!extractionDir) {
  console.error('❌ Répertoire d\'extraction requis');
  console.log('Usage: npx vite-node scripts/import-to-target-postgres.ts [répertoire]');
  process.exit(1);
}

importToPostgreSQL(extractionDir).catch(error => {
  console.error('❌ Échec de l\'import:', error);
  process.exit(1);
});