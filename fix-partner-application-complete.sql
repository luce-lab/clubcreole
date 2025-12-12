-- Complete fix for partner application form feature
-- Run this in your Supabase SQL Editor
-- Project: psryoyugyimibjhwhvlh

-- ========================================
-- PART 1: Add missing contact fields
-- ========================================

-- Add email field (required for partner contact)
ALTER TABLE public.partners
ADD COLUMN IF NOT EXISTS email TEXT;

-- Add contact_name field (person submitting the application)
ALTER TABLE public.partners
ADD COLUMN IF NOT EXISTS contact_name TEXT;

-- Add index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_partners_email ON public.partners(email);

-- Add unique constraint on email to prevent duplicate partner applications
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'partners_email_unique'
  ) THEN
    ALTER TABLE public.partners ADD CONSTRAINT partners_email_unique UNIQUE (email);
  END IF;
END $$;

-- Add comments explaining these fields
COMMENT ON COLUMN public.partners.email IS 'Contact email for the partner business';
COMMENT ON COLUMN public.partners.contact_name IS 'Name of the contact person who submitted the partner application';

-- ========================================
-- PART 2: Fix RLS policies
-- ========================================

-- Enable RLS (should already be enabled)
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to recreate them
DROP POLICY IF EXISTS "Public read access for partners" ON public.partners;
DROP POLICY IF EXISTS "Public can insert partner applications" ON public.partners;
DROP POLICY IF EXISTS "Admin can update partners" ON public.partners;
DROP POLICY IF EXISTS "Admin can delete partners" ON public.partners;

-- Create public read policy (for displaying partner data)
CREATE POLICY "Public read access for partners"
ON public.partners
FOR SELECT
USING (true);

-- Create public insert policy (for partner application form submissions)
-- This allows anyone to submit a partner application
CREATE POLICY "Public can insert partner applications"
ON public.partners
FOR INSERT
WITH CHECK (
  -- Anyone can insert, but status must be 'en_attente'
  status = 'en_attente'
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
-- PART 3: Verify setup
-- ========================================

-- Check if the columns were added successfully
SELECT
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'partners'
  AND table_schema = 'public'
  AND column_name IN ('email', 'contact_name')
ORDER BY column_name;

-- Check if RLS policies are in place
SELECT
    schemaname,
    tablename,
    policyname,
    permissive,
    cmd
FROM pg_policies
WHERE tablename = 'partners'
ORDER BY policyname;

-- Display success message
DO $$
BEGIN
  RAISE NOTICE 'Partner application form setup completed successfully!';
  RAISE NOTICE 'You can now test the form at /devenir-partenaire';
END $$;
