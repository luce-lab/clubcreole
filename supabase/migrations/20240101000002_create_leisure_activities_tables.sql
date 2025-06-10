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