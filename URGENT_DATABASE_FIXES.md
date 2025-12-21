# 🚨 URGENT DATABASE FIXES NEEDED

## Issues Found in Console:

1. **CRITICAL**: RLS policy violation for `newsletter_subscriptions` (403 Forbidden)
2. **MISSING TABLES**: `purchases` and `subscribers` tables don't exist (404 errors)
3. **FIXED**: DialogContent accessibility warnings ✅

## 🎯 Immediate Actions Required:

### 1. Fix Newsletter RLS Policies (URGENT)

**Problem**: Users can't subscribe to newsletter (403 Forbidden)
**Location**: Supabase SQL Editor: https://mybase.clubcreole.fr/project/_/sql

```sql
-- Execute this SQL first:
DROP POLICY IF EXISTS "Allow anonymous newsletter subscriptions" ON "public"."newsletter_subscriptions";
DROP POLICY IF EXISTS "Allow users to view newsletter subscriptions" ON "public"."newsletter_subscriptions";
DROP POLICY IF EXISTS "Allow service role full access to newsletter subscriptions" ON "public"."newsletter_subscriptions";

-- Create working policies:
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
```

### 2. Create Missing Tables (URGENT)

**Problem**: Subscription management features are broken
**Execute after newsletter fix**:

```sql
-- Create subscribers table
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

-- Create purchases table
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

-- Enable RLS
ALTER TABLE "public"."subscribers" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."purchases" ENABLE ROW LEVEL SECURITY;

-- Basic policies for subscribers
CREATE POLICY "Allow users to read own subscriber data" ON "public"."subscribers"
  FOR SELECT TO PUBLIC USING (email = auth.jwt() ->> 'email');
CREATE POLICY "Allow users to insert subscriber data" ON "public"."subscribers"
  FOR INSERT TO PUBLIC WITH CHECK (true);

-- Basic policies for purchases
CREATE POLICY "Allow users to read own purchases" ON "public"."purchases"
  FOR SELECT TO authenticated USING (user_id = auth.uid());

-- Service role full access
CREATE POLICY "Allow service role full access to subscribers" ON "public"."subscribers"
  FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Allow service role full access to purchases" ON "public"."purchases"
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Grant permissions
GRANT ALL ON TABLE "public"."subscribers" TO "anon";
GRANT ALL ON TABLE "public"."subscribers" TO "authenticated";
GRANT ALL ON TABLE "public"."subscribers" TO "service_role";
GRANT ALL ON TABLE "public"."purchases" TO "authenticated";
GRANT ALL ON TABLE "public"."purchases" TO "service_role";
```

## ✅ Verification Steps:

After executing the SQL:

1. **Test Newsletter**: Try subscribing with a new email on your website
2. **Check Console**: No more 403/404 errors should appear
3. **Test Subscription**: Navigate to subscription pages to ensure they work

## 📁 Files Available for Reference:

- `fix_newsletter_rls.sql` - Newsletter RLS fix
- `create_subscription_tables.sql` - Complete subscription tables
- `URGENT_DATABASE_FIXES.md` - This guide

## 🚨 Impact:

- **Newsletter**: Currently broken for all users
- **Subscription Management**: Currently non-functional
- **User Experience**: Console errors affecting usability

**Priority**: CRITICAL - These errors are blocking core functionality

Execute the SQL fixes immediately to restore full functionality.