#!/usr/bin/env node
/**
 * Script de Migration via API REST Supabase
 * ==========================================
 * Migration directe utilisant l'API REST sans client JS
 */

import fs from 'fs';
import path from 'path';

// Configuration
const SOURCE_URL = 'https://psryoyugyimibjhwhvlh.supabase.co';
const SOURCE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzcnlveXVneWltaWJqaHdodmxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4NTM2NDMsImV4cCI6MjA0OTQyOTY0M30.HqVFT7alWrZtjf1cHxeAeqpsWMjVEnnXfVtwesYga-0';

const TARGET_URL = 'http://localhost:8000';
const TARGET_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

// Tables à migrer dans l'ordre
const TABLES_TO_MIGRATE = [
  'profiles',
  'partners',
  'accommodations',
  'restaurants',
  'car_rentals',
  'leisure_activities',
  'activities',
  'accommodation_rooms',
  'travel_packages',
  'subscriptions',
  'accommodation_bookings',
  'restaurant_reservations',
  'car_rental_bookings',
  'activity_bookings',
  'travel_reservations',
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

async function fetchFromSupabase(baseUrl: string, apiKey: string, table: string): Promise<any[]> {
  const url = `${baseUrl}/rest/v1/${table}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'apikey': apiKey,
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    log(`Erreur lors de la récupération de ${table}: ${error}`, 'error');
    return [];
  }
}

async function insertToSupabase(baseUrl: string, apiKey: string, table: string, data: any[]): Promise<boolean> {
  if (data.length === 0) {
    return true; // Rien à insérer
  }
  
  const url = `${baseUrl}/rest/v1/${table}`;
  
  try {
    // D'abord, essayer de supprimer les données existantes
    await fetch(url + '?id=neq.00000000-0000-0000-0000-000000000000', {
      method: 'DELETE',
      headers: {
        'apikey': apiKey,
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    // Puis insérer les nouvelles données
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'apikey': apiKey,
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=ignore-duplicates'
      },
      body: JSON.stringify(data)
    });
    
    return response.ok || response.status === 409; // 409 = conflit (duplicate), on considère OK
  } catch (error) {
    log(`Erreur lors de l'insertion dans ${table}: ${error}`, 'error');
    return false;
  }
}

async function testConnection(baseUrl: string, apiKey: string, name: string): Promise<boolean> {
  try {
    const response = await fetch(`${baseUrl}/rest/v1/`, {
      method: 'GET',
      headers: {
        'apikey': apiKey,
        'Authorization': `Bearer ${apiKey}`
      }
    });
    
    if (response.ok) {
      log(`Connexion ${name} OK`, 'success');
      return true;
    } else {
      log(`Connexion ${name} échouée: HTTP ${response.status}`, 'error');
      return false;
    }
  } catch (error) {
    log(`Erreur connexion ${name}: ${error}`, 'error');
    return false;
  }
}

async function migrateTable(table: string): Promise<boolean> {
  log(`Migration de la table: ${table}`, 'info');
  
  // Récupérer les données de la source
  const sourceData = await fetchFromSupabase(SOURCE_URL, SOURCE_KEY, table);
  
  if (sourceData.length === 0) {
    log(`Table ${table} vide ou inaccessible`, 'warn');
    return true;
  }
  
  log(`${sourceData.length} enregistrements trouvés`, 'info');
  
  // Insérer dans la cible
  const success = await insertToSupabase(TARGET_URL, TARGET_KEY, table, sourceData);
  
  if (success) {
    log(`Table ${table} migrée avec succès`, 'success');
    return true;
  } else {
    log(`Échec de la migration de ${table}`, 'error');
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
  
  log('Création de la sauvegarde...', 'info');
  
  for (const table of TABLES_TO_MIGRATE) {
    const data = await fetchFromSupabase(SOURCE_URL, SOURCE_KEY, table);
    if (data.length > 0) {
      backupData[table] = data;
      log(`Sauvegarde ${table}: ${data.length} enregistrements`, 'info');
    }
  }
  
  const backupFile = path.join(backupDir, `backup-api-${timestamp}.json`);
  fs.writeFileSync(backupFile, JSON.stringify(backupData, null, 2));
  log(`Sauvegarde créée: ${backupFile}`, 'success');
}

async function main() {
  log('=== MIGRATION VIA API REST SUPABASE ===', 'info');
  log(`Source: ${SOURCE_URL}`, 'info');
  log(`Cible: ${TARGET_URL}`, 'info');
  
  // Tester les connexions
  log('Test des connexions...', 'info');
  const sourceOk = await testConnection(SOURCE_URL, SOURCE_KEY, 'source');
  const targetOk = await testConnection(TARGET_URL, TARGET_KEY, 'cible');
  
  if (!sourceOk) {
    log('Connexion source impossible', 'error');
    process.exit(1);
  }
  
  // Si la cible ne fonctionne pas, on continue quand même avec une sauvegarde
  if (!targetOk) {
    log('Connexion cible échouée - création de sauvegarde locale uniquement', 'warn');
    await createBackup();
    log('Sauvegarde créée. Vous pourrez importer les données plus tard.', 'info');
    process.exit(0);
  }
  
  // Créer une sauvegarde
  await createBackup();
  
  // Migrer les tables
  let successCount = 0;
  let failCount = 0;
  
  for (const table of TABLES_TO_MIGRATE) {
    const success = await migrateTable(table);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }
  
  // Rapport final
  log('=== RAPPORT DE MIGRATION ===', 'info');
  log(`Tables migrées: ${successCount}/${TABLES_TO_MIGRATE.length}`, 
      successCount === TABLES_TO_MIGRATE.length ? 'success' : 'warn');
  
  if (failCount > 0) {
    log(`${failCount} tables en échec`, 'error');
  }
  
  if (successCount === TABLES_TO_MIGRATE.length) {
    log('Migration complètement réussie!', 'success');
    log('Pour basculer l\'application:', 'info');
    log('VITE_SUPABASE_URL=http://localhost:8000', 'info');
  }
  
  process.exit(failCount > 0 ? 1 : 0);
}

// Exécution
main().catch(error => {
  log(`Erreur fatale: ${error}`, 'error');
  process.exit(1);
});