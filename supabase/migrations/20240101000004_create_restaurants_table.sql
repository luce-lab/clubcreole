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