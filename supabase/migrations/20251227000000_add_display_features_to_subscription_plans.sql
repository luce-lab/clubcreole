-- Migration: Add display_features and is_public columns to subscription_plans
-- Adapté au schéma existant de la table

-- Add display_features column for user-facing feature texts
ALTER TABLE subscription_plans
ADD COLUMN IF NOT EXISTS display_features TEXT[] DEFAULT '{}';

-- Add is_public column for homepage visibility control
ALTER TABLE subscription_plans
ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT TRUE;

-- Populate display_features with the data currently hardcoded in Pricing.tsx
-- Based on plan names
UPDATE subscription_plans
SET display_features = ARRAY[
    'Accès à toutes les activités (tarif de base)',
    'Newsletter mensuelle',
    'Compte personnel'
],
is_public = TRUE
WHERE LOWER(name) = 'gratuit';

UPDATE subscription_plans
SET display_features = ARRAY[
    '15% de réduction sur toutes les activités',
    'Accès prioritaire aux réservations',
    'Événements VIP',
    'Support prioritaire'
],
is_public = TRUE
WHERE LOWER(name) = 'passionné' OR LOWER(name) = 'passionne';

UPDATE subscription_plans
SET display_features = ARRAY[
    '25% de réduction sur toutes les activités',
    'Accès illimité aux équipements',
    'Événements exclusifs',
    'Service conciergerie dédié',
    'Assurance activités incluse'
],
is_public = TRUE
WHERE LOWER(name) = 'expert';

-- Create index for visibility queries
CREATE INDEX IF NOT EXISTS idx_subscription_plans_is_public ON subscription_plans(is_public);

-- Add comments for documentation
COMMENT ON COLUMN subscription_plans.display_features IS 'Array of user-facing feature texts displayed on the pricing page';
COMMENT ON COLUMN subscription_plans.is_public IS 'Controls visibility on the homepage pricing section';
