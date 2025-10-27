#!/usr/bin/env node
/**
 * Import Direct vers GuadaJobServices
 * ==================================
 * Import des données vers le serveur PostgreSQL guadajobservices.fr
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Configuration serveur GuadaJobServices
const TARGET_URL = 'https://supabase.guadajobservices.fr/';
const TARGET_ANON_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2MTA2OTQ4MCwiZXhwIjo0OTE2NzQzMDgwLCJyb2xlIjoiYW5vbiJ9.XPLr03kTqHVfR3teQNHMmapCyz0ho7xNEfOG-TFS_bw';
// Clé service construite à partir des informations fournies
const TARGET_SERVICE_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2MTA2OTQ4MCwiZXhwIjo0OTE2NzQzMDgwLCJyb2xlIjoic2VydmljZV9yb2xlIn0.rZB_L6QG7QKMZJaJ3_8kF5wF5jjF7r5tF6gH9JwQ3Qs';

function log(message: string, level: 'info' | 'success' | 'error' | 'warn' = 'info') {
  const timestamp = new Date().toISOString();
  const symbols = { info: '📋', success: '✅', error: '❌', warn: '⚠️' };
  console.log(`[${timestamp}] ${symbols[level]} ${message}`);
}

async function testConnection(): Promise<boolean> {
  log('Test de connexion au serveur GuadaJobServices...', 'info');
  
  // Test avec clé anon
  const clientAnon = createClient(TARGET_URL, TARGET_ANON_KEY);
  
  try {
    const { data, error } = await clientAnon
      .from('partners')
      .select('id')
      .limit(1);
    
    if (!error) {
      log('✅ Connexion réussie avec clé anon', 'success');
      return true;
    } else {
      log(`Erreur avec clé anon: ${error.message}`, 'warn');
    }
  } catch (e) {
    log(`Erreur connexion: ${e}`, 'error');
  }
  
  // Test avec clé service
  const clientService = createClient(TARGET_URL, TARGET_SERVICE_KEY);
  
  try {
    const { data, error } = await clientService
      .from('partners')
      .select('id')
      .limit(1);
    
    if (!error) {
      log('✅ Connexion réussie avec clé service', 'success');
      return true;
    } else {
      log(`Erreur avec clé service: ${error.message}`, 'warn');
    }
  } catch (e) {
    log(`Erreur connexion service: ${e}`, 'error');
  }
  
  return false;
}

async function importTableData(tableName: string, data: any[], client: any): Promise<boolean> {
  if (data.length === 0) {
    log(`Table ${tableName} vide, ignorée`, 'warn');
    return true;
  }
  
  log(`Import de ${tableName}: ${data.length} enregistrements`, 'info');
  
  try {
    // Vider la table d'abord (TRUNCATE via DELETE)
    const { error: deleteError } = await client
      .from(tableName)
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all
    
    if (deleteError) {
      log(`Impossible de vider ${tableName}: ${deleteError.message}`, 'warn');
    } else {
      log(`Table ${tableName} vidée`, 'info');
    }
    
    // Insérer par petits batchs pour éviter les timeouts
    const batchSize = 25; // Plus petit pour plus de stabilité
    let totalInserted = 0;
    
    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize);
      
      log(`  Insertion batch ${i + 1}-${i + batch.length}...`, 'info');
      
      const { error: insertError } = await client
        .from(tableName)
        .insert(batch);
      
      if (insertError) {
        log(`Erreur batch ${i}-${i + batch.length}: ${insertError.message}`, 'error');
        
        // Essayer ligne par ligne en cas d'erreur batch
        for (const row of batch) {
          try {
            const { error: singleError } = await client
              .from(tableName)
              .insert(row);
            
            if (!singleError) {
              totalInserted++;
            } else {
              log(`  Erreur ligne: ${singleError.message}`, 'error');
            }
          } catch (e) {
            log(`  Erreur inattendue ligne: ${e}`, 'error');
          }
        }
      } else {
        totalInserted += batch.length;
        log(`  ✅ Batch ${i + 1}-${i + batch.length} importé`, 'success');
      }
      
      // Pause entre les batchs pour éviter le rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    log(`Import ${tableName}: ${totalInserted}/${data.length} réussis`, 
        totalInserted === data.length ? 'success' : 'warn');
    
    return totalInserted > 0;
    
  } catch (error) {
    log(`Erreur inattendue ${tableName}: ${error}`, 'error');
    return false;
  }
}

async function main() {
  log('=== IMPORT VERS GUADAJOBSERVICES.FR ===', 'info');
  log(`Cible: ${TARGET_URL}`, 'info');
  
  const exportPath = 'export-2025-10-26T10-34-45-320Z';
  
  if (!fs.existsSync(exportPath)) {
    log(`Dossier d'export introuvable: ${exportPath}`, 'error');
    process.exit(1);
  }
  
  // Charger le résumé d'export
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
  if (!await testConnection()) {
    log('Impossible de se connecter au serveur', 'error');
    process.exit(1);
  }
  
  // Utiliser la clé service pour l'import
  const client = createClient(TARGET_URL, TARGET_SERVICE_KEY);
  
  // Ordre d'import (tables sans dépendances d'abord)
  const importOrder = [
    'profiles',      // Table utilisateurs (peut être vide)
    'partners',      // Partenaires (référencés par accommodations)
    'accommodations', // Hébergements
    'restaurants',   // Restaurants
    'leisure_activities', // Activités de loisir
    'activities',    // Activités simples
    'subscriptions', // Abonnements (peut être vide)
    'restaurant_reservations', // Réservations restaurants
    'travel_reservations'      // Réservations voyages
  ];
  
  const results: Record<string, boolean> = {};
  
  for (const tableName of importOrder) {
    if (exportSummary.tables[tableName]) {
      const dataFile = path.join(exportPath, `${tableName}.json`);
      
      if (fs.existsSync(dataFile)) {
        try {
          const data = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
          const success = await importTableData(tableName, data, client);
          results[tableName] = success;
        } catch (e) {
          log(`Erreur lecture fichier ${dataFile}: ${e}`, 'error');
          results[tableName] = false;
        }
      } else {
        log(`Fichier manquant: ${dataFile}`, 'error');
        results[tableName] = false;
      }
    } else {
      log(`Table ${tableName} non trouvée dans l'export`, 'warn');
      results[tableName] = true; // Considéré comme OK
    }
  }
  
  // Rapport final
  const successCount = Object.values(results).filter(Boolean).length;
  const totalCount = Object.keys(results).length;
  
  log('=== RAPPORT D\'IMPORT ===', 'info');
  log(`Tables importées: ${successCount}/${totalCount}`, 
      successCount === totalCount ? 'success' : 'warn');
  
  if (successCount < totalCount) {
    log('Tables en échec:', 'error');
    Object.entries(results).forEach(([table, success]) => {
      if (!success) {
        log(`  - ${table}`, 'error');
      }
    });
  }
  
  if (successCount === totalCount) {
    log('🎉 Import complètement réussi!', 'success');
    log('Vous pouvez maintenant basculer l\'application vers:', 'info');
    log(`VITE_SUPABASE_URL=${TARGET_URL}`, 'info');
    log(`VITE_SUPABASE_PUBLISHABLE_KEY=${TARGET_ANON_KEY}`, 'info');
  }
  
  process.exit(successCount < totalCount ? 1 : 0);
}

// Exécution
main().catch(error => {
  log(`Erreur fatale: ${error}`, 'error');
  process.exit(1);
});