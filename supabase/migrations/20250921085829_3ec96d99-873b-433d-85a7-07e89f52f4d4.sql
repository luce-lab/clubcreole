-- Fix security issue: Enable RLS on tables that have policies but RLS disabled
-- This addresses the "Policy Exists RLS Disabled" security findings

-- Enable RLS on accommodations table (has policies but RLS disabled)
ALTER TABLE public.accommodations ENABLE ROW LEVEL SECURITY;

-- Enable RLS on activities table (has policies but RLS disabled) 
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- Enable RLS on bons_plans table (has policies but RLS disabled)
ALTER TABLE public.bons_plans ENABLE ROW LEVEL SECURITY;

-- Enable RLS on nightlife_events table (has policies but RLS disabled)
ALTER TABLE public.nightlife_events ENABLE ROW LEVEL SECURITY;

-- Enable RLS on promotions table (has policies but RLS disabled)
ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;

-- Enable RLS on restaurants table (has policies but RLS disabled)
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;