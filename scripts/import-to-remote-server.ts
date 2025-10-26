#!/usr/bin/env node
/**
 * Script d'Import vers Serveur Distant
 * ===================================
 * Importe les données exportées vers le serveur distant Supabase
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Configuration serveur distant
const TARGET_URL = 'https://supabase.guadajobservices.fr/';
const TARGET_ANON_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2MTA2OTQ4MCwiZXhwIjo0OTE2NzQzMDgwLCJyb2xlIjoiYW5vbiJ9.XPLr03kTqHVfR3teQNHMmapCyz0ho7xNEfOG-TFS_bw';
const TARGET_SERVICE_KEY = process.env.SERVICE_SUPABASE_SERVICE_KEY || TARGET_ANON_KEY;

function log(message: string, level: 'info' | 'success' | 'error' | 'warn' = 'info') {
  const timestamp = new Date().toISOString();
  const symbols = { info: '📋', success: '✅', error: '❌', warn: '⚠️' };
  console.log(`[${timestamp}] ${symbols[level]} ${message}`);
}

function findLatestExport(): string | null {
  const exportDir = './data-export';
  
  if (!fs.existsSync(exportDir)) {
    return null;
  }
  
  const dirs = fs.readdirSync(exportDir)
    .filter(d => d.startsWith('export-'))
    .map(d => ({
      name: d,
      path: path.join(exportDir, d),
      time: fs.statSync(path.join(exportDir, d)).mtime
    }))
    .sort((a, b) => b.time.getTime() - a.time.getTime());
  
  return dirs.length > 0 ? dirs[0].path : null;
}

async function testTargetConnection(): Promise<boolean> {
  log('Test de connexion au serveur distant...', 'info');
  
  const clientAnon = createClient(TARGET_URL, TARGET_ANON_KEY);
  const clientService = createClient(TARGET_URL, TARGET_SERVICE_KEY);
  
  // Test avec clé anon
  try {
    const { error: anonError } = await clientAnon
      .from('restaurants')
      .select('id')
      .limit(1);
    
    if (!anonError) {
      log('✅ Connexion avec clé anon OK', 'success');
      return true;
    }
  } catch (e) {}
  
  // Test avec clé service
  try {
    const { error: serviceError } = await clientService
      .from('restaurants')
      .select('id')
      .limit(1);
    
    if (!serviceError) {
      log('✅ Connexion avec clé service OK', 'success');
      return true;
    } else {
      log(`Erreur clé service: ${serviceError.message}`, 'error');
    }
  } catch (e) {
    log(`Erreur connexion service: ${e}`, 'error');
  }
  
  log('❌ Impossible de se connecter au serveur distant', 'error');
  return false;
}

async function importTableData(tableName: string, data: any[], targetClient: any): Promise<boolean> {
  if (data.length === 0) {
    log(`Table ${tableName} vide, ignorée`, 'warn');
    return true;
  }
  
  log(`Import de ${tableName}: ${data.length} enregistrements`, 'info');
  
  try {
    // Nettoyer la table cible
    const { error: deleteError } = await targetClient
      .from(tableName)
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');
    
    if (deleteError) {
      log(`Note: Impossible de vider ${tableName}: ${deleteError.message}`, 'warn');
    }
    
    // Insérer par batch de 50 (plus petit pour éviter les timeouts)
    const batchSize = 50;
    let totalInserted = 0;
    
    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize);
      
      const { error: insertError } = await targetClient
        .from(tableName)
        .insert(batch);
      
      if (insertError) {
        log(`Erreur batch ${i}-${i + batch.length}: ${insertError.message}`, 'error');
        
        // Essayer ligne par ligne
        for (const row of batch) {
          const { error: singleError } = await targetClient
            .from(tableName)
            .insert(row);
          
          if (!singleError) {
            totalInserted++;
          } else {
            log(`  Erreur ligne: ${singleError.message}`, 'error');
          }
        }
      } else {
        totalInserted += batch.length;
        log(`  Batch ${i + 1}-${i + batch.length} importé`, 'info');
      }
    }
    
    log(`Import ${tableName}: ${totalInserted}/${data.length} réussis`, 
        totalInserted === data.length ? 'success' : 'warn');
    
    return totalInserted > 0;
    
  } catch (error) {
    log(`Erreur inattendue ${tableName}: ${error}`, 'error');
    return false;
  }
}

async function createImportSummary(exportPath: string, results: any): Promise<void> {
  const summaryPath = path.join(exportPath, 'import-results.json');
  const summary = {
    timestamp: new Date().toISOString(),
    target: TARGET_URL,
    results,
    totalSuccess: Object.values(results).filter(Boolean).length,
    totalTables: Object.keys(results).length
  };
  
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  log(`Résumé d'import sauvé: ${summaryPath}`, 'info');
}

async function main() {
  log('=== IMPORT VERS SERVEUR DISTANT ===', 'info');
  log(`Cible: ${TARGET_URL}`, 'info');
  
  // Trouver le dernier export
  const exportPath = process.argv[2] || findLatestExport();
  
  if (!exportPath || !fs.existsSync(exportPath)) {
    log('Usage: npx tsx import-to-remote-server.ts [chemin-export]', 'error');
    log('Ou placez-vous dans le dossier contenant data-export/', 'info');
    process.exit(1);
  }
  
  log(`Dossier d'export: ${exportPath}`, 'info');
  
  // Charger le résumé
  const summaryFile = path.join(exportPath, 'export-summary.json');
  if (!fs.existsSync(summaryFile)) {
    log(`Fichier résumé introuvable: ${summaryFile}`, 'error');
    process.exit(1);
  }
  
  const exportSummary = JSON.parse(fs.readFileSync(summaryFile, 'utf-8'));
  log(`Source: ${exportSummary.source}`, 'info');
  log(`Tables à importer: ${Object.keys(exportSummary.tables).length}`, 'info');
  log(`Total enregistrements: ${exportSummary.totalRecords}`, 'info');
  
  // Test de connexion
  if (!await testTargetConnection()) {
    log('Arrêt de l\'import - connexion impossible', 'error');
    log('Vérifiez:', 'info');
    log('1. Que le serveur distant est accessible', 'info');
    log('2. Les permissions de la clé API', 'info');
    log('3. Les politiques RLS si nécessaire', 'info');
    process.exit(1);
  }
  
  // Créer le client avec la meilleure clé disponible
  const targetClient = createClient(TARGET_URL, TARGET_SERVICE_KEY);
  
  // Ordre d'import (respect des dépendances)
  const importOrder = [
    'profiles',
    'partners',
    'accommodations',
    'restaurants',
    'leisure_activities',
    'activities',
    'subscriptions',
    'restaurant_reservations',
    'travel_reservations'
  ];
  
  // Import des données
  const results: Record<string, boolean> = {};
  
  for (const tableName of importOrder) {
    if (exportSummary.tables[tableName] && exportSummary.tables[tableName].recordCount > 0) {
      const dataFile = path.join(exportPath, `${tableName}.json`);
      
      if (fs.existsSync(dataFile)) {
        const data = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
        const success = await importTableData(tableName, data, targetClient);
        results[tableName] = success;
      } else {
        log(`Fichier de données manquant: ${dataFile}`, 'error');
        results[tableName] = false;
      }
    } else {
      log(`Table ${tableName} vide ou non exportée`, 'warn');
      results[tableName] = true; // Considéré comme succès
    }
  }
  
  // Rapport final
  const successCount = Object.values(results).filter(Boolean).length;
  const totalCount = Object.keys(results).length;
  
  log('=== RAPPORT D\'IMPORT ===', 'info');
  log(`Tables importées avec succès: ${successCount}/${totalCount}`, 
      successCount === totalCount ? 'success' : 'warn');
  
  if (successCount < totalCount) {
    log('Tables en échec:', 'error');
    Object.entries(results).forEach(([table, success]) => {
      if (!success) {
        log(`  - ${table}`, 'error');
      }
    });
  }
  
  // Sauvegarder le résumé
  await createImportSummary(exportPath, results);
  
  // Instructions de finalisation
  if (successCount === totalCount) {
    log('🎉 Import complètement réussi!', 'success');
    log('Pour basculer l\'application:', 'info');
    log('Mettez à jour le .env avec:', 'info');
    log(`VITE_SUPABASE_URL=${TARGET_URL}`, 'info');
    log(`VITE_SUPABASE_PUBLISHABLE_KEY=${TARGET_ANON_KEY}`, 'info');
    log('', 'info');
    log('Puis redémarrez l\'application: npm run dev', 'info');
  } else {
    log('Import partiellement réussi', 'warn');
    log('Vérifiez les erreurs ci-dessus avant de basculer', 'warn');
  }
  
  process.exit(successCount < totalCount ? 1 : 0);
}

// Exécution
main().catch(error => {
  log(`Erreur fatale: ${error}`, 'error');
  process.exit(1);
});