-- Add missing contact fields to partners table for partner application form
-- This migration adds email and contact_name fields that are used in the PartnerApplicationForm component

-- Add email field (required for partner contact)
ALTER TABLE public.partners
ADD COLUMN IF NOT EXISTS email TEXT;

-- Add contact_name field (person submitting the application)
ALTER TABLE public.partners
ADD COLUMN IF NOT EXISTS contact_name TEXT;

-- Add index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_partners_email ON public.partners(email);

-- Add unique constraint on email to prevent duplicate partner applications
ALTER TABLE public.partners
ADD CONSTRAINT partners_email_unique UNIQUE (email);

-- Add comment explaining these fields
COMMENT ON COLUMN public.partners.email IS 'Contact email for the partner business';
COMMENT ON COLUMN public.partners.contact_name IS 'Name of the contact person who submitted the partner application';
