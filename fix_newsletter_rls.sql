-- Fix RLS policies for newsletter_subscriptions table
-- The current policies are too restrictive and preventing anonymous inserts

-- Drop existing policies
DROP POLICY IF EXISTS "Allow anonymous newsletter subscriptions" ON "public"."newsletter_subscriptions";
DROP POLICY IF EXISTS "Allow users to view newsletter subscriptions" ON "public"."newsletter_subscriptions";
DROP POLICY IF EXISTS "Allow service role full access to newsletter subscriptions" ON "public"."newsletter_subscriptions";

-- Create new, properly configured policies
CREATE POLICY "Enable insert for all users" ON "public"."newsletter_subscriptions"
  FOR INSERT TO PUBLIC USING (true) WITH CHECK (true);

CREATE POLICY "Enable read for all users" ON "public"."newsletter_subscriptions"
  FOR SELECT TO PUBLIC USING (true);

CREATE POLICY "Enable update for service role only" ON "public"."newsletter_subscriptions"
  FOR UPDATE TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Enable delete for service role only" ON "public"."newsletter_subscriptions"
  FOR DELETE TO service_role USING (true);

-- Ensure RLS is enabled
ALTER TABLE "public"."newsletter_subscriptions" ENABLE ROW LEVEL SECURITY;

-- Verify permissions
GRANT ALL ON TABLE "public"."newsletter_subscriptions" TO "anon";
GRANT ALL ON TABLE "public"."newsletter_subscriptions" TO "authenticated";
GRANT ALL ON TABLE "public"."newsletter_subscriptions" TO "service_role";