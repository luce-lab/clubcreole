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