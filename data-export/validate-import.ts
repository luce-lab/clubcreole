#!/usr/bin/env node
/**
 * Validation de l'Import GuadaJobServices
 * ====================================== 
 * Vérifie que l'import a été effectué correctement
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Configuration serveur distant
const TARGET_URL = 'https://supabase.guadajobservices.fr/';
const TARGET_ANON_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2MTA2OTQ4MCwiZXhwIjo0OTE2NzQzMDgwLCJyb2xlIjoiYW5vbiJ9.XPLr03kTqHVfR3teQNHMmapCyz0ho7xNEfOG-TFS_bw';

function log(message: string, level: 'info' | 'success' | 'error' | 'warn' = 'info') {
  const timestamp = new Date().toISOString();
  const symbols = { info: '📋', success: '✅', error: '❌', warn: '⚠️' };
  console.log(`[${timestamp}] ${symbols[level]} ${message}`);
}

async function testTableAccess(client: any, tableName: string): Promise<{ accessible: boolean, count: number, error?: string }> {
  try {
    const { data, error } = await client
      .from(tableName)
      .select('id', { count: 'exact' })
      .limit(1);
    
    if (error) {
      return { accessible: false, count: 0, error: error.message };
    }
    
    // Obtenir le count exact
    const { count, error: countError } = await client
      .from(tableName)
      .select('*', { count: 'exact', head: true });
    
    if (countError) {
      return { accessible: true, count: 0, error: countError.message };
    }
    
    return { accessible: true, count: count || 0 };
  } catch (e) {
    return { accessible: false, count: 0, error: String(e) };
  }
}

async function validateImport() {
  log('=== VALIDATION DE L\'IMPORT ===', 'info');
  log(`Serveur: ${TARGET_URL}`, 'info');
  
  // Charger les comptages attendus
  const exportPath = 'export-2025-10-26T10-34-45-320Z';
  const summaryFile = path.join(exportPath, 'export-summary.json');
  
  if (!fs.existsSync(summaryFile)) {
    log(`Fichier résumé introuvable: ${summaryFile}`, 'error');
    return;
  }
  
  const exportSummary = JSON.parse(fs.readFileSync(summaryFile, 'utf-8'));
  const expectedCounts = Object.entries(exportSummary.tables).reduce((acc, [table, info]: [string, any]) => {
    acc[table] = info.recordCount;
    return acc;
  }, {} as Record<string, number>);
  
  log('Comptages attendus:', 'info');
  Object.entries(expectedCounts).forEach(([table, count]) => {
    log(`  ${table}: ${count} enregistrements`, 'info');
  });
  
  // Test de connexion
  const client = createClient(TARGET_URL, TARGET_ANON_KEY);
  
  log('\nVérification des tables...', 'info');
  
  const results: Record<string, { accessible: boolean, count: number, expected: number, error?: string }> = {};
  let totalSuccess = 0;
  let totalErrors = 0;
  
  // Tester chaque table
  for (const [tableName, expectedCount] of Object.entries(expectedCounts)) {
    const result = await testTableAccess(client, tableName);
    results[tableName] = {
      ...result,
      expected: expectedCount
    };
    
    if (!result.accessible) {
      log(`❌ ${tableName}: Inaccessible - ${result.error}`, 'error');
      totalErrors++;
    } else if (result.count === expectedCount) {
      log(`✅ ${tableName}: ${result.count}/${expectedCount} ✓`, 'success');
      totalSuccess++;
    } else if (result.count === 0 && expectedCount === 0) {
      log(`✅ ${tableName}: Vide comme attendu ✓`, 'success');
      totalSuccess++;
    } else {
      log(`⚠️ ${tableName}: ${result.count}/${expectedCount} - Comptage différent`, 'warn');
      totalErrors++;
    }
  }
  
  // Rapport final
  log('\n=== RAPPORT DE VALIDATION ===', 'info');
  log(`Tables validées: ${totalSuccess}/${Object.keys(expectedCounts).length}`, 
      totalSuccess === Object.keys(expectedCounts).length ? 'success' : 'warn');
  
  if (totalErrors > 0) {
    log(`Erreurs détectées: ${totalErrors}`, 'error');
    log('\nDétails des erreurs:', 'error');
    Object.entries(results).forEach(([table, result]) => {
      if (!result.accessible || result.count !== result.expected) {
        log(`  ${table}: ${result.error || `${result.count}/${result.expected}`}`, 'error');
      }
    });
  }
  
  // Instructions selon le résultat
  if (totalSuccess === Object.keys(expectedCounts).length) {
    log('\n🎉 VALIDATION RÉUSSIE!', 'success');
    log('Toutes les données ont été importées correctement', 'success');
    log('Vous pouvez maintenant configurer votre application:', 'info');
    log(`VITE_SUPABASE_URL=${TARGET_URL}`, 'info');
    log(`VITE_SUPABASE_PUBLISHABLE_KEY=${TARGET_ANON_KEY}`, 'info');
  } else if (totalSuccess > 0) {
    log('\n⚠️ VALIDATION PARTIELLE', 'warn');
    log('Certaines données sont présentes mais incomplètes', 'warn');
    log('Vérifiez les erreurs ci-dessus et relancez l\'import si nécessaire', 'warn');
  } else {
    log('\n❌ VALIDATION ÉCHOUÉE', 'error');
    log('Aucune donnée trouvée - l\'import n\'a pas été effectué', 'error');
    log('Utilisez les instructions d\'import manuel:', 'info');
    log('- Interface Supabase: https://supabase.guadajobservices.fr', 'info');
    log('- Ou obtenez la clé service_role pour l\'import automatique', 'info');
  }
  
  // Générer rapport JSON
  const reportPath = path.join(exportPath, 'validation-report.json');
  const report = {
    timestamp: new Date().toISOString(),
    target: TARGET_URL,
    totalTables: Object.keys(expectedCounts).length,
    successCount: totalSuccess,
    errorCount: totalErrors,
    isValid: totalSuccess === Object.keys(expectedCounts).length,
    results
  };
  
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  log(`\nRapport de validation sauvé: ${reportPath}`, 'info');
}

// Exécution
validateImport().catch(error => {
  log(`Erreur fatale: ${error}`, 'error');
  process.exit(1);
});