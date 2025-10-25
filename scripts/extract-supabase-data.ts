#!/usr/bin/env node
/**
 * Script d'Extraction de Données Supabase
 * =======================================
 * Extrait toutes les données en JSON pour migration ultérieure
 * quand l'instance cible sera disponible
 */

import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load environment variables
config();

const TABLES = [
  'profiles', 'partners', 'accommodations', 'accommodation_rooms',
  'restaurants', 'car_rentals', 'activities', 'leisure_activities',
  'subscriptions', 'accommodation_bookings', 'restaurant_reservations',
  'car_rental_bookings', 'activity_bookings', 'travel_reservations'
];

async function extractData() {
  const sourceUrl = process.env.VITE_SUPABASE_URL;
  const sourceKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  
  if (!sourceUrl || !sourceKey) {
    console.error('❌ Configuration source manquante');
    process.exit(1);
  }

  const client = createClient(sourceUrl, sourceKey);
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const outputDir = `./migration-backups/extraction_${timestamp}`;
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`🚀 Extraction des données Supabase`);
  console.log(`📂 Destination: ${outputDir}`);

  const summary = {
    timestamp: new Date().toISOString(),
    source: sourceUrl,
    tables: {} as Record<string, number>
  };

  for (const tableName of TABLES) {
    try {
      console.log(`🔄 Extraction: ${tableName}`);
      
      const { data, error } = await client
        .from(tableName)
        .select('*');

      if (error) {
        console.error(`❌ ${tableName}: ${error.message}`);
        summary.tables[tableName] = -1;
        continue;
      }

      const count = data?.length || 0;
      summary.tables[tableName] = count;

      // Sauvegarder en JSON
      const filePath = path.join(outputDir, `${tableName}.json`);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      
      console.log(`✅ ${tableName}: ${count} enregistrements extraits`);
      
    } catch (error) {
      console.error(`❌ ${tableName}: ${error}`);
      summary.tables[tableName] = -1;
    }
  }

  // Sauvegarder le résumé
  fs.writeFileSync(
    path.join(outputDir, 'extraction_summary.json'),
    JSON.stringify(summary, null, 2)
  );

  const totalRecords = Object.values(summary.tables)
    .filter(count => count > 0)
    .reduce((sum, count) => sum + count, 0);

  console.log(`\n📊 RÉSUMÉ DE L'EXTRACTION`);
  console.log(`📁 Répertoire: ${outputDir}`);
  console.log(`📊 Total enregistrements: ${totalRecords}`);
  console.log(`🗃️ Tables extraites:`);
  
  Object.entries(summary.tables).forEach(([table, count]) => {
    const status = count === -1 ? '❌ ERREUR' : count === 0 ? '⭕ VIDE' : `✅ ${count} records`;
    console.log(`   ${table}: ${status}`);
  });

  console.log(`\n💾 Données sauvegardées dans: ${outputDir}`);
  console.log(`📄 Résumé disponible: ${path.join(outputDir, 'extraction_summary.json')}`);
}

extractData().catch(console.error);