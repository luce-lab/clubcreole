#!/usr/bin/env node
/**
 * Script de Migration Supabase via API
 * ====================================
 * Alternative au pg_dump/pg_restore utilisant l'API Supabase
 * pour contourner les restrictions d'accès PostgreSQL direct
 */

import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load environment variables
config();

interface MigrationConfig {
  source: {
    url: string;
    key: string;
  };
  target: {
    url: string;
    key: string;
  };
  batchSize: number;
  outputDir: string;
}

// Tables à migrer (ordre important pour les dépendances)
const MIGRATION_TABLES = [
  'profiles',
  'partners',
  'accommodations',
  'accommodation_rooms',
  'restaurants',
  'car_rentals',
  'activities',
  'leisure_activities',
  'subscriptions',
  'accommodation_bookings',
  'restaurant_reservations', 
  'car_rental_bookings',
  'activity_bookings',
  'travel_reservations'
];

class SupabaseApiMigrator {
  private sourceClient: any;
  private targetClient: any;
  private config: MigrationConfig;
  private logFile: string;

  constructor(config: MigrationConfig) {
    this.config = config;
    this.sourceClient = createClient(config.source.url, config.source.key);
    this.targetClient = createClient(config.target.url, config.target.key);
    
    if (!fs.existsSync(config.outputDir)) {
      fs.mkdirSync(config.outputDir, { recursive: true });
    }
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    this.logFile = path.join(config.outputDir, `api_migration_${timestamp}.log`);
  }

  private log(message: string, level: 'info' | 'warn' | 'error' = 'info') {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    
    console.log(logEntry);
    fs.appendFileSync(this.logFile, logEntry + '\n');
  }

  // Migration d'une table complète
  async migrateTable(tableName: string): Promise<boolean> {
    this.log(`🔄 Migration de la table: ${tableName}`);
    
    try {
      // 1. Compter les enregistrements source
      const { count: sourceCount, error: countError } = await this.sourceClient
        .from(tableName)
        .select('*', { count: 'exact', head: true });

      if (countError) {
        this.log(`❌ Erreur comptage ${tableName}: ${countError.message}`, 'error');
        return false;
      }

      this.log(`📊 ${tableName}: ${sourceCount} enregistrements à migrer`);

      if (sourceCount === 0) {
        this.log(`✅ ${tableName}: table vide, migration terminée`);
        return true;
      }

      // 2. Vider la table cible (optionnel - à commenter si vous voulez conserver)
      await this.clearTargetTable(tableName);

      // 3. Migration par batches
      let offset = 0;
      let migratedCount = 0;

      while (offset < sourceCount) {
        const { data: batch, error: fetchError } = await this.sourceClient
          .from(tableName)
          .select('*')
          .range(offset, offset + this.config.batchSize - 1);

        if (fetchError) {
          this.log(`❌ Erreur lecture ${tableName} offset ${offset}: ${fetchError.message}`, 'error');
          return false;
        }

        if (!batch || batch.length === 0) {
          break;
        }

        // Insertion dans la cible
        const { error: insertError } = await this.targetClient
          .from(tableName)
          .insert(batch);

        if (insertError) {
          this.log(`❌ Erreur insertion ${tableName} batch ${offset}: ${insertError.message}`, 'error');
          return false;
        }

        migratedCount += batch.length;
        offset += this.config.batchSize;

        this.log(`📈 ${tableName}: ${migratedCount}/${sourceCount} enregistrements migrés`);
      }

      // 4. Validation finale
      const { count: targetCount, error: targetCountError } = await this.targetClient
        .from(tableName)
        .select('*', { count: 'exact', head: true });

      if (targetCountError) {
        this.log(`⚠️ Erreur validation ${tableName}: ${targetCountError.message}`, 'warn');
        return false;
      } else if (targetCount === sourceCount) {
        this.log(`✅ ${tableName}: migration réussie (${targetCount} enregistrements)`);
        return true;
      } else {
        this.log(`❌ ${tableName}: échec validation (source: ${sourceCount}, cible: ${targetCount})`, 'error');
        return false;
      }

    } catch (error) {
      this.log(`❌ Erreur générale ${tableName}: ${error}`, 'error');
      return false;
    }
  }

  // Vider une table cible (avec gestion des erreurs)
  private async clearTargetTable(tableName: string): Promise<void> {
    try {
      // Supprimer tous les enregistrements (attention: sans WHERE !)
      const { error } = await this.targetClient
        .from(tableName)
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Condition toujours vraie pour éviter l'erreur

      if (error && !error.message.includes('no rows')) {
        this.log(`⚠️ Attention vidage ${tableName}: ${error.message}`, 'warn');
      } else {
        this.log(`🗑️ Table ${tableName} vidée`);
      }
    } catch (error) {
      this.log(`⚠️ Erreur vidage ${tableName}: ${error}`, 'warn');
    }
  }

  // Migration complète
  async runMigration(): Promise<boolean> {
    this.log('🚀 Démarrage de la migration Supabase via API');
    this.log(`Source: ${this.config.source.url}`);
    this.log(`Cible: ${this.config.target.url}`);
    this.log(`Taille des batches: ${this.config.batchSize}`);

    let successCount = 0;
    const totalTables = MIGRATION_TABLES.length;

    for (const tableName of MIGRATION_TABLES) {
      const success = await this.migrateTable(tableName);
      if (success) {
        successCount++;
      } else {
        this.log(`❌ Échec migration ${tableName} - Arrêt du processus`, 'error');
        break;
      }
    }

    if (successCount === totalTables) {
      this.log('🎉 Migration complète terminée avec succès!');
      this.log(`✅ ${successCount}/${totalTables} tables migrées`);
      return true;
    } else {
      this.log(`❌ Migration incomplète: ${successCount}/${totalTables} tables migrées`, 'error');
      return false;
    }
  }
}

// Fonction principale
async function main() {
  // Auto-détection de la configuration depuis .env
  const sourceUrl = process.env.VITE_SUPABASE_URL;
  const sourceKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  
  let targetUrl = process.env.SUPABASE_TARGET_URL;
  let targetKey = process.env.SUPABASE_TARGET_KEY;
  
  // Auto-détection de la cible depuis SERVICE_*
  if (!targetUrl && process.env.SERVICE_SUPABASE_ANON_KEY) {
    targetUrl = 'https://services-supabase.clubcreole.fr';
  }
  if (!targetKey && process.env.SERVICE_SUPABASE_ANON_KEY) {
    targetKey = process.env.SERVICE_SUPABASE_ANON_KEY;
  }

  if (!sourceUrl || !sourceKey || !targetUrl || !targetKey) {
    console.error('❌ Configuration incomplète');
    console.error('Variables requises:');
    console.error('  VITE_SUPABASE_URL:', sourceUrl ? 'OK' : 'MANQUANTE');
    console.error('  VITE_SUPABASE_PUBLISHABLE_KEY:', sourceKey ? 'OK' : 'MANQUANTE');
    console.error('  TARGET_URL:', targetUrl ? 'OK' : 'MANQUANTE');
    console.error('  TARGET_KEY:', targetKey ? 'OK' : 'MANQUANTE');
    process.exit(1);
  }

  const config: MigrationConfig = {
    source: { url: sourceUrl, key: sourceKey },
    target: { url: targetUrl, key: targetKey },
    batchSize: parseInt(process.env.MIGRATION_BATCH_SIZE || '100'),
    outputDir: process.env.MIGRATION_OUTPUT_DIR || './migration-backups'
  };

  const migrator = new SupabaseApiMigrator(config);
  const success = await migrator.runMigration();
  
  process.exit(success ? 0 : 1);
}

// Gestion des erreurs
process.on('unhandledRejection', (reason) => {
  console.error('Erreur non gérée:', reason);
  process.exit(1);
});

// Exécution
main().catch(console.error);