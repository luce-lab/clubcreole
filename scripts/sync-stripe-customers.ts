/**
 * Script de synchronisation des abonnés existants avec Stripe
 *
 * Ce script crée des customers Stripe pour les abonnés existants
 * qui n'ont pas encore de stripe_customer_id.
 *
 * Usage:
 *   npx vite-node scripts/sync-stripe-customers.ts
 *
 * Variables d'environnement requises:
 *   - STRIPE_SECRET_KEY
 *   - SUPABASE_URL
 *   - SUPABASE_SERVICE_ROLE_KEY
 */

import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Configuration
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Validation des variables d'environnement
if (!STRIPE_SECRET_KEY) {
  console.error('❌ STRIPE_SECRET_KEY is required');
  process.exit(1);
}

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required');
  process.exit(1);
}

// Initialisation des clients
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

interface Subscriber {
  id: number;
  email: string;
  subscribed: boolean;
  subscription_tier: string | null;
  stripe_customer_id: string | null;
  created_at: string;
}

interface SyncResult {
  success: number;
  failed: number;
  skipped: number;
  errors: Array<{ email: string; error: string }>;
}

async function getSubscribersToSync(): Promise<Subscriber[]> {
  console.log('📋 Récupération des abonnés à synchroniser...');

  const { data, error } = await supabase
    .from('subscribers')
    .select('id, email, subscribed, subscription_tier, stripe_customer_id, created_at')
    .is('stripe_customer_id', null)
    .eq('subscribed', true)
    .order('created_at', { ascending: true });

  if (error) {
    throw new Error(`Erreur lors de la récupération des abonnés: ${error.message}`);
  }

  return data || [];
}

async function checkExistingStripeCustomer(email: string): Promise<Stripe.Customer | null> {
  const customers = await stripe.customers.list({
    email: email,
    limit: 1,
  });

  return customers.data.length > 0 ? customers.data[0] : null;
}

async function createStripeCustomer(subscriber: Subscriber): Promise<Stripe.Customer> {
  return await stripe.customers.create({
    email: subscriber.email,
    metadata: {
      subscriber_id: subscriber.id.toString(),
      subscription_tier: subscriber.subscription_tier || 'unknown',
      migrated_at: new Date().toISOString(),
      source: 'migration_script',
    },
  });
}

async function updateSubscriberWithCustomerId(
  subscriberId: number,
  customerId: string
): Promise<void> {
  const { error } = await supabase
    .from('subscribers')
    .update({
      stripe_customer_id: customerId,
      updated_at: new Date().toISOString(),
    })
    .eq('id', subscriberId);

  if (error) {
    throw new Error(`Erreur lors de la mise à jour: ${error.message}`);
  }
}

async function syncSubscriber(subscriber: Subscriber): Promise<{ success: boolean; customerId?: string; error?: string }> {
  try {
    // Vérifier si le customer existe déjà dans Stripe
    const existingCustomer = await checkExistingStripeCustomer(subscriber.email);

    let customerId: string;

    if (existingCustomer) {
      console.log(`  ℹ️  Customer existant trouvé pour ${subscriber.email}`);
      customerId = existingCustomer.id;
    } else {
      // Créer un nouveau customer
      const newCustomer = await createStripeCustomer(subscriber);
      customerId = newCustomer.id;
      console.log(`  ✨ Nouveau customer créé: ${customerId}`);
    }

    // Mettre à jour la base de données
    await updateSubscriberWithCustomerId(subscriber.id, customerId);

    return { success: true, customerId };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return { success: false, error: errorMessage };
  }
}

async function syncAllSubscribers(): Promise<SyncResult> {
  const result: SyncResult = {
    success: 0,
    failed: 0,
    skipped: 0,
    errors: [],
  };

  try {
    const subscribers = await getSubscribersToSync();

    if (subscribers.length === 0) {
      console.log('✅ Aucun abonné à synchroniser');
      return result;
    }

    console.log(`\n📊 ${subscribers.length} abonné(s) à synchroniser\n`);

    for (const subscriber of subscribers) {
      console.log(`🔄 Traitement de ${subscriber.email}...`);

      const syncResult = await syncSubscriber(subscriber);

      if (syncResult.success) {
        console.log(`  ✅ Synchronisé: ${subscriber.email} -> ${syncResult.customerId}`);
        result.success++;
      } else {
        console.log(`  ❌ Échec: ${subscriber.email} - ${syncResult.error}`);
        result.failed++;
        result.errors.push({
          email: subscriber.email,
          error: syncResult.error || 'Unknown error',
        });
      }

      // Pause pour éviter les rate limits Stripe
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    return result;
  } catch (error) {
    console.error('❌ Erreur fatale:', error);
    throw error;
  }
}

async function generateReport(result: SyncResult): Promise<void> {
  console.log('\n' + '='.repeat(50));
  console.log('📈 RAPPORT DE SYNCHRONISATION');
  console.log('='.repeat(50));
  console.log(`✅ Succès:  ${result.success}`);
  console.log(`❌ Échecs:  ${result.failed}`);
  console.log(`⏭️  Ignorés: ${result.skipped}`);

  if (result.errors.length > 0) {
    console.log('\n⚠️  Erreurs détaillées:');
    result.errors.forEach((err, index) => {
      console.log(`  ${index + 1}. ${err.email}: ${err.error}`);
    });
  }

  console.log('='.repeat(50));
}

// Point d'entrée principal
async function main(): Promise<void> {
  console.log('🚀 Démarrage de la synchronisation Stripe...\n');
  console.log(`📍 Supabase URL: ${SUPABASE_URL}`);
  console.log(`🔑 Stripe Mode: ${STRIPE_SECRET_KEY?.startsWith('sk_live') ? 'PRODUCTION' : 'TEST'}\n`);

  try {
    const result = await syncAllSubscribers();
    await generateReport(result);

    if (result.failed > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Erreur fatale:', error);
    process.exit(1);
  }
}

main();
