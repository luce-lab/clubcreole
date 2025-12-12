-- ============================================
-- Import des données de soirées / nightlife
-- ============================================

DROP TABLE IF EXISTS public.nightlife_events CASCADE;

-- Création de la table nightlife_events
CREATE TABLE public.nightlife_events (
    id SERIAL NOT NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    venue TEXT NOT NULL,
    image TEXT NOT NULL,
    description TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    price NUMERIC NOT NULL,
    offer TEXT NOT NULL,
    rating NUMERIC NOT NULL,
    features JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    gallery_images JSONB NULL DEFAULT '[]'::jsonb,
    partner_id INTEGER NULL,
    CONSTRAINT nightlife_events_pkey PRIMARY KEY (id)
);

-- Index
CREATE INDEX IF NOT EXISTS idx_nightlife_events_partner_id ON nightlife_events(partner_id);
CREATE INDEX IF NOT EXISTS idx_nightlife_events_type ON nightlife_events(type);

-- Activer RLS
ALTER TABLE public.nightlife_events ENABLE ROW LEVEL SECURITY;

-- Politique de lecture publique
DROP POLICY IF EXISTS "Allow public read access on nightlife_events" ON public.nightlife_events;
CREATE POLICY "Allow public read access on nightlife_events"
ON public.nightlife_events FOR SELECT
TO public, anon, authenticated
USING (true);

-- ============================================
-- Données (5 événements)
-- ============================================

INSERT INTO public.nightlife_events (id, name, type, venue, image, description, date, time, price, offer, rating, features, gallery_images, partner_id) VALUES
(1, 'Soirée Zouk & Kompa', 'Club', 'Le Piment Rouge, Fort-de-France', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Une soirée endiablée au son du zouk et du kompa avec les meilleurs DJ de l''île. Ambiance garantie jusqu''au petit matin dans le club le plus branché de Fort-de-France.', 'Tous les vendredis', '23:00 - 05:00', 20, 'Entrée gratuite avant minuit pour les membres du Club Créole', 4.8, '["DJ Live","Piste de danse","Cocktails spéciaux","Aire VIP"]', '["https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"]', null),

(2, 'Beach Party Sunset', 'Club', 'Plage de Grande Anse, Guadeloupe', 'https://images.unsplash.com/photo-1533219057257-4bb9ed5d2cc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Dansez pieds nus sur le sable au coucher du soleil. Cocktails tropicaux, musique house et ambiance décontractée face à l''océan. L''événement incontournable de l''été en Guadeloupe.', 'Samedis et dimanches', '17:00 - 01:00', 15, 'Un cocktail offert sur présentation de la carte Club Créole', 4.5, '["Coucher de soleil","Bar sur la plage","Feux d''artifice","Animations","DJ Live","Bar Premium"]', '["https://images.unsplash.com/photo-1533219057257-4bb9ed5d2cc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"]', null),

(3, 'Casino Royal Night', 'Soirée Club', 'Casino des Trois-Îlets, Martinique', 'https://images.unsplash.com/photo-1596548438137-d51ea5c83ca5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Une soirée glamour au casino avec jeux de table, machines à sous et spectacle de cabaret. Tenue élégante exigée pour cette expérience luxueuse dans l''un des plus beaux casinos des Antilles.', 'Tous les samedis', '20:00 - 04:00', 30, 'Jetons de jeu d''une valeur de 20€ offerts aux membres du Club Créole', 4.7, '["Tables de jeux","Spectacle cabaret","Dîner gastronomique","Service voiturier","Terrasse","DJ Live","Climatisation"]', '["https://images.unsplash.com/photo-1596548438137-d51ea5c83ca5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"]', null),

(4, 'Soirée Karaoké Antillais', 'Soirée Club', 'Le Ti'' Punch, Pointe-à-Pitre', 'https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/nightlife-images/0.9641419991507731.jpg', 'Ambiance conviviale et décontractée pour cette soirée karaoké où vous pourrez chanter les plus grands tubes antillais et internationaux. Cocktails et spécialités locales à déguster entre amis.', 'Mercredis et jeudis', '20:00 - 01:00', 10, '2 cocktails pour le prix d''un sur présentation de la carte Club Créole', 4.5, '["Plus de 5000 chansons","Animateur professionnel","Petite restauration","Terrasse","DJ Live","Climatisation","Écrans Géants"]', '["https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/nightlife-images/0.9641419991507731.jpg","https://images.unsplash.com/photo-1574007557239-acf6863bc375?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"]', null),

(5, 'Soirée de malade', 'Soirée Club', 'Le Gosier', 'https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/nightlife-images/0.7452050189360258.avif', 'Test de soirées', '15 juillet 2024', '20:00', 30, '50%', 4.5, '["DJ Live","Climatisation","Bar Premium"]', '["https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/nightlife-images/0.7452050189360258.avif"]', null);

-- Réinitialiser la séquence des IDs
SELECT setval('nightlife_events_id_seq', (SELECT MAX(id) FROM nightlife_events));
