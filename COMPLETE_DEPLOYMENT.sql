-- COMPLETE DATABASE DEPLOYMENT - FIXED RLS SYNTAX
-- Execute this entire script in Supabase SQL Editor
-- https://mybase.clubcreole.fr/project/_/sql

-- =====================================================
-- STEP 1: Drop all tables if they exist (clean start)
-- =====================================================
DROP TABLE IF EXISTS "public"."subscribers" CASCADE;
DROP TABLE IF EXISTS "public"."purchases" CASCADE;

-- =====================================================
-- STEP 2: Create subscribers table
-- =====================================================
CREATE TABLE "public"."subscribers" (
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
-- STEP 3: Create purchases table
-- =====================================================
CREATE TABLE "public"."purchases" (
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
-- STEP 4: Create performance indexes
-- =====================================================
CREATE INDEX "idx_subscribers_email" ON "public"."subscribers"(email);
CREATE INDEX "idx_subscribers_status" ON "public"."subscribers"(subscription_status);
CREATE INDEX "idx_purchases_user_id" ON "public"."purchases"(user_id);
CREATE INDEX "idx_purchases_status" ON "public"."purchases"(status);
CREATE INDEX "idx_purchases_date" ON "public"."purchases"(purchase_date);

-- =====================================================
-- STEP 5: Enable Row Level Security
-- =====================================================
ALTER TABLE "public"."subscribers" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."purchases" ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- STEP 6: Create RLS Policies for subscribers
-- =====================================================

-- Policy: Allow public to insert (for signups)
CREATE POLICY "Allow public insert" ON "public"."subscribers"
  FOR INSERT TO PUBLIC WITH CHECK (true);

-- Policy: Allow users to read their own data
CREATE POLICY "Allow users read own" ON "public"."subscribers"
  FOR SELECT TO PUBLIC USING (email = auth.jwt() ->> 'email');

-- Policy: Allow users to update their own data
CREATE POLICY "Allow users update own" ON "public"."subscribers"
  FOR UPDATE TO PUBLIC USING (email = auth.jwt() ->> 'email');

-- Policy: Allow service role full access
CREATE POLICY "Allow service role all" ON "public"."subscribers"
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- =====================================================
-- STEP 7: Create RLS Policies for purchases
-- =====================================================

-- Policy: Allow users to read their own purchases
CREATE POLICY "Allow users read own purchases" ON "public"."purchases"
  FOR SELECT TO authenticated USING (user_id = auth.uid());

-- Policy: Allow service role to manage purchases
CREATE POLICY "Allow service role all purchases" ON "public"."purchases"
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- =====================================================
-- STEP 8: Grant permissions
-- =====================================================
GRANT ALL ON TABLE "public"."subscribers" TO "anon";
GRANT ALL ON TABLE "public"."subscribers" TO "authenticated";
GRANT ALL ON TABLE "public"."subscribers" TO "service_role";

GRANT ALL ON TABLE "public"."purchases" TO "authenticated";
GRANT ALL ON TABLE "public"."purchases" TO "service_role";

-- =====================================================
-- STEP 9: Add comments
-- =====================================================
COMMENT ON TABLE "public"."subscribers" IS 'Subscription information for Club Créole users';
COMMENT ON TABLE "public"."purchases" IS 'Purchase and payment records for Club Créole';

-- =====================================================
-- STEP 10: Verification
-- =====================================================
SELECT 'Deployment completed successfully!' as status,
       (SELECT COUNT(*) FROM "public"."subscribers") as subscribers_count,
       (SELECT COUNT(*) FROM "public"."purchases") as purchases_count;