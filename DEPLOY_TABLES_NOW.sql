-- DEPLOY MISSING DATABASE TABLES - EXECUTE IMMEDIATELY
-- Copy and paste this entire script into Supabase SQL Editor
-- https://mybase.clubcreole.fr/project/_/sql

-- =====================================================
-- STEP 1: Create subscribers table
-- =====================================================
CREATE TABLE IF NOT EXISTS "public"."subscribers" (
  "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  "email" text NOT NULL,
  "subscribed" boolean DEFAULT true,
  "subscription_tier" text DEFAULT 'free' CHECK (subscription_tier IN ('free', 'basic', 'premium')),
  "subscription_end" timestamptz,
  "subscription_status" text DEFAULT 'active' CHECK (subscription_status IN ('active', 'cancelled', 'expired', 'trial')),
  "cancel_at_period_end" boolean DEFAULT false,
  "last_invoice_amount" decimal(10,2),
  "last_invoice_date" timestamptz,
  "trial_end" timestamptz,
  "payment_method" text,
  "stripe_subscription_id" text,
  "created_at" timestamptz DEFAULT now(),
  "updated_at" timestamptz DEFAULT now()
);

-- =====================================================
-- STEP 2: Create purchases table
-- =====================================================
CREATE TABLE IF NOT EXISTS "public"."purchases" (
  "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  "user_id" uuid REFERENCES auth.users(id),
  "amount" decimal(10,2) NOT NULL,
  "currency" text DEFAULT 'eur' NOT NULL,
  "status" text NOT NULL CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  "purchase_date" timestamptz DEFAULT now(),
  "stripe_invoice_id" text,
  "stripe_payment_intent_id" text,
  "metadata" jsonb,
  "created_at" timestamptz DEFAULT now()
);

-- =====================================================
-- STEP 3: Enable Row Level Security
-- =====================================================
ALTER TABLE "public"."subscribers" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."purchases" ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- STEP 4: Create performance indexes
-- =====================================================
CREATE INDEX IF NOT EXISTS "idx_subscribers_email" ON "public"."subscribers"(email);
CREATE INDEX IF NOT EXISTS "idx_subscribers_status" ON "public"."subscribers"(subscription_status);
CREATE INDEX IF NOT EXISTS "idx_purchases_user_id" ON "public"."purchases"(user_id);
CREATE INDEX IF NOT EXISTS "idx_purchases_status" ON "public"."purchases"(status);
CREATE INDEX IF NOT EXISTS "idx_purchases_date" ON "public"."purchases"(purchase_date);

-- =====================================================
-- STEP 5: Create RLS Policies for subscribers
-- =====================================================
DROP POLICY IF EXISTS "subscribers_insert_policy" ON "public"."subscribers";
CREATE POLICY "subscribers_insert_policy" ON "public"."subscribers"
  FOR INSERT TO PUBLIC WITH CHECK (true);

DROP POLICY IF EXISTS "subscribers_read_policy" ON "public"."subscribers";
CREATE POLICY "subscribers_read_policy" ON "public"."subscribers"
  FOR SELECT TO PUBLIC USING (email = auth.jwt() ->> 'email');

DROP POLICY IF EXISTS "subscribers_update_policy" ON "public"."subscribers";
CREATE POLICY "subscribers_update_policy" ON "public"."subscribers"
  FOR UPDATE TO PUBLIC USING (email = auth.jwt() ->> 'email');

DROP POLICY IF EXISTS "subscribers_service_policy" ON "public"."subscribers";
CREATE POLICY "subscribers_service_policy" ON "public"."subscribers"
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- =====================================================
-- STEP 6: Create RLS Policies for purchases
-- =====================================================
DROP POLICY IF EXISTS "purchases_read_policy" ON "public"."purchases";
CREATE POLICY "purchases_read_policy" ON "public"."purchases"
  FOR SELECT TO authenticated USING (user_id = auth.uid());

DROP POLICY IF EXISTS "purchases_service_policy" ON "public"."purchases";
CREATE POLICY "purchases_service_policy" ON "public"."purchases"
  FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "purchases_insert_policy" ON "public"."purchases";
CREATE POLICY "purchases_insert_policy" ON "public"."purchases"
  FOR INSERT TO service_role WITH CHECK (true);

-- =====================================================
-- STEP 7: Grant permissions
-- =====================================================
GRANT ALL ON TABLE "public"."subscribers" TO "anon";
GRANT ALL ON TABLE "public"."subscribers" TO "authenticated";
GRANT ALL ON TABLE "public"."subscribers" TO "service_role";

GRANT ALL ON TABLE "public"."purchases" TO "authenticated";
GRANT ALL ON TABLE "public"."purchases" TO "service_role";

-- =====================================================
-- STEP 8: Add comments for documentation
-- =====================================================
COMMENT ON TABLE "public"."subscribers" IS 'Subscription information for Club Créole users';
COMMENT ON TABLE "public"."purchases" IS 'Purchase and payment records for Club Créole';

-- =====================================================
-- STEP 9: Verification queries
-- =====================================================
SELECT 'Subscribers table created successfully!' as status,
       (SELECT COUNT(*) FROM "public"."subscribers") as record_count
UNION ALL
SELECT 'Purchases table created successfully!' as status,
       (SELECT COUNT(*) FROM "public"."purchases") as record_count;