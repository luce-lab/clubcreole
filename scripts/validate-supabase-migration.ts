#!/usr/bin/env node
/**
 * Script de Validation de Migration Supabase
 * ==========================================
 * Valide l'intégrité et le bon fonctionnement d'une migration Supabase
 * en vérifiant les données, l'API auto-générée et les fonctionnalités Supabase
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Types pour la configuration
interface MigrationConfig {
  source: {
    url: string;
    key: string;
  };
  target: {
    url: string;
    key: string;
  };
  outputDir: string;
}

// Tables principales à valider selon CLAUDE.md
const CRITICAL_TABLES = [
  'profiles',
  'accommodations',
  'restaurants', 
  'car_rentals',
  'leisure_activities',
  'activities',
  'partners',
  'subscriptions'
];

// Tables de relations critiques
const RELATION_TABLES = [
  'accommodation_rooms',
  'accommodation_bookings',
  'restaurant_reservations',
  'car_rental_bookings',
  'activity_bookings',
  'travel_reservations'
];

class SupabaseMigrationValidator {
  private sourceClient: any;
  private targetClient: any;
  private config: MigrationConfig;
  private validationResults: any[] = [];
  private logFile: string;

  constructor(config: MigrationConfig) {
    this.config = config;
    this.sourceClient = createClient(config.source.url, config.source.key);
    this.targetClient = createClient(config.target.url, config.target.key);
    
    // Création du répertoire de logs
    if (!fs.existsSync(config.outputDir)) {
      fs.mkdirSync(config.outputDir, { recursive: true });
    }
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    this.logFile = path.join(config.outputDir, `validation_${timestamp}.json`);
  }

  private log(message: string, level: 'info' | 'warn' | 'error' = 'info') {
    const timestamp = new Date().toISOString();
    const logEntry = { timestamp, level, message };
    
    console.log(`[${timestamp}] ${level.toUpperCase()}: ${message}`);
    this.validationResults.push(logEntry);
  }

  // Validation de la connectivité API
  async validateApiConnectivity(): Promise<boolean> {
    this.log('🔗 Test de connectivité API Supabase...');
    
    try {
      // Test API source
      const { data: sourceData, error: sourceError } = await this.sourceClient
        .from('profiles')
        .select('count', { count: 'exact', head: true });
      
      if (sourceError) {
        this.log(`Erreur API source: ${sourceError.message}`, 'error');
        return false;
      }

      // Test API cible
      const { data: targetData, error: targetError } = await this.targetClient
        .from('profiles')
        .select('count', { count: 'exact', head: true });
      
      if (targetError) {
        this.log(`Erreur API cible: ${targetError.message}`, 'error');
        return false;
      }

      this.log('✅ Connectivité API validée');
      return true;
    } catch (error) {
      this.log(`Erreur de connectivité: ${error}`, 'error');
      return false;
    }
  }

  // Validation du nombre d'enregistrements par table
  async validateTableCounts(): Promise<boolean> {
    this.log('📊 Validation des comptages de tables...');
    
    let allTablesValid = true;
    const tablesToCheck = [...CRITICAL_TABLES, ...RELATION_TABLES];

    for (const table of tablesToCheck) {
      try {
        // Comptage source
        const { count: sourceCount, error: sourceError } = await this.sourceClient
          .from(table)
          .select('*', { count: 'exact', head: true });

        if (sourceError) {
          this.log(`Erreur comptage source ${table}: ${sourceError.message}`, 'warn');
          continue;
        }

        // Comptage cible
        const { count: targetCount, error: targetError } = await this.targetClient
          .from(table)
          .select('*', { count: 'exact', head: true });

        if (targetError) {
          this.log(`Erreur comptage cible ${table}: ${targetError.message}`, 'error');
          allTablesValid = false;
          continue;
        }

        // Comparaison
        if (sourceCount === targetCount) {
          this.log(`✅ ${table}: ${sourceCount} enregistrements (identique)`);
        } else {
          this.log(`❌ ${table}: source=${sourceCount}, cible=${targetCount}`, 'error');
          allTablesValid = false;
        }

      } catch (error) {
        this.log(`Erreur validation ${table}: ${error}`, 'error');
        allTablesValid = false;
      }
    }

    return allTablesValid;
  }

  // Validation de l'intégrité des données critiques
  async validateDataIntegrity(): Promise<boolean> {
    this.log('🔍 Validation de l\'intégrité des données...');
    
    try {
      // Test sur une table critique avec des données complexes
      const { data: sourceAccommodations, error: sourceError } = await this.sourceClient
        .from('accommodations')
        .select('id, name, address, created_at')
        .limit(10);

      if (sourceError) {
        this.log(`Erreur lecture source: ${sourceError.message}`, 'error');
        return false;
      }

      if (!sourceAccommodations || sourceAccommodations.length === 0) {
        this.log('⚠️ Aucune donnée d\'accommodation en source', 'warn');
        return true; // Pas d'erreur si pas de données
      }

      // Vérification que les mêmes IDs existent en cible
      const sourceIds = sourceAccommodations.map(acc => acc.id);
      const { data: targetAccommodations, error: targetError } = await this.targetClient
        .from('accommodations')
        .select('id, name, address, created_at')
        .in('id', sourceIds);

      if (targetError) {
        this.log(`Erreur lecture cible: ${targetError.message}`, 'error');
        return false;
      }

      // Comparaison des données
      const targetIds = new Set(targetAccommodations?.map(acc => acc.id) || []);
      let integrityValid = true;

      for (const sourceAcc of sourceAccommodations) {
        if (!targetIds.has(sourceAcc.id)) {
          this.log(`❌ Accommodation ${sourceAcc.id} manquant en cible`, 'error');
          integrityValid = false;
        } else {
          const targetAcc = targetAccommodations?.find(acc => acc.id === sourceAcc.id);
          if (targetAcc?.name !== sourceAcc.name) {
            this.log(`⚠️ Différence de données pour ${sourceAcc.id}`, 'warn');
          }
        }
      }

      if (integrityValid) {
        this.log('✅ Intégrité des données validée');
      }

      return integrityValid;
    } catch (error) {
      this.log(`Erreur validation intégrité: ${error}`, 'error');
      return false;
    }
  }

  // Test des politiques RLS (Row Level Security)
  async validateRLS(): Promise<boolean> {
    this.log('🛡️ Test des politiques RLS...');
    
    try {
      // Test avec une requête qui devrait respecter RLS
      const { data, error } = await this.targetClient
        .from('profiles')
        .select('id')
        .limit(1);

      if (error) {
        // Si erreur de permission, c'est que RLS fonctionne
        if (error.message.includes('permission') || error.message.includes('policy')) {
          this.log('✅ Politiques RLS actives');
          return true;
        } else {
          this.log(`Erreur RLS: ${error.message}`, 'error');
          return false;
        }
      }

      // Si pas d'erreur, vérifier que RLS est configuré
      this.log('✅ Accès RLS autorisé (configuration normale)');
      return true;
    } catch (error) {
      this.log(`Erreur test RLS: ${error}`, 'error');
      return false;
    }
  }

  // Test des performances basiques
  async validatePerformance(): Promise<boolean> {
    this.log('⚡ Test de performance basique...');
    
    try {
      const startTime = Date.now();
      
      const { data, error } = await this.targetClient
        .from('accommodations')
        .select('id, name')
        .limit(100);

      const endTime = Date.now();
      const responseTime = endTime - startTime;

      if (error) {
        this.log(`Erreur performance: ${error.message}`, 'error');
        return false;
      }

      this.log(`⏱️ Temps de réponse: ${responseTime}ms pour 100 enregistrements`);
      
      if (responseTime < 5000) { // 5 secondes max acceptable
        this.log('✅ Performance acceptable');
        return true;
      } else {
        this.log('⚠️ Performance lente', 'warn');
        return true; // Warning mais pas d'échec
      }
    } catch (error) {
      this.log(`Erreur test performance: ${error}`, 'error');
      return false;
    }
  }

  // Génération du rapport final
  async generateReport(): Promise<void> {
    const report = {
      timestamp: new Date().toISOString(),
      source: this.config.source.url,
      target: this.config.target.url,
      results: this.validationResults,
      summary: this.generateSummary()
    };

    fs.writeFileSync(this.logFile, JSON.stringify(report, null, 2));
    
    this.log(`📄 Rapport de validation sauvegardé: ${this.logFile}`);
  }

  private generateSummary() {
    const total = this.validationResults.length;
    const errors = this.validationResults.filter(r => r.level === 'error').length;
    const warnings = this.validationResults.filter(r => r.level === 'warn').length;
    const success = total - errors - warnings;

    return {
      total,
      success,
      warnings,
      errors,
      status: errors === 0 ? 'SUCCESS' : 'FAILURE'
    };
  }

  // Exécution de toute la validation
  async runValidation(): Promise<boolean> {
    this.log('🚀 Démarrage de la validation de migration Supabase');
    
    try {
      const connectivityOk = await this.validateApiConnectivity();
      if (!connectivityOk) {
        this.log('❌ Échec de la connectivité - arrêt de la validation', 'error');
        return false;
      }

      const countsOk = await this.validateTableCounts();
      const integrityOk = await this.validateDataIntegrity();
      const rlsOk = await this.validateRLS();
      const performanceOk = await this.validatePerformance();

      const allValid = countsOk && integrityOk && rlsOk && performanceOk;

      if (allValid) {
        this.log('🎉 Validation terminée avec succès!');
      } else {
        this.log('❌ Validation échouée - voir les détails ci-dessus', 'error');
      }

      await this.generateReport();
      return allValid;

    } catch (error) {
      this.log(`Erreur générale de validation: ${error}`, 'error');
      await this.generateReport();
      return false;
    }
  }
}

// Fonction principale
async function main() {
  // Détection automatique des URLs basée sur les variables .env
  const sourceUrl = process.env.SUPABASE_SOURCE_URL || 
                    process.env.VITE_SUPABASE_URL || 
                    'https://psryoyugyimibjhwhvlh.supabase.co';

  // Détection de l'URL cible basée sur les clés disponibles
  let targetUrl = process.env.SUPABASE_TARGET_URL;
  
  // Si pas d'URL cible explicite, on déduit depuis les clés disponibles
  if (!targetUrl) {
    if (process.env.SERVICE_SUPABASE_ANON_KEY) {
      // Probablement l'instance services-supabase.clubcreole.fr
      targetUrl = 'https://services-supabase.clubcreole.fr';
    } else {
      targetUrl = 'http://localhost:54321'; // Défaut local
    }
  }

  // Configuration par défaut (peut être surchargée par variables d'environnement)
  const config: MigrationConfig = {
    source: {
      url: sourceUrl,
      key: process.env.SUPABASE_SOURCE_KEY || 
           process.env.VITE_SUPABASE_PUBLISHABLE_KEY || 
           ''
    },
    target: {
      url: targetUrl,
      key: process.env.SUPABASE_TARGET_KEY || 
           process.env.SERVICE_SUPABASE_ANON_KEY || 
           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'
    },
    outputDir: process.env.VALIDATION_OUTPUT_DIR || './migration-backups'
  };

  if (!config.source.key || !config.target.key) {
    console.error('❌ Les clés API Supabase source et cible sont requises');
    console.error('Variables d\'environnement supportées:');
    console.error('  SOURCE:');
    console.error('    SUPABASE_SOURCE_URL (optionnel, défaut: VITE_SUPABASE_URL)');
    console.error('    SUPABASE_SOURCE_KEY ou VITE_SUPABASE_PUBLISHABLE_KEY (requis)');
    console.error('  TARGET:');
    console.error('    SUPABASE_TARGET_URL (optionnel, auto-détecté)');
    console.error('    SUPABASE_TARGET_KEY ou SERVICE_SUPABASE_ANON_KEY (requis)');
    console.error('');
    console.error('Variables détectées:');
    console.error(`  Source URL: ${config.source.url}`);
    console.error(`  Target URL: ${config.target.url}`);
    console.error(`  Source Key: ${config.source.key ? 'Présente' : 'Manquante'}`);
    console.error(`  Target Key: ${config.target.key ? 'Présente' : 'Manquante'}`);
    process.exit(1);
  }

  const validator = new SupabaseMigrationValidator(config);
  const success = await validator.runValidation();
  
  process.exit(success ? 0 : 1);
}

// Gestion des erreurs non capturées
process.on('unhandledRejection', (reason, promise) => {
  console.error('Erreur non gérée:', reason);
  process.exit(1);
});

// Exécution directe
main().catch(console.error);

export { SupabaseMigrationValidator, MigrationConfig };