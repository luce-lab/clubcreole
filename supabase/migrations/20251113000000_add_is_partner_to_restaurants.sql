-- Add is_partner column to restaurants table
ALTER TABLE restaurants
ADD COLUMN IF NOT EXISTS is_partner BOOLEAN NOT NULL DEFAULT false;

-- Create index for partner status to optimize filtering
CREATE INDEX IF NOT EXISTS idx_restaurants_is_partner ON restaurants(is_partner);

-- Add comment to document the column
COMMENT ON COLUMN restaurants.is_partner IS 'Indicates if the restaurant is a partner that accepts online reservations';
