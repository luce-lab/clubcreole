#!/usr/bin/env node
/**
 * Script d'Import des Données Sauvegardées
 * ========================================
 * Importe les données depuis un fichier de sauvegarde JSON vers Supabase Local
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { parse } from 'path';

// Configuration de la cible (Supabase Local)
const TARGET_URL = process.env.TARGET_SUPABASE_URL || 'http://localhost:8000';
const TARGET_SERVICE_KEY = process.env.TARGET_SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';

// Créer le client Supabase avec la service key pour contourner RLS
const targetClient = createClient(TARGET_URL, TARGET_SERVICE_KEY);

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

async function importTable(tableName: string, data: any[]): Promise<boolean> {
  if (!data || data.length === 0) {
    log(`Table ${tableName} vide, rien à importer`, 'warn');
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
    
    // Insérer les données par batch de 100
    const batchSize = 100;
    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize);
      
      const { error: insertError } = await targetClient
        .from(tableName)
        .insert(batch);
      
      if (insertError) {
        log(`Erreur insertion batch ${i}-${i + batch.length} dans ${tableName}: ${insertError.message}`, 'error');
        
        // Essayer ligne par ligne en cas d'erreur de batch
        for (const row of batch) {
          const { error: singleError } = await targetClient
            .from(tableName)
            .insert(row);
          
          if (singleError) {
            log(`  Impossible d'insérer l'enregistrement ID ${row.id}: ${singleError.message}`, 'error');
          }
        }
      } else {
        log(`  Batch ${i}-${i + batch.length} importé`, 'info');
      }
    }
    
    // Vérifier le nombre final
    const { count } = await targetClient
      .from(tableName)
      .select('*', { count: 'exact', head: true });
    
    if (count === data.length) {
      log(`Table ${tableName} importée avec succès (${count} enregistrements)`, 'success');
      return true;
    } else {
      log(`Import partiel pour ${tableName}: ${count}/${data.length} enregistrements`, 'warn');
      return true;
    }
    
  } catch (error) {
    log(`Erreur inattendue pour ${tableName}: ${error}`, 'error');
    return false;
  }
}

async function testConnection(): Promise<boolean> {
  log('Test de connexion à Supabase Local...', 'info');
  
  try {
    // Test avec la service key qui devrait toujours fonctionner
    const { error } = await targetClient
      .from('restaurants')
      .select('id')
      .limit(1);
    
    if (error) {
      log(`Erreur connexion: ${error.message}`, 'error');
      log('Vérifiez que Docker Compose est en cours d\'exécution', 'info');
      log('Commande: docker compose -f docker-compose.supabase.yml ps', 'info');
      return false;
    }
    
    log('Connexion OK', 'success');
    return true;
    
  } catch (error) {
    log(`Erreur test connexion: ${error}`, 'error');
    return false;
  }
}

async function findLatestBackup(): Promise<string | null> {
  const backupDir = './migration-backups';
  
  if (!fs.existsSync(backupDir)) {
    log('Dossier de sauvegarde introuvable', 'error');
    return null;
  }
  
  const files = fs.readdirSync(backupDir)
    .filter(f => f.startsWith('backup-api-') && f.endsWith('.json'))
    .sort()
    .reverse();
  
  if (files.length === 0) {
    log('Aucun fichier de sauvegarde trouvé', 'error');
    return null;
  }
  
  return path.join(backupDir, files[0]);
}

async function main() {
  log('=== IMPORT DES DONNÉES SAUVEGARDÉES ===', 'info');
  log(`Cible: ${TARGET_URL}`, 'info');
  
  // Trouver le fichier de sauvegarde
  const backupFile = process.argv[2] || await findLatestBackup();
  
  if (!backupFile) {
    log('Usage: npx tsx import-backup-data.ts [fichier-backup.json]', 'error');
    process.exit(1);
  }
  
  if (!fs.existsSync(backupFile)) {
    log(`Fichier introuvable: ${backupFile}`, 'error');
    process.exit(1);
  }
  
  log(`Fichier de sauvegarde: ${backupFile}`, 'info');
  
  // Tester la connexion
  if (!await testConnection()) {
    log('Connexion impossible', 'error');
    log('Assurez-vous que:', 'info');
    log('1. Docker Compose est démarré', 'info');
    log('2. Les services Supabase sont en cours d\'exécution', 'info');
    log('3. Le port 8000 est accessible', 'info');
    process.exit(1);
  }
  
  // Charger les données
  log('Chargement des données...', 'info');
  let backupData: any;
  
  try {
    const content = fs.readFileSync(backupFile, 'utf-8');
    backupData = JSON.parse(content);
    log('Données chargées avec succès', 'success');
  } catch (error) {
    log(`Erreur lecture fichier: ${error}`, 'error');
    process.exit(1);
  }
  
  // Ordre d'import respectant les dépendances
  const importOrder = [
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
  
  // Importer chaque table
  let successCount = 0;
  let failCount = 0;
  const skippedTables: string[] = [];
  
  for (const table of importOrder) {
    if (backupData[table]) {
      const success = await importTable(table, backupData[table]);
      if (success) {
        successCount++;
      } else {
        failCount++;
      }
    } else {
      skippedTables.push(table);
    }
  }
  
  // Rapport final
  log('=== RAPPORT D\'IMPORT ===', 'info');
  log(`Tables importées: ${successCount}`, 'success');
  
  if (failCount > 0) {
    log(`Tables en échec: ${failCount}`, 'error');
  }
  
  if (skippedTables.length > 0) {
    log(`Tables non trouvées dans la sauvegarde: ${skippedTables.join(', ')}`, 'warn');
  }
  
  if (successCount > 0) {
    log('Import réussi!', 'success');
    log('Pour utiliser la base locale, mettez à jour le .env:', 'info');
    log('VITE_SUPABASE_URL=http://localhost:8000', 'info');
    log('VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0', 'info');
  }
  
  process.exit(failCount > 0 ? 1 : 0);
}

// Exécution
main().catch(error => {
  log(`Erreur fatale: ${error}`, 'error');
  process.exit(1);
});