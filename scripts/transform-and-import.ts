#!/usr/bin/env node
/**
 * Script de Transformation et Import des Données
 * ==============================================
 * Transforme les données extraites pour correspondre au schéma actuel
 * et les importe dans l'instance Supabase locale
 */

import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

config();

// Configuration de la base cible locale
const TARGET_URL = 'http://localhost:8000';
const TARGET_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';

async function importData(extractionDir: string) {
  console.log('🚀 Transformation et Import des données');
  console.log(`📂 Source: ${extractionDir}`);
  console.log(`🎯 Cible: ${TARGET_URL}`);
  
  // Client Supabase pour l'instance locale
  const supabase = createClient(TARGET_URL, TARGET_KEY);
  
  let totalImported = 0;
  let totalFailed = 0;
  
  // 1. Import des restaurants
  const restaurantsFile = join(extractionDir, 'restaurants.json');
  if (existsSync(restaurantsFile)) {
    try {
      const data = JSON.parse(readFileSync(restaurantsFile, 'utf8'));
      console.log(`\n🍽️ Import des restaurants (${data.length} enregistrements)`);
      
      for (const restaurant of data) {
        // Transformer les données si nécessaire
        const transformed = {
          name: restaurant.name || restaurant.business_name,
          description: restaurant.description,
          cuisine_type: restaurant.cuisine_type || restaurant.business_type,
          price_range: restaurant.price_range,
          address: restaurant.address || restaurant.location,
          phone: restaurant.phone,
          opening_hours: restaurant.opening_hours || {},
          image: restaurant.image || restaurant.images?.[0],
          rating: restaurant.rating,
          created_at: restaurant.created_at,
          updated_at: restaurant.updated_at
        };
        
        const { error } = await supabase
          .from('restaurants')
          .upsert(transformed, { onConflict: 'name' });
        
        if (error) {
          console.log(`  ❌ Erreur: ${error.message}`);
          totalFailed++;
        } else {
          totalImported++;
        }
      }
      console.log(`  ✅ ${totalImported} restaurants importés`);
    } catch (error) {
      console.error(`  ❌ Erreur lors de l'import des restaurants:`, error);
    }
  }
  
  // 2. Import des accommodations
  const accommodationsFile = join(extractionDir, 'accommodations.json');
  if (existsSync(accommodationsFile)) {
    try {
      const data = JSON.parse(readFileSync(accommodationsFile, 'utf8'));
      console.log(`\n🏨 Import des hébergements (${data.length} enregistrements)`);
      
      for (const accommodation of data) {
        const transformed = {
          name: accommodation.name || accommodation.business_name,
          description: accommodation.description,
          address: accommodation.address || accommodation.location,
          phone: accommodation.phone,
          price: accommodation.price,
          amenities: accommodation.amenities || [],
          images: accommodation.images || accommodation.gallery_images || [],
          rating: accommodation.rating,
          created_at: accommodation.created_at,
          updated_at: accommodation.updated_at
        };
        
        const { error } = await supabase
          .from('accommodations')
          .upsert(transformed, { onConflict: 'name' });
        
        if (error) {
          console.log(`  ❌ Erreur: ${error.message}`);
          totalFailed++;
        } else {
          totalImported++;
        }
      }
      console.log(`  ✅ Hébergements importés`);
    } catch (error) {
      console.error(`  ❌ Erreur lors de l'import des hébergements:`, error);
    }
  }
  
  // 3. Import des activités
  const activitiesFile = join(extractionDir, 'activities.json');
  if (existsSync(activitiesFile)) {
    try {
      const data = JSON.parse(readFileSync(activitiesFile, 'utf8'));
      console.log(`\n🎯 Import des activités (${data.length} enregistrements)`);
      
      for (const activity of data) {
        const transformed = {
          name: activity.name || activity.title,
          description: activity.description,
          price: activity.price,
          duration: activity.duration,
          location: activity.location || activity.address,
          max_participants: activity.max_participants || 10,
          created_at: activity.created_at,
          updated_at: activity.updated_at
        };
        
        const { error } = await supabase
          .from('activities')
          .upsert(transformed, { onConflict: 'name' });
        
        if (error) {
          console.log(`  ❌ Erreur: ${error.message}`);
          totalFailed++;
        } else {
          totalImported++;
        }
      }
      console.log(`  ✅ Activités importées`);
    } catch (error) {
      console.error(`  ❌ Erreur lors de l'import des activités:`, error);
    }
  }
  
  // 4. Import des leisure_activities
  const leisureFile = join(extractionDir, 'leisure_activities.json');
  if (existsSync(leisureFile)) {
    try {
      const data = JSON.parse(readFileSync(leisureFile, 'utf8'));
      console.log(`\n🏖️ Import des activités de loisirs (${data.length} enregistrements)`);
      
      for (const leisure of data) {
        const transformed = {
          name: leisure.name || leisure.title,
          description: leisure.description,
          price: leisure.price,
          location: leisure.location,
          type: leisure.type || 'general',
          created_at: leisure.created_at,
          updated_at: leisure.updated_at
        };
        
        const { error } = await supabase
          .from('leisure_activities')
          .upsert(transformed, { onConflict: 'name' });
        
        if (error) {
          console.log(`  ❌ Erreur: ${error.message}`);
          totalFailed++;
        } else {
          totalImported++;
        }
      }
      console.log(`  ✅ Activités de loisirs importées`);
    } catch (error) {
      console.error(`  ❌ Erreur lors de l'import des activités de loisirs:`, error);
    }
  }
  
  // Résumé
  console.log('\n📊 RÉSUMÉ DE L\'IMPORT');
  console.log(`✅ Total importé: ${totalImported} enregistrements`);
  if (totalFailed > 0) {
    console.log(`❌ Total échoué: ${totalFailed} enregistrements`);
  }
  
  // Vérification finale
  console.log('\n🔍 Vérification des données importées:');
  const tables = ['restaurants', 'accommodations', 'activities', 'leisure_activities'];
  
  for (const table of tables) {
    const { count, error } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true });
    
    if (!error) {
      console.log(`  ✅ ${table}: ${count} enregistrements`);
    }
  }
  
  console.log('\n✨ Import terminé!');
}

// Exécution
const extractionDir = process.argv[2] || './migration-backups/extraction_2025-10-25T09-08-16-478Z';
importData(extractionDir).catch(console.error);