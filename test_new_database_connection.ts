#!/usr/bin/env node

/**
 * Script de test de connexion à la nouvelle base de données Supabase
 * À exécuter après l'importation pour valider la configuration
 */

import { createClient } from '@supabase/supabase-js';
import { Client } from 'pg';

// Configuration pour la nouvelle instance
const NEW_SUPABASE_URL = 'http://37.59.121.40:8000';
const NEW_SUPABASE_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2MTA2OTQ4MCwiZXhwIjo0OTE2NzQzMDgwLCJyb2xlIjoiYW5vbiJ9.XPLr03kTqHVfR3teQNHMmapCyz0ho7xNEfOG-TFS_bw';

// Configuration PostgreSQL directe
const PG_CONFIG = {
  host: '37.59.121.40',
  port: 5432,
  database: 'clubcreole_db',
  user: 'postgres',
  password: 'Catilo'
};

console.log('🔍 TEST DE CONNEXION À LA NOUVELLE INSTANCE SUPABASE');
console.log('====================================================\n');

async function testSupabaseConnection() {
  console.log('📡 Test 1: Connexion Supabase API');
  console.log('-----------------------------------');

  try {
    const supabase = createClient(NEW_SUPABASE_URL, NEW_SUPABASE_KEY);

    // Test de connexion simple
    const { data, error } = await supabase.from('accommodations').select('count').limit(1);

    if (error) {
      console.error('❌ Erreur Supabase API:', error.message);
      return false;
    }

    console.log('✅ Connexion Supabase API réussie');
    console.log(`📊 Données reçues: ${JSON.stringify(data)}`);
    return true;

  } catch (error) {
    console.error('❌ Erreur de connexion Supabase:', error);
    return false;
  }
}

async function testPostgresConnection() {
  console.log('\n🐘 Test 2: Connexion PostgreSQL directe');
  console.log('--------------------------------------');

  const client = new Client(PG_CONFIG);

  try {
    await client.connect();
    console.log('✅ Connexion PostgreSQL réussie');

    // Test de requête simple
    const result = await client.query('SELECT version()');
    console.log(`📊 Version PostgreSQL: ${result.rows[0].version.split(' ')[0]}`);

    // Vérification des tables
    const tablesResult = await client.query(`
      SELECT schemaname, tablename
      FROM pg_tables
      WHERE schemaname IN ('public', 'auth')
      ORDER BY schemaname, tablename
      LIMIT 10
    `);

    console.log(`📋 Tables trouvées (${tablesResult.rows.length}):`);
    tablesResult.rows.forEach(row => {
      console.log(`   - ${row.schemaname}.${row.tablename}`);
    });

    // Vérification des enregistrements
    const countResult = await client.query(`
      SELECT
        'auth.users' as table_name,
        COUNT(*) as count
      FROM auth.users
      UNION ALL
      SELECT
        'public.accommodations' as table_name,
        COUNT(*) as count
      FROM public.accommodations
      WHERE id IS NOT NULL
      UNION ALL
      SELECT
        'public.restaurants' as table_name,
        COUNT(*) as count
      FROM public.restaurants
      WHERE id IS NOT NULL
    `);

    console.log('\n📊 Enregistrements par table:');
    countResult.rows.forEach(row => {
      console.log(`   - ${row.table_name}: ${row.count} enregistrements`);
    });

    await client.end();
    return true;

  } catch (error) {
    console.error('❌ Erreur de connexion PostgreSQL:', error);
    try {
      await client.end();
    } catch {}
    return false;
  }
}

async function testAuthFunctionality() {
  console.log('\n🔐 Test 3: Fonctionnalités d\'authentification');
  console.log('-------------------------------------------');

  try {
    const supabase = createClient(NEW_SUPABASE_URL, NEW_SUPABASE_KEY);

    // Test de récupération des sessions
    const { data: sessions, error: sessionsError } = await supabase
      .from('auth.sessions')
      .select('count')
      .limit(1);

    if (sessionsError) {
      console.log('⚠️  Accès aux sessions limité (normal avec clé anon)');
    } else {
      console.log('✅ Accès aux tables auth fonctionnel');
    }

    // Test de structure des utilisateurs
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, email, created_at')
      .limit(1);

    if (usersError) {
      console.log('⚠️  Accès aux utilisateurs limité');
    } else {
      console.log('✅ Structure de la table users valide');
    }

    return true;

  } catch (error) {
    console.error('❌ Erreur lors des tests d\'auth:', error);
    return false;
  }
}

async function main() {
  console.log('Configuration:');
  console.log(`- URL Supabase: ${NEW_SUPABASE_URL}`);
  console.log(`- Hôte PostgreSQL: ${PG_CONFIG.host}:${PG_CONFIG.port}`);
  console.log(`- Base de données: ${PG_CONFIG.database}\n`);

  const supabaseOk = await testSupabaseConnection();
  const postgresOk = await testPostgresConnection();
  const authOk = await testAuthFunctionality();

  console.log('\n🎯 RÉSULTATS DES TESTS');
  console.log('=======================');
  console.log(`Supabase API: ${supabaseOk ? '✅ OK' : '❌ ÉCHEC'}`);
  console.log(`PostgreSQL: ${postgresOk ? '✅ OK' : '❌ ÉCHEC'}`);
  console.log(`Auth: ${authOk ? '✅ OK' : '⚠️  LIMITÉ'}`);

  if (supabaseOk && postgresOk) {
    console.log('\n🎉 MIGRATION PRÊTE POUR L\'APPLICATION !');
    console.log('Vous pouvez maintenant mettre à jour le fichier .env');
  } else {
    console.log('\n⚠️  Vérifiez la configuration avant de continuer');
  }
}

// Exécuter les tests
main().catch(console.error);