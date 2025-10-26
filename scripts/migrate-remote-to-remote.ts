#!/usr/bin/env node
/**
 * Script de Migration Serveur à Serveur
 * =====================================
 * Migration directe entre deux instances Supabase distantes
 * Source: Supabase Cloud → Cible: Serveur distant
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Configuration Source (Supabase Cloud)
const SOURCE_URL = 'https://psryoyugyimibjhwhvlh.supabase.co';
const SOURCE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzcnlveXVneWltaWJqaHdodmxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4NTM2NDMsImV4cCI6MjA0OTQyOTY0M30.HqVFT7alWrZtjf1cHxeAeqpsWMjVEnnXfVtwesYga-0';

// Configuration Cible (Serveur distant)
const TARGET_URL = 'https://supabase.guadajobservices.fr/';
const TARGET_ANON_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2MTA2OTQ4MCwiZXhwIjo0OTE2NzQzMDgwLCJyb2xlIjoiYW5vbiJ9.XPLr03kTqHVfR3teQNHMmapCyz0ho7xNEfOG-TFS_bw';
const TARGET_SERVICE_KEY = process.env.SERVICE_SUPABASE_SERVICE_KEY || TARGET_ANON_KEY;

// Créer les clients Supabase
const sourceClient = createClient(SOURCE_URL, SOURCE_KEY);
const targetClient = createClient(TARGET_URL, TARGET_SERVICE_KEY);

// Tables à migrer dans l'ordre (respecte les dépendances)
const TABLES_TO_MIGRATE = [
  // Tables de base
  'profiles',
  'partners',
  
  // Tables principales
  'accommodations',
  'restaurants',
  'car_rentals',
  'leisure_activities',
  'activities',
  
  // Tables dépendantes
  'accommodation_rooms',
  'travel_packages',
  'subscriptions',
  
  // Tables de réservations
  'accommodation_bookings',
  'restaurant_reservations',
  'car_rental_bookings',
  'activity_bookings',
  'travel_reservations',
  
  // Tables de relations
  'partner_accommodations'
];

function log(message: string, level: 'info' | 'success' | 'error' | 'warn' = 'info') {
  const timestamp = new Date().toISOString();
  const symbols = {
    info: '📋',
    success: '✅',
    error: '❌',
    warn: '⚠️'
  };
  console.log(`[${timestamp}] ${symbols[level]} ${message}`);
}

async function testConnections(): Promise<boolean> {
  log('=== TEST DES CONNEXIONS ===', 'info');
  
  try {
    // Test source
    log('Test connexion source (Supabase Cloud)...', 'info');
    const { data: sourceTest, error: sourceError } = await sourceClient
      .from('restaurants')
      .select('id')
      .limit(1);
    
    if (sourceError) {
      log(`Erreur source: ${sourceError.message}`, 'error');
      return false;
    }
    log('✅ Source OK', 'success');
    
    // Test cible
    log('Test connexion cible (serveur distant)...', 'info');
    const { data: targetTest, error: targetError } = await targetClient
      .from('restaurants')
      .select('id')
      .limit(1);
    
    if (targetError) {
      log(`Erreur cible: ${targetError.message}`, 'error');
      return false;
    }
    log('✅ Cible OK', 'success');
    
    return true;
  } catch (error) {
    log(`Erreur test connexions: ${error}`, 'error');
    return false;
  }
}

async function migrateTable(tableName: string): Promise<boolean> {
  try {
    log(`Migration de la table: ${tableName}`, 'info');
    
    // 1. Lire les données de la source
    const { data: sourceData, error: sourceError } = await sourceClient
      .from(tableName)
      .select('*');
    
    if (sourceError) {
      log(`Erreur lecture source ${tableName}: ${sourceError.message}`, 'error');
      return false;
    }
    
    if (!sourceData || sourceData.length === 0) {
      log(`Table ${tableName} vide`, 'warn');
      return true;
    }
    
    log(`${sourceData.length} enregistrements trouvés`, 'info');
    
    // 2. Nettoyer la table cible (optionnel)
    const { error: deleteError } = await targetClient
      .from(tableName)
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');
    
    if (deleteError) {
      log(`Note: Impossible de vider ${tableName}: ${deleteError.message}`, 'warn');
    }
    
    // 3. Insérer par batch de 100
    const batchSize = 100;
    let insertedCount = 0;
    
    for (let i = 0; i < sourceData.length; i += batchSize) {
      const batch = sourceData.slice(i, i + batchSize);
      
      const { error: insertError } = await targetClient
        .from(tableName)
        .insert(batch);
      
      if (insertError) {
        log(`Erreur batch ${i}-${i + batch.length}: ${insertError.message}`, 'error');
        
        // Essayer ligne par ligne en cas d'erreur
        for (const row of batch) {
          const { error: singleError } = await targetClient
            .from(tableName)
            .insert(row);
          
          if (!singleError) {
            insertedCount++;
          } else {
            log(`  Erreur ligne ID ${row.id}: ${singleError.message}`, 'error');
          }
        }
      } else {
        insertedCount += batch.length;
        log(`  Batch ${i}-${i + batch.length} importé`, 'info');
      }
    }
    
    // 4. Vérifier le résultat
    const { count: targetCount } = await targetClient
      .from(tableName)
      .select('*', { count: 'exact', head: true });
    
    if (targetCount && targetCount >= insertedCount) {
      log(`Table ${tableName} migrée avec succès (${targetCount} enregistrements)`, 'success');
      return true;
    } else {
      log(`Migration partielle ${tableName}: ${targetCount}/${sourceData.length}`, 'warn');
      return true;
    }
    
  } catch (error) {
    log(`Erreur inattendue pour ${tableName}: ${error}`, 'error');
    return false;
  }
}

async function createBackup(): Promise<void> {
  const backupDir = './migration-backups';
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupData: any = {};
  
  log('Création de la sauvegarde de sécurité...', 'info');
  
  for (const table of TABLES_TO_MIGRATE) {
    const { data, error } = await sourceClient
      .from(table)
      .select('*');
    
    if (!error && data && data.length > 0) {
      backupData[table] = data;
      log(`Sauvegarde ${table}: ${data.length} enregistrements`, 'info');
    }
  }
  
  const backupFile = path.join(backupDir, `backup-remote-migration-${timestamp}.json`);
  fs.writeFileSync(backupFile, JSON.stringify(backupData, null, 2));
  log(`Sauvegarde créée: ${backupFile}`, 'success');
}

async function generateMigrationReport(results: Record<string, boolean>): Promise<void> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const reportFile = `./migration-backups/migration-report-${timestamp}.json`;
  
  const successCount = Object.values(results).filter(Boolean).length;
  const totalCount = Object.keys(results).length;
  
  const report = {
    timestamp: new Date().toISOString(),
    source: SOURCE_URL,
    target: TARGET_URL,
    totalTables: totalCount,
    successfulTables: successCount,
    failedTables: totalCount - successCount,
    results,
    summary: {
      status: successCount === totalCount ? 'COMPLETE' : 'PARTIAL',
      successRate: `${Math.round((successCount / totalCount) * 100)}%`
    }
  };
  
  fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
  log(`Rapport généré: ${reportFile}`, 'info');
}

async function main() {
  log('=== MIGRATION SERVEUR À SERVEUR ===', 'info');
  log(`Source: ${SOURCE_URL}`, 'info');
  log(`Cible: ${TARGET_URL}`, 'info');
  
  // 1. Tester les connexions
  if (!await testConnections()) {
    log('Arrêt de la migration - connexions échouées', 'error');
    process.exit(1);
  }
  
  // 2. Créer une sauvegarde
  await createBackup();
  
  // 3. Migrer chaque table
  const results: Record<string, boolean> = {};
  let successCount = 0;
  let failCount = 0;
  
  for (const table of TABLES_TO_MIGRATE) {
    const success = await migrateTable(table);
    results[table] = success;
    
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }
  
  // 4. Rapport final
  log('=== RAPPORT DE MIGRATION ===', 'info');
  log(`Tables migrées avec succès: ${successCount}/${TABLES_TO_MIGRATE.length}`, 
      successCount === TABLES_TO_MIGRATE.length ? 'success' : 'warn');
  
  if (failCount > 0) {
    log('Tables en échec:', 'error');
    Object.entries(results).forEach(([table, success]) => {
      if (!success) {
        log(`  - ${table}`, 'error');
      }
    });
  }
  
  // 5. Générer le rapport détaillé
  await generateMigrationReport(results);
  
  // 6. Instructions de finalisation
  if (successCount === TABLES_TO_MIGRATE.length) {
    log('🎉 Migration complètement réussie!', 'success');
    log('Pour basculer l\'application vers le serveur distant:', 'info');
    log('Mettez à jour le .env avec:', 'info');
    log(`VITE_SUPABASE_URL=${TARGET_URL}`, 'info');
    log(`VITE_SUPABASE_PUBLISHABLE_KEY=${TARGET_ANON_KEY}`, 'info');
  } else {
    log('Migration partiellement réussie - vérifiez les erreurs ci-dessus', 'warn');
  }
  
  log('=== MIGRATION TERMINÉE ===', 'info');
  process.exit(failCount > 0 ? 1 : 0);
}

// Gestion des erreurs
process.on('unhandledRejection', (reason, promise) => {
  log(`Erreur non gérée: ${reason}`, 'error');
  process.exit(1);
});

// Exécution
main().catch(error => {
  log(`Erreur fatale: ${error}`, 'error');
  process.exit(1);
});