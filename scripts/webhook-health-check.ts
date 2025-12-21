/**
 * Script de vérification de santé du système de webhooks Stripe
 *
 * Ce script vérifie:
 * - La connectivité du webhook endpoint
 * - Les événements récents traités
 * - Les erreurs dans les dernières 24h
 * - Le statut des abonnements
 *
 * Usage:
 *   npx vite-node scripts/webhook-health-check.ts
 *
 * Variables d'environnement requises:
 *   - SUPABASE_URL
 *   - SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from '@supabase/supabase-js';

// Configuration
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

interface HealthCheckResult {
  status: 'healthy' | 'warning' | 'critical';
  checks: {
    name: string;
    status: 'pass' | 'fail' | 'warn';
    message: string;
    details?: any;
  }[];
  timestamp: string;
}

async function checkWebhookEndpoint(): Promise<{
  status: 'pass' | 'fail';
  message: string;
}> {
  try {
    const webhookUrl = `${SUPABASE_URL}/functions/v1/stripe-webhook`;
    const response = await fetch(webhookUrl, {
      method: 'OPTIONS',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 204 || response.status === 200) {
      return { status: 'pass', message: 'Webhook endpoint accessible' };
    } else {
      return {
        status: 'fail',
        message: `Webhook endpoint returned HTTP ${response.status}`,
      };
    }
  } catch (error) {
    return {
      status: 'fail',
      message: `Cannot reach webhook endpoint: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

async function checkRecentEvents(): Promise<{
  status: 'pass' | 'fail' | 'warn';
  message: string;
  details: any;
}> {
  const { data, error } = await supabase
    .from('webhook_events')
    .select('stripe_event_id, event_type, processing_status, created_at')
    .order('created_at', { ascending: false })
    .limit(10);

  if (error) {
    return {
      status: 'fail',
      message: `Cannot query webhook_events: ${error.message}`,
      details: null,
    };
  }

  if (!data || data.length === 0) {
    return {
      status: 'warn',
      message: 'No webhook events found in database',
      details: [],
    };
  }

  const successCount = data.filter((e) => e.processing_status === 'success').length;
  const errorCount = data.filter((e) => e.processing_status === 'error').length;

  if (errorCount > successCount) {
    return {
      status: 'warn',
      message: `High error rate: ${errorCount}/${data.length} events failed`,
      details: data,
    };
  }

  return {
    status: 'pass',
    message: `${data.length} recent events, ${successCount} successful`,
    details: data,
  };
}

async function checkRecentErrors(): Promise<{
  status: 'pass' | 'fail' | 'warn';
  message: string;
  details: any;
}> {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from('webhook_events')
    .select('event_type, error_message, created_at')
    .eq('processing_status', 'error')
    .gte('created_at', twentyFourHoursAgo)
    .order('created_at', { ascending: false });

  if (error) {
    return {
      status: 'fail',
      message: `Cannot query errors: ${error.message}`,
      details: null,
    };
  }

  if (!data || data.length === 0) {
    return {
      status: 'pass',
      message: 'No errors in the last 24 hours',
      details: [],
    };
  }

  if (data.length > 10) {
    return {
      status: 'warn',
      message: `${data.length} errors in the last 24 hours - investigation needed`,
      details: data,
    };
  }

  return {
    status: 'warn',
    message: `${data.length} error(s) in the last 24 hours`,
    details: data,
  };
}

async function checkSubscriptionStats(): Promise<{
  status: 'pass' | 'fail' | 'warn';
  message: string;
  details: any;
}> {
  const { data, error } = await supabase.from('subscribers').select(`
      subscribed,
      subscription_status,
      subscription_tier
    `);

  if (error) {
    return {
      status: 'fail',
      message: `Cannot query subscribers: ${error.message}`,
      details: null,
    };
  }

  const stats = {
    total: data?.length || 0,
    active: data?.filter((s) => s.subscribed).length || 0,
    past_due: data?.filter((s) => s.subscription_status === 'past_due').length || 0,
    cancelled: data?.filter((s) => s.subscription_status === 'cancelled').length || 0,
    passionne: data?.filter((s) => s.subscription_tier === 'Passionné').length || 0,
    expert: data?.filter((s) => s.subscription_tier === 'Expert').length || 0,
  };

  // Alert if past_due is more than 10% of active
  if (stats.past_due > stats.active * 0.1 && stats.active > 0) {
    return {
      status: 'warn',
      message: `High past_due rate: ${stats.past_due} past_due out of ${stats.active} active`,
      details: stats,
    };
  }

  return {
    status: 'pass',
    message: `${stats.active} active subscribers (${stats.passionne} Passionné, ${stats.expert} Expert)`,
    details: stats,
  };
}

async function checkPendingRetries(): Promise<{
  status: 'pass' | 'fail' | 'warn';
  message: string;
  details: any;
}> {
  const { data, error } = await supabase
    .from('webhook_events')
    .select('stripe_event_id, event_type, retry_count, created_at')
    .eq('processing_status', 'retry')
    .order('created_at', { ascending: false });

  if (error) {
    return {
      status: 'fail',
      message: `Cannot query retries: ${error.message}`,
      details: null,
    };
  }

  if (!data || data.length === 0) {
    return {
      status: 'pass',
      message: 'No pending retries',
      details: [],
    };
  }

  return {
    status: 'warn',
    message: `${data.length} event(s) pending retry`,
    details: data,
  };
}

async function runHealthCheck(): Promise<HealthCheckResult> {
  const result: HealthCheckResult = {
    status: 'healthy',
    checks: [],
    timestamp: new Date().toISOString(),
  };

  console.log('🏥 Running health checks...\n');

  // Check 1: Webhook Endpoint
  console.log('1️⃣ Checking webhook endpoint...');
  const endpointCheck = await checkWebhookEndpoint();
  result.checks.push({
    name: 'Webhook Endpoint',
    status: endpointCheck.status,
    message: endpointCheck.message,
  });
  console.log(`   ${endpointCheck.status === 'pass' ? '✅' : '❌'} ${endpointCheck.message}`);

  // Check 2: Recent Events
  console.log('\n2️⃣ Checking recent events...');
  const eventsCheck = await checkRecentEvents();
  result.checks.push({
    name: 'Recent Events',
    status: eventsCheck.status,
    message: eventsCheck.message,
    details: eventsCheck.details,
  });
  console.log(`   ${eventsCheck.status === 'pass' ? '✅' : eventsCheck.status === 'warn' ? '⚠️' : '❌'} ${eventsCheck.message}`);

  // Check 3: Recent Errors
  console.log('\n3️⃣ Checking recent errors (24h)...');
  const errorsCheck = await checkRecentErrors();
  result.checks.push({
    name: 'Recent Errors',
    status: errorsCheck.status,
    message: errorsCheck.message,
    details: errorsCheck.details,
  });
  console.log(`   ${errorsCheck.status === 'pass' ? '✅' : errorsCheck.status === 'warn' ? '⚠️' : '❌'} ${errorsCheck.message}`);

  // Check 4: Subscription Stats
  console.log('\n4️⃣ Checking subscription statistics...');
  const statsCheck = await checkSubscriptionStats();
  result.checks.push({
    name: 'Subscription Stats',
    status: statsCheck.status,
    message: statsCheck.message,
    details: statsCheck.details,
  });
  console.log(`   ${statsCheck.status === 'pass' ? '✅' : statsCheck.status === 'warn' ? '⚠️' : '❌'} ${statsCheck.message}`);

  // Check 5: Pending Retries
  console.log('\n5️⃣ Checking pending retries...');
  const retriesCheck = await checkPendingRetries();
  result.checks.push({
    name: 'Pending Retries',
    status: retriesCheck.status,
    message: retriesCheck.message,
    details: retriesCheck.details,
  });
  console.log(`   ${retriesCheck.status === 'pass' ? '✅' : retriesCheck.status === 'warn' ? '⚠️' : '❌'} ${retriesCheck.message}`);

  // Determine overall status
  const failCount = result.checks.filter((c) => c.status === 'fail').length;
  const warnCount = result.checks.filter((c) => c.status === 'warn').length;

  if (failCount > 0) {
    result.status = 'critical';
  } else if (warnCount > 0) {
    result.status = 'warning';
  } else {
    result.status = 'healthy';
  }

  return result;
}

function printSummary(result: HealthCheckResult): void {
  console.log('\n' + '='.repeat(50));
  console.log('📊 HEALTH CHECK SUMMARY');
  console.log('='.repeat(50));

  const statusEmoji = {
    healthy: '✅',
    warning: '⚠️',
    critical: '❌',
  };

  console.log(`\nOverall Status: ${statusEmoji[result.status]} ${result.status.toUpperCase()}`);
  console.log(`Timestamp: ${result.timestamp}`);

  console.log('\nChecks:');
  result.checks.forEach((check) => {
    const emoji = check.status === 'pass' ? '✅' : check.status === 'warn' ? '⚠️' : '❌';
    console.log(`  ${emoji} ${check.name}: ${check.message}`);
  });

  console.log('\n' + '='.repeat(50));
}

// Main entry point
async function main(): Promise<void> {
  console.log('🚀 Stripe Webhook Health Check\n');
  console.log(`📍 Supabase URL: ${SUPABASE_URL}\n`);

  try {
    const result = await runHealthCheck();
    printSummary(result);

    // Exit with appropriate code
    if (result.status === 'critical') {
      process.exit(2);
    } else if (result.status === 'warning') {
      process.exit(1);
    } else {
      process.exit(0);
    }
  } catch (error) {
    console.error('❌ Health check failed:', error);
    process.exit(2);
  }
}

main();
