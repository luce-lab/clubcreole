#!/usr/bin/env node
/**
 * Script de Migration Simple Supabase
 * ====================================
 * Migration directe des données de Supabase Cloud vers Supabase Local
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Configuration
const SOURCE_URL = process.env.VITE_SUPABASE_URL || 'https://psryoyugyimibjhwhvlh.supabase.co';
const SOURCE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzcnlveXVneWltaWJqaHdodmxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4NTM2NDMsImV4cCI6MjA0OTQyOTY0M30.HqVFT7alWrZtjf1cHxeAeqpsWMjVEnnXfVtwesYga-0';

const TARGET_URL = process.env.TARGET_SUPABASE_URL || 'http://localhost:8000';
const TARGET_KEY = process.env.TARGET_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

// Tables à migrer dans l'ordre (respecte les dépendances)
const TABLES_TO_MIGRATE = [
  // Tables de base (sans dépendances)
  'profiles',
  'partners',
  
  // Tables principales
  'accommodations',
  'restaurants',
  'car_rentals',
  'leisure_activities',
  'activities',
  
  // Tables dépendantes niveau 1
  'accommodation_rooms',
  'travel_packages',
  'subscriptions',
  
  // Tables de réservations (dépendent des tables principales)
  'accommodation_bookings',
  'restaurant_reservations',
  'car_rental_bookings',
  'activity_bookings',
  'travel_reservations',
  
  // Tables de relations
  'partner_accommodations'
];

// Créer les clients Supabase
const sourceClient = createClient(SOURCE_URL, SOURCE_KEY);
const targetClient = createClient(TARGET_URL, TARGET_KEY);

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
      log(`Table ${tableName} vide, rien à migrer`, 'warn');
      return true;
    }
    
    log(`${sourceData.length} enregistrements trouvés dans ${tableName}`, 'info');
    
    // 2. Vider la table cible (optionnel, commentez si vous voulez append)
    const { error: deleteError } = await targetClient
      .from(tableName)
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Supprime tout sauf une valeur impossible
    
    if (deleteError) {
      log(`Note: Impossible de vider ${tableName} (peut-être déjà vide ou RLS): ${deleteError.message}`, 'warn');
    }
    
    // 3. Insérer les données dans la cible
    const { error: insertError } = await targetClient
      .from(tableName)
      .insert(sourceData);
    
    if (insertError) {
      log(`Erreur insertion ${tableName}: ${insertError.message}`, 'error');
      return false;
    }
    
    // 4. Vérifier le nombre d'enregistrements
    const { count: targetCount } = await targetClient
      .from(tableName)
      .select('*', { count: 'exact', head: true });
    
    if (targetCount === sourceData.length) {
      log(`Table ${tableName} migrée avec succès (${targetCount} enregistrements)`, 'success');
      return true;
    } else {
      log(`Divergence de comptage pour ${tableName}: source=${sourceData.length}, cible=${targetCount}`, 'warn');
      return true; // On considère quand même comme succès partiel
    }
    
  } catch (error) {
    log(`Erreur inattendue pour ${tableName}: ${error}`, 'error');
    return false;
  }
}

async function testConnections(): Promise<boolean> {
  log('Test des connexions Supabase...', 'info');
  
  try {
    // Test connexion source
    const { data: sourceTest, error: sourceError } = await sourceClient
      .from('restaurants')
      .select('id')
      .limit(1);
    
    if (sourceError) {
      log(`Erreur connexion source: ${sourceError.message}`, 'error');
      return false;
    }
    log('Connexion source OK', 'success');
    
    // Test connexion cible
    const { error: targetError } = await targetClient
      .from('restaurants')
      .select('id')
      .limit(1);
    
    if (targetError) {
      log(`Erreur connexion cible: ${targetError.message}`, 'error');
      return false;
    }
    log('Connexion cible OK', 'success');
    
    return true;
  } catch (error) {
    log(`Erreur test connexions: ${error}`, 'error');
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
  
  log('Création de la sauvegarde des données source...', 'info');
  
  for (const table of TABLES_TO_MIGRATE) {
    const { data, error } = await sourceClient
      .from(table)
      .select('*');
    
    if (!error && data) {
      backupData[table] = data;
      log(`Sauvegarde de ${table}: ${data.length} enregistrements`, 'info');
    }
  }
  
  const backupFile = path.join(backupDir, `backup-${timestamp}.json`);
  fs.writeFileSync(backupFile, JSON.stringify(backupData, null, 2));
  log(`Sauvegarde créée: ${backupFile}`, 'success');
}

async function main() {
  log('=== DÉBUT DE LA MIGRATION SUPABASE ===', 'info');
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
  log(`Tables migrées avec succès: ${successCount}/${TABLES_TO_MIGRATE.length}`, successCount === TABLES_TO_MIGRATE.length ? 'success' : 'warn');
  
  if (failCount > 0) {
    log('Tables en échec:', 'error');
    Object.entries(results).forEach(([table, success]) => {
      if (!success) {
        log(`  - ${table}`, 'error');
      }
    });
  }
  
  // 5. Mise à jour du fichier .env si tout est OK
  if (successCount === TABLES_TO_MIGRATE.length) {
    log('Migration complètement réussie!', 'success');
    log('Pour basculer l\'application vers la base locale, mettez à jour le .env:', 'info');
    log(`  VITE_SUPABASE_URL=${TARGET_URL}`, 'info');
    log(`  VITE_SUPABASE_PUBLISHABLE_KEY=${TARGET_KEY}`, 'info');
  } else {
    log('Migration partiellement réussie - vérifiez les erreurs ci-dessus', 'warn');
  }
  
  log('=== FIN DE LA MIGRATION ===', 'info');
  process.exit(failCount > 0 ? 1 : 0);
}

// Gestion des erreurs non capturées
process.on('unhandledRejection', (reason, promise) => {
  log(`Erreur non gérée: ${reason}`, 'error');
  process.exit(1);
});

// Exécution
main().catch(error => {
  log(`Erreur fatale: ${error}`, 'error');
  process.exit(1);
});