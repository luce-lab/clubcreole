#!/usr/bin/env node
/**
 * Script de Test - Variables Environnement Migration
 * =================================================
 * Teste la détection automatique des variables d'environnement
 * pour la migration Supabase
 */

import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables from .env file
config();

console.log('🚀 Starting environment migration test...');

interface EnvConfig {
  source: {
    url?: string;
    key?: string;
  };
  target: {
    url?: string;
    key?: string;
    serviceKey?: string;
  };
}

class EnvMigrationTester {
  private envConfig: EnvConfig = {
    source: {},
    target: {}
  };

  private log(message: string, level: 'info' | 'warn' | 'error' | 'success' = 'info') {
    const symbols = {
      info: '🔍',
      warn: '⚠️',
      error: '❌',
      success: '✅'
    };
    
    console.log(`${symbols[level]} ${message}`);
  }

  // Lecture et analyse des variables d'environnement
  detectEnvironmentVariables(): void {
    this.log('Détection des variables d\'environnement...');

    // Variables source (cloud actuel)
    this.envConfig.source = {
      url: process.env.VITE_SUPABASE_URL,
      key: process.env.VITE_SUPABASE_PUBLISHABLE_KEY
    };

    // Variables cible (auto-hébergé)
    this.envConfig.target = {
      url: process.env.SUPABASE_TARGET_URL, // Explicite
      key: process.env.SERVICE_SUPABASE_ANON_KEY, // Depuis .env
      serviceKey: process.env.SERVICE_SUPABASE_SERVICE_KEY // Service role key
    };

    // Auto-détection URL cible si pas explicite
    if (!this.envConfig.target.url && this.envConfig.target.key) {
      // Déduction basée sur la présence des clés SERVICE_*
      this.envConfig.target.url = 'https://services-supabase.clubcreole.fr';
      this.log('URL cible auto-détectée depuis les clés SERVICE_*', 'info');
    }
  }

  // Validation de la configuration détectée
  validateConfiguration(): boolean {
    this.log('\nValidation de la configuration...');
    
    let isValid = true;

    // Validation source
    if (!this.envConfig.source.url) {
      this.log('URL source manquante (VITE_SUPABASE_URL)', 'error');
      isValid = false;
    } else {
      this.log(`URL source: ${this.envConfig.source.url}`, 'success');
    }

    if (!this.envConfig.source.key) {
      this.log('Clé source manquante (VITE_SUPABASE_PUBLISHABLE_KEY)', 'error');
      isValid = false;
    } else {
      this.log(`Clé source: ${this.envConfig.source.key.substring(0, 20)}...`, 'success');
    }

    // Validation cible
    if (!this.envConfig.target.url) {
      this.log('URL cible manquante', 'error');
      isValid = false;
    } else {
      this.log(`URL cible: ${this.envConfig.target.url}`, 'success');
    }

    if (!this.envConfig.target.key) {
      this.log('Clé cible manquante (SERVICE_SUPABASE_ANON_KEY)', 'error');
      isValid = false;
    } else {
      this.log(`Clé cible: ${this.envConfig.target.key.substring(0, 20)}...`, 'success');
    }

    if (!this.envConfig.target.serviceKey) {
      this.log('Clé service manquante (SERVICE_SUPABASE_SERVICE_KEY)', 'warn');
    } else {
      this.log(`Clé service: ${this.envConfig.target.serviceKey.substring(0, 20)}...`, 'success');
    }

    return isValid;
  }

  // Test des URLs commentées dans client.ts
  analyzeClientConfiguration(): void {
    this.log('\nAnalyse de la configuration client.ts...');
    
    const clientPath = path.join(process.cwd(), 'src/integrations/supabase/client.ts');
    
    if (!fs.existsSync(clientPath)) {
      this.log('Fichier client.ts non trouvé', 'error');
      return;
    }

    const content = fs.readFileSync(clientPath, 'utf8');
    
    // Extraction des URLs commentées
    const urlPattern = /\/\/ const SUPABASE_URL = "([^"]+)"/g;
    const commentedUrls: string[] = [];
    let match;
    
    while ((match = urlPattern.exec(content)) !== null) {
      commentedUrls.push(match[1]);
    }

    this.log(`URLs commentées trouvées: ${commentedUrls.length}`);
    commentedUrls.forEach((url, index) => {
      this.log(`  ${index + 1}. ${url}`, 'info');
    });

    // Vérification de correspondance avec la cible détectée
    if (this.envConfig.target.url && commentedUrls.includes(this.envConfig.target.url)) {
      this.log(`URL cible correspond à une URL commentée`, 'success');
    } else {
      this.log(`URL cible ne correspond à aucune URL commentée`, 'warn');
    }
  }

  // Génération d'un rapport de configuration
  generateConfigReport(): void {
    this.log('\n📊 RAPPORT DE CONFIGURATION');
    
    console.log('\n=== CONFIGURATION DÉTECTÉE ===');
    console.log(`Source (Cloud actuel):`);
    console.log(`  URL: ${this.envConfig.source.url || 'NON DÉFINIE'}`);
    console.log(`  Clé: ${this.envConfig.source.key ? 'PRÉSENTE' : 'MANQUANTE'}`);
    
    console.log(`\nCible (Auto-hébergé):`);
    console.log(`  URL: ${this.envConfig.target.url || 'NON DÉFINIE'}`);
    console.log(`  Clé Anon: ${this.envConfig.target.key ? 'PRÉSENTE' : 'MANQUANTE'}`);
    console.log(`  Clé Service: ${this.envConfig.target.serviceKey ? 'PRÉSENTE' : 'MANQUANTE'}`);

    console.log('\n=== VARIABLES D\'ENVIRONNEMENT ===');
    const envVars = [
      'VITE_SUPABASE_URL',
      'VITE_SUPABASE_PUBLISHABLE_KEY',
      'SERVICE_SUPABASE_ANON_KEY',
      'SERVICE_SUPABASE_SERVICE_KEY',
      'SUPABASE_TARGET_URL'
    ];

    envVars.forEach(varName => {
      const value = process.env[varName];
      console.log(`  ${varName}: ${value ? 'DÉFINIE' : 'NON DÉFINIE'}`);
    });

    console.log('\n=== COMMANDES RECOMMANDÉES ===');
    
    if (this.validateConfiguration()) {
      console.log('✅ Configuration complète - Prêt pour migration');
      console.log('\nCommandes de migration:');
      console.log('  # Test de validation');
      console.log('  npx vite-node scripts/validate-supabase-migration.ts');
      console.log('');
      console.log('  # Mise à jour de configuration');
      console.log('  npx vite-node scripts/update-config.ts');
      console.log('');
      console.log('  # Migration complète (nécessite accès PostgreSQL)');
      console.log('  # export SUPABASE_SOURCE_PASSWORD="your_pg_password"');
      console.log('  # export SUPABASE_TARGET_PASSWORD="your_target_pg_password"');
      console.log('  # ./scripts/migrate-supabase.sh');
    } else {
      console.log('❌ Configuration incomplète');
      console.log('\nActions requises:');
      
      if (!this.envConfig.source.url) {
        console.log('  - Définir VITE_SUPABASE_URL dans .env');
      }
      if (!this.envConfig.source.key) {
        console.log('  - Définir VITE_SUPABASE_PUBLISHABLE_KEY dans .env');
      }
      if (!this.envConfig.target.key) {
        console.log('  - Définir SERVICE_SUPABASE_ANON_KEY dans .env');
      }
    }
  }

  // Test complet
  async runTest(): Promise<void> {
    this.log('🚀 Test de Configuration Migration Supabase\n');
    
    this.detectEnvironmentVariables();
    this.validateConfiguration();
    this.analyzeClientConfiguration();
    this.generateConfigReport();
    
    this.log('\n✅ Test terminé');
  }
}

// Fonction principale
async function main() {
  const tester = new EnvMigrationTester();
  await tester.runTest();
}

// Exécution directe pour test
main().catch(console.error);

export { EnvMigrationTester };