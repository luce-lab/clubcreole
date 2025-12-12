-- ============================================
-- Import des données de concerts
-- ============================================

DROP TABLE IF EXISTS public.concerts CASCADE;

-- Création de la table concerts
CREATE TABLE public.concerts (
    id SERIAL NOT NULL,
    name TEXT NOT NULL,
    artist TEXT NOT NULL,
    genre TEXT NOT NULL,
    image TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    price NUMERIC NOT NULL,
    offer TEXT NOT NULL,
    rating NUMERIC NOT NULL,
    icon TEXT NOT NULL DEFAULT 'Music',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    gallery_images JSONB NULL DEFAULT '[]'::jsonb,
    partner_id INTEGER NULL,
    CONSTRAINT concerts_pkey PRIMARY KEY (id)
);

-- Index
CREATE INDEX IF NOT EXISTS idx_concerts_partner_id ON concerts(partner_id);
CREATE INDEX IF NOT EXISTS idx_concerts_genre ON concerts(genre);

-- Activer RLS
ALTER TABLE public.concerts ENABLE ROW LEVEL SECURITY;

-- Politique de lecture publique
DROP POLICY IF EXISTS "Allow public read access on concerts" ON public.concerts;
CREATE POLICY "Allow public read access on concerts"
ON public.concerts FOR SELECT
TO public, anon, authenticated
USING (true);

-- ============================================
-- Données (10 concerts)
-- ============================================

INSERT INTO public.concerts (id, name, artist, genre, image, location, description, date, time, price, offer, rating, icon, gallery_images, partner_id) VALUES
(1, 'Festival Zouk & Love', 'Kassav'' & Invités', 'Zouk', 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Stade de Dillon, Fort-de-France', 'Le légendaire groupe Kassav'' revient pour une soirée exceptionnelle dédiée au zouk. Avec des invités surprise et une ambiance garantie, ce concert s''annonce comme l''événement musical de l''année en Martinique.', '15 juillet 2024', '20:00', 45, 'Réduction de 20% sur le tarif normal pour les membres du Club Créole', 4.9, 'Music', '[]', null),

(2, 'Nuit du Reggae', 'Alpha Blondy & The Solar System', 'Reggae', 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Plage de Grande Anse, Guadeloupe', 'Alpha Blondy, l''une des figures majeures du reggae africain, se produira pour un concert exceptionnel au coucher du soleil sur la magnifique plage de Grande Anse. Vibrations positives garanties!', '23 juillet 2024', '19:30', 38, 'Un cocktail offert sur présentation de la carte Club Créole', 4.7, 'Music', '[]', null),

(3, 'Soirée Biguine Jazz', 'Martinique Jazz Orchestra', 'Jazz & Biguine', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Théâtre de Pointe-à-Pitre', 'Une soirée unique mêlant les rythmes traditionnels de la biguine aux harmonies sophistiquées du jazz. Le Martinique Jazz Orchestra vous propose un voyage musical à travers l''histoire des Antilles.', '5 août 2024', '20:30', 32, 'Places en catégorie supérieure au tarif standard pour les membres du Club Créole', 4.8, 'Music', '[]', null),

(4, 'Carnaval Électronique', 'DJ Snake & artistes locaux', 'Électro / Dance', 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Plage des Salines, Martinique', 'Le célèbre DJ Snake vient mixer sur la plage des Salines pour une nuit électro mémorable. En première partie, découvrez les meilleurs talents locaux de la scène électronique antillaise.', '12 août 2024', '22:30', 56, 'Accès à l''espace VIP avec une consommation offerte pour les membres du Club Créole', 4.4, 'Music', '["https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80","https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/concert-images/0.22959222772360344.jpg"]', null),

(5, 'Concert Gospel - Dena Mwana', 'Dena Mwana avec Samantha Jean & Joella', 'Gospel', 'https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/concert-images/0.6554647351380227.png', 'Palais des Sports du Gosier', 'Venez vivre une soirée inoubliable au Palais des Sports du Gosier avec la voix céleste de Dena Mwana ! Un concert gospel puissant, rempli d''amour, de foi et d''émotions. Préparez-vous à chanter, danser, prier et vibrer dans une ambiance spirituelle exceptionnelle.', '14 juillet 2025', '17:00', 40, 'Tarif préférentiel à 30€ au lieu de 40€ pour les membres du Club Créole', 4.9, 'Music', '["https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/concert-images/0.6554647351380227.png"]', null),

(6, 'Festival Terre de Blues', 'Artistes Blues & Soul', 'Blues', 'https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/concert-images/0.532889938866222.jpg', 'Plage du 3ème Pont à Grand-Bourg, Marie-Galante', 'La 23ème édition du Festival Terre de Blues vous invite à découvrir les plus grands noms du blues dans un cadre exceptionnel à Marie-Galante. Un festival de 4 jours avec possibilité de camping sur place pour une expérience musicale complète.', '6 au 9 juin 2025', '18:00', 60, 'Tarif préférentiel à 45€ au lieu de 60€ pour les membres du Club Créole - Forfait camping 4 nuits inclus', 4.8, 'Music', '["https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/concert-images/0.532889938866222.jpg"]', null),

(7, 'Festival Zouk & Love 123', 'Kassav'' & Invités', 'Zouk', 'https://images.unsplash.com/photo-1501504905252-473c47e087f8', 'Stade de Dillon, Fort-de-France', 'Le légendaire groupe Kassav'' en live avec des invités surprises.', '2024-08-15', '20:00', 35, '10% de réduction pour les membres', 4.8, 'Music', '[]', null),

(8, 'Nuit du Reggae', 'Alpha Blondy & The Solar System', 'Reggae', 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea', 'Plage de Grande Anse, Guadeloupe', 'Alpha Blondy, l''une des figures majeures du reggae africain.', '2024-09-10', '21:00', 28, 'Entrée gratuite pour les membres premium', 4.6, 'Music', '[]', null),

(9, 'Concert', 'Laurent', 'Zouk', 'https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/concert-images/0.6958172857429759.avif', 'Pointe à pitre', 'Petite description', '15 juillet 20025', '20:00', 30, 'offre de 10%', 4.5, 'Music', '["https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/concert-images/0.6958172857429759.avif","https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/concert-images/0.21359084156126018.jpg"]', null),

(10, 'GIANT', 'VARIETE ZOUK', 'Zouk', 'https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/concert-images/0.3160535654577926.jpg', 'Palais des Sports du Gosier', 'GEANT''S fête 30ans de tubes, concert en Live avec Yannick CABRION, Johanna NOCE, Olivier DACALOR, Fabrice SERVIE, Jocelyne LABYLLE, Willy VERVERT, DASHA, Yvan VOICE, Joël GREDOIRE et quelques surprises inoubliables.', '05 Juillet', '20h', 40, '30 euros au Lieu de 40 euros - limité a 2 Billets par adhérents soit 20 euros d''économie', 4.5, 'Music', '["https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/concert-images/0.3160535654577926.jpg"]', null);

-- Réinitialiser la séquence des IDs
SELECT setval('concerts_id_seq', (SELECT MAX(id) FROM concerts));
