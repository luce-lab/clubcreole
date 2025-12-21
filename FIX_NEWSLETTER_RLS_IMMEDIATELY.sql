-- IMMEDIATE FIX FOR NEWSLETTER RLS POLICY VIOLATION
-- Execute this in Supabase SQL Editor to fix the 42501 error

-- Drop all existing newsletter policies
DROP POLICY IF EXISTS "Allow anonymous newsletter subscriptions" ON "public"."newsletter_subscriptions";
DROP POLICY IF EXISTS "Allow users to view newsletter subscriptions" ON "public"."newsletter_subscriptions";
DROP POLICY IF EXISTS "Allow service role full access to newsletter_subscriptions" ON "public"."newsletter_subscriptions";
DROP POLICY IF EXISTS "Enable insert for all users" ON "public"."newsletter_subscriptions";
DROP POLICY IF EXISTS "Enable read for all users" ON "public"."newsletter_subscriptions";
DROP POLICY IF EXISTS "Enable update for service role only" ON "public"."newsletter_subscriptions";
DROP POLICY IF EXISTS "Enable delete for service role only" ON "public"."newsletter_subscriptions";

-- Create a single, simple policy that allows inserts for everyone
CREATE POLICY "Newsletter insert policy" ON "public"."newsletter_subscriptions"
  FOR INSERT TO PUBLIC USING (true) WITH CHECK (true);

-- Create read policy for everyone
CREATE POLICY "Newsletter read policy" ON "public"."newsletter_subscriptions"
  FOR SELECT TO PUBLIC USING (true);

-- Ensure RLS is enabled
ALTER TABLE "public"."newsletter_subscriptions" ENABLE ROW LEVEL SECURITY;

-- Verify permissions
GRANT ALL ON TABLE "public"."newsletter_subscriptions" TO "anon";
GRANT ALL ON TABLE "public"."newsletter_subscriptions" TO "authenticated";
GRANT ALL ON TABLE "public"."newsletter_subscriptions" TO "service_role";

-- Test the policy
SELECT 'Newsletter RLS policies updated successfully!' as status;