-- ============================================
-- Import des données de loisirs
-- ============================================

DROP TABLE IF EXISTS public.loisirs CASCADE;

-- Création de la table loisirs
CREATE TABLE public.loisirs (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    location TEXT NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL DEFAULT '',
    max_participants INTEGER NOT NULL,
    current_participants INTEGER NOT NULL DEFAULT 0,
    image TEXT NOT NULL,
    gallery_images JSONB NULL DEFAULT '[]'::jsonb,
    partner_id INTEGER NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index
CREATE INDEX IF NOT EXISTS idx_loisirs_partner_id ON loisirs(partner_id);

-- Activer RLS
ALTER TABLE public.loisirs ENABLE ROW LEVEL SECURITY;

-- Politique de lecture publique
DROP POLICY IF EXISTS "Allow public read access on loisirs" ON public.loisirs;
CREATE POLICY "Allow public read access on loisirs"
ON public.loisirs FOR SELECT
TO public, anon, authenticated
USING (true);

-- ============================================
-- Données (10 loisirs)
-- ============================================

INSERT INTO public.loisirs (id, title, description, location, start_date, end_date, max_participants, current_participants, image, gallery_images, partner_id) VALUES
(1, 'Atelier cuisine créole', 'Apprenez à préparer les plats traditionnels de la cuisine antillaise avec un chef local.', 'Fort-de-France, Martinique', '2025-06-15', '2025-06-17', 12, 9, 'https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/loisir-images/0.645523160663497.png', '["https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/loisir-images/0.645523160663497.png","https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/loisir-images/0.5029508596834402.png","https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/loisir-images/0.7688504125210265.webp","https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/loisir-images/0.7177018737476504.png"]', null),

(2, 'Festival de danse et musique', 'Découvrez les rythmes traditionnels du zouk, de la biguine et du gwoka lors de ce festival animé.', 'Pointe-à-Pitre, Guadeloupe', '2025-06-22', '2025-06-25', 50, 32, 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop', '["https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/loisir-images/0.8570161653263619.webp"]', null),

(3, 'Atelier artisanat local', 'Initiez-vous à la fabrication de bijoux et d''objets décoratifs à partir de matériaux locaux.', 'Saint-Pierre, Martinique', '2025-06-30', '2025-07-18', 15, 6, 'https://images.unsplash.com/photo-1471295253337-3ceaaedca402', '["https://images.unsplash.com/photo-1471295253337-3ceaaedca402"]', null),

(4, 'Visite d''une distillerie de rhum', 'Découvrez le processus de fabrication du rhum et dégustez différentes variétés de ce spiritueux emblématique.', 'Sainte-Marie, Martinique', '2025-07-05', '2025-07-05', 20, 12, 'https://images.unsplash.com/photo-1584225064785-c62a8b43d148?q=80&w=2074&auto=format&fit=crop', '["https://images.unsplash.com/photo-1503220317375-aaad61436b1b","https://images.unsplash.com/photo-1525183995014-bd94c0750cd5","https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b"]', null),

(5, 'Atelier percussion et tambour de Gwada', 'Apprenez les bases des rythmes traditionnels avec des musiciens locaux expérimentés.', 'Le Gosier, Guadeloupe', '2025-07-12', '2025-07-15', 15, 9, 'https://images.unsplash.com/photo-1485579149621-3123dd979885?q=80&w=2069&auto=format&fit=crop', '["https://images.unsplash.com/photo-1472396961693-142e6e269027","https://images.unsplash.com/photo-1498936178812-4b2e558d2937","https://images.unsplash.com/photo-1603190287605-e6ade32fa852"]', null),

(6, 'Sortie en boite - La Créolita', 'Profitez d''une soirée inoubliable dans l''une des boîtes de nuit les plus populaires des Antilles avec musique zouk et cocktails tropicaux.', 'Trois-Îlets, Martinique', '2025-07-15', '2025-07-31', 30, 15, 'https://images.unsplash.com/photo-1574155376612-bfa4ed8aabfd?q=80&w=2070&auto=format&fit=crop', '[]', null),

(7, 'Sortie cinéma - Film créole', 'Projection exclusive d''un film créole suivi d''une discussion avec le réalisateur sur la culture et l''identité antillaise.', 'Basse-Terre, Guadeloupe', '2025-06-25', '2025-06-30', 40, 22, 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=2070&auto=format&fit=crop', '[]', null),

(8, 'Balade dans la forêt tropicale', 'Randonnée guidée dans la forêt tropicale avec un guide local qui vous fera découvrir la faune et la flore exceptionnelles des Antilles.', 'Parc National de la Guadeloupe', '2025-06-30', '2025-07-21', 18, 10, 'https://images.unsplash.com/photo-1550236520-7050f3582da0?q=80&w=2075&auto=format&fit=crop', '[]', null),

(9, 'Voyage exceptionnel à Dubaï', 'UN VOYAGE EXCEPTIONNEL A DUBAI : Le Festival des Soldes a DUBAI au départ de POINTE A PITRE. 8 jours / 5 nuits Hotel 4 étoiles. OFFRE aux membres du CLUB CREOLE avec excursions offertes.', 'Dubaï', '2025-12-19', '2026-02-19', 10, 1, 'https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/loisir-images/0.8949690790017784.jpg', '["https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/loisir-images/0.8949690790017784.jpg"]', null),

(10, 'Excursion des 3 Chapelles', 'LA VISITE DES 3 CHAPELLES : Une journée de promenade en bus pour la visite de 3 Chapelles parmi les plus puissantes de la Guadeloupe. Détente, convivialité, recueillement et déjeuner sont au rendez-vous de ce concept original pour ceux qui veulent s''offrir un moment de spiritualité.', '3 chapelles de la Basse Terre', '2025-07-15', '2025-08-15', 10, 0, 'https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/loisir-images/0.7155866135906521.jpg', '["https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/loisir-images/0.7155866135906521.jpg","https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/loisir-images/0.6834764895716205.jpg"]', null);

-- Réinitialiser la séquence des IDs
SELECT setval('loisirs_id_seq', (SELECT MAX(id) FROM loisirs));

