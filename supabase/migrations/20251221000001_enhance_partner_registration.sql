-- Migration: Enhance Partner Registration System
-- Adds new fields, updates RLS policies, and prepares for account creation

-- ========================================
-- PART 1: Add missing columns if they don't exist
-- ========================================

-- Add email column (for partner contact)
ALTER TABLE public.partners
ADD COLUMN IF NOT EXISTS email TEXT;

-- Add contact_name column (person submitting the application)
ALTER TABLE public.partners
ADD COLUMN IF NOT EXISTS contact_name TEXT;

-- Add SIRET column (French business registration number - optional)
ALTER TABLE public.partners
ADD COLUMN IF NOT EXISTS siret TEXT;

-- Add opening_hours column (business hours - optional)
ALTER TABLE public.partners
ADD COLUMN IF NOT EXISTS opening_hours TEXT;

-- ========================================
-- PART 2: Add indexes and constraints
-- ========================================

-- Add index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_partners_email ON public.partners(email);

-- Add index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_partners_user_id ON public.partners(user_id);

-- Add unique constraint on email (if not exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'partners_email_unique'
  ) THEN
    ALTER TABLE public.partners ADD CONSTRAINT partners_email_unique UNIQUE (email);
  END IF;
END $$;

-- Add unique constraint on business_name (if not exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'partners_business_name_unique'
  ) THEN
    ALTER TABLE public.partners ADD CONSTRAINT partners_business_name_unique UNIQUE (business_name);
  END IF;
END $$;

-- ========================================
-- PART 3: Update RLS policies
-- ========================================

-- Enable RLS (should already be enabled)
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to recreate them with updated logic
DROP POLICY IF EXISTS "Public read access for partners" ON public.partners;
DROP POLICY IF EXISTS "Public can insert partner applications" ON public.partners;
DROP POLICY IF EXISTS "Admin can update partners" ON public.partners;
DROP POLICY IF EXISTS "Admin can delete partners" ON public.partners;
DROP POLICY IF EXISTS "Partners can view own data" ON public.partners;
DROP POLICY IF EXISTS "Partners can update own profile" ON public.partners;

-- Create public read policy for approved partners (for displaying on the site)
CREATE POLICY "Public read access for approved partners"
ON public.partners
FOR SELECT
USING (status = 'approuve');

-- Create policy for partners to view their own data (any status)
CREATE POLICY "Partners can view own data"
ON public.partners
FOR SELECT
USING (auth.uid() = user_id);

-- Create policy for admins to view all partners
CREATE POLICY "Admin can view all partners"
ON public.partners
FOR SELECT
USING (is_super_admin());

-- Create public insert policy (for partner application form submissions)
CREATE POLICY "Public can insert partner applications"
ON public.partners
FOR INSERT
WITH CHECK (
  -- Anyone can insert, but status must be 'en_attente'
  status = 'en_attente'
);

-- Partners can update their own profile (limited fields)
CREATE POLICY "Partners can update own profile"
ON public.partners
FOR UPDATE
USING (auth.uid() = user_id AND status = 'approuve')
WITH CHECK (
  auth.uid() = user_id
  AND status = 'approuve'
  -- Note: In production, you may want to restrict which fields can be updated
);

-- Only admins can update partner status (approve/reject)
CREATE POLICY "Admin can update partners"
ON public.partners
FOR UPDATE
USING (is_super_admin())
WITH CHECK (is_super_admin());

-- Only admins can delete partners
CREATE POLICY "Admin can delete partners"
ON public.partners
FOR DELETE
USING (is_super_admin());

-- ========================================
-- PART 4: Add comments for documentation
-- ========================================

COMMENT ON COLUMN public.partners.email IS 'Contact email for the partner business';
COMMENT ON COLUMN public.partners.contact_name IS 'Name of the contact person who submitted the partner application';
COMMENT ON COLUMN public.partners.siret IS 'French SIRET business registration number (optional)';
COMMENT ON COLUMN public.partners.opening_hours IS 'Business opening hours (optional)';
COMMENT ON COLUMN public.partners.user_id IS 'Reference to auth.users for partners with accounts';

-- ========================================
-- PART 5: Verification queries
-- ========================================

-- Check if all columns exist
DO $$
DECLARE
    col_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO col_count
    FROM information_schema.columns
    WHERE table_name = 'partners'
      AND table_schema = 'public'
      AND column_name IN ('email', 'contact_name', 'siret', 'opening_hours', 'user_id');

    IF col_count = 5 THEN
        RAISE NOTICE 'All required columns exist in partners table';
    ELSE
        RAISE WARNING 'Some columns are missing. Found % out of 5', col_count;
    END IF;
END $$;
