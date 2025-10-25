#!/usr/bin/env node
/**
 * Script de Diagnostic de Migration
 * ================================
 * Vérifie l'état complet de la migration Supabase
 */

import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

config();

async function runDiagnostic() {
  console.log('🔍 DIAGNOSTIC DE MIGRATION SUPABASE\n');

  // 1. Variables d'environnement
  console.log('📋 VARIABLES D\'ENVIRONNEMENT:');
  const envVars = {
    'VITE_SUPABASE_URL': process.env.VITE_SUPABASE_URL,
    'VITE_SUPABASE_PUBLISHABLE_KEY': process.env.VITE_SUPABASE_PUBLISHABLE_KEY ? 'DÉFINIE' : 'MANQUANTE',
    'SERVICE_SUPABASE_URL': process.env.SERVICE_SUPABASE_URL,
    'SERVICE_SUPABASE_ANON_KEY': process.env.SERVICE_SUPABASE_ANON_KEY ? 'DÉFINIE' : 'MANQUANTE',
    'SERVICE_SUPABASE_SERVICE_KEY': process.env.SERVICE_SUPABASE_SERVICE_KEY ? 'DÉFINIE' : 'MANQUANTE',
    'SUPABASE_SOURCE_PASSWORD': process.env.SUPABASE_SOURCE_PASSWORD ? 'DÉFINIE' : 'MANQUANTE',
    'SUPABASE_TARGET_PASSWORD': process.env.SUPABASE_TARGET_PASSWORD ? 'DÉFINIE' : 'MANQUANTE'
  };

  Object.entries(envVars).forEach(([key, value]) => {
    const status = value === 'MANQUANTE' ? '❌' : '✅';
    console.log(`  ${status} ${key}: ${value}`);
  });

  // 2. Connectivité source
  console.log('\n🔗 TEST CONNECTIVITÉ SOURCE:');
  try {
    const sourceClient = createClient(
      process.env.VITE_SUPABASE_URL!,
      process.env.VITE_SUPABASE_PUBLISHABLE_KEY!
    );
    
    const { data, error } = await sourceClient.from('profiles').select('count', { count: 'exact', head: true });
    if (error) {
      console.log(`  ❌ Erreur: ${error.message}`);
    } else {
      console.log(`  ✅ Source accessible`);
    }
  } catch (error) {
    console.log(`  ❌ Exception: ${error}`);
  }

  // 3. Connectivité cible
  console.log('\n🎯 TEST CONNECTIVITÉ CIBLE:');
  const targetUrl = process.env.SERVICE_SUPABASE_URL?.replace(/\/$/, '') || 'https://services-supabase.clubcreole.fr';
  const targetKey = process.env.SERVICE_SUPABASE_ANON_KEY;

  if (!targetKey) {
    console.log('  ❌ Clé cible manquante');
  } else {
    try {
      const targetClient = createClient(targetUrl, targetKey);
      const { data, error } = await targetClient.from('profiles').select('count', { count: 'exact', head: true });
      if (error) {
        console.log(`  ❌ Erreur: ${error.message}`);
      } else {
        console.log(`  ✅ Cible accessible`);
      }
    } catch (error) {
      console.log(`  ❌ Exception: ${error}`);
    }
  }

  // 4. État des sauvegardes
  console.log('\n💾 ÉTAT DES SAUVEGARDES:');
  const backupDir = './migration-backups';
  if (fs.existsSync(backupDir)) {
    const extractions = fs.readdirSync(backupDir)
      .filter(name => name.startsWith('extraction_'))
      .sort().reverse();
    
    if (extractions.length > 0) {
      console.log(`  ✅ ${extractions.length} extraction(s) disponible(s)`);
      console.log(`  📅 Plus récente: ${extractions[0]}`);
      
      // Détails de la dernière extraction
      const latestPath = `${backupDir}/${extractions[0]}/extraction_summary.json`;
      if (fs.existsSync(latestPath)) {
        const summary = JSON.parse(fs.readFileSync(latestPath, 'utf8'));
        const totalRecords = Object.values(summary.tables as Record<string, number>)
          .filter(count => count > 0)
          .reduce((sum, count) => sum + count, 0);
        console.log(`  📊 Total enregistrements: ${totalRecords}`);
      }
    } else {
      console.log(`  ⚠️ Aucune extraction trouvée`);
    }
  } else {
    console.log(`  ❌ Répertoire de sauvegarde inexistant`);
  }

  // 5. Scripts disponibles
  console.log('\n🛠️ SCRIPTS DISPONIBLES:');
  const scripts = [
    'test-env-migration.ts',
    'validate-supabase-migration.ts', 
    'extract-supabase-data.ts',
    'migrate-supabase-api.ts',
    'import-extracted-data.ts',
    'update-config.ts',
    'migrate-supabase.sh'
  ];

  scripts.forEach(script => {
    const exists = fs.existsSync(`./scripts/${script}`);
    console.log(`  ${exists ? '✅' : '❌'} ${script}`);
  });

  // 6. Recommandations
  console.log('\n💡 RECOMMANDATIONS:');
  
  if (!process.env.SERVICE_SUPABASE_ANON_KEY) {
    console.log('  🔧 Configurer SERVICE_SUPABASE_ANON_KEY dans .env');
  }
  
  if (!fs.existsSync('./migration-backups')) {
    console.log('  💾 Exécuter: npx vite-node scripts/extract-supabase-data.ts');
  }

  const targetAccessible = targetKey && await testTargetConnectivity(targetUrl, targetKey);
  if (!targetAccessible) {
    console.log('  🚨 Instance cible non accessible - vérifier le déploiement');
    console.log('  📋 Données source extraites et prêtes pour import ultérieur');
  } else {
    console.log('  🚀 Prêt pour migration: npx vite-node scripts/migrate-supabase-api.ts');
  }

  console.log('\n✅ Diagnostic terminé');
}

async function testTargetConnectivity(url: string, key: string): Promise<boolean> {
  try {
    const client = createClient(url, key);
    const { error } = await client.from('profiles').select('count', { count: 'exact', head: true });
    return !error;
  } catch {
    return false;
  }
}

runDiagnostic().catch(console.error);