# Deploy Newsletter Table to Production

## Overview
The `newsletter_subscriptions` table needs to be created on the production Supabase database to fix the 404 API error.

## 🎯 Quick Deployment Steps

### Option 1: Supabase Dashboard SQL Editor (Recommended)

1. **Open Supabase Dashboard**
   - Go to: https://mybase.clubcreole.fr/project/_/sql
   - Or login at https://app.supabase.com and select project `psryoyugyimibjhwhvlh`

2. **Execute the SQL**
   ```sql
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
   ```

3. **Click "Run"** to execute

### Option 2: Supabase CLI

```bash
# Install Supabase CLI
curl -L https://github.com/supabase/cli/releases/latest/download/supabase_linux_amd64.tar.gz | tar -xz

# Login to Supabase
./supabase login

# Link to your project
./supabase link --project-ref psryoyugyimibjhwhvlh

# Deploy the migration
./supabase db push
```

### Option 3: Database Client Connection

**Connection Details:**
- Host: `mybase.clubcreole.fr`
- Port: `5432`
- Database: `postgres`
- User: `postgres`
- Password: Get from Supabase Dashboard > Settings > Database

**SQL to execute:** Same as in Option 1

## ✅ Verification

After deployment, verify the table exists:

```bash
# Test with curl
curl -X GET "https://mybase.clubcreole.fr/rest/v1/newsletter_subscriptions?select=count" \
  -H "apikey: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2NTQ1NTg0MCwiZXhwIjo0OTIxMTI5NDQwLCJyb2xlIjoiYW5vbiJ9.9EV9qQ5zUttYzhN6hZwi4rlZvKoq02RzE-OJVI_pIbE" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2NTQ1NTg0MCwiZXhwIjo0OTIxMTI5NDQwLCJyb2xlIjoiYW5vbiJ9.9EV9qQ5zUttYzhN6hZwi4rlZvKoq02RzE-OJVI_pIbE"
```

**Expected response:** `{"count":0}` (empty table)

Or check in the Supabase Dashboard:
- Go to: https://mybase.clubcreole.fr/project/_/editor
- Look for `newsletter_subscriptions` in the table list

## 🔄 What This Fixes

After deployment:
- ✅ Newsletter subscription API will work (no more 404 errors)
- ✅ Users can subscribe to newsletters
- ✅ Console errors will be resolved
- ✅ Proper RLS policies are in place for security

## 📁 Files Created

- `supabase/migrations/20251221110000_newsletter_subscriptions.sql` - Migration file
- `newsletter_table_deployment.sql` - Deployment SQL script

## 🛡️ Security Notes

- RLS (Row Level Security) is enabled
- Anonymous users can insert (subscribe)
- All users can view (for transparency)
- Service role has full access
- Email uniqueness is enforced