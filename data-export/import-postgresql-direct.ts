#!/usr/bin/env node
/**
 * Import PostgreSQL Direct vers GuadaJobServices
 * ==============================================
 * Import via connexion PostgreSQL directe
 */

import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

// Configuration base de données
const DB_CONFIG = {
  host: 'guadajobservices.fr',
  port: 5432,
  database: 'postgres',
  username: 'postgres',
  password: 'f2IXGmb97vF8GiUT7EVFFfp0W85vAytI'
};

function log(message: string, level: 'info' | 'success' | 'error' | 'warn' = 'info') {
  const timestamp = new Date().toISOString();
  const symbols = { info: '📋', success: '✅', error: '❌', warn: '⚠️' };
  console.log(`[${timestamp}] ${symbols[level]} ${message}`);
}

function executeSQL(sqlCommand: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const connectionString = `postgresql://${DB_CONFIG.username}:${DB_CONFIG.password}@${DB_CONFIG.host}:${DB_CONFIG.port}/${DB_CONFIG.database}`;
    
    const psql = spawn('psql', [connectionString, '-c', sqlCommand], {
      stdio: ['pipe', 'pipe', 'pipe'],
      env: { ...process.env, PGPASSWORD: DB_CONFIG.password }
    });
    
    let stdout = '';
    let stderr = '';
    
    psql.stdout.on('data', (data) => {
      stdout += data.toString();
    });
    
    psql.stderr.on('data', (data) => {
      stderr += data.toString();
    });
    
    psql.on('close', (code) => {
      if (code === 0) {
        resolve(stdout);
      } else {
        reject(new Error(`psql failed with code ${code}: ${stderr}`));
      }
    });
  });
}

async function testConnection(): Promise<boolean> {
  log('Test de connexion PostgreSQL direct...', 'info');
  
  try {
    const result = await executeSQL('SELECT version();');
    log('✅ Connexion PostgreSQL réussie', 'success');
    log(`Version: ${result.split('\n')[2]?.trim()}`, 'info');
    return true;
  } catch (error) {
    log(`❌ Erreur connexion: ${error}`, 'error');
    return false;
  }
}

async function importSQLFile(filePath: string): Promise<boolean> {
  log(`Import du fichier SQL: ${filePath}`, 'info');
  
  if (!fs.existsSync(filePath)) {
    log(`Fichier SQL introuvable: ${filePath}`, 'error');
    return false;
  }
  
  try {
    const connectionString = `postgresql://${DB_CONFIG.username}:${DB_CONFIG.password}@${DB_CONFIG.host}:${DB_CONFIG.port}/${DB_CONFIG.database}`;
    
    return new Promise((resolve, reject) => {
      const psql = spawn('psql', [connectionString, '-f', filePath], {
        stdio: ['pipe', 'pipe', 'pipe'],
        env: { ...process.env, PGPASSWORD: DB_CONFIG.password }
      });
      
      let stdout = '';
      let stderr = '';
      
      psql.stdout.on('data', (data) => {
        const output = data.toString();
        stdout += output;
        // Afficher les messages importants en temps réel
        if (output.includes('INSERT') || output.includes('TRUNCATE') || output.includes('ERROR')) {
          process.stdout.write(output);
        }
      });
      
      psql.stderr.on('data', (data) => {
        stderr += data.toString();
        process.stderr.write(data);
      });
      
      psql.on('close', (code) => {
        if (code === 0) {
          log('✅ Import SQL terminé avec succès', 'success');
          resolve(true);
        } else {
          log(`❌ Import SQL échoué avec code ${code}`, 'error');
          if (stderr) {
            log(`Erreurs: ${stderr}`, 'error');
          }
          resolve(false);
        }
      });
    });
    
  } catch (error) {
    log(`❌ Erreur lors de l'import: ${error}`, 'error');
    return false;
  }
}

async function verifyImport(): Promise<void> {
  log('Vérification de l\'import...', 'info');
  
  const verificationSQL = `
    SELECT 'partners' as table_name, COUNT(*) as count FROM partners
    UNION ALL
    SELECT 'accommodations', COUNT(*) FROM accommodations
    UNION ALL
    SELECT 'restaurants', COUNT(*) FROM restaurants
    UNION ALL
    SELECT 'leisure_activities', COUNT(*) FROM leisure_activities
    UNION ALL
    SELECT 'activities', COUNT(*) FROM activities
    UNION ALL
    SELECT 'restaurant_reservations', COUNT(*) FROM restaurant_reservations
    UNION ALL
    SELECT 'travel_reservations', COUNT(*) FROM travel_reservations;
  `;
  
  try {
    const result = await executeSQL(verificationSQL);
    log('📊 Résultats de la vérification:', 'info');
    console.log(result);
    
    // Vérifier les comptages attendus
    const expectedCounts = {
      'partners': 12,
      'accommodations': 15,
      'restaurants': 43,
      'leisure_activities': 1,
      'activities': 11,
      'restaurant_reservations': 12,
      'travel_reservations': 2
    };
    
    const lines = result.split('\n').filter(line => line.includes('|'));
    let allCorrect = true;
    
    for (const line of lines) {
      const parts = line.split('|').map(p => p.trim());
      if (parts.length >= 2) {
        const tableName = parts[0];
        const count = parseInt(parts[1]) || 0;
        const expected = expectedCounts[tableName as keyof typeof expectedCounts];
        
        if (expected !== undefined) {
          if (count === expected) {
            log(`✅ ${tableName}: ${count}/${expected} ✓`, 'success');
          } else {
            log(`❌ ${tableName}: ${count}/${expected} ✗`, 'error');
            allCorrect = false;
          }
        }
      }
    }
    
    if (allCorrect) {
      log('🎉 Toutes les données ont été importées correctement!', 'success');
    } else {
      log('⚠️ Certaines données manquent ou sont incorrectes', 'warn');
    }
    
  } catch (error) {
    log(`❌ Erreur lors de la vérification: ${error}`, 'error');
  }
}

async function main() {
  log('=== IMPORT POSTGRESQL DIRECT ===', 'info');
  log(`Serveur: ${DB_CONFIG.host}:${DB_CONFIG.port}`, 'info');
  log(`Base: ${DB_CONFIG.database}`, 'info');
  log(`Utilisateur: ${DB_CONFIG.username}`, 'info');
  
  // Test de connexion
  if (!await testConnection()) {
    log('❌ Impossible de se connecter à la base de données', 'error');
    process.exit(1);
  }
  
  // Import du fichier SQL
  const sqlFile = 'export-2025-10-26T10-34-45-320Z/dump.sql';
  const success = await importSQLFile(sqlFile);
  
  if (success) {
    // Vérification
    await verifyImport();
    
    log('🎉 Migration complète!', 'success');
    log('Vous pouvez maintenant configurer votre application:', 'info');
    log('VITE_SUPABASE_URL=https://supabase.guadajobservices.fr/', 'info');
    log('VITE_SUPABASE_PUBLISHABLE_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...', 'info');
  } else {
    log('❌ Échec de l\'import', 'error');
    process.exit(1);
  }
}

// Exécution
main().catch(error => {
  log(`❌ Erreur fatale: ${error}`, 'error');
  process.exit(1);
});