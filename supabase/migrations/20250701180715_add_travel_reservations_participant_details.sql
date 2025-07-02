-- Add columns for separated contact names and participant details
ALTER TABLE public.travel_reservations 
ADD COLUMN contact_first_name TEXT,
ADD COLUMN contact_last_name TEXT,
ADD COLUMN participants_details JSONB;

-- Update existing records to populate the new columns from contact_name
UPDATE public.travel_reservations 
SET 
  contact_first_name = SPLIT_PART(contact_name, ' ', 1),
  contact_last_name = CASE 
    WHEN ARRAY_LENGTH(STRING_TO_ARRAY(contact_name, ' '), 1) > 1 
    THEN TRIM(SUBSTRING(contact_name FROM POSITION(' ' IN contact_name) + 1))
    ELSE ''
  END
WHERE contact_first_name IS NULL;

-- Create index on participants_details for better query performance
CREATE INDEX idx_travel_reservations_participants_details ON public.travel_reservations USING GIN (participants_details);