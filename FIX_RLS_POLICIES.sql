-- FIX RLS POLICIES - CORRECTED SYNTAX
-- Execute this in Supabase SQL Editor

-- =====================================================
-- STEP 1: Remove all existing RLS policies
-- =====================================================
DROP POLICY IF EXISTS "subscribers_insert_policy" ON "public"."subscribers";
DROP POLICY IF EXISTS "subscribers_read_policy" ON "public"."subscribers";
DROP POLICY IF EXISTS "subscribers_update_policy" ON "public"."subscribers";
DROP POLICY IF EXISTS "subscribers_service_policy" ON "public"."subscribers";

DROP POLICY IF EXISTS "purchases_read_policy" ON "public"."purchases";
DROP POLICY IF EXISTS "purchases_service_policy" ON "public"."purchases";
DROP POLICY IF EXISTS "purchases_insert_policy" ON "public"."purchases";

-- =====================================================
-- STEP 2: Create corrected RLS policies for subscribers
-- =====================================================

-- Allow anyone to insert subscribers (for newsletter signups)
CREATE POLICY "Allow public insert" ON "public"."subscribers"
  FOR INSERT TO PUBLIC WITH CHECK (true);

-- Allow users to read their own subscriber data
CREATE POLICY "Allow users read own" ON "public"."subscribers"
  FOR SELECT TO PUBLIC USING (email = auth.jwt() ->> 'email');

-- Allow users to update their own subscriber data
CREATE POLICY "Allow users update own" ON "public"."subscribers"
  FOR UPDATE TO PUBLIC USING (email = auth.jwt() ->> 'email');

-- Allow service role full access
CREATE POLICY "Allow service role all" ON "public"."subscribers"
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- =====================================================
-- STEP 3: Create corrected RLS policies for purchases
-- =====================================================

-- Allow users to read their own purchases
CREATE POLICY "Allow users read own purchases" ON "public"."purchases"
  FOR SELECT TO authenticated USING (user_id = auth.uid());

-- Allow service role to manage purchases
CREATE POLICY "Allow service role all purchases" ON "public"."purchases"
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- =====================================================
-- STEP 4: Verify RLS is enabled
-- =====================================================
ALTER TABLE "public"."subscribers" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."purchases" ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- STEP 5: Grant proper permissions
-- =====================================================
GRANT ALL ON TABLE "public"."subscribers" TO "anon";
GRANT ALL ON TABLE "public"."subscribers" TO "authenticated";
GRANT ALL ON TABLE "public"."subscribers" TO "service_role";

GRANT ALL ON TABLE "public"."purchases" TO "authenticated";
GRANT ALL ON TABLE "public"."purchases" TO "service_role";

-- Success confirmation
SELECT 'RLS policies fixed successfully!' as status;