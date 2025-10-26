#!/usr/bin/env node
/**
 * Script de Test des Connexions Distantes
 * =======================================
 * Teste et diagnostique les connexions aux deux serveurs Supabase
 */

import { createClient } from '@supabase/supabase-js';

// Configuration Source
const SOURCE_URL = 'https://psryoyugyimibjhwhvlh.supabase.co';
const SOURCE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzcnlveXVneWltaWJqaHdodmxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4NTM2NDMsImV4cCI6MjA0OTQyOTY0M30.HqVFT7alWrZtjf1cHxeAeqpsWMjVEnnXfVtwesYga-0';

// Configuration Cible
const TARGET_URL = 'https://supabase.guadajobservices.fr/';
const TARGET_ANON_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2MTA2OTQ4MCwiZXhwIjo0OTE2NzQzMDgwLCJyb2xlIjoiYW5vbiJ9.XPLr03kTqHVfR3teQNHMmapCyz0ho7xNEfOG-TFS_bw';

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

async function testSupabaseConnection(name: string, url: string, key: string): Promise<void> {
  log(`=== TEST ${name.toUpperCase()} ===`, 'info');
  log(`URL: ${url}`, 'info');
  log(`Clé: ${key.substring(0, 20)}...`, 'info');
  
  const client = createClient(url, key);
  
  try {
    // Test 1: Liste des tables disponibles via API REST
    log('Test 1: Connexion de base...', 'info');
    const response = await fetch(`${url}rest/v1/`, {
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`
      }
    });
    
    if (response.ok) {
      log('✅ API REST accessible', 'success');
    } else {
      log(`❌ API REST: HTTP ${response.status}`, 'error');
    }
    
    // Test 2: Tentative de lecture d'une table
    log('Test 2: Lecture des tables...', 'info');
    
    const tables = ['restaurants', 'accommodations', 'partners', 'activities'];
    let accessibleTables = 0;
    
    for (const table of tables) {
      try {
        const { data, error } = await client
          .from(table)
          .select('id')
          .limit(1);
        
        if (error) {
          log(`  ${table}: ${error.message}`, 'error');
        } else {
          log(`  ${table}: OK (${data?.length || 0} enregistrements)`, 'success');
          accessibleTables++;
        }
      } catch (err) {
        log(`  ${table}: Erreur ${err}`, 'error');
      }
    }
    
    if (accessibleTables > 0) {
      log(`✅ ${accessibleTables}/${tables.length} tables accessibles`, 'success');
    } else {
      log(`❌ Aucune table accessible`, 'error');
    }
    
    // Test 3: Test d'écriture (insertion puis suppression)
    log('Test 3: Test d\'écriture...', 'info');
    try {
      const testData = {
        id: '00000000-0000-0000-0000-000000000001',
        name: 'TEST_MIGRATION_' + Date.now(),
        created_at: new Date().toISOString()
      };
      
      // Essayer d'insérer dans partners (table simple)
      const { error: insertError } = await client
        .from('partners')
        .insert(testData);
      
      if (insertError) {
        log(`  Insertion: ${insertError.message}`, 'error');
      } else {
        log('  Insertion: OK', 'success');
        
        // Supprimer immédiatement
        await client
          .from('partners')
          .delete()
          .eq('id', testData.id);
        
        log('  Suppression: OK', 'success');
        log('✅ Écriture autorisée', 'success');
      }
    } catch (err) {
      log(`  Test d'écriture: ${err}`, 'error');
    }
    
  } catch (error) {
    log(`Erreur globale: ${error}`, 'error');
  }
  
  log('', 'info');
}

async function testDirectAPI(url: string, key: string, name: string): Promise<void> {
  log(`=== TEST API DIRECTE ${name.toUpperCase()} ===`, 'info');
  
  try {
    // Test GET sur restaurants
    const response = await fetch(`${url}rest/v1/restaurants?limit=1`, {
      method: 'GET',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Accept': 'application/json'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      log(`✅ API directe OK - ${Array.isArray(data) ? data.length : 'N/A'} enregistrements`, 'success');
    } else {
      const text = await response.text();
      log(`❌ API directe: HTTP ${response.status} - ${text}`, 'error');
    }
  } catch (error) {
    log(`❌ Erreur API directe: ${error}`, 'error');
  }
  
  log('', 'info');
}

async function main() {
  log('=== DIAGNOSTIC DES CONNEXIONS SUPABASE ===', 'info');
  
  // Test la source (Supabase Cloud)
  await testSupabaseConnection('SOURCE (Supabase Cloud)', SOURCE_URL, SOURCE_KEY);
  await testDirectAPI(SOURCE_URL, SOURCE_KEY, 'SOURCE');
  
  // Test la cible (Serveur distant)
  await testSupabaseConnection('CIBLE (Serveur distant)', TARGET_URL, TARGET_ANON_KEY);
  await testDirectAPI(TARGET_URL, TARGET_ANON_KEY, 'CIBLE');
  
  log('=== DIAGNOSTIC TERMINÉ ===', 'info');
  log('Si la cible n\'est pas accessible en écriture, vérifiez:', 'info');
  log('1. Les politiques RLS (Row Level Security)', 'info');
  log('2. Les permissions de la clé API', 'info');
  log('3. La configuration du serveur Supabase distant', 'info');
}

main().catch(error => {
  log(`Erreur fatale: ${error}`, 'error');
  process.exit(1);
});