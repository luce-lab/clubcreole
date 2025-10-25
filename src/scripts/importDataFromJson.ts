import 'dotenv/config';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { supabaseServer } from '../integrations/supabase/serverClient';

/**
 * Script générique d'import de données depuis des fichiers JSON
 * Usage: npm run import-data <table> <json-file-or-directory>
 *
 * Exemples:
 *   npm run import-data accommodations data/accommodations/la-colline-verte.json
 *   npm run import-data accommodations data/accommodations/
 */

async function importData(tableName: string, filePath: string) {
  try {
    console.log(`\n🔄 Import de données vers la table "${tableName}"...`);
    console.log(`📁 Fichier: ${filePath}`);

    // Lire le fichier JSON
    const jsonData = readFileSync(filePath, 'utf-8');
    const data = JSON.parse(jsonData);

    console.log(`📊 Données à insérer:`, data.name || data.title || 'Sans nom');

    // Insérer dans Supabase
    const { data: insertedData, error } = await supabaseServer
      .from(tableName)
      .insert(data)
      .select('*');

    if (error) {
      console.error('❌ Erreur lors de l\'insertion:', error.message);
      if (error.details) {
        console.error('Détails:', error.details);
      }
      if (error.hint) {
        console.error('Conseil:', error.hint);
      }
      return false;
    }

    console.log('✅ Données insérées avec succès!');
    console.log('📝 ID:', insertedData?.[0]?.id);
    return true;

  } catch (error) {
    if (error instanceof Error) {
      console.error('❌ Erreur:', error.message);
    } else {
      console.error('❌ Erreur inconnue:', error);
    }
    return false;
  }
}

async function importDirectory(tableName: string, dirPath: string) {
  try {
    const files = readdirSync(dirPath).filter(f => f.endsWith('.json'));

    console.log(`\n📂 Trouvé ${files.length} fichier(s) JSON dans ${dirPath}`);

    let successCount = 0;
    let errorCount = 0;

    for (const file of files) {
      const filePath = join(dirPath, file);
      const success = await importData(tableName, filePath);

      if (success) {
        successCount++;
      } else {
        errorCount++;
      }
    }

    console.log(`\n📊 Résumé:`);
    console.log(`   ✅ Réussis: ${successCount}`);
    console.log(`   ❌ Échoués: ${errorCount}`);
    console.log(`   📝 Total: ${files.length}`);

  } catch (error) {
    if (error instanceof Error) {
      console.error('❌ Erreur lors de la lecture du répertoire:', error.message);
    } else {
      console.error('❌ Erreur inconnue:', error);
    }
  }
}

// Main
const args = process.argv.slice(2);

if (args.length < 2) {
  console.error('❌ Usage: npm run import-data <table> <json-file-or-directory>');
  console.error('\nExemples:');
  console.error('  npm run import-data accommodations data/accommodations/la-colline-verte.json');
  console.error('  npm run import-data accommodations data/accommodations/');
  process.exit(1);
}

const [tableName, path] = args;

// Vérifier si c'est un fichier ou un répertoire
import { statSync } from 'fs';

try {
  const stats = statSync(path);

  if (stats.isDirectory()) {
    importDirectory(tableName, path);
  } else if (stats.isFile()) {
    importData(tableName, path);
  } else {
    console.error('❌ Le chemin spécifié n\'est ni un fichier ni un répertoire');
    process.exit(1);
  }
} catch (error) {
  if (error instanceof Error) {
    console.error('❌ Erreur:', error.message);
  }
  process.exit(1);
}
