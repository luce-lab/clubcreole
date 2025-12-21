#!/usr/bin/env node

/**
 * Test script for Stripe webhook endpoint
 * Run this to verify the webhook is working correctly before deploying
 */

const crypto = require('crypto');

// Configuration
const WEBHOOK_URL = 'http://localhost:54321/functions/v1/stripe-webhook';
const WEBHOOK_SECRET = 'whsec_test_your_webhook_secret_here';

// Test event payloads
const testEvents = [
  {
    type: 'invoice.payment_succeeded',
    payload: {
      id: 'evt_test_payment_success_123',
      object: 'event',
      type: 'invoice.payment_succeeded',
      data: {
        object: {
          id: 'in_test_success_123',
          object: 'invoice',
          status: 'paid',
          amount_paid: 1500,
          currency: 'eur',
          customer: 'cus_test_123',
          subscription: 'sub_test_123'
        }
      }
    }
  },
  {
    type: 'invoice.payment_failed',
    payload: {
      id: 'evt_test_payment_failed_456',
      object: 'event',
      type: 'invoice.payment_failed',
      data: {
        object: {
          id: 'in_test_failed_456',
          object: 'invoice',
          status: 'open',
          amount_due: 1500,
          currency: 'eur',
          customer: 'cus_test_456',
          subscription: 'sub_test_456',
          attempt_count: 1
        }
      }
    }
  },
  {
    type: 'customer.subscription.deleted',
    payload: {
      id: 'evt_test_subscription_deleted_789',
      object: 'event',
      type: 'customer.subscription.deleted',
      data: {
        object: {
          id: 'sub_test_deleted_789',
          object: 'subscription',
          status: 'canceled',
          customer: 'cus_test_789'
        }
      }
    }
  }
];

function generateSignature(payload, secret) {
  const timestamp = Math.floor(Date.now() / 1000);
  const signedPayload = `${timestamp}.${payload}`;
  const signature = crypto
    .createHmac('sha256', secret)
    .update(signedPayload, 'utf8')
    .digest('hex');

  return `t=${timestamp},v1=${signature}`;
}

async function testWebhook(event) {
  try {
    console.log(`\n🧪 Testing ${event.type}...`);
    console.log(`📤 Event ID: ${event.payload.id}`);

    const payload = JSON.stringify(event.payload);
    const signature = generateSignature(payload, WEBHOOK_SECRET);

    console.log(`🔗 Sending to: ${WEBHOOK_URL}`);
    console.log(`🔐 Signature: ${signature.substring(0, 50)}...`);

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'stripe-signature': signature
      },
      body: payload
    });

    const responseText = await response.text();
    console.log(`📥 Status: ${response.status}`);
    console.log(`📄 Response: ${responseText}`);

    if (response.ok) {
      console.log(`✅ ${event.type} - SUCCESS`);
      return true;
    } else {
      console.log(`❌ ${event.type} - FAILED`);
      return false;
    }
  } catch (error) {
    console.log(`💥 ${event.type} - ERROR: ${error.message}`);
    return false;
  }
}

async function testInvalidSignature() {
  try {
    console.log('\n🧪 Testing invalid signature...');

    const payload = JSON.stringify(testEvents[0].payload);
    const invalidSignature = 't=1234567890,v1=invalid_signature_here';

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'stripe-signature': invalidSignature
      },
      body: payload
    });

    console.log(`📥 Status: ${response.status}`);

    if (response.status === 401) {
      console.log('✅ Invalid signature test - SUCCESS (correctly rejected)');
      return true;
    } else {
      console.log('❌ Invalid signature test - FAILED (should have been rejected)');
      return false;
    }
  } catch (error) {
    console.log(`💥 Invalid signature test - ERROR: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('🚀 Starting Stripe Webhook Tests');
  console.log(`🎯 Target: ${WEBHOOK_URL}`);
  console.log('='.repeat(50));

  let successCount = 0;
  let totalTests = testEvents.length + 1; // +1 for invalid signature test

  // Test each valid event type
  for (const event of testEvents) {
    const success = await testWebhook(event);
    if (success) successCount++;

    // Wait a moment between tests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Test invalid signature
  const invalidSignatureSuccess = await testInvalidSignature();
  if (invalidSignatureSuccess) successCount++;

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log(`📊 Test Results: ${successCount}/${totalTests} passed`);

  if (successCount === totalTests) {
    console.log('🎉 All tests passed! Webhook is working correctly.');
  } else {
    console.log('⚠️  Some tests failed. Check the logs above for details.');
  }

  console.log('\n💡 Tips:');
  console.log('- Make sure your Supabase development server is running (npm run dev)');
  console.log('- Check that the webhook_events table exists in your database');
  console.log('- Verify environment variables are set correctly');
  console.log('- Check Supabase Edge Function logs for detailed error messages');
}

// Check if Node.js has fetch (Node 18+)
if (typeof fetch === 'undefined') {
  console.log('❌ This script requires Node.js 18+ or node-fetch package');
  console.log('💡 Install node-fetch: npm install node-fetch');
  process.exit(1);
}

main().catch(console.error);