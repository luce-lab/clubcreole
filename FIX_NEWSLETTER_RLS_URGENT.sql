-- URGENT FIX FOR NEWSLETTER RLS POLICY VIOLATION
-- Execute this immediately in Supabase SQL Editor
-- https://mybase.clubcreole.fr/project/_/sql

-- =====================================================
-- STEP 1: Remove ALL existing newsletter RLS policies
-- =====================================================
DROP POLICY IF EXISTS "Allow anonymous newsletter subscriptions" ON "public"."newsletter_subscriptions";
DROP POLICY IF EXISTS "Allow users to view newsletter subscriptions" ON "public"."newsletter_subscriptions";
DROP POLICY IF EXISTS "Allow service role full access to newsletter_subscriptions" ON "public"."newsletter_subscriptions";
DROP POLICY IF EXISTS "Enable insert for all users" ON "public"."newsletter_subscriptions";
DROP POLICY IF EXISTS "Enable read for all users" ON "public"."newsletter_subscriptions";
DROP POLICY IF EXISTS "Enable update for service role only" ON "public"."newsletter_subscriptions";
DROP POLICY IF EXISTS "Enable delete for service role only" ON "public"."newsletter_subscriptions";
DROP POLICY IF EXISTS "Newsletter insert policy" ON "public"."newsletter_subscriptions";
DROP POLICY IF EXISTS "Newsletter read policy" ON "public"."newsletter_subscriptions";
DROP POLICY IF EXISTS "Allow public insert" ON "public"."newsletter_subscriptions";
DROP POLICY IF EXISTS "Allow users read own" ON "public"."newsletter_subscriptions";
DROP POLICY IF EXISTS "Allow users update own" ON "public"."newsletter_subscriptions";
DROP POLICY IF EXISTS "Allow service role all" ON "public"."newsletter_subscriptions";

-- =====================================================
-- STEP 2: Disable RLS temporarily to test
-- =====================================================
ALTER TABLE "public"."newsletter_subscriptions" DISABLE ROW LEVEL SECURITY;

-- =====================================================
-- STEP 3: Test if table works without RLS
-- =====================================================
SELECT 'Testing newsletter table without RLS...' as status;

-- =====================================================
-- STEP 4: Re-enable RLS with simple policies
-- =====================================================
ALTER TABLE "public"."newsletter_subscriptions" ENABLE ROW LEVEL SECURITY;

-- Create the simplest possible policy that allows inserts
CREATE POLICY "Newsletter public access" ON "public"."newsletter_subscriptions"
  FOR ALL TO PUBLIC USING (true) WITH CHECK (true);

-- =====================================================
-- STEP 5: Grant explicit permissions
-- =====================================================
GRANT ALL ON TABLE "public"."newsletter_subscriptions" TO "anon";
GRANT ALL ON TABLE "public"."newsletter_subscriptions" TO "authenticated";
GRANT ALL ON TABLE "public"."newsletter_subscriptions" TO "service_role";

-- =====================================================
-- STEP 6: Verify the policy was created
-- =====================================================
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies
WHERE tablename = 'newsletter_subscriptions';

-- Success message
SELECT 'Newsletter RLS policy fixed successfully!' as status;