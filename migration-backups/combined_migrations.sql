-- =============================================================================
-- Combined Migrations for ClubCreole
-- Generated: $(date)
-- =============================================================================

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;


-- ============================================
-- Migration: 20240101000000_create_car_rental_tables.sql
-- ============================================
-- Création de la table pour les entreprises de location de voitures
CREATE TABLE IF NOT EXISTS car_rental_companies (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    image TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL,
    rating DECIMAL(2,1) NOT NULL,
    offer TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Création de la table pour les modèles de voitures
CREATE TABLE IF NOT EXISTS car_models (
    id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL REFERENCES car_rental_companies(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    image TEXT NOT NULL,
    price_per_day INTEGER NOT NULL,
    category TEXT NOT NULL,
    seats INTEGER NOT NULL,
    transmission TEXT NOT NULL,
    air_con BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Création de la table pour les fonctionnalités des entreprises
CREATE TABLE IF NOT EXISTS car_rental_features (
    id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL REFERENCES car_rental_companies(id) ON DELETE CASCADE,
    feature TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Création de la table pour les avis clients
CREATE TABLE IF NOT EXISTS car_client_reviews (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    avatar TEXT NOT NULL,
    comment TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_date DATE NOT NULL,
    rental_company_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_car_models_company_id ON car_models(company_id);
CREATE INDEX IF NOT EXISTS idx_car_rental_features_company_id ON car_rental_features(company_id);
CREATE INDEX IF NOT EXISTS idx_car_client_reviews_rating ON car_client_reviews(rating);
CREATE INDEX IF NOT EXISTS idx_car_client_reviews_company ON car_client_reviews(rental_company_name);

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour mettre à jour automatiquement updated_at
CREATE TRIGGER update_car_rental_companies_updated_at 
    BEFORE UPDATE ON car_rental_companies 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_car_models_updated_at 
    BEFORE UPDATE ON car_models 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_car_client_reviews_updated_at 
    BEFORE UPDATE ON car_client_reviews 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 
-- ============================================
-- Migration: 20240101000001_insert_car_rental_data.sql
-- ============================================
-- Insertion des entreprises de location de voitures
INSERT INTO car_rental_companies (id, name, type, image, location, description, rating, offer, icon_name) VALUES
(1, 'Caribbean Cars', 'Véhicules économiques', 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Fort-de-France', 'Une large gamme de véhicules économiques et compacts, parfaits pour explorer l''île. Service client réactif et tarifs compétitifs.', 4.6, '15% de réduction sur toutes les locations de plus de 3 jours pour les membres du Club Créole', 'Car'),
(2, 'Prestige Auto', 'Véhicules de luxe', 'https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Les Trois-Îlets', 'Louez des voitures de luxe et profitez d''un service premium. Notre flotte comprend des SUV haut de gamme, des cabriolets et des berlines de luxe.', 4.8, 'Un jour de location offert pour toute réservation d''une semaine ou plus', 'Shield'),
(3, 'Eco Drive', 'Véhicules électriques', 'https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Le Lamentin', 'Louez des véhicules 100% électriques pour une expérience écologique. Contribuez à préserver la beauté naturelle des Antilles tout en explorant l''île.', 4.5, 'Recharge gratuite et 10% de réduction pour les membres du Club Créole', 'Fuel'),
(4, 'Aventure 4x4', 'Véhicules tout-terrain', 'https://images.unsplash.com/photo-1533743410561-5c70e1a14cc1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Sainte-Anne', 'Spécialiste des 4x4 et SUV pour explorer les zones moins accessibles. Idéal pour les aventuriers souhaitant découvrir les trésors cachés de l''île.', 4.7, 'Kit d''aventure offert (GPS, glacière, guides) pour toute location 4x4 de 3 jours ou plus', 'Route');

-- Insertion des modèles de voitures pour Caribbean Cars (id=1)
INSERT INTO car_models (company_id, name, image, price_per_day, category, seats, transmission, air_con) VALUES
(1, 'Peugeot 208', 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', 29, 'Citadine', 5, 'Manuelle', true),
(1, 'Renault Clio', 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', 32, 'Citadine', 5, 'Automatique', true),
(1, 'Citroën C3', 'https://images.unsplash.com/photo-1502877338535-766e1452ae51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', 28, 'Citadine', 5, 'Manuelle', true);

-- Insertion des modèles de voitures pour Prestige Auto (id=2)
INSERT INTO car_models (company_id, name, image, price_per_day, category, seats, transmission, air_con) VALUES
(2, 'Mercedes Classe C Cabriolet', 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', 120, 'Cabriolet', 4, 'Automatique', true),
(2, 'BMW X5', 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', 150, 'SUV', 5, 'Automatique', true),
(2, 'Audi A8', 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', 180, 'Berline', 5, 'Automatique', true);

-- Insertion des modèles de voitures pour Eco Drive (id=3)
INSERT INTO car_models (company_id, name, image, price_per_day, category, seats, transmission, air_con) VALUES
(3, 'Renault Zoe', 'https://images.unsplash.com/photo-1562911791-c7a97b729ec5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', 45, 'Citadine électrique', 5, 'Automatique', true),
(3, 'Peugeot e-208', 'https://images.unsplash.com/photo-1647588807130-91d14e004a99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', 48, 'Citadine électrique', 5, 'Automatique', true),
(3, 'Tesla Model 3', 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', 90, 'Berline électrique', 5, 'Automatique', true);

-- Insertion des modèles de voitures pour Aventure 4x4 (id=4)
INSERT INTO car_models (company_id, name, image, price_per_day, category, seats, transmission, air_con) VALUES
(4, 'Jeep Wrangler', 'https://images.unsplash.com/photo-1597007030739-6d2e7172ce5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', 85, '4x4', 4, 'Manuelle', true),
(4, 'Toyota Land Cruiser', 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', 95, '4x4', 7, 'Automatique', true),
(4, 'Dacia Duster', 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', 60, 'SUV compact', 5, 'Manuelle', true);

-- Insertion des fonctionnalités pour Caribbean Cars (id=1)
INSERT INTO car_rental_features (company_id, feature) VALUES
(1, 'Véhicules récents'),
(1, 'Assistance 24/7'),
(1, 'Kilométrage illimité'),
(1, 'Assurance tous risques'),
(1, 'Prise en charge aéroport'),
(1, 'Annulation gratuite');

-- Insertion des fonctionnalités pour Prestige Auto (id=2)
INSERT INTO car_rental_features (company_id, feature) VALUES
(2, 'Véhicules premium'),
(2, 'Service de conciergerie'),
(2, 'Livraison à votre hôtel'),
(2, 'Chauffeur disponible'),
(2, 'Assurance tous risques incluse'),
(2, 'Service client VIP');

-- Insertion des fonctionnalités pour Eco Drive (id=3)
INSERT INTO car_rental_features (company_id, feature) VALUES
(3, 'Véhicules 100% électriques'),
(3, 'Recharge gratuite'),
(3, 'Bornes de recharge cartographiées'),
(3, 'Assistance 24/7'),
(3, 'Kilométrage illimité'),
(3, 'Conseils d''éco-conduite');

-- Insertion des fonctionnalités pour Aventure 4x4 (id=4)
INSERT INTO car_rental_features (company_id, feature) VALUES
(4, '4x4 et SUV tout-terrain'),
(4, 'GPS avec routes hors des sentiers battus'),
(4, 'Kit d''aventure inclus'),
(4, 'Assistance 24/7 sur toute l''île'),
(4, 'Conseils d''itinéraires personnalisés'),
(4, 'Service de dépannage spécialisé');

-- Insertion des avis clients
INSERT INTO car_client_reviews (id, name, location, avatar, comment, rating, review_date, rental_company_name) VALUES
(1, 'Sophie Martin', 'Paris, France', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80', 'Service exceptionnel ! La voiture était impeccable et le prix avec la réduction Club Créole était vraiment avantageux. Je recommande vivement Caribbean Cars pour découvrir la Martinique.', 5, '2023-05-15', 'Caribbean Cars'),
(2, 'Thomas Dubois', 'Lyon, France', 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80', 'Prestige Auto a rendu mon séjour inoubliable. J''ai pu profiter d''un cabriolet de luxe pour admirer les paysages martiniquais. Le jour de location offert grâce au Club Créole a été un vrai plus !', 5, '2023-06-03', 'Prestige Auto'),
(3, 'Marie Leroy', 'Bordeaux, France', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80', 'Très satisfaite de mon expérience avec Eco Drive. Louer un véhicule électrique était parfait pour explorer l''île tout en respectant l''environnement. Les recharges gratuites sont un vrai avantage.', 4, '2023-07-22', 'Eco Drive'),
(4, 'Jean Moreau', 'Marseille, France', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80', 'Aventure 4x4 a dépassé toutes mes attentes ! Le SUV était parfaitement adapté aux routes plus difficiles de la Martinique. Le kit d''aventure offert était vraiment utile pour nos excursions.', 5, '2023-08-10', 'Aventure 4x4'),
(5, 'Claire Petit', 'Nantes, France', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80', 'Service client exceptionnel chez Caribbean Cars. Ils ont été très réactifs quand j''ai eu un petit problème et l''ont résolu immédiatement. La réduction Club Créole était substantielle !', 5, '2023-09-05', 'Caribbean Cars'); 
-- ============================================
-- Migration: 20240101000002_create_leisure_activities_tables.sql
-- ============================================
-- Création de la table pour les activités de loisirs
CREATE TABLE IF NOT EXISTS leisure_activities (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL, -- 'diving', 'snorkeling', 'kayak', etc.
    description TEXT NOT NULL,
    price_per_person INTEGER NOT NULL, -- en euros
    duration_hours DECIMAL(3,1) NOT NULL,
    min_level TEXT NOT NULL, -- 'beginner', 'intermediate', 'advanced', 'professional'
    max_participants INTEGER DEFAULT 10,
    equipment_provided BOOLEAN DEFAULT true,
    professional_guide BOOLEAN DEFAULT true,
    icon_name TEXT NOT NULL DEFAULT 'waves',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Création de la table pour les images des activités
CREATE TABLE IF NOT EXISTS activity_images (
    id SERIAL PRIMARY KEY,
    activity_id INTEGER NOT NULL REFERENCES leisure_activities(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    alt_text TEXT NOT NULL,
    title TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Création de la table pour les créneaux horaires disponibles
CREATE TABLE IF NOT EXISTS activity_time_slots (
    id SERIAL PRIMARY KEY,
    activity_id INTEGER NOT NULL REFERENCES leisure_activities(id) ON DELETE CASCADE,
    time_slot TIME NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Création de la table pour les niveaux acceptés
CREATE TABLE IF NOT EXISTS activity_levels (
    id SERIAL PRIMARY KEY,
    activity_id INTEGER NOT NULL REFERENCES leisure_activities(id) ON DELETE CASCADE,
    level_name TEXT NOT NULL,
    level_description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Création de la table pour les inclusions
CREATE TABLE IF NOT EXISTS activity_inclusions (
    id SERIAL PRIMARY KEY,
    activity_id INTEGER NOT NULL REFERENCES leisure_activities(id) ON DELETE CASCADE,
    inclusion_text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Création de la table pour les réservations d'activités
CREATE TABLE IF NOT EXISTS activity_reservations (
    id SERIAL PRIMARY KEY,
    activity_id INTEGER NOT NULL REFERENCES leisure_activities(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    reservation_date DATE NOT NULL,
    time_slot TIME NOT NULL,
    number_of_participants INTEGER NOT NULL DEFAULT 1,
    total_price INTEGER NOT NULL,
    participant_names TEXT[] NOT NULL,
    participant_levels TEXT[] NOT NULL,
    contact_email TEXT NOT NULL,
    contact_phone TEXT NOT NULL,
    special_requests TEXT,
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'confirmed', 'cancelled'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_activity_images_activity_id ON activity_images(activity_id);
CREATE INDEX IF NOT EXISTS idx_activity_time_slots_activity_id ON activity_time_slots(activity_id);
CREATE INDEX IF NOT EXISTS idx_activity_levels_activity_id ON activity_levels(activity_id);
CREATE INDEX IF NOT EXISTS idx_activity_inclusions_activity_id ON activity_inclusions(activity_id);
CREATE INDEX IF NOT EXISTS idx_activity_reservations_activity_id ON activity_reservations(activity_id);
CREATE INDEX IF NOT EXISTS idx_activity_reservations_user_id ON activity_reservations(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_reservations_date ON activity_reservations(reservation_date);
CREATE INDEX IF NOT EXISTS idx_activity_reservations_status ON activity_reservations(status);

-- Triggers pour mettre à jour automatiquement updated_at
CREATE TRIGGER update_leisure_activities_updated_at 
    BEFORE UPDATE ON leisure_activities 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_activity_reservations_updated_at 
    BEFORE UPDATE ON activity_reservations 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) pour les réservations
ALTER TABLE activity_reservations ENABLE ROW LEVEL SECURITY;

-- Politique pour que les utilisateurs puissent voir leurs propres réservations
CREATE POLICY "Users can view their own reservations" ON activity_reservations
    FOR SELECT USING (auth.uid() = user_id);

-- Politique pour que les utilisateurs puissent créer leurs propres réservations
CREATE POLICY "Users can insert their own reservations" ON activity_reservations
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Politique pour que les utilisateurs puissent modifier leurs propres réservations
CREATE POLICY "Users can update their own reservations" ON activity_reservations
    FOR UPDATE USING (auth.uid() = user_id); 
-- ============================================
-- Migration: 20240101000003_insert_diving_activity_data.sql
-- ============================================
-- Insertion de l'activité de plongée sous-marine
INSERT INTO leisure_activities (
    name,
    category,
    description,
    price_per_person,
    duration_hours,
    min_level,
    max_participants,
    equipment_provided,
    professional_guide,
    icon_name
) VALUES (
    'Plongée sous-marine',
    'diving',
    'Découvrez les fonds marins des Antilles lors d''une plongée sous-marine encadrée par nos moniteurs professionnels. Explorez la vie marine colorée et les récifs coralliens magnifiques.',
    75,
    2.0,
    'beginner',
    8,
    true,
    true,
    'waves'
);

-- Récupération de l'ID de l'activité de plongée pour les insertions suivantes
-- (On utilise une variable temporaire)
DO $$
DECLARE
    diving_activity_id INTEGER;
BEGIN
    -- Récupération de l'ID de l'activité de plongée
    SELECT id INTO diving_activity_id FROM leisure_activities WHERE name = 'Plongée sous-marine' AND category = 'diving';
    
    -- Insertion des images de l'activité
    INSERT INTO activity_images (activity_id, url, alt_text, title, sort_order) VALUES 
    (diving_activity_id, 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21', 'Vague océanique sur la plage', 'Découvrez nos spots de plongée', 1),
    (diving_activity_id, 'https://images.unsplash.com/photo-1518877593221-1f28583780b4', 'Baleine à bosse sautant hors de l''eau', 'Observation de la vie marine', 2);
    
    -- Insertion des créneaux horaires
    INSERT INTO activity_time_slots (activity_id, time_slot, is_active) VALUES 
    (diving_activity_id, '09:00:00', true),
    (diving_activity_id, '11:00:00', true),
    (diving_activity_id, '14:00:00', true),
    (diving_activity_id, '16:00:00', true);
    
    -- Insertion des niveaux acceptés
    INSERT INTO activity_levels (activity_id, level_name, level_description) VALUES 
    (diving_activity_id, 'Débutant', 'Débutant (première plongée)'),
    (diving_activity_id, 'Intermédiaire', 'Intermédiaire (avec certification)'),
    (diving_activity_id, 'Avancé', 'Avancé (plongée profonde)'),
    (diving_activity_id, 'Professionnel', 'Professionnel (exploration libre)');
    
    -- Insertion des inclusions
    INSERT INTO activity_inclusions (activity_id, inclusion_text) VALUES 
    (diving_activity_id, 'Équipement fourni'),
    (diving_activity_id, 'Moniteur certifié'),
    (diving_activity_id, 'Durée : 2 heures'),
    (diving_activity_id, 'Niveau débutant accepté'),
    (diving_activity_id, 'Tout l''équipement de plongée'),
    (diving_activity_id, 'Briefing de sécurité complet'),
    (diving_activity_id, 'Accompagnement par un moniteur certifié'),
    (diving_activity_id, 'Assurance responsabilité civile');
    
END $$; 
-- ============================================
-- Migration: 20240101000004_create_restaurants_table.sql
-- ============================================
-- Création de la table pour les restaurants
CREATE TABLE IF NOT EXISTS restaurants (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL,
    type TEXT NOT NULL,
    rating DECIMAL(2,1) NOT NULL DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5),
    offer TEXT,
    icon TEXT NOT NULL DEFAULT 'utensils',
    image TEXT NOT NULL,
    gallery_images JSONB DEFAULT '[]'::jsonb,
    opening_hours JSONB NOT NULL DEFAULT '{"monday":null,"tuesday":null,"wednesday":null,"thursday":null,"friday":null,"saturday":null,"sunday":null}'::jsonb,
    price_range TEXT NOT NULL,
    specialties JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Création des index
CREATE INDEX IF NOT EXISTS idx_restaurants_name ON restaurants(name);
CREATE INDEX IF NOT EXISTS idx_restaurants_type ON restaurants(type);
CREATE INDEX IF NOT EXISTS idx_restaurants_location ON restaurants(location);

-- Ajout d'une contrainte unique sur le nom
ALTER TABLE restaurants ADD CONSTRAINT unique_restaurant_name UNIQUE (name);

-- Trigger pour mettre à jour automatiquement updated_at
CREATE TRIGGER update_restaurants_updated_at 
    BEFORE UPDATE ON restaurants 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;

-- Créer une policy pour permettre la lecture publique
CREATE POLICY "Restaurants are viewable by everyone" 
    ON restaurants
    FOR SELECT 
    USING (true);
-- ============================================
-- Migration: 20240101000005_insert_restaurants.sql
-- ============================================
-- Insertion des restaurants de Pointe-à-Pitre
INSERT INTO public.restaurants (name, type, image, location, description, rating, offer, icon, gallery_images) VALUES
('Le Gondwana', 'Africain', 'https://example.com/gondwana.jpg', 'La Marina Bas du Fort, 97110 Pointe-à-Pitre', 'Restaurant spécialisé dans la cuisine traditionnelle d''Afrique de l''ouest, ambiance chaleureuse et musicale', 4.0, 'Spécialités africaines', 'restaurant', '[]'::jsonb),
('Délices Nature', 'Végétarien', 'https://example.com/delices-nature.jpg', 'Rue Neil Armstrong, 97110 Pointe-à-Pitre', 'Restaurant végétarien authentique proposant une cuisine maison à base de produits locaux frais et de saison, dans une ambiance calme et conviviale', 4.5, 'Plats végétariens du jour', 'restaurant', '[]'::jsonb),
('An Chodyè La', 'Créole', 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d', '59 rue Gilbert de Chabertrand, 97110 Pointe-à-Pitre', 'Restaurant authentique proposant de nombreuses soupes et des plats créoles traditionnels dans une ambiance chaleureuse. Un véritable trésor culinaire situé dans le quartier historique de Pointe-à-Pitre.', 4.5, 'Formule dégustation de soupes créoles', 'restaurant', '[]'::jsonb),
('Le Yacht Club', 'Fusion Franco-Créole', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5', 'Quai Lardennoy - La Darse, 97110 Pointe-à-Pitre', 'Restaurant avec vue imprenable sur le port offrant une cuisine raffinée mêlant saveurs créoles et françaises. Cadre élégant et atmosphère maritime.', 4.0, 'Happy Hour tous les jours de 17h à 19h', 'restaurant', '[]'::jsonb),
('La Canne à Sucre', 'Créole', 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b', 'Port de Pointe-à-Pitre, 97110 Pointe-à-Pitre', 'Restaurant en bord de mer proposant une cuisine créole raffinée avec une vue magnifique sur les bateaux. Spécialités de poissons et fruits de mer.', 4.2, 'Menu du jour à 23€ (entrée + plat + dessert)', 'restaurant', '[]'::jsonb),
('L''Intemporelle', 'Gastronomique Caribéen', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4', 'Mémorial ACTe, 97110 Pointe-à-Pitre', 'Restaurant d''exception au cœur du Mémorial ACTe offrant une vue imprenable sur la mer des Caraïbes. Cuisine raffinée célébrant les saveurs caribéennes avec une touche de modernité.', 4.2, 'Menu déjeuner sur réservation', 'restaurant', '[]'::jsonb),
('Gwot An Nou', 'Créole Moderne', 'https://images.unsplash.com/photo-1544025162-d76694265947', '9 Rue Hincelin, 97110 Pointe-à-Pitre', 'Une véritable pépite culinaire dans un cadre intimiste et chaleureux. La cuisine créole y est revisitée avec talent, offrant des plats généreux aux saveurs authentiques.', 4.5, 'Plat du jour à 15€', 'restaurant', '[]'::jsonb);
-- ============================================
-- Migration: 20250619103442-63ddf504-9573-49d8-a91b-aceb7df8a55d.sql
-- ============================================

-- Créer une table pour les événements de soirée
CREATE TABLE public.nightlife_events (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  venue TEXT NOT NULL,
  image TEXT NOT NULL,
  description TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  price NUMERIC NOT NULL,
  offer TEXT NOT NULL,
  rating NUMERIC NOT NULL DEFAULT 0,
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insérer les données existantes des soirées
INSERT INTO public.nightlife_events (name, type, venue, image, description, date, time, price, offer, rating, features) VALUES
(
  'Soirée Zouk & Kompa',
  'Club',
  'Le Piment Rouge, Fort-de-France',
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  'Une soirée endiablée au son du zouk et du kompa avec les meilleurs DJ de l''île. Ambiance garantie jusqu''au petit matin dans le club le plus branché de Fort-de-France.',
  'Tous les vendredis',
  '23:00 - 05:00',
  20,
  'Entrée gratuite avant minuit pour les membres du Club Créole',
  4.8,
  '["DJ Live", "Piste de danse", "Cocktails spéciaux", "Aire VIP"]'::jsonb
),
(
  'Beach Party Sunset',
  'Plage',
  'Plage de Grande Anse, Guadeloupe',
  'https://images.unsplash.com/photo-1533219057257-4bb9ed5d2cc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  'Dansez pieds nus sur le sable au coucher du soleil. Cocktails tropicaux, musique house et ambiance décontractée face à l''océan. L''événement incontournable de l''été en Guadeloupe.',
  'Samedis et dimanches',
  '17:00 - 01:00',
  15,
  'Un cocktail offert sur présentation de la carte Club Créole',
  4.9,
  '["Coucher de soleil", "Bar sur la plage", "Feux d''artifice", "Animations"]'::jsonb
),
(
  'Casino Royal Night',
  'Casino',
  'Casino des Trois-Îlets, Martinique',
  'https://images.unsplash.com/photo-1596548438137-d51ea5c83ca5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  'Une soirée glamour au casino avec jeux de table, machines à sous et spectacle de cabaret. Tenue élégante exigée pour cette expérience luxueuse dans l''un des plus beaux casinos des Antilles.',
  'Tous les samedis',
  '20:00 - 04:00',
  30,
  'Jetons de jeu d''une valeur de 20€ offerts aux membres du Club Créole',
  4.7,
  '["Tables de jeux", "Spectacle cabaret", "Dîner gastronomique", "Service voiturier"]'::jsonb
),
(
  'Soirée Karaoké Antillais',
  'Bar',
  'Le Ti'' Punch, Pointe-à-Pitre',
  'https://images.unsplash.com/photo-1574007557239-acf6863bc375?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  'Ambiance conviviale et décontractée pour cette soirée karaoké où vous pourrez chanter les plus grands tubes antillais et internationaux. Cocktails et spécialités locales à déguster entre amis.',
  'Mercredis et jeudis',
  '20:00 - 01:00',
  10,
  '2 cocktails pour le prix d''un sur présentation de la carte Club Créole',
  4.5,
  '["Plus de 5000 chansons", "Animateur professionnel", "Petite restauration", "Terrasse"]'::jsonb
);

-- Ajouter une politique RLS pour permettre la lecture publique
ALTER TABLE public.nightlife_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to nightlife events" 
  ON public.nightlife_events 
  FOR SELECT 
  TO public 
  USING (true);

-- ============================================
-- Migration: 20250620094048-3980b8fd-8678-4321-8b39-473cde5eace1.sql
-- ============================================

-- Table pour les médiums/voyants
CREATE TABLE public.voyance_mediums (
  id integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  name text NOT NULL,
  specialties text[] NOT NULL DEFAULT '{}',
  description text NOT NULL,
  image text NOT NULL,
  experience_years integer NOT NULL DEFAULT 0,
  rating numeric(2,1) NOT NULL DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5),
  price_per_session numeric(10,2) NOT NULL,
  availability_schedule jsonb NOT NULL DEFAULT '{}',
  contact_phone text,
  contact_email text,
  contact_whatsapp text,
  languages text[] NOT NULL DEFAULT '{français}',
  consultation_types text[] NOT NULL DEFAULT '{présentiel}',
  location text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Table pour les avis clients des médiums
CREATE TABLE public.voyance_reviews (
  id integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  medium_id integer NOT NULL REFERENCES public.voyance_mediums(id) ON DELETE CASCADE,
  client_name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  consultation_date date NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Table pour les demandes de consultation
CREATE TABLE public.voyance_consultations (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  medium_id integer NOT NULL REFERENCES public.voyance_mediums(id) ON DELETE CASCADE,
  client_name text NOT NULL,
  client_email text NOT NULL,
  client_phone text NOT NULL,
  preferred_date date NOT NULL,
  preferred_time text NOT NULL,
  consultation_type text NOT NULL DEFAULT 'présentiel',
  message text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Insérer quelques médiums d'exemple
INSERT INTO public.voyance_mediums (name, specialties, description, image, experience_years, rating, price_per_session, contact_phone, contact_email, languages, consultation_types, location) VALUES
('Madame Solange', '{Tarot, Voyance pure, Médiumnité}', 'Médium depuis plus de 20 ans, spécialisée dans la voyance pure et la lecture de tarot. Je vous aide à éclaircir vos questionnements sur l''amour, le travail et la famille.', '/placeholder.svg', 20, 4.8, 60.00, '+590 690 12 34 56', 'solange.voyance@email.com', '{français, créole}', '{présentiel, téléphone, visio}', 'Pointe-à-Pitre'),
('Maître Antoine', '{Cartomancie, Numérologie, Astrologie}', 'Cartomancien et numérologue expérimenté. Consultation personnalisée pour vous guider dans vos choix de vie et révéler votre potentiel caché.', '/placeholder.svg', 15, 4.6, 50.00, '+590 690 65 43 21', 'antoine.cartes@email.com', '{français}', '{présentiel, téléphone}', 'Basse-Terre'),
('Mama Josephine', '{Spiritisme, Désenvoûtement, Protection}', 'Spécialiste en spiritisme et protection spirituelle. Plus de 25 ans d''expérience dans l''aide aux personnes en difficulté spirituelle.', '/placeholder.svg', 25, 4.9, 80.00, '+590 690 98 76 54', 'josephine.spirit@email.com', '{français, créole, anglais}', '{présentiel}', 'Le Gosier'),
('Voyant Marcus', '{Voyance par téléphone, Pendule, Cristallomancie}', 'Voyant spécialisé dans les consultations à distance. Utilise le pendule et les cristaux pour des prédictions précises.', '/placeholder.svg', 12, 4.4, 45.00, '+590 690 11 22 33', 'marcus.voyant@email.com', '{français, anglais}', '{téléphone, visio}', 'Saint-François');

-- Insérer quelques avis d'exemple
INSERT INTO public.voyance_reviews (medium_id, client_name, rating, comment, consultation_date) VALUES
(1, 'Marie L.', 5, 'Consultation exceptionnelle ! Madame Solange a su cerner mes préoccupations avec une précision remarquable.', '2024-01-15'),
(1, 'Jean-Paul D.', 4, 'Très bonne voyante, conseils utiles et bienveillants. Je recommande vivement.', '2024-02-03'),
(2, 'Claudette M.', 5, 'Maître Antoine m''a aidée à prendre des décisions importantes. Merci pour cette guidance précieuse.', '2024-01-28'),
(3, 'Robert K.', 5, 'Mama Josephine a résolu mes problèmes spirituels. Une vraie professionnelle !', '2024-02-10'),
(4, 'Sandra B.', 4, 'Consultation par téléphone très satisfaisante avec Marcus. Prédictions justes.', '2024-02-05');

-- Activer RLS sur les tables
ALTER TABLE public.voyance_mediums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.voyance_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.voyance_consultations ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour voyance_mediums (lecture publique, modification admin)
CREATE POLICY "Public can view active mediums" ON public.voyance_mediums
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage mediums" ON public.voyance_mediums
  FOR ALL USING (is_admin());

-- Politiques RLS pour voyance_reviews (lecture publique)
CREATE POLICY "Public can view reviews" ON public.voyance_reviews
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage reviews" ON public.voyance_reviews
  FOR ALL USING (is_admin());

-- Politiques RLS pour voyance_consultations (utilisateurs peuvent créer, admins peuvent tout voir)
CREATE POLICY "Anyone can create consultations" ON public.voyance_consultations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all consultations" ON public.voyance_consultations
  FOR SELECT USING (is_admin());

CREATE POLICY "Admins can update consultations" ON public.voyance_consultations
  FOR UPDATE USING (is_admin());

-- ============================================
-- Migration: 20250620134853-d7729aac-9ac2-461c-a780-9b973ee4b903.sql
-- ============================================

-- Créer une table pour les bons plans
CREATE TABLE public.bons_plans (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  image TEXT,
  badge TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insérer les données existantes des bons plans
INSERT INTO public.bons_plans (title, description, icon, image, badge) VALUES
('Des réductions', 'Profitez de réductions exclusives chez nos partenaires', 'Gift', 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=1760&auto=format&fit=crop', NULL),
('Prêt de matériel', 'Accédez à du matériel de réception et des outils', 'Wrench', '/lovable-uploads/c7dc7b94-fcb7-46f8-aa26-0740b8bbdad1.png', NULL),
('Services gratuits', 'Bénéficiez de services d''assistance gratuits', 'HeartHandshake', 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=1760&auto=format&fit=crop', NULL),
('Concert de Francis CABREL', 'Profitez d''une réduction de 20% sur le concert du 15 mars', 'Music', 'https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?q=80&w=1760&auto=format&fit=crop', 'Coup de cœur'),
('La Toubana Hôtel 5★', '2 nuits = 1 dîner gastronomique pour 2 offert', 'Hotel', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1760&auto=format&fit=crop', 'Exclusivité'),
('Parc l''Infini', '2 entrées gratuites au parc d''attractions', 'Ticket', 'https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=1760&auto=format&fit=crop', 'Gratuit');

-- Activer Row Level Security (RLS) - lecture publique pour les bons plans actifs
ALTER TABLE public.bons_plans ENABLE ROW LEVEL SECURITY;

-- Créer une politique pour permettre la lecture publique des bons plans actifs
CREATE POLICY "Lecture publique des bons plans actifs" 
  ON public.bons_plans 
  FOR SELECT 
  USING (is_active = true);

-- Ajouter un trigger pour mettre à jour automatiquement updated_at
CREATE TRIGGER update_bons_plans_updated_at
  BEFORE UPDATE ON public.bons_plans
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Migration: 20250620181228-48b7892c-54cb-46d0-8921-cef62be44b15.sql
-- ============================================

-- Créer une table pour les offres de voyage des partenaires
CREATE TABLE public.travel_offers (
  id SERIAL PRIMARY KEY,
  partner_id UUID REFERENCES public.partners(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  destination TEXT NOT NULL,
  duration_days INTEGER NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  departure_location TEXT NOT NULL,
  departure_date DATE,
  return_date DATE,
  image TEXT,
  gallery_images JSONB DEFAULT '[]'::jsonb,
  inclusions JSONB DEFAULT '[]'::jsonb,
  exclusions JSONB DEFAULT '[]'::jsonb,
  max_participants INTEGER DEFAULT 20,
  current_participants INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Activer Row Level Security
ALTER TABLE public.travel_offers ENABLE ROW LEVEL SECURITY;

-- Créer une politique pour permettre la lecture publique des offres actives
CREATE POLICY "Lecture publique des offres de voyage actives" 
  ON public.travel_offers 
  FOR SELECT 
  USING (is_active = true);

-- Créer une politique pour permettre aux partenaires de gérer leurs offres
CREATE POLICY "Partenaires peuvent gérer leurs offres de voyage" 
  ON public.travel_offers 
  FOR ALL 
  USING (partner_id = auth.uid());

-- Ajouter un trigger pour mettre à jour automatiquement updated_at
CREATE TRIGGER update_travel_offers_updated_at
  BEFORE UPDATE ON public.travel_offers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insérer quelques données d'exemple
INSERT INTO public.travel_offers (
  partner_id, 
  title, 
  description, 
  destination, 
  duration_days, 
  price, 
  departure_location, 
  departure_date, 
  return_date, 
  image, 
  inclusions
) VALUES 
(
  NULL, -- On mettra l'ID d'un partenaire existant plus tard
  'Voyage exceptionnel à Dubaï',
  'Le Festival des Soldes à DUBAI au départ de POINTE À PITRE. 8 jours / 5 nuits Hôtel 4 étoiles. OFFRE aux membres du CLUB CRÉOLE avec excursions offertes.',
  'Dubaï, Émirats Arabes Unis',
  8,
  1299.00,
  'Pointe-à-Pitre',
  '2025-12-19',
  '2025-12-27',
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1760&auto=format&fit=crop',
  '["Vol aller-retour", "Hôtel 4 étoiles", "Petit-déjeuner", "Excursions", "Transferts aéroport"]'::jsonb
),
(
  NULL,
  'Escapade à New York',
  'Découvrez la Big Apple avec ce séjour de 5 jours dans la ville qui ne dort jamais. Hébergement en plein cœur de Manhattan.',
  'New York, États-Unis',
  5,
  899.00,
  'Fort-de-France',
  '2025-03-15',
  '2025-03-20',
  'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1760&auto=format&fit=crop',
  '["Vol aller-retour", "Hôtel 3 étoiles Manhattan", "Petit-déjeuner", "Transferts aéroport"]'::jsonb
);

-- ============================================
-- Migration: 20250620185435-e4ae028b-2224-441e-aab6-5a5e6cc3e2e3.sql
-- ============================================

-- D'abord, vérifions la structure de la table partners et supprimons la contrainte problématique
ALTER TABLE public.partners DROP CONSTRAINT IF EXISTS partners_id_fkey;

-- Insérer directement les partenaires agences de voyage
INSERT INTO public.partners (
  id,
  business_name,
  business_type,
  description,
  address,
  phone,
  website
) VALUES 
(
  gen_random_uuid(),
  'Voyages Créole Évasion',
  'Agence de voyage',
  'Spécialiste des voyages aux Antilles et destinations tropicales',
  '12 Rue de la République, 97110 Pointe-à-Pitre',
  '+590 590 12 34 56',
  'https://www.creole-evasion.com'
),
(
  gen_random_uuid(),
  'Tropical Tours Martinique',
  'Agence de voyage',
  'Expert en circuits découverte et séjours sur mesure',
  '25 Avenue des Caraïbes, 97200 Fort-de-France',
  '+596 596 87 65 43',
  'https://www.tropical-tours.com'
),
(
  gen_random_uuid(),
  'Antilles Premium Travel',
  'Agence de voyage',
  'Voyages de luxe et expériences exclusives',
  '8 Boulevard du Bord de Mer, 97230 Sainte-Marie',
  '+590 590 98 76 54',
  'https://www.antilles-premium.com'
);

-- Mettre à jour les offres de voyage existantes avec des partenaires
UPDATE public.travel_offers 
SET partner_id = (
  SELECT id 
  FROM public.partners 
  WHERE business_name = 'Voyages Créole Évasion'
  LIMIT 1
)
WHERE title = 'Voyage exceptionnel à Dubaï';

UPDATE public.travel_offers 
SET partner_id = (
  SELECT id 
  FROM public.partners 
  WHERE business_name = 'Tropical Tours Martinique'
  LIMIT 1
)
WHERE title = 'Escapade à New York';

-- Ajouter quelques offres supplémentaires
INSERT INTO public.travel_offers (
  partner_id, 
  title, 
  description, 
  destination, 
  duration_days, 
  price, 
  departure_location, 
  departure_date, 
  return_date, 
  image, 
  inclusions
) VALUES 
(
  (SELECT id FROM public.partners WHERE business_name = 'Antilles Premium Travel' LIMIT 1),
  'Séjour de Rêve aux Maldives',
  'Escapade paradisiaque dans un resort 5 étoiles avec villa sur pilotis. Pension complète et activités nautiques incluses.',
  'Maldives',
  7,
  2599.00,
  'Pointe-à-Pitre',
  '2025-04-10',
  '2025-04-17',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1760&auto=format&fit=crop',
  '["Vol aller-retour", "Villa sur pilotis 5 étoiles", "Pension complète", "Activités nautiques", "Transferts en hydravion"]'::jsonb
),
(
  (SELECT id FROM public.partners WHERE business_name = 'Voyages Créole Évasion' LIMIT 1),
  'Circuit Découverte du Japon',
  'Immersion culturelle de 12 jours entre tradition et modernité. Visite de Tokyo, Kyoto, Osaka avec guide francophone.',
  'Japon',
  12,
  3299.00,
  'Fort-de-France',
  '2025-05-15',
  '2025-05-27',
  'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1760&auto=format&fit=crop',
  '["Vol aller-retour", "Hôtels 4 étoiles", "Petit-déjeuner", "Guide francophone", "Transferts", "JR Pass 7 jours"]'::jsonb
);

-- ============================================
-- Migration: 20250620204843-0479e8e2-1205-4074-a873-4e367f91fdd9.sql
-- ============================================

-- Créer une contrainte unique sur le nom de l'activité pour éviter les doublons
ALTER TABLE public.activities ADD CONSTRAINT activities_name_unique UNIQUE (name);

-- Insérer l'activité Voyages dans la table activities
INSERT INTO public.activities (name, path, icon_name)
VALUES ('Voyages', '/voyages', 'Plane');

-- ============================================
-- Migration: 20250623142107-95389e00-703a-4a1e-8c7c-c1562ace1770.sql
-- ============================================

-- Créer une table pour les promotions du carousel
CREATE TABLE public.promotions (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  badge TEXT,
  cta_text TEXT NOT NULL,
  cta_url TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Activer Row Level Security
ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;

-- Créer une politique pour permettre la lecture publique des promotions actives
CREATE POLICY "Lecture publique des promotions actives" 
  ON public.promotions 
  FOR SELECT 
  USING (is_active = true);

-- Ajouter un trigger pour mettre à jour automatiquement updated_at
CREATE TRIGGER update_promotions_updated_at
  BEFORE UPDATE ON public.promotions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insérer les données existantes du PromoCarousel
INSERT INTO public.promotions (title, description, image, badge, cta_text, cta_url, sort_order) VALUES 
(
  'Découvrez nos hébergements de charme',
  'Profitez d''un séjour inoubliable dans nos établissements partenaires avec des réductions exclusives pour les membres Club Créole.',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945',
  'Offre Spéciale',
  'Découvrir les hébergements',
  '/hebergements',
  1
),
(
  'Saveurs authentiques créoles',
  'Explorez la richesse de la gastronomie antillaise dans nos restaurants partenaires et bénéficiez d''avantages exclusifs.',
  'https://images.unsplash.com/photo-1559339352-11d035aa65de',
  'Nouveau',
  'Explorer les restaurants',
  '/restauration',
  2
),
(
  'Aventures et sensations fortes',
  'Plongée, randonnée, canoë... Vivez des expériences uniques avec nos activités outdoor et profitez de tarifs préférentiels.',
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
  'Aventure',
  'Voir les activités',
  '/loisirs',
  3
),
(
  'Soirées et événements exclusifs',
  'Accédez en priorité aux concerts et soirées les plus prisés des Antilles. Réservez vos places dès maintenant.',
  'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14',
  'Exclusif',
  'Découvrir les événements',
  '/concerts',
  4
);

-- ============================================
-- Migration: 20250625090000-796a87b5-8121-4407-abcf-7c398575022c.sql
-- ============================================

-- Ajouter une colonne status à la table partners existante
ALTER TABLE public.partners 
ADD COLUMN status TEXT DEFAULT 'en_attente' NOT NULL;

-- Ajouter une contrainte pour s'assurer que seules les valeurs valides sont utilisées
ALTER TABLE public.partners 
ADD CONSTRAINT partners_status_check 
CHECK (status IN ('en_attente', 'approuve', 'rejete'));

-- Mettre à jour les partenaires existants pour avoir le statut "approuve" par défaut
UPDATE public.partners 
SET status = 'approuve' 
WHERE status = 'en_attente';

-- ============================================
-- Migration: 20250627170809_add_weight_to_accommodations.sql
-- ============================================
-- Add weight column to accommodations table for weighted random sorting
ALTER TABLE public.accommodations 
ADD COLUMN weight integer DEFAULT 1;

COMMENT ON COLUMN public.accommodations.weight IS 'Weight for sorting priority - higher weight = higher priority in random display';

-- Update some example weights (you can modify these values as needed)
UPDATE public.accommodations SET weight = 5 WHERE rating >= 4.5;
UPDATE public.accommodations SET weight = 3 WHERE rating >= 4.0 AND rating < 4.5;
UPDATE public.accommodations SET weight = 1 WHERE rating < 4.0;
-- ============================================
-- Migration: 20250628100000_add_foreign_key_to_travel_offers.sql
-- ============================================

ALTER TABLE public.travel_offers
ADD CONSTRAINT travel_offers_partner_id_fkey
FOREIGN KEY (partner_id)
REFERENCES public.partners(id)
ON DELETE CASCADE;

-- ============================================
-- Migration: 20250701150234-f0eb6322-b911-4cdf-a0f8-a59757bdc740.sql
-- ============================================

-- Créer une table pour les réservations de voyage
CREATE TABLE public.travel_reservations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  travel_offer_id INTEGER NOT NULL REFERENCES public.travel_offers(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  participants INTEGER NOT NULL DEFAULT 1,
  special_requests TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  total_price NUMERIC(10,2) NOT NULL,
  reservation_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Activer Row Level Security
ALTER TABLE public.travel_reservations ENABLE ROW LEVEL SECURITY;

-- Créer une politique pour permettre aux utilisateurs de créer des réservations
CREATE POLICY "Users can create travel reservations" 
  ON public.travel_reservations 
  FOR INSERT 
  WITH CHECK (true);

-- Créer une politique pour permettre aux utilisateurs de voir leurs propres réservations
CREATE POLICY "Users can view their own travel reservations" 
  ON public.travel_reservations 
  FOR SELECT 
  USING (auth.uid() = user_id OR auth.uid() IS NULL);

-- Créer une politique pour permettre aux partenaires de voir les réservations de leurs offres
CREATE POLICY "Partners can view reservations for their offers" 
  ON public.travel_reservations 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.travel_offers 
      WHERE id = travel_offer_id 
      AND partner_id = (
        SELECT id FROM public.partners 
        WHERE user_id = auth.uid()
      )
    )
  );

-- Ajouter un trigger pour mettre à jour automatiquement updated_at
CREATE TRIGGER update_travel_reservations_updated_at
  BEFORE UPDATE ON public.travel_reservations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Migration: 20250701180715_add_travel_reservations_participant_details.sql
-- ============================================
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
-- ============================================
-- Migration: 20250702000000_add_unique_constraint_to_partners.sql
-- ============================================
-- Ajouter une contrainte unique sur business_name pour éviter les doublons
ALTER TABLE public.partners ADD CONSTRAINT partners_business_name_unique UNIQUE (business_name);
-- ============================================
-- Migration: 20250902211618_37d2c9a0-933b-4191-8c24-f4e348e8de34.sql
-- ============================================
-- Fix critical security vulnerability: profiles table publicly readable
-- Enable Row Level Security on profiles table and create proper access policies

-- Enable RLS on profiles table (if not already enabled)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Remove any existing overly permissive policies (if they exist)
DROP POLICY IF EXISTS "Allow public read access to profiles" ON public.profiles;
DROP POLICY IF EXISTS "Public read access for profiles" ON public.profiles;

-- Policy 1: Users can view their own profile
CREATE POLICY "Users can view own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

-- Policy 2: Super admins can view all profiles (for user management)
CREATE POLICY "Super admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (is_super_admin());

-- Policy 3: Users can update their own profile
CREATE POLICY "Users can update own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id);

-- Policy 4: Super admins can update all profiles
CREATE POLICY "Super admins can update all profiles" 
ON public.profiles 
FOR UPDATE 
USING (is_super_admin());

-- Policy 5: Only super admins can insert new profiles (for user creation)
CREATE POLICY "Super admins can insert profiles" 
ON public.profiles 
FOR INSERT 
WITH CHECK (is_super_admin());

-- Policy 6: Super admins can delete profiles (for user management)
CREATE POLICY "Super admins can delete profiles" 
ON public.profiles 
FOR DELETE 
USING (is_super_admin());
-- ============================================
-- Migration: 20250921085829_3ec96d99-873b-433d-85a7-07e89f52f4d4.sql
-- ============================================
-- Fix security issue: Enable RLS on tables that have policies but RLS disabled
-- This addresses the "Policy Exists RLS Disabled" security findings

-- Enable RLS on accommodations table (has policies but RLS disabled)
ALTER TABLE public.accommodations ENABLE ROW LEVEL SECURITY;

-- Enable RLS on activities table (has policies but RLS disabled) 
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- Enable RLS on bons_plans table (has policies but RLS disabled)
ALTER TABLE public.bons_plans ENABLE ROW LEVEL SECURITY;

-- Enable RLS on nightlife_events table (has policies but RLS disabled)
ALTER TABLE public.nightlife_events ENABLE ROW LEVEL SECURITY;

-- Enable RLS on promotions table (has policies but RLS disabled)
ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;

-- Enable RLS on restaurants table (has policies but RLS disabled)
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;
-- ============================================
-- Migration: 20250921090025_d9ed8bd0-9dae-45a8-9217-71d91316b54a.sql
-- ============================================
-- Fix critical security issue: Enable RLS on all public tables without RLS
-- This addresses the "RLS Disabled in Public" security findings

-- Enable RLS on all tables that currently don't have it
ALTER TABLE public.activity_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_inclusions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_time_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.car_client_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.car_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.car_models_backup ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.car_rental_features_backup ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.car_rental_reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.concerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fleet_managers_backup ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leisure_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers_backup ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners_backup ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners_id_mapping ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles_backup ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations_backup ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rls_policies_backup ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.travel_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.travel_offers_backup ENABLE ROW LEVEL SECURITY;

-- Create public read policies for content tables (activity-related, cars, concerts, travel)
CREATE POLICY "Public read access for activity_images" ON public.activity_images FOR SELECT USING (true);
CREATE POLICY "Public read access for activity_inclusions" ON public.activity_inclusions FOR SELECT USING (true);
CREATE POLICY "Public read access for activity_levels" ON public.activity_levels FOR SELECT USING (true);
CREATE POLICY "Public read access for activity_time_slots" ON public.activity_time_slots FOR SELECT USING (true);
CREATE POLICY "Public read access for car_client_reviews" ON public.car_client_reviews FOR SELECT USING (true);
CREATE POLICY "Public read access for car_models" ON public.car_models FOR SELECT USING (true);
CREATE POLICY "Public read access for concerts" ON public.concerts FOR SELECT USING (true);
CREATE POLICY "Public read access for leisure_activities" ON public.leisure_activities FOR SELECT USING (true);
CREATE POLICY "Public read access for partners" ON public.partners FOR SELECT USING (true);
CREATE POLICY "Public read access for travel_offers" ON public.travel_offers FOR SELECT USING (true);

-- Create admin-only policies for backup tables (security: only admins can access backup data)
CREATE POLICY "Admin only access for car_models_backup" ON public.car_models_backup FOR ALL USING (is_super_admin());
CREATE POLICY "Admin only access for car_rental_features_backup" ON public.car_rental_features_backup FOR ALL USING (is_super_admin());
CREATE POLICY "Admin only access for fleet_managers_backup" ON public.fleet_managers_backup FOR ALL USING (is_super_admin());
CREATE POLICY "Admin only access for offers_backup" ON public.offers_backup FOR ALL USING (is_super_admin());
CREATE POLICY "Admin only access for partners_backup" ON public.partners_backup FOR ALL USING (is_super_admin());
CREATE POLICY "Admin only access for partners_id_mapping" ON public.partners_id_mapping FOR ALL USING (is_super_admin());
CREATE POLICY "Admin only access for profiles_backup" ON public.profiles_backup FOR ALL USING (is_super_admin());
CREATE POLICY "Admin only access for reservations_backup" ON public.reservations_backup FOR ALL USING (is_super_admin());
CREATE POLICY "Admin only access for rls_policies_backup" ON public.rls_policies_backup FOR ALL USING (is_super_admin());
CREATE POLICY "Admin only access for travel_offers_backup" ON public.travel_offers_backup FOR ALL USING (is_super_admin());

-- Create user-specific policies for reservation tables
CREATE POLICY "Public can insert car rental reservations" ON public.car_rental_reservations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can read car rental reservations" ON public.car_rental_reservations FOR SELECT USING (true);
-- ============================================
-- Migration: 20250921090059_5fc94394-18b4-4a6e-a5ce-814dcc29ce0e.sql
-- ============================================
-- Fix the final RLS security issue: Enable RLS on the remaining table
ALTER TABLE public.car_rental_reservations_backup ENABLE ROW LEVEL SECURITY;

-- Create admin-only policy for this backup table
CREATE POLICY "Admin only access for car_rental_reservations_backup" ON public.car_rental_reservations_backup FOR ALL USING (is_super_admin());
-- ============================================
-- Migration: 20251113000000_add_is_partner_to_restaurants.sql
-- ============================================
-- Add is_partner column to restaurants table
ALTER TABLE restaurants
ADD COLUMN IF NOT EXISTS is_partner BOOLEAN NOT NULL DEFAULT false;

-- Create index for partner status to optimize filtering
CREATE INDEX IF NOT EXISTS idx_restaurants_is_partner ON restaurants(is_partner);

-- Add comment to document the column
COMMENT ON COLUMN restaurants.is_partner IS 'Indicates if the restaurant is a partner that accepts online reservations';

-- ============================================
-- Migration: 20251113000001_add_partner_contact_fields.sql
-- ============================================
-- Add missing contact fields to partners table for partner application form
-- This migration adds email and contact_name fields that are used in the PartnerApplicationForm component

-- Add email field (required for partner contact)
ALTER TABLE public.partners
ADD COLUMN IF NOT EXISTS email TEXT;

-- Add contact_name field (person submitting the application)
ALTER TABLE public.partners
ADD COLUMN IF NOT EXISTS contact_name TEXT;

-- Add index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_partners_email ON public.partners(email);

-- Add unique constraint on email to prevent duplicate partner applications
ALTER TABLE public.partners
ADD CONSTRAINT partners_email_unique UNIQUE (email);

-- Add comment explaining these fields
COMMENT ON COLUMN public.partners.email IS 'Contact email for the partner business';
COMMENT ON COLUMN public.partners.contact_name IS 'Name of the contact person who submitted the partner application';

-- ============================================
-- Migration: 20251113000002_fix_partners_rls_insert.sql
-- ============================================
-- Fix RLS policies for partners table to allow public form submissions
-- This allows the partner application form to work properly

-- Enable RLS if not already enabled (should already be enabled from previous migration)
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to recreate them
DROP POLICY IF EXISTS "Public read access for partners" ON public.partners;
DROP POLICY IF EXISTS "Public can insert partner applications" ON public.partners;

-- Create public read policy (for displaying partner data)
CREATE POLICY "Public read access for partners"
ON public.partners
FOR SELECT
USING (true);

-- Create public insert policy (for partner application form submissions)
-- This allows anyone to submit a partner application
CREATE POLICY "Public can insert partner applications"
ON public.partners
FOR INSERT
WITH CHECK (
  -- Anyone can insert, but status must be 'en_attente'
  status = 'en_attente'
);

-- Only admins can update partner status (approve/reject)
DROP POLICY IF EXISTS "Admin can update partners" ON public.partners;
CREATE POLICY "Admin can update partners"
ON public.partners
FOR UPDATE
USING (is_super_admin())
WITH CHECK (is_super_admin());

-- Only admins can delete partners
DROP POLICY IF EXISTS "Admin can delete partners" ON public.partners;
CREATE POLICY "Admin can delete partners"
ON public.partners
FOR DELETE
USING (is_super_admin());

-- ============================================
-- Migration: schemas.sql
-- ============================================
create table public.accommodations (
  id serial not null,
  name text not null,
  type text not null,
  location text not null,
  price numeric not null,
  rating numeric(2, 1) not null,
  image text not null,
  gallery_images jsonb not null,
  features jsonb not null,
  description text not null,
  rooms integer not null,
  bathrooms integer not null,
  max_guests integer not null,
  amenities jsonb not null,
  rules jsonb not null,
  discount integer null,
  constraint accommodations_pkey primary key (id)
) TABLESPACE pg_default;

create table public.activities (
  id bigint generated by default as identity not null,
  name text not null,
  path text not null,
  icon_name text not null,
  created_at timestamp with time zone not null default timezone ('utc'::text, now()),
  is_active boolean not null default true,
  constraint activities_pkey primary key (id),
  constraint activities_name_unique unique (name)
) TABLESPACE pg_default;

create table public.activity_images (
  id serial not null,
  activity_id integer not null,
  url text not null,
  alt_text text not null,
  title text not null,
  sort_order integer null default 0,
  created_at timestamp with time zone null default now(),
  constraint activity_images_pkey primary key (id),
  constraint activity_images_activity_id_fkey foreign KEY (activity_id) references leisure_activities (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists idx_activity_images_activity_id on public.activity_images using btree (activity_id) TABLESPACE pg_default;