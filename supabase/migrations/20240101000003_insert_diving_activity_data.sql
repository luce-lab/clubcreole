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