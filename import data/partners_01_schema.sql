-- ============================================
-- Import du schéma des partenaires
-- ============================================

DROP TABLE IF EXISTS public.partners CASCADE;

-- Création de la table partners
CREATE TABLE public.partners (
    id SERIAL PRIMARY KEY,
    business_name TEXT NOT NULL,
    business_type TEXT NOT NULL,
    description TEXT NULL,
    address TEXT NULL,
    phone TEXT NULL,
    email TEXT NULL,
    contact_name TEXT NULL,
    website TEXT NULL,
    type TEXT NULL,
    image TEXT NULL,
    location TEXT NULL,
    rating NUMERIC NULL,
    offer TEXT NULL,
    icon_name TEXT NULL,
    gallery_images JSONB NULL DEFAULT '[]'::jsonb,
    status TEXT NOT NULL DEFAULT 'en_attente',
    weight INTEGER NULL DEFAULT 0,
    user_id UUID NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT partners_status_check CHECK (
        status = ANY (ARRAY['en_attente', 'approuve', 'rejete'])
    ),
    CONSTRAINT partners_weight_range CHECK (
        weight >= 0 AND weight <= 100
    )
);

-- Index
CREATE INDEX IF NOT EXISTS idx_partners_business_type ON partners(business_type);
CREATE INDEX IF NOT EXISTS idx_partners_status ON partners(status);
CREATE INDEX IF NOT EXISTS idx_partners_user_id ON partners(user_id);

-- Activer RLS
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

-- Politique de lecture publique des partenaires approuvés
DROP POLICY IF EXISTS "Allow public read access on partners" ON public.partners;
CREATE POLICY "Allow public read access on partners"
ON public.partners FOR SELECT
TO public, anon, authenticated
USING (true);

-- Politique pour permettre aux utilisateurs authentifiés d'insérer
DROP POLICY IF EXISTS "Allow authenticated insert on partners" ON public.partners;
CREATE POLICY "Allow authenticated insert on partners"
ON public.partners FOR INSERT
TO authenticated
WITH CHECK (true);

-- Politique pour permettre aux utilisateurs de modifier leurs propres partenaires
DROP POLICY IF EXISTS "Allow users to update own partners" ON public.partners;
CREATE POLICY "Allow users to update own partners"
ON public.partners FOR UPDATE
TO authenticated
USING (auth.uid() = user_id OR user_id IS NULL);

