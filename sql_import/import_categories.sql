-- ============================================================================
-- Import des données pour la table : categories
-- Source : backup_insert.sql
-- Date de génération : 2025-12-25
-- ============================================================================

-- Suppression des données existantes (optionnel - décommentez si nécessaire)
-- TRUNCATE TABLE public.categories CASCADE;

-- ============================================================================
-- Insertion des catégories
-- ============================================================================

INSERT INTO public.categories (id, name, slug, icon, description, sort_order, is_active, created_at) VALUES
('1', 'Location de voitures', 'car-rental', 'car', 'Location de véhicules', '1', 't', '2025-12-19 03:01:45.176844+00'),
('2', 'Restaurants', 'restaurants', 'restaurant', 'Restaurants et gastronomie', '2', 't', '2025-12-19 03:01:45.176844+00'),
('3', 'Loisirs', 'leisure', 'entertainment', 'Activités de loisirs', '3', 't', '2025-12-19 03:01:45.176844+00'),
('4', 'Hébergement', 'accommodation', 'hotel', 'Hôtels et hébergements', '4', 't', '2025-12-19 03:01:45.176844+00')
ON CONFLICT (id) DO NOTHING; -- Évite les doublons si l'ID existe déjà

-- ============================================================================
-- Vérification de l'import
-- ============================================================================

-- Vérifier le nombre d'enregistrements
-- SELECT COUNT(*) as total_categories FROM public.categories;

-- Afficher les données importées
-- SELECT * FROM public.categories ORDER BY id;
