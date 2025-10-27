#!/usr/bin/env node
/**
 * Test du Statut du Serveur Distant
 * =================================
 * Teste différentes méthodes d'accès au serveur
 */

import { createClient } from '@supabase/supabase-js';

const TARGET_URL = 'https://supabase.guadajobservices.fr/';
const TARGET_ANON_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2MTA2OTQ4MCwiZXhwIjo0OTE2NzQzMDgwLCJyb2xlIjoiYW5vbiJ9.XPLr03kTqHVfR3teQNHMmapCyz0ho7xNEfOG-TFS_bw';

function log(message: string, level: 'info' | 'success' | 'error' | 'warn' = 'info') {
  const timestamp = new Date().toISOString();
  const symbols = { info: '📋', success: '✅', error: '❌', warn: '⚠️' };
  console.log(`[${timestamp}] ${symbols[level]} ${message}`);
}

async function testServerStatus() {
  log('=== TEST STATUT SERVEUR DISTANT ===', 'info');
  log(`URL: ${TARGET_URL}`, 'info');
  
  // Test 1: API Health
  log('\n1. Test de l\'API REST...', 'info');
  try {
    const response = await fetch(`${TARGET_URL}rest/v1/`, {
      headers: { 'apikey': TARGET_ANON_KEY }
    });
    
    if (response.ok) {
      log('✅ API REST accessible', 'success');
      const data = await response.text();
      if (data.includes('PostgREST')) {
        log('✅ PostgREST détecté', 'success');
      }
    } else {
      log(`❌ API REST erreur: ${response.status}`, 'error');
    }
  } catch (e) {
    log(`❌ API REST inaccessible: ${e}`, 'error');
  }
  
  // Test 2: Client Supabase
  log('\n2. Test Client Supabase...', 'info');
  const client = createClient(TARGET_URL, TARGET_ANON_KEY);
  
  try {
    // Test d'une requête simple
    const { data, error } = await client
      .from('partners')
      .select('id')
      .limit(1);
    
    if (error) {
      log(`⚠️ Erreur requête: ${error.message}`, 'warn');
      
      // Analyser le type d'erreur
      if (error.message.includes('permission denied')) {
        log('📋 Cause: Permissions insuffisantes (clé anon)', 'info');
        log('📋 Solution: Clé service_role nécessaire pour l\'import', 'info');
      } else if (error.message.includes('relation') && error.message.includes('does not exist')) {
        log('📋 Cause: Table inexistante', 'info');
        log('📋 Solution: Créer les tables ou import complet nécessaire', 'info');
      }
    } else {
      log('✅ Client Supabase fonctionnel', 'success');
      log(`Données trouvées: ${data?.length || 0} enregistrements`, 'info');
    }
  } catch (e) {
    log(`❌ Erreur client: ${e}`, 'error');
  }
  
  // Test 3: Variables d'environnement
  log('\n3. Test Variables d\'environnement...', 'info');
  const serviceKey = process.env.SERVICE_SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_KEY;
  
  if (serviceKey) {
    log('✅ Clé service trouvée dans l\'environnement', 'success');
    
    // Test avec clé service
    const serviceClient = createClient(TARGET_URL, serviceKey);
    try {
      const { data, error } = await serviceClient
        .from('partners')
        .select('id')
        .limit(1);
      
      if (error) {
        log(`⚠️ Clé service échoue: ${error.message}`, 'warn');
      } else {
        log('✅ Clé service fonctionnelle!', 'success');
        log('✅ Import automatique possible', 'success');
      }
    } catch (e) {
      log(`❌ Erreur clé service: ${e}`, 'error');
    }
  } else {
    log('⚠️ Aucune clé service trouvée', 'warn');
    log('📋 Définissez: export SERVICE_SUPABASE_SERVICE_KEY="votre_clé"', 'info');
  }
  
  // Test 4: Tables disponibles
  log('\n4. Exploration des tables...', 'info');
  try {
    const response = await fetch(`${TARGET_URL}rest/v1/`, {
      headers: { 'apikey': TARGET_ANON_KEY }
    });
    
    if (response.ok) {
      const openapi = await response.json();
      const paths = Object.keys(openapi.paths || {});
      const tables = paths
        .filter(path => !path.startsWith('/rpc/'))
        .filter(path => path !== '/')
        .map(path => path.substring(1));
      
      if (tables.length > 0) {
        log(`✅ Tables détectées: ${tables.length}`, 'success');
        tables.forEach(table => log(`  - ${table}`, 'info'));
      } else {
        log('⚠️ Aucune table détectée dans l\'API', 'warn');
      }
    }
  } catch (e) {
    log(`❌ Erreur exploration: ${e}`, 'error');
  }
  
  // Recommandations
  log('\n=== RECOMMANDATIONS ===', 'info');
  log('Pour effectuer l\'import:', 'info');
  log('1. Obtenez la clé service_role de l\'administrateur', 'info');
  log('2. Ou utilisez l\'interface Supabase pour import manuel', 'info');
  log('3. Ou configurez les permissions RLS temporairement', 'info');
  
  log('\nCommandes disponibles:', 'info');
  log('export SERVICE_SUPABASE_SERVICE_KEY="clé" && npx tsx import-direct-guadajob.ts', 'info');
  log('npx tsx validate-import.ts  # Re-tester après import', 'info');
}

// Exécution
testServerStatus().catch(error => {
  log(`Erreur fatale: ${error}`, 'error');
  process.exit(1);
});