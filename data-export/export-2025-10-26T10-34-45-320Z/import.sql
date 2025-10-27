-- Script d'import généré automatiquement
-- Date: 2025-10-26T10:34:56.254Z
-- Source: https://psryoyugyimibjhwhvlh.supabase.co
-- Total records: 96

BEGIN;

-- Import table partners (12 enregistrements)
-- TRUNCATE TABLE partners; -- Décommentez pour vider la table
-- \copy partners FROM 'partners.json' WITH (FORMAT json);

-- Import table accommodations (15 enregistrements)
-- TRUNCATE TABLE accommodations; -- Décommentez pour vider la table
-- \copy accommodations FROM 'accommodations.json' WITH (FORMAT json);

-- Import table restaurants (43 enregistrements)
-- TRUNCATE TABLE restaurants; -- Décommentez pour vider la table
-- \copy restaurants FROM 'restaurants.json' WITH (FORMAT json);

-- Import table leisure_activities (1 enregistrements)
-- TRUNCATE TABLE leisure_activities; -- Décommentez pour vider la table
-- \copy leisure_activities FROM 'leisure_activities.json' WITH (FORMAT json);

-- Import table activities (11 enregistrements)
-- TRUNCATE TABLE activities; -- Décommentez pour vider la table
-- \copy activities FROM 'activities.json' WITH (FORMAT json);

-- Import table restaurant_reservations (12 enregistrements)
-- TRUNCATE TABLE restaurant_reservations; -- Décommentez pour vider la table
-- \copy restaurant_reservations FROM 'restaurant_reservations.json' WITH (FORMAT json);

-- Import table travel_reservations (2 enregistrements)
-- TRUNCATE TABLE travel_reservations; -- Décommentez pour vider la table
-- \copy travel_reservations FROM 'travel_reservations.json' WITH (FORMAT json);


COMMIT;

-- Instructions:
-- 1. Copier ce dossier sur le serveur cible
-- 2. Adapter les chemins dans les commandes \copy
-- 3. Exécuter: psql -f import.sql
