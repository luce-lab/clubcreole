#!/usr/bin/env node
/**
 * Script d'Estimation de Taille pour Migration Supabase
 * =====================================================
 * Analyse la taille actuelle des données Supabase pour estimer
 * les ressources et temps nécessaires pour la migration
 */

import { createClient } from '@supabase/supabase-js';

// Configuration par défaut (peut être surchargée par variables d'environnement)
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://psryoyugyimibjhwhvlh.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

// Tables principales selon CLAUDE.md
const TABLES_TO_ANALYZE = [
  'profiles',
  'accommodations',
  'accommodation_rooms',
  'accommodation_bookings',
  'restaurants',
  'restaurant_reservations',
  'car_rentals',
  'car_rental_bookings',
  'leisure_activities',
  'activities',
  'activity_bookings',
  'travel_packages',
  'travel_reservations',
  'subscriptions',
  'partners',
  'partner_accommodations',
];

interface TableStats {
  name: string;
  count: number;
  estimatedSize: string;
  complexity: 'low' | 'medium' | 'high';
  migrationPriority: number;
}

class MigrationSizeEstimator {
  private results: TableStats[] = [];

  private log(message: string, level: 'info' | 'warn' | 'error' = 'info') {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${level.toUpperCase()}: ${message}`);
  }

  // Estimation de la taille d'une table
  private estimateTableSize(rowCount: number, tableName: string): string {
    // Estimation basée sur le type de table et nombre moyen de colonnes
    let avgRowSize = 500; // bytes par défaut
    
    // Ajustement selon le type de table
    switch (tableName) {
      case 'profiles':
        avgRowSize = 300; // Profil utilisateur basique
        break;
      case 'accommodations':
      case 'restaurants':
        avgRowSize = 800; // Données riches avec descriptions
        break;
      case 'accommodation_rooms':
        avgRowSize = 400; // Détails de chambres
        break;
      case 'car_rentals':
        avgRowSize = 600; // Informations véhicules
        break;
      case 'bookings':
      case 'reservations':
        avgRowSize = 350; // Données transactionnelles
        break;
      case 'leisure_activities':
      case 'activities':
        avgRowSize = 700; // Descriptions d'activités
        break;
      default:
        avgRowSize = 500;
    }
    
    const totalBytes = rowCount * avgRowSize;
    
    if (totalBytes < 1024) {
      return `${totalBytes} B`;
    } else if (totalBytes < 1024 * 1024) {
      return `${(totalBytes / 1024).toFixed(1)} KB`;
    } else if (totalBytes < 1024 * 1024 * 1024) {
      return `${(totalBytes / (1024 * 1024)).toFixed(1)} MB`;
    } else {
      return `${(totalBytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
    }
  }

  // Détermination de la complexité de migration
  private getTableComplexity(tableName: string, rowCount: number): 'low' | 'medium' | 'high' {
    // Basé sur le nombre d'enregistrements et la complexité des relations
    if (rowCount > 100000) {
      return 'high';
    } else if (rowCount > 10000) {
      return 'medium';
    } else if (tableName.includes('booking') || tableName.includes('reservation')) {
      return 'medium'; // Relations complexes
    } else {
      return 'low';
    }
  }

  // Priorité de migration (1 = en premier, 5 = en dernier)
  private getMigrationPriority(tableName: string): number {
    const priorities: { [key: string]: number } = {
      'profiles': 1,
      'partners': 1,
      'accommodations': 2,
      'restaurants': 2,
      'car_rentals': 2,
      'leisure_activities': 2,
      'activities': 2,
      'accommodation_rooms': 3,
      'subscriptions': 3,
      'travel_packages': 3,
      'accommodation_bookings': 4,
      'restaurant_reservations': 4,
      'car_rental_bookings': 4,
      'activity_bookings': 4,
      'travel_reservations': 4,
      'partner_accommodations': 5,
    };
    
    return priorities[tableName] || 3;
  }

  // Analyse d'une table spécifique
  async analyzeTable(tableName: string): Promise<TableStats | null> {
    try {
      this.log(`Analyse de la table: ${tableName}...`);

      const { count, error } = await supabase
        .from(tableName)
        .select('*', { count: 'exact', head: true });

      if (error) {
        this.log(`Erreur lors de l'analyse de ${tableName}: ${error.message}`, 'warn');
        return null;
      }

      const rowCount = count || 0;
      const estimatedSize = this.estimateTableSize(rowCount, tableName);
      const complexity = this.getTableComplexity(tableName, rowCount);
      const migrationPriority = this.getMigrationPriority(tableName);

      this.log(`  → ${rowCount} enregistrements, taille estimée: ${estimatedSize}`);

      return {
        name: tableName,
        count: rowCount,
        estimatedSize,
        complexity,
        migrationPriority
      };
    } catch (err: any) {
      this.log(`Erreur inattendue pour ${tableName}: ${err.message}`, 'error');
      return null;
    }
  }

  // Analyse de toutes les tables
  async analyzeAllTables(): Promise<void> {
    this.log('=== Démarrage de l\'analyse de taille ===');
    this.log(`Analyse de ${TABLES_TO_ANALYZE.length} tables principales`);

    for (const tableName of TABLES_TO_ANALYZE) {
      const stats = await this.analyzeTable(tableName);
      if (stats) {
        this.results.push(stats);
      }
    }

    this.results.sort((a, b) => a.migrationPriority - b.migrationPriority);
  }

  // Calcul des estimations globales
  private calculateGlobalEstimates(): any {
    const totalRecords = this.results.reduce((sum, table) => sum + table.count, 0);
    
    // Estimation du temps de migration (approximatif)
    let estimatedMinutes = 0;
    if (totalRecords < 10000) {
      estimatedMinutes = 5;
    } else if (totalRecords < 100000) {
      estimatedMinutes = 15;
    } else if (totalRecords < 500000) {
      estimatedMinutes = 45;
    } else {
      estimatedMinutes = 120;
    }

    // Calcul de la complexité globale
    const complexityScore = this.results.reduce((score, table) => {
      switch (table.complexity) {
        case 'high': return score + 3;
        case 'medium': return score + 2;
        case 'low': return score + 1;
        default: return score + 1;
      }
    }, 0);

    const avgComplexity = complexityScore / this.results.length;
    let globalComplexity: string;
    if (avgComplexity >= 2.5) {
      globalComplexity = 'high';
    } else if (avgComplexity >= 1.5) {
      globalComplexity = 'medium';
    } else {
      globalComplexity = 'low';
    }

    return {
      totalTables: this.results.length,
      totalRecords,
      estimatedMinutes,
      globalComplexity,
      highComplexityTables: this.results.filter(t => t.complexity === 'high').length,
      mediumComplexityTables: this.results.filter(t => t.complexity === 'medium').length,
      lowComplexityTables: this.results.filter(t => t.complexity === 'low').length
    };
  }

  // Génération du rapport détaillé
  generateReport(): void {
    this.log('\n=== RAPPORT D\'ESTIMATION DE MIGRATION ===');

    const estimates = this.calculateGlobalEstimates();

    // Résumé général
    this.log('\n📊 RÉSUMÉ GÉNÉRAL:');
    this.log(`Tables analysées: ${estimates.totalTables}`);
    this.log(`Total d'enregistrements: ${estimates.totalRecords.toLocaleString()}`);
    this.log(`Temps estimé: ${estimates.estimatedMinutes} minutes`);
    this.log(`Complexité globale: ${estimates.globalComplexity}`);

    // Distribution de complexité
    this.log('\n🎯 DISTRIBUTION DE COMPLEXITÉ:');
    this.log(`  Haute: ${estimates.highComplexityTables} tables`);
    this.log(`  Moyenne: ${estimates.mediumComplexityTables} tables`);
    this.log(`  Faible: ${estimates.lowComplexityTables} tables`);

    // Détail par table (ordre de migration)
    this.log('\n📋 DÉTAIL PAR TABLE (ordre de migration):');
    this.results.forEach((table, index) => {
      const priority = `P${table.migrationPriority}`;
      const complexity = table.complexity.toUpperCase().padEnd(6);
      const count = table.count.toLocaleString().padStart(8);
      const size = table.estimatedSize.padStart(8);
      
      this.log(`  ${(index + 1).toString().padStart(2)}. [${priority}] [${complexity}] ${table.name.padEnd(25)} ${count} rows ${size}`);
    });

    // Recommandations
    this.log('\n💡 RECOMMANDATIONS:');
    
    if (estimates.totalRecords < 50000) {
      this.log('  ✅ Volume de données manageable pour migration directe');
    } else {
      this.log('  ⚠️ Volume important - prévoir tests approfondis');
    }

    if (estimates.globalComplexity === 'high') {
      this.log('  ⚠️ Complexité élevée - migration par phases recommandée');
    } else {
      this.log('  ✅ Complexité acceptable pour migration en une fois');
    }

    if (estimates.estimatedMinutes > 60) {
      this.log('  ⚠️ Durée longue - prévoir fenêtre de maintenance étendue');
    } else {
      this.log('  ✅ Durée acceptable pour maintenance standard');
    }

    this.log('\n🛠️ PRÉPARATION RECOMMANDÉE:');
    this.log('  1. Tester sur environnement de staging');
    this.log('  2. Prévoir 2x le temps estimé pour la production');
    this.log('  3. Sauvegarder avant migration');
    this.log('  4. Préparer rollback rapide');
    this.log('  5. Monitorer les performances post-migration');

    // Ordre de migration recommandé
    this.log('\n🎯 ORDRE DE MIGRATION RECOMMANDÉ:');
    const priorityGroups = this.results.reduce((groups: any, table) => {
      const priority = table.migrationPriority;
      if (!groups[priority]) groups[priority] = [];
      groups[priority].push(table.name);
      return groups;
    }, {});

    Object.keys(priorityGroups).sort().forEach(priority => {
      this.log(`  Phase ${priority}: ${priorityGroups[priority].join(', ')}`);
    });
  }

  // Sauvegarde du rapport en JSON
  async saveReport(): Promise<void> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const reportPath = `./migration-backups/size_estimation_${timestamp}.json`;
    
    const report = {
      timestamp: new Date().toISOString(),
      source: supabaseUrl,
      analysis: this.results,
      estimates: this.calculateGlobalEstimates()
    };

    try {
      const fs = await import('fs');
      
      // Créer le répertoire si nécessaire
      if (!fs.existsSync('./migration-backups')) {
        fs.mkdirSync('./migration-backups', { recursive: true });
      }
      
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
      this.log(`\n📄 Rapport détaillé sauvegardé: ${reportPath}`);
    } catch (error) {
      this.log(`Erreur sauvegarde rapport: ${error}`, 'warn');
    }
  }
}

// Fonction principale
async function main() {
  if (!supabaseKey) {
    console.error('❌ VITE_SUPABASE_PUBLISHABLE_KEY est requis');
    console.error('Variables d\'environnement:');
    console.error('  VITE_SUPABASE_URL (optionnel)');
    console.error('  VITE_SUPABASE_PUBLISHABLE_KEY (requis)');
    process.exit(1);
  }

  const estimator = new MigrationSizeEstimator();
  
  try {
    await estimator.analyzeAllTables();
    estimator.generateReport();
    await estimator.saveReport();
  } catch (error) {
    console.error('Erreur générale:', error);
    process.exit(1);
  }
}

// Exécution directe
main().catch(console.error);