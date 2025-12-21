-- IMMEDIATE DEPLOYMENT SQL
-- Execute this in Supabase SQL Editor: https://mybase.clubcreole.fr/project/_/sql

-- Create subscribers table (CRITICAL - needed for subscription features)
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

-- Create purchases table (CRITICAL - needed for payment tracking)
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

-- Enable RLS (Row Level Security)
ALTER TABLE "public"."subscribers" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."purchases" ENABLE ROW LEVEL SECURITY;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS "idx_subscribers_email" ON "public"."subscribers"(email);
CREATE INDEX IF NOT EXISTS "idx_subscribers_status" ON "public"."subscribers"(subscription_status);
CREATE INDEX IF NOT EXISTS "idx_purchases_user_id" ON "public"."purchases"(user_id);
CREATE INDEX IF NOT EXISTS "idx_purchases_status" ON "public"."purchases"(status);
CREATE INDEX IF NOT EXISTS "idx_purchases_date" ON "public"."purchases"(purchase_date);

-- RLS Policies for subscribers
DROP POLICY IF EXISTS "Allow users to read own subscriber data" ON "public"."subscribers";
CREATE POLICY "Allow users to read own subscriber data" ON "public"."subscribers"
  FOR SELECT TO PUBLIC USING (email = auth.jwt() ->> 'email');

DROP POLICY IF EXISTS "Allow users to insert subscriber data" ON "public"."subscribers";
CREATE POLICY "Allow users to insert subscriber data" ON "public"."subscribers"
  FOR INSERT TO PUBLIC WITH CHECK (true);

DROP POLICY IF EXISTS "Allow users to update own subscriber data" ON "public"."subscribers";
CREATE POLICY "Allow users to update own subscriber data" ON "public"."subscribers"
  FOR UPDATE TO PUBLIC USING (email = auth.jwt() ->> 'email') WITH CHECK (email = auth.jwt() ->> 'email');

DROP POLICY IF EXISTS "Allow service role full access to subscribers" ON "public"."subscribers";
CREATE POLICY "Allow service role full access to subscribers" ON "public"."subscribers"
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- RLS Policies for purchases
DROP POLICY IF EXISTS "Allow users to read own purchases" ON "public"."purchases";
CREATE POLICY "Allow users to read own purchases" ON "public"."purchases"
  FOR SELECT TO authenticated USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Allow service role full access to purchases" ON "public"."purchases";
CREATE POLICY "Allow service role full access to purchases" ON "public"."purchases"
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Grant permissions
GRANT ALL ON TABLE "public"."subscribers" TO "anon";
GRANT ALL ON TABLE "public"."subscribers" TO "authenticated";
GRANT ALL ON TABLE "public"."subscribers" TO "service_role";
GRANT ALL ON TABLE "public"."purchases" TO "authenticated";
GRANT ALL ON TABLE "public"."purchases" TO "service_role";

-- Add comments for documentation
COMMENT ON TABLE "public"."subscribers" IS 'Subscription information for users';
COMMENT ON TABLE "public"."purchases" IS 'Purchase and payment records';

-- Success confirmation
SELECT 'Database tables created successfully!' as status;