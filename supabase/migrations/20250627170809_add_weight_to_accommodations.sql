-- Add weight column to accommodations table for weighted random sorting
ALTER TABLE public.accommodations 
ADD COLUMN weight integer DEFAULT 1;

COMMENT ON COLUMN public.accommodations.weight IS 'Weight for sorting priority - higher weight = higher priority in random display';

-- Update some example weights (you can modify these values as needed)
UPDATE public.accommodations SET weight = 5 WHERE rating >= 4.5;
UPDATE public.accommodations SET weight = 3 WHERE rating >= 4.0 AND rating < 4.5;
UPDATE public.accommodations SET weight = 1 WHERE rating < 4.0;