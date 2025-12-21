// Quick verification script to check if tables were deployed successfully
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mybase.clubcreole.fr/';
const supabaseAnonKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2NTQ1NTg0MCwiZXhwIjo0OTIxMTI5NDQwLCJyb2xlIjoiYW5vbiJ9.9EV9qQ5zUttYzhN6hZwi4rlZvKoq02RzE-OJVI_pIbE';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('🔍 VERIFYING DATABASE DEPLOYMENT');
console.log('=====================================');

async function verifyDeployment() {
  let successCount = 0;
  const totalChecks = 2;

  // Test 1: Check subscribers table
  console.log('\n📋 Checking subscribers table...');
  try {
    const { data, error } = await supabase
      .from('subscribers')
      .select('count')
      .limit(1);

    if (error && error.code === '42P01') {
      console.log('❌ Subscribers table still missing');
    } else if (error) {
      console.log('⚠️ Subscribers table error:', error.message);
    } else {
      console.log('✅ Subscribers table deployed successfully!');
      successCount++;
    }
  } catch (err) {
    console.log('❌ Subscribers check failed:', err.message);
  }

  // Test 2: Check purchases table
  console.log('\n📋 Checking purchases table...');
  try {
    const { data, error } = await supabase
      .from('purchases')
      .select('count')
      .limit(1);

    if (error && error.code === '42P01') {
      console.log('❌ Purchases table still missing');
    } else if (error) {
      console.log('⚠️ Purchases table error:', error.message);
    } else {
      console.log('✅ Purchases table deployed successfully!');
      successCount++;
    }
  } catch (err) {
    console.log('❌ Purchases check failed:', err.message);
  }

  // Final result
  console.log('\n' + '=====================================');
  console.log('📊 VERIFICATION RESULTS');
  console.log('=====================================');
  console.log(`✅ Success: ${successCount}/${totalChecks} tables deployed`);

  if (successCount === totalChecks) {
    console.log('\n🎉 DEPLOYMENT SUCCESSFUL!');
    console.log('✅ All tables are now available');
    console.log('✅ Console 404 errors should be resolved');
    console.log('✅ Website features should work correctly');

    console.log('\n🧹 Clean browser cache and test:');
    console.log('  1. Hard refresh: Ctrl+F5 (or Cmd+Shift+R)');
    console.log('  2. Test newsletter subscription');
    console.log('  3. Check console for errors');
  } else {
    console.log('\n⚠️ DEPLOYMENT INCOMPLETE');
    console.log(`❌ ${totalChecks - successCount} table(s) still missing`);

    console.log('\n🔧 To complete deployment:');
    console.log('  1. Go to: https://mybase.clubcreole.fr/project/_/sql');
    console.log('  2. Execute: DEPLOY_TABLES_NOW.sql');
    console.log('  3. Run this verification script again');
  }
}

// Run verification
verifyDeployment().catch(console.error);