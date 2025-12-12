-- ============================================
-- Import du schéma des restaurants
-- ============================================

DROP TABLE IF EXISTS public.restaurant_reservations CASCADE;
DROP TABLE IF EXISTS public.restaurants CASCADE;

-- Création de la table restaurants
CREATE TABLE public.restaurants (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    image TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL,
    rating NUMERIC(2, 1) NOT NULL,
    offer TEXT NOT NULL,
    icon TEXT NOT NULL,
    gallery_images JSONB NULL DEFAULT '[]'::jsonb,
    menus JSONB NULL DEFAULT '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 12}, {"name": "Carpaccio de boeuf", "price": 14}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de boeuf, sauce au poivre", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}]'::jsonb,
    opening_hours JSONB NULL DEFAULT '{}'::jsonb,
    poids INTEGER NOT NULL DEFAULT 0,
    partner_id INTEGER NULL,
    is_partner BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Index
CREATE INDEX IF NOT EXISTS idx_restaurants_type ON restaurants(type);
CREATE INDEX IF NOT EXISTS idx_restaurants_is_partner ON restaurants(is_partner);
CREATE INDEX IF NOT EXISTS idx_restaurants_poids ON restaurants(poids);
CREATE INDEX IF NOT EXISTS idx_restaurants_partner_id ON restaurants(partner_id);

-- Activer RLS
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;

-- Politique de lecture publique des restaurants
DROP POLICY IF EXISTS "Allow public read access on restaurants" ON public.restaurants;
CREATE POLICY "Allow public read access on restaurants"
ON public.restaurants FOR SELECT
TO public, anon, authenticated
USING (true);

-- Table des réservations
CREATE TABLE public.restaurant_reservations (
    id SERIAL PRIMARY KEY,
    restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
    reservation_date DATE NOT NULL,
    reservation_time TEXT NOT NULL,
    guests INTEGER NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    notes TEXT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour les réservations
CREATE INDEX IF NOT EXISTS idx_restaurant_reservations_restaurant_id ON restaurant_reservations(restaurant_id);

-- RLS pour les réservations
ALTER TABLE public.restaurant_reservations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read on restaurant_reservations" ON public.restaurant_reservations;
CREATE POLICY "Allow public read on restaurant_reservations"
ON public.restaurant_reservations FOR SELECT
TO public, anon, authenticated
USING (true);

DROP POLICY IF EXISTS "Allow public insert on restaurant_reservations" ON public.restaurant_reservations;
CREATE POLICY "Allow public insert on restaurant_reservations"
ON public.restaurant_reservations FOR INSERT
TO public, anon, authenticated
WITH CHECK (true);

