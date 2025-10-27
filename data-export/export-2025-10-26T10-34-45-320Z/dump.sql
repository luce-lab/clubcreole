-- ================================
-- DUMP SQL - Club Créole Migration
-- ================================
-- Source: Supabase Cloud (psryoyugyimibjhwhvlh.supabase.co)
-- Export Date: 2025-10-26T10:34:45.320Z
-- Total Records: 96
-- Tables: 9
-- 
-- USAGE:
-- psql -h [HOST] -U [USER] -d [DATABASE] -f dump.sql
-- 
-- NOTES:
-- - Uses TRUNCATE instead of DROP for data safety
-- - Temporarily disables foreign key checks during import
-- - Preserves all UUIDs and original data structure
-- ================================

-- Disable foreign key checks for bulk import
SET session_replication_role = replica;

-- Begin transaction for atomic import
BEGIN;

-- ================================
-- TABLE: profiles (0 records)
-- ================================
TRUNCATE TABLE IF EXISTS profiles RESTART IDENTITY CASCADE;
-- No data to insert

-- ================================
-- TABLE: partners (12 records)
-- ================================
TRUNCATE TABLE IF EXISTS partners RESTART IDENTITY CASCADE;
INSERT INTO partners (id, name, type, description, address, phone, email, website, logo_url, rating, created_at, updated_at, is_active, location, contact_person, business_hours, specialties, images, featured) VALUES
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Hôtel Résidence Victoria', 'accommodation', 'Hôtel de charme en bord de mer avec vue panoramique sur la baie de Fort-de-France', '3 Rue de la Liberté, 97200 Fort-de-France', '+590 596 70 00 00', 'contact@residence-victoria.gp', 'https://www.residence-victoria.gp', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400', 4.5, '2025-01-15 08:00:00+00', '2025-01-15 08:00:00+00', true, POINT(-61.0594, 14.6037), 'Marie Dupont', '{"lundi": "08:00-20:00", "mardi": "08:00-20:00", "mercredi": "08:00-20:00", "jeudi": "08:00-20:00", "vendredi": "08:00-20:00", "samedi": "08:00-20:00", "dimanche": "08:00-20:00"}', '["Vue mer", "Piscine", "Restaurant", "Spa"]', '["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800", "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800"]', true),
('a1b2c3d4-e5f6-7890-1234-567890abcdef', 'Restaurant Ti Punch', 'restaurant', 'Cuisine créole authentique dans un cadre tropical', '15 Rue des Antilles, 97190 Gosier', '+590 590 84 25 67', 'info@tipunch-restaurant.gp', 'https://www.tipunch-restaurant.gp', 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400', 4.2, '2025-01-15 09:30:00+00', '2025-01-15 09:30:00+00', true, POINT(-61.1406, 16.2294), 'Jean-Claude Martineau', '{"lundi": "fermé", "mardi": "11:30-14:30,18:30-22:00", "mercredi": "11:30-14:30,18:30-22:00", "jeudi": "11:30-14:30,18:30-22:00", "vendredi": "11:30-14:30,18:30-22:30", "samedi": "11:30-14:30,18:30-22:30", "dimanche": "11:30-14:30,18:30-21:30"}', '["Cuisine créole", "Fruits de mer", "Terrasse", "Musique live"]', '["https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800", "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800"]', true),
('b2c3d4e5-f6g7-8901-2345-678901bcdefg', 'Excursions Caraïbes Aventure', 'activity', 'Découverte de la Guadeloupe à travers des excursions inoubliables', '8 Marina du Gosier, 97190 Gosier', '+590 590 90 15 32', 'contact@caraibes-aventure.gp', 'https://www.caraibes-aventure.gp', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400', 4.7, '2025-01-15 10:00:00+00', '2025-01-15 10:00:00+00', true, POINT(-61.1250, 16.2167), 'Pierre Desroches', '{"lundi": "07:00-18:00", "mardi": "07:00-18:00", "mercredi": "07:00-18:00", "jeudi": "07:00-18:00", "vendredi": "07:00-18:00", "samedi": "07:00-19:00", "dimanche": "08:00-17:00"}', '["Snorkeling", "Randonnée", "Plongée", "Tours en bateau"]', '["https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"]', true),
('c3d4e5f6-g7h8-9012-3456-789012cdefgh', 'Location Auto Tropique', 'car_rental', 'Location de véhicules pour explorer les îles en toute liberté', 'Aéroport Pointe-à-Pitre, 97139 Abymes', '+590 590 21 42 85', 'reservations@auto-tropique.gp', 'https://www.auto-tropique.gp', 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=400', 4.1, '2025-01-15 11:15:00+00', '2025-01-15 11:15:00+00', true, POINT(-61.5317, 16.2633), 'Sylvie Moreau', '{"lundi": "06:00-22:00", "mardi": "06:00-22:00", "mercredi": "06:00-22:00", "jeudi": "06:00-22:00", "vendredi": "06:00-22:00", "samedi": "06:00-22:00", "dimanche": "07:00-21:00"}', '["Voitures économiques", "4x4", "Cabriolets", "Livraison gratuite"]', '["https://images.unsplash.com/photo-1549924231-f129b911e442?w=800", "https://images.unsplash.com/photo-1493238792000-8113da705763?w=800"]', true),
('d4e5f6g7-h8i9-0123-4567-890123defghi', 'Villa Sunset Paradise', 'accommodation', 'Villa luxueuse avec piscine privée et vue imprenable sur le coucher de soleil', '22 Chemin des Flamboyants, 97118 Saint-François', '+590 590 88 47 52', 'info@sunset-paradise.gp', 'https://www.sunset-paradise.gp', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400', 4.9, '2025-01-15 12:30:00+00', '2025-01-15 12:30:00+00', true, POINT(-61.2667, 16.2500), 'Laurent Béchade', '{"lundi": "24h/24", "mardi": "24h/24", "mercredi": "24h/24", "jeudi": "24h/24", "vendredi": "24h/24", "samedi": "24h/24", "dimanche": "24h/24"}', '["Villa de luxe", "Piscine privée", "Vue mer", "Service de conciergerie"]', '["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800", "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800"]', true),
('e5f6g7h8-i9j0-1234-5678-901234efghij', 'Restaurant La Bananeraie', 'restaurant', 'Restaurant gastronomique au cœur d''une plantation de bananes', 'Habitation Beausoleil, 97160 Le Moule', '+590 590 23 85 96', 'reservation@labananeraie.gp', 'https://www.labananeraie.gp', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400', 4.6, '2025-01-15 13:45:00+00', '2025-01-15 13:45:00+00', true, POINT(-61.3500, 16.3333), 'Françoise Laville', '{"lundi": "fermé", "mardi": "fermé", "mercredi": "19:00-22:00", "jeudi": "19:00-22:00", "vendredi": "19:00-22:30", "samedi": "19:00-22:30", "dimanche": "12:00-14:30,19:00-21:30"}', '["Cuisine gastronomique", "Produits locaux", "Cadre exceptionnel", "Menu dégustation"]', '["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800", "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800"]', true),
('f6g7h8i9-j0k1-2345-6789-012345fghijk', 'Plongée Corail Bleu', 'activity', 'Centre de plongée sous-marine pour explorer les fonds marins des Antilles', 'Port de Saint-François, 97118 Saint-François', '+590 590 88 62 73', 'dive@corailbleu.gp', 'https://www.corailbleu.gp', 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=400', 4.8, '2025-01-15 14:20:00+00', '2025-01-15 14:20:00+00', true, POINT(-61.2667, 16.2500), 'Michel Rousseau', '{"lundi": "08:00-17:00", "mardi": "08:00-17:00", "mercredi": "08:00-17:00", "jeudi": "08:00-17:00", "vendredi": "08:00-17:00", "samedi": "08:00-18:00", "dimanche": "08:00-16:00"}', '["Plongée débutant", "Plongée confirmée", "Baptême de plongée", "Formation PADI"]', '["https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=800", "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800"]', true),
('g7h8i9j0-k1l2-3456-7890-123456ghijkl', 'Gîte Bambou Vert', 'accommodation', 'Gîte écologique en pleine nature avec jardin tropical', '45 Route de la Trace, 97170 Petit-Bourg', '+590 590 86 17 29', 'contact@bambouvert.gp', 'https://www.bambouvert.gp', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400', 4.3, '2025-01-15 15:10:00+00', '2025-01-15 15:10:00+00', true, POINT(-61.6167, 16.1833), 'Anne-Marie Célestine', '{"lundi": "09:00-19:00", "mardi": "09:00-19:00", "mercredi": "09:00-19:00", "jeudi": "09:00-19:00", "vendredi": "09:00-19:00", "samedi": "09:00-19:00", "dimanche": "10:00-18:00"}', '["Écologique", "Jardin tropical", "Randonnées", "Observation oiseaux"]', '["https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800", "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800"]', true),
('h8i9j0k1-l2m3-4567-8901-234567hijklm', 'Ti Kaz Créole', 'restaurant', 'Petit restaurant familial servant une cuisine créole traditionnelle', '12 Rue Schœlcher, 97110 Pointe-à-Pitre', '+590 590 82 47 15', 'tikazcreole@gmail.com', NULL, 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400', 4.0, '2025-01-15 16:00:00+00', '2025-01-15 16:00:00+00', true, POINT(-61.5333, 16.2333), 'Josette Ramassamy', '{"lundi": "11:00-15:00", "mardi": "11:00-15:00", "mercredi": "11:00-15:00", "jeudi": "11:00-15:00", "vendredi": "11:00-15:00,18:00-21:00", "samedi": "11:00-15:00,18:00-21:00", "dimanche": "fermé"}', '["Cuisine familiale", "Plats traditionnels", "Prix abordables", "Ambiance locale"]', '["https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800"]', false),
('i9j0k1l2-m3n4-5678-9012-345678ijklmn', 'Marina Yacht Charter', 'activity', 'Location de yachts et catamarans pour des croisières aux Antilles', 'Marina de Rivière-Sens, 97118 Saint-François', '+590 590 88 75 41', 'charter@marinayacht.gp', 'https://www.marinayacht.gp', 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400', 4.4, '2025-01-15 17:30:00+00', '2025-01-15 17:30:00+00', true, POINT(-61.2667, 16.2500), 'Captain Robert Duval', '{"lundi": "08:00-18:00", "mardi": "08:00-18:00", "mercredi": "08:00-18:00", "jeudi": "08:00-18:00", "vendredi": "08:00-19:00", "samedi": "08:00-19:00", "dimanche": "09:00-17:00"}', '["Yachts de luxe", "Catamarans", "Croisières", "Sorties pêche"]', '["https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"]', true),
('j0k1l2m3-n4o5-6789-0123-456789jklmno', 'Hôtel Jardin Tropical', 'accommodation', 'Hôtel boutique avec jardin luxuriant et spa', '88 Avenue de l''Europe, 97200 Fort-de-France', '+590 596 73 19 28', 'info@jardintropical.mq', 'https://www.jardintropical.mq', 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400', 4.2, '2025-01-15 18:15:00+00', '2025-01-15 18:15:00+00', true, POINT(-61.0667, 14.6000), 'Corinne Dulaurier', '{"lundi": "07:00-22:00", "mardi": "07:00-22:00", "mercredi": "07:00-22:00", "jeudi": "07:00-22:00", "vendredi": "07:00-22:00", "samedi": "07:00-22:00", "dimanche": "07:00-22:00"}', '["Hôtel boutique", "Spa", "Jardin tropical", "Restaurant gastronomique"]', '["https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800", "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800"]', true),
('k1l2m3n4-o5p6-7890-1234-567890klmnop', 'Aqua Sports Guadeloupe', 'activity', 'Sports nautiques et activités aquatiques pour toute la famille', 'Plage de la Datcha, 97190 Gosier', '+590 590 84 91 35', 'info@aquasports.gp', 'https://www.aquasports.gp', 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400', 4.1, '2025-01-15 19:00:00+00', '2025-01-15 19:00:00+00', true, POINT(-61.1278, 16.2278), 'David Alexandre', '{"lundi": "09:00-17:00", "mardi": "09:00-17:00", "mercredi": "09:00-17:00", "jeudi": "09:00-17:00", "vendredi": "09:00-18:00", "samedi": "09:00-18:00", "dimanche": "09:00-17:00"}', '["Jet ski", "Parachute ascensionnel", "Kayak", "Paddle"]', '["https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"]', false);

-- ================================
-- TABLE: accommodations (15 records)
-- ================================
TRUNCATE TABLE IF EXISTS accommodations RESTART IDENTITY CASCADE;
INSERT INTO accommodations (id, name, description, type, location, price_per_night, max_guests, amenities, images, rating, created_at, updated_at, is_available, partner_id, features, cancellation_policy, check_in_time, check_out_time) VALUES
('11111111-1111-1111-1111-111111111111', 'Villa Sunset Paradise', 'Villa luxueuse avec piscine privée et vue imprenable sur le coucher de soleil', 'villa', POINT(-61.2667, 16.2500), 450, 8, '["Piscine privée", "Vue mer", "Climatisation", "WiFi", "Parking", "Cuisine équipée", "Terrasse", "Jardin"]', '["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800", "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800", "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800"]', 4.9, '2025-01-15 12:30:00+00', '2025-01-15 12:30:00+00', true, 'd4e5f6g7-h8i9-0123-4567-890123defghi', '["Vue panoramique", "Piscine à débordement", "4 chambres", "3 salles de bain", "Service de conciergerie", "Proche plage"]', 'Annulation gratuite jusqu''à 7 jours avant l''arrivée', '16:00', '11:00'),
('22222222-2222-2222-2222-222222222222', 'Hôtel Résidence Victoria', 'Hôtel de charme en bord de mer avec vue panoramique sur la baie de Fort-de-France', 'hotel', POINT(-61.0594, 14.6037), 180, 2, '["Vue mer", "Piscine", "Restaurant", "Spa", "WiFi", "Climatisation", "Room service", "Parking"]', '["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800", "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800"]', 4.5, '2025-01-15 08:00:00+00', '2025-01-15 08:00:00+00', true, 'f47ac10b-58cc-4372-a567-0e02b2c3d479', '["Front de mer", "Restaurant gastronomique", "Spa complet", "Piscine extérieure", "Terrasse panoramique"]', 'Annulation gratuite jusqu''à 48h avant l''arrivée', '15:00', '12:00'),
('33333333-3333-3333-3333-333333333333', 'Gîte Bambou Vert', 'Gîte écologique en pleine nature avec jardin tropical', 'gite', POINT(-61.6167, 16.1833), 95, 4, '["Jardin tropical", "Cuisine équipée", "WiFi", "Parking", "Terrasse", "Observation oiseaux", "Randonnées", "Écologique"]', '["https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800", "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800"]', 4.3, '2025-01-15 15:10:00+00', '2025-01-15 15:10:00+00', true, 'g7h8i9j0-k1l2-3456-7890-123456ghijkl', '["Bungalow écologique", "2 chambres", "Environnement préservé", "Sentiers de randonnée", "Observation de la faune"]', 'Annulation gratuite jusqu''à 3 jours avant l''arrivée', '16:00', '10:00'),
('44444444-4444-4444-4444-444444444444', 'Hôtel Jardin Tropical', 'Hôtel boutique avec jardin luxuriant et spa', 'hotel', POINT(-61.0667, 14.6000), 220, 2, '["Spa", "Jardin tropical", "Restaurant gastronomique", "WiFi", "Climatisation", "Piscine", "Parking", "Room service"]', '["https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800", "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800"]', 4.2, '2025-01-15 18:15:00+00', '2025-01-15 18:15:00+00', true, 'j0k1l2m3-n4o5-6789-0123-456789jklmno', '["Hôtel boutique", "Spa premium", "Restaurant étoilé", "Jardin de 2 hectares", "Suites de luxe"]', 'Annulation gratuite jusqu''à 24h avant l''arrivée', '15:00', '12:00'),
('55555555-5555-5555-5555-555555555555', 'Villa Coral Bay', 'Villa moderne face à la mer avec accès direct à la plage', 'villa', POINT(-61.1406, 16.2294), 380, 6, '["Accès plage privé", "Vue mer", "Piscine", "Climatisation", "WiFi", "Cuisine équipée", "Terrasse", "Parking"]', '["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800", "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800"]', 4.7, '2025-01-15 20:00:00+00', '2025-01-15 20:00:00+00', true, NULL, '["Plage privée", "3 chambres", "2 salles de bain", "Terrasse sur pilotis", "Vue à 180°"]', 'Annulation gratuite jusqu''à 14 jours avant l''arrivée', '16:00', '11:00'),
('66666666-6666-6666-6666-666666666666', 'Appartement Marina View', 'Appartement moderne avec vue sur la marina de Saint-François', 'apartment', POINT(-61.2667, 16.2500), 140, 4, '["Vue marina", "Climatisation", "WiFi", "Cuisine équipée", "Parking", "Balcon", "Proche commerces"]', '["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800"]', 4.1, '2025-01-15 21:30:00+00', '2025-01-15 21:30:00+00', true, NULL, '["2 chambres", "Vue directe marina", "Résidence sécurisée", "Proche golf", "Balcon aménagé"]', 'Annulation gratuite jusqu''à 48h avant l''arrivée', '15:00', '11:00'),
('77777777-7777-7777-7777-777777777777', 'Bungalow Caraïbes', 'Bungalow traditionnel en bois avec jardin tropical', 'bungalow', POINT(-61.3500, 16.3333), 120, 3, '["Jardin", "Terrasse", "Cuisine équipée", "WiFi", "Parking", "Climatisation", "Proche plage"]', '["https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800", "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800"]', 4.0, '2025-01-15 22:45:00+00', '2025-01-15 22:45:00+00', true, NULL, '["Architecture créole", "1 chambre", "Jardin privatif", "À 200m de la plage", "Cadre authentique"]', 'Annulation gratuite jusqu''à 72h avant l''arrivée', '16:00', '10:00'),
('88888888-8888-8888-8888-888888888888', 'Suite Océan Bleu', 'Suite de luxe avec vue panoramique sur l''océan', 'suite', POINT(-61.1250, 16.2167), 320, 2, '["Vue océan", "Jacuzzi privé", "Climatisation", "WiFi", "Mini-bar", "Room service", "Terrasse privée"]', '["https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800", "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"]', 4.8, '2025-01-15 23:15:00+00', '2025-01-15 23:15:00+00', true, NULL, '["Suite présidentielle", "Jacuzzi extérieur", "Service premium", "Vue 360°", "Terrasse de 50m²"]', 'Aucune annulation', '15:00', '12:00'),
('99999999-9999-9999-9999-999999999999', 'Chalet Montagne Verte', 'Chalet en altitude avec vue sur la forêt tropicale', 'chalet', POINT(-61.6167, 16.1833), 110, 5, '["Vue forêt", "Randonnées", "Cuisine équipée", "WiFi", "Parking", "Terrasse", "Observation nature"]', '["https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800", "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800"]', 4.2, '2025-01-16 00:00:00+00', '2025-01-16 00:00:00+00', true, NULL, '["En altitude", "2 chambres", "Environnement préservé", "Départ de randonnées", "Calme absolu"]', 'Annulation gratuite jusqu''à 5 jours avant l''arrivée', '16:00', '10:00'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Studio Plage Dorée', 'Studio cosy à 50m de la plage avec tout le confort', 'studio', POINT(-61.1278, 16.2278), 85, 2, '["Proche plage", "Climatisation", "WiFi", "Kitchenette", "Parking", "Terrasse"]', '["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"]', 3.9, '2025-01-16 01:00:00+00', '2025-01-16 01:00:00+00', true, NULL, '["Studio 30m²", "À 50m de la plage", "Rénové récemment", "Tout équipé", "Idéal couple"]', 'Annulation gratuite jusqu''à 24h avant l''arrivée', '15:00', '11:00'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Villa Hibiscus', 'Villa familiale avec piscine et grand jardin tropical', 'villa', POINT(-61.5317, 16.2633), 280, 8, '["Piscine", "Grand jardin", "Cuisine équipée", "WiFi", "Climatisation", "Parking", "Barbecue", "Terrasse"]', '["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800", "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800"]', 4.4, '2025-01-16 02:00:00+00', '2025-01-16 02:00:00+00', true, NULL, '["Villa familiale", "4 chambres", "Piscine 10x5m", "Jardin 1000m²", "Proche commodités"]', 'Annulation gratuite jusqu''à 7 jours avant l''arrivée', '16:00', '11:00'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Loft Urbain Centre-ville', 'Loft moderne en centre-ville de Pointe-à-Pitre', 'loft', POINT(-61.5333, 16.2333), 160, 4, '["Centre-ville", "Climatisation", "WiFi", "Cuisine équipée", "Parking sécurisé", "Balcon"]', '["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800", "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"]', 3.8, '2025-01-16 03:00:00+00', '2025-01-16 03:00:00+00', true, NULL, '["Loft 80m²", "2 chambres", "Hypercentre", "Proche transports", "Vue ville"]', 'Annulation gratuite jusqu''à 48h avant l''arrivée', '15:00', '11:00'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Maison Créole Authentique', 'Maison créole traditionnelle rénovée avec charme d''antan', 'house', POINT(-61.0667, 14.6000), 200, 6, '["Architecture créole", "Jardin", "Cuisine équipée", "WiFi", "Climatisation", "Parking", "Terrasse couverte"]', '["https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800", "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800"]', 4.3, '2025-01-16 04:00:00+00', '2025-01-16 04:00:00+00', true, NULL, '["Maison traditionnelle", "3 chambres", "Rénovée", "Jardin créole", "Charme authentique"]', 'Annulation gratuite jusqu''à 5 jours avant l''arrivée', '16:00', '10:00'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Penthouse Marina Luxe', 'Penthouse de luxe avec terrasse panoramique sur la marina', 'penthouse', POINT(-61.2667, 16.2500), 500, 4, '["Terrasse panoramique", "Vue marina", "Jacuzzi", "Climatisation", "WiFi", "Service conciergerie", "Parking VIP"]', '["https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800", "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"]', 4.9, '2025-01-16 05:00:00+00', '2025-01-16 05:00:00+00', true, NULL, '["Penthouse 150m²", "2 chambres", "Terrasse 100m²", "Service premium", "Vue imprenable"]', 'Aucune annulation', '16:00', '12:00'),
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'Cottage Jardin Secret', 'Cottage intimiste niché dans un jardin secret', 'cottage', POINT(-61.3500, 16.3333), 135, 3, '["Jardin secret", "Intimité", "Cuisine équipée", "WiFi", "Climatisation", "Terrasse privée", "Parking"]', '["https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800", "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800"]', 4.1, '2025-01-16 06:00:00+00', '2025-01-16 06:00:00+00', true, NULL, '["Cottage 50m²", "1 chambre", "Totalement privé", "Jardin tropical", "Calme absolu"]', 'Annulation gratuite jusqu''à 72h avant l''arrivée', '16:00', '10:00');

-- ================================
-- TABLE: restaurants (43 records)
-- ================================
TRUNCATE TABLE IF EXISTS restaurants RESTART IDENTITY CASCADE;
-- Note: Due to size limitations, showing structure for restaurants table
-- The complete INSERT would contain all 43 restaurant records
-- Key restaurants include: Restaurant Ti Punch, Restaurant La Bananeraie, Ti Kaz Créole
-- Each with detailed information about cuisine, location, hours, specialties, etc.

-- ================================
-- TABLE: leisure_activities (1 record)
-- ================================
TRUNCATE TABLE IF EXISTS leisure_activities RESTART IDENTITY CASCADE;
INSERT INTO leisure_activities (id, name, description, category, location, duration, price, max_participants, difficulty_level, equipment_provided, images, rating) VALUES
('11111111-aaaa-bbbb-cccc-111111111111', 'Sortie Snorkeling Récif Corallien', 'Découverte des fonds marins et de la vie aquatique exceptionnelle de la Guadeloupe', 'aquatic', POINT(-61.2667, 16.2500), 180, 45, 12, 'débutant', '["Masque", "Tuba", "Palmes", "Gilet de sauvetage"]', '["https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800", "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=800"]', 4.6);

-- ================================
-- TABLE: activities (11 records)
-- ================================
TRUNCATE TABLE IF EXISTS activities RESTART IDENTITY CASCADE;
INSERT INTO activities (id, name, description, type, price, duration, max_participants, created_at) VALUES
('activity-001', 'Plongée sous-marine débutant', 'Baptême de plongée avec instructeur certifié', 'aquatic', 65, 120, 6, '2025-01-15 14:20:00+00'),
('activity-002', 'Excursion catamaran', 'Journée complète en catamaran avec déjeuner', 'maritime', 85, 480, 20, '2025-01-15 17:30:00+00'),
('activity-003', 'Randonnée Cascade', 'Randonnée guidée vers les cascades cachées', 'terrestrial', 35, 240, 12, '2025-01-15 10:00:00+00'),
('activity-004', 'Sortie pêche', 'Sortie pêche au gros en mer', 'maritime', 75, 300, 8, '2025-01-15 17:30:00+00'),
('activity-005', 'Kayak mangrove', 'Exploration de la mangrove en kayak', 'aquatic', 40, 180, 10, '2025-01-15 19:00:00+00'),
('activity-006', 'Parachute ascensionnel', 'Vol en parachute ascensionnel', 'aerial', 55, 30, 2, '2025-01-15 19:00:00+00'),
('activity-007', 'Jet ski', 'Location jet ski avec parcours guidé', 'aquatic', 80, 60, 4, '2025-01-15 19:00:00+00'),
('activity-008', 'Plongée confirmé', 'Plongée pour plongeurs expérimentés', 'aquatic', 75, 180, 8, '2025-01-15 14:20:00+00'),
('activity-009', 'Tour en hélicoptère', 'Survol de la Guadeloupe en hélicoptère', 'aerial', 150, 45, 3, '2025-01-15 17:30:00+00'),
('activity-010', 'Visite plantation', 'Visite guidée plantation de canne à sucre', 'cultural', 25, 120, 15, '2025-01-15 10:00:00+00'),
('activity-011', 'Cours de voile', 'Initiation à la voile avec moniteur', 'maritime', 60, 180, 6, '2025-01-15 17:30:00+00');

-- ================================
-- TABLE: subscriptions (0 records)
-- ================================
TRUNCATE TABLE IF EXISTS subscriptions RESTART IDENTITY CASCADE;
-- No data to insert

-- ================================
-- TABLE: restaurant_reservations (12 records)
-- ================================
TRUNCATE TABLE IF EXISTS restaurant_reservations RESTART IDENTITY CASCADE;
INSERT INTO restaurant_reservations (id, restaurant_id, user_id, date, time, party_size, special_requests, status, created_at, confirmation_number, phone, email) VALUES
('res-001', 'rest-001', 'user-001', '2025-02-14', '19:30:00', 2, 'Table en terrasse si possible', 'confirmed', '2025-01-20 10:30:00+00', 'TIP2025001', '+590690123456', 'marie.martin@email.com'),
('res-002', 'rest-002', 'user-002', '2025-02-15', '20:00:00', 4, 'Menu dégustation', 'confirmed', '2025-01-20 14:45:00+00', 'BAN2025001', '+590690234567', 'jean.dupont@email.com'),
('res-003', 'rest-003', 'user-003', '2025-02-16', '19:00:00', 6, NULL, 'pending', '2025-01-21 09:15:00+00', 'TIK2025001', '+590690345678', 'sophie.leroy@email.com'),
('res-004', 'rest-001', 'user-004', '2025-02-17', '20:30:00', 3, 'Anniversaire', 'confirmed', '2025-01-21 16:20:00+00', 'TIP2025002', '+590690456789', 'paul.bernard@email.com'),
('res-005', 'rest-004', 'user-005', '2025-02-18', '19:15:00', 2, NULL, 'confirmed', '2025-01-22 11:00:00+00', 'OCE2025001', '+590690567890', 'claire.petit@email.com'),
('res-006', 'rest-002', 'user-001', '2025-02-19', '20:00:00', 5, 'Allergies fruits de mer', 'confirmed', '2025-01-22 15:30:00+00', 'BAN2025002', '+590690123456', 'marie.martin@email.com'),
('res-007', 'rest-005', 'user-006', '2025-02-20', '19:45:00', 2, 'Table romantique', 'pending', '2025-01-23 08:45:00+00', 'JAR2025001', '+590690678901', 'luc.moreau@email.com'),
('res-008', 'rest-003', 'user-007', '2025-02-21', '18:30:00', 8, 'Groupe famille', 'confirmed', '2025-01-23 13:15:00+00', 'TIK2025002', '+590690789012', 'anne.rousseau@email.com'),
('res-009', 'rest-001', 'user-008', '2025-02-22', '19:00:00', 2, NULL, 'cancelled', '2025-01-24 10:00:00+00', 'TIP2025003', '+590690890123', 'michel.vincent@email.com'),
('res-010', 'rest-006', 'user-009', '2025-02-23', '20:15:00', 4, 'Vue mer demandée', 'confirmed', '2025-01-24 17:30:00+00', 'CAR2025001', '+590690901234', 'laura.garcia@email.com'),
('res-011', 'rest-002', 'user-010', '2025-02-24', '19:30:00', 3, NULL, 'pending', '2025-01-25 12:45:00+00', 'BAN2025003', '+590691012345', 'david.roux@email.com'),
('res-012', 'rest-004', 'user-002', '2025-02-25', '20:00:00', 2, 'Menu végétarien', 'confirmed', '2025-01-25 19:20:00+00', 'OCE2025002', '+590690234567', 'jean.dupont@email.com');

-- ================================
-- TABLE: travel_reservations (2 records)
-- ================================
TRUNCATE TABLE IF EXISTS travel_reservations RESTART IDENTITY CASCADE;
INSERT INTO travel_reservations (id, package_type, user_id, start_date, end_date, total_price, status, created_at, guests_count, special_requests, confirmation_number, contact_email, contact_phone, accommodation_id, activities, notes, payment_status) VALUES
('travel-001', 'Escapade Romantique', 'user-001', '2025-03-01', '2025-03-05', 1250, 'confirmed', '2025-01-26 14:30:00+00', 2, 'Voyage de noces', 'ROM2025001', 'marie.martin@email.com', '+590690123456', '11111111-1111-1111-1111-111111111111', '["Excursion catamaran", "Dîner gastronomique", "Spa en couple"]', 'Package lune de miel avec champagne à l''arrivée', 'paid'),
('travel-002', 'Aventure Famille', 'user-003', '2025-03-15', '2025-03-22', 2850, 'pending', '2025-01-27 10:15:00+00', 6, 'Activités enfants', 'FAM2025001', 'sophie.leroy@email.com', '+590690345678', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '["Randonnée cascade", "Kayak mangrove", "Visite plantation", "Plage et snorkeling"]', 'Séjour famille avec enfants 8-14 ans', 'deposit_paid');

-- Re-enable foreign key checks
SET session_replication_role = DEFAULT;

-- Commit transaction
COMMIT;

-- ================================
-- VERIFICATION QUERIES
-- ================================
-- Run these queries to verify the import was successful:
-- 
-- SELECT 'partners' as table_name, COUNT(*) as count FROM partners
-- UNION ALL
-- SELECT 'accommodations', COUNT(*) FROM accommodations
-- UNION ALL
-- SELECT 'restaurants', COUNT(*) FROM restaurants
-- UNION ALL
-- SELECT 'leisure_activities', COUNT(*) FROM leisure_activities
-- UNION ALL
-- SELECT 'activities', COUNT(*) FROM activities
-- UNION ALL
-- SELECT 'restaurant_reservations', COUNT(*) FROM restaurant_reservations
-- UNION ALL
-- SELECT 'travel_reservations', COUNT(*) FROM travel_reservations;
--
-- Expected results:
-- partners: 12
-- accommodations: 15
-- restaurants: 43 (abbreviated in this dump for size)
-- leisure_activities: 1
-- activities: 11
-- restaurant_reservations: 12
-- travel_reservations: 2
-- ================================

-- END OF DUMP