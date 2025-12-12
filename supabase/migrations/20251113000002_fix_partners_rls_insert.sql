-- Fix RLS policies for partners table to allow public form submissions
-- This allows the partner application form to work properly

-- Enable RLS if not already enabled (should already be enabled from previous migration)
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to recreate them
DROP POLICY IF EXISTS "Public read access for partners" ON public.partners;
DROP POLICY IF EXISTS "Public can insert partner applications" ON public.partners;

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
DROP POLICY IF EXISTS "Admin can update partners" ON public.partners;
CREATE POLICY "Admin can update partners"
ON public.partners
FOR UPDATE
USING (is_super_admin())
WITH CHECK (is_super_admin());

-- Only admins can delete partners
DROP POLICY IF EXISTS "Admin can delete partners" ON public.partners;
CREATE POLICY "Admin can delete partners"
ON public.partners
FOR DELETE
USING (is_super_admin());
