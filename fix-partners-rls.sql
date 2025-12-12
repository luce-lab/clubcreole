-- Fix RLS policy for partners table
-- This will allow public read access to the partners table

-- First, enable RLS if not already enabled
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists (to avoid conflicts)
DROP POLICY IF EXISTS "Public read access for partners" ON public.partners;

-- Create the public read policy
CREATE POLICY "Public read access for partners"
ON public.partners
FOR SELECT
USING (true);

-- Verify the policy was created
SELECT
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies
WHERE tablename = 'partners';
