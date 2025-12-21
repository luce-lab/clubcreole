
-- Create newsletter_subscriptions table
CREATE TABLE IF NOT EXISTS "public"."newsletter_subscriptions" (
  "id" bigserial PRIMARY KEY,
  "email" text NOT NULL,
  "created_at" timestamptz DEFAULT now()
);

-- Add unique constraint
ALTER TABLE ONLY "public"."newsletter_subscriptions"
  ADD CONSTRAINT "newsletter_subscriptions_email_key" UNIQUE ("email");

-- Enable Row Level Security
ALTER TABLE "public"."newsletter_subscriptions" ENABLE ROW LEVEL SECURITY;

-- RLS Policies
DROP POLICY IF EXISTS "Allow anonymous newsletter subscriptions" ON "public"."newsletter_subscriptions";
CREATE POLICY "Allow anonymous newsletter subscriptions" ON "public"."newsletter_subscriptions" FOR INSERT TO "anon" WITH CHECK (true);

DROP POLICY IF EXISTS "Allow users to view newsletter subscriptions" ON "public"."newsletter_subscriptions";
CREATE POLICY "Allow users to view newsletter subscriptions" ON "public"."newsletter_subscriptions" FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow service role full access to newsletter subscriptions" ON "public"."newsletter_subscriptions";
CREATE POLICY "Allow service role full access to newsletter subscriptions" ON "public"."newsletter_subscriptions" FOR ALL TO "service_role" USING (true) WITH CHECK (true);

-- Grant permissions
GRANT ALL ON TABLE "public"."newsletter_subscriptions" TO "anon";
GRANT ALL ON TABLE "public"."newsletter_subscriptions" TO "authenticated";
GRANT ALL ON TABLE "public"."newsletter_subscriptions" TO "service_role";

-- Comments
COMMENT ON TABLE "public"."newsletter_subscriptions" IS 'Stores email addresses for newsletter subscriptions';
