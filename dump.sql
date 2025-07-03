-- Dump SQL for Supabase Database
-- Generated on Wed Jul  2 16:05:50 CEST 2025


-- Table: voyance_reviews

INSERT INTO voyance_reviews (id, medium_id, client_name, rating, comment, consultation_date, created_at) VALUES (1, 1, 'Marie L.', 5, 'Consultation exceptionnelle ! Madame Solange a su cerner mes préoccupations avec une précision remarquable.', '2024-01-15', '2025-06-20T09:40:44.571916+00:00');
INSERT INTO voyance_reviews (id, medium_id, client_name, rating, comment, consultation_date, created_at) VALUES (2, 1, 'Jean-Paul D.', 4, 'Très bonne voyante, conseils utiles et bienveillants. Je recommande vivement.', '2024-02-03', '2025-06-20T09:40:44.571916+00:00');
INSERT INTO voyance_reviews (id, medium_id, client_name, rating, comment, consultation_date, created_at) VALUES (3, 2, 'Claudette M.', 5, 'Maître Antoine m''a aidée à prendre des décisions importantes. Merci pour cette guidance précieuse.', '2024-01-28', '2025-06-20T09:40:44.571916+00:00');
INSERT INTO voyance_reviews (id, medium_id, client_name, rating, comment, consultation_date, created_at) VALUES (4, 3, 'Robert K.', 5, 'Mama Josephine a résolu mes problèmes spirituels. Une vraie professionnelle !', '2024-02-10', '2025-06-20T09:40:44.571916+00:00');
INSERT INTO voyance_reviews (id, medium_id, client_name, rating, comment, consultation_date, created_at) VALUES (5, 4, 'Sandra B.', 4, 'Consultation par téléphone très satisfaisante avec Marcus. Prédictions justes.', '2024-02-05', '2025-06-20T09:40:44.571916+00:00');

-- Table: promotions

INSERT INTO promotions (id, title, description, image, badge, cta_text, cta_url, sort_order, is_active, created_at, updated_at, gallery_images) VALUES (1, 'Découvrez nos hébergements de charme', 'Profitez d''un séjour inoubliable dans nos établissements partenaires avec des réductions exclusives pour les membres Club Créole.', 'https://images.unsplash.com/photo-1566073771259-6a8506099945', 'Offre Spéciale', 'Découvrir les hébergements de Guadeloupe', '/hebergements/3', 1, TRUE, '2025-06-23T14:21:02.88358+00:00', '2025-06-24T05:16:17.570122+00:00', '[]');
INSERT INTO promotions (id, title, description, image, badge, cta_text, cta_url, sort_order, is_active, created_at, updated_at, gallery_images) VALUES (2, 'Saveurs authentiques créoles', 'Explorez la richesse de la gastronomie antillaise dans nos restaurants partenaires et bénéficiez d''avantages exclusifs.', 'https://images.unsplash.com/photo-1559339352-11d035aa65de', 'Nouveau', 'Explorer les restaurants', '/restauration', 2, TRUE, '2025-06-23T14:21:02.88358+00:00', '2025-06-24T05:16:19.57102+00:00', '[]');
INSERT INTO promotions (id, title, description, image, badge, cta_text, cta_url, sort_order, is_active, created_at, updated_at, gallery_images) VALUES (3, 'Aventures et sensations fortes', 'Plongée, randonnée, canoë... Vivez des expériences uniques avec nos activités outdoor et profitez de tarifs préférentiels.', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5', 'Aventure', 'Voir les activités', '/loisirs', 3, TRUE, '2025-06-23T14:21:02.88358+00:00', '2025-06-24T05:16:21.171415+00:00', NULL);
INSERT INTO promotions (id, title, description, image, badge, cta_text, cta_url, sort_order, is_active, created_at, updated_at, gallery_images) VALUES (5, 'Création numérique', 'Nous sommes une agence web. Nous vous proposons la création de vos outils numérique et un accompagnements dans vos projets.', 'https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/promotion-images/0.326777149385414.png', '-50% , Limité aux 50 premiers', 'Découvrir l''offre', 'https://laurent-luce.com/', 2, TRUE, '2025-06-24T05:21:51.679378+00:00', '2025-06-24T05:25:00.425933+00:00', NULL);
INSERT INTO promotions (id, title, description, image, badge, cta_text, cta_url, sort_order, is_active, created_at, updated_at, gallery_images) VALUES (4, 'Soirées et événements exclusifs', 'Accédez en priorité aux concerts et soirées les plus prisés des Antilles. Réservez vos places dès maintenant.', 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14', 'Exclusif', 'Découvrir les événements', '/concerts', 4, TRUE, '2025-06-23T14:21:02.88358+00:00', '2025-06-23T14:50:04.841717+00:00', NULL);

-- Table: activity_time_slots

INSERT INTO activity_time_slots (id, activity_id, time_slot, is_active, created_at) VALUES (1, 1, '09:00:00', TRUE, '2025-05-29T10:44:25.049613+00:00');
INSERT INTO activity_time_slots (id, activity_id, time_slot, is_active, created_at) VALUES (2, 1, '11:00:00', TRUE, '2025-05-29T10:44:25.049613+00:00');
INSERT INTO activity_time_slots (id, activity_id, time_slot, is_active, created_at) VALUES (3, 1, '14:00:00', TRUE, '2025-05-29T10:44:25.049613+00:00');
INSERT INTO activity_time_slots (id, activity_id, time_slot, is_active, created_at) VALUES (4, 1, '16:00:00', TRUE, '2025-05-29T10:44:25.049613+00:00');
INSERT INTO activity_time_slots (id, activity_id, time_slot, is_active, created_at) VALUES (5, 1, '09:00:00', TRUE, '2025-05-29T10:47:48.227723+00:00');
INSERT INTO activity_time_slots (id, activity_id, time_slot, is_active, created_at) VALUES (6, 1, '11:00:00', TRUE, '2025-05-29T10:47:48.227723+00:00');
INSERT INTO activity_time_slots (id, activity_id, time_slot, is_active, created_at) VALUES (7, 1, '14:00:00', TRUE, '2025-05-29T10:47:48.227723+00:00');
INSERT INTO activity_time_slots (id, activity_id, time_slot, is_active, created_at) VALUES (8, 1, '16:00:00', TRUE, '2025-05-29T10:47:48.227723+00:00');

-- Table: voyance_medium_advantages


-- Table: nightlife_events

INSERT INTO nightlife_events (id, name, type, venue, image, description, date, time, price, offer, rating, features, created_at, updated_at, gallery_images, partner_id) VALUES (4, 'Soirée Karaoké Antillais', 'Soirée Club', 'Le Ti'' Punch, Pointe-à-Pitre', 'https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/nightlife-images/0.9641419991507731.jpg', 'Ambiance conviviale et décontractée pour cette soirée karaoké où vous pourrez chanter les plus grands tubes antillais et internationaux. Cocktails et spécialités locales à déguster entre amis.', 'Mercredis et jeudis', '20:00 - 01:00', 10, '2 cocktails pour le prix d''un sur présentation de la carte Club Créole', 4.5, '["Plus de 5000 chansons", "Animateur professionnel", "Petite restauration", "Terrasse", "DJ Live", "Climatisation", "\u00c9crans G\u00e9ants"]', '2025-06-19T10:34:37.949855+00:00', '2025-06-19T12:26:50.632+00:00', '["https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/nightlife-images/0.9641419991507731.jpg", "https://images.unsplash.com/photo-1574007557239-acf6863bc375?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"]', NULL);
INSERT INTO nightlife_events (id, name, type, venue, image, description, date, time, price, offer, rating, features, created_at, updated_at, gallery_images, partner_id) VALUES (1, 'Soirée Zouk & Kompa', 'Club', 'Le Piment Rouge, Fort-de-France', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Une soirée endiablée au son du zouk et du kompa avec les meilleurs DJ de l''île. Ambiance garantie jusqu''au petit matin dans le club le plus branché de Fort-de-France.', 'Tous les vendredis', '23:00 - 05:00', 20, 'Entrée gratuite avant minuit pour les membres du Club Créole', 4.8, '["DJ Live", "Piste de danse", "Cocktails sp\u00e9ciaux", "Aire VIP"]', '2025-06-19T10:34:37.949855+00:00', '2025-06-19T12:21:17.644+00:00', '["https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"]', 10);
INSERT INTO nightlife_events (id, name, type, venue, image, description, date, time, price, offer, rating, features, created_at, updated_at, gallery_images, partner_id) VALUES (3, 'Casino Royal Night', 'Soirée Club', 'Casino des Trois-Îlets, Martinique', 'https://images.unsplash.com/photo-1596548438137-d51ea5c83ca5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Une soirée glamour au casino avec jeux de table, machines à sous et spectacle de cabaret. Tenue élégante exigée pour cette expérience luxueuse dans l''un des plus beaux casinos des Antilles.', 'Tous les samedis', '20:00 - 04:00', 30, 'Jetons de jeu d''une valeur de 20€ offerts aux membres du Club Créole', 4.7, '["Tables de jeux", "Spectacle cabaret", "D\u00eener gastronomique", "Service voiturier", "Terrasse", "DJ Live", "Climatisation"]', '2025-06-19T10:34:37.949855+00:00', '2025-06-19T12:22:44.884+00:00', '["https://images.unsplash.com/photo-1596548438137-d51ea5c83ca5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"]', NULL);
INSERT INTO nightlife_events (id, name, type, venue, image, description, date, time, price, offer, rating, features, created_at, updated_at, gallery_images, partner_id) VALUES (2, 'Beach Party Sunset', 'Club', 'Plage de Grande Anse, Guadeloupe', 'https://images.unsplash.com/photo-1533219057257-4bb9ed5d2cc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Dansez pieds nus sur le sable au coucher du soleil. Cocktails tropicaux, musique house et ambiance décontractée face à l''océan. L''événement incontournable de l''été en Guadeloupe.', 'Samedis et dimanches', '17:00 - 01:00', 15, 'Un cocktail offert sur présentation de la carte Club Créole', 4.5, '["Coucher de soleil", "Bar sur la plage", "Feux d''artifice", "Animations", "DJ Live", "Bar Premium"]', '2025-06-19T10:34:37.949855+00:00', '2025-06-19T12:26:33.137+00:00', '["https://images.unsplash.com/photo-1533219057257-4bb9ed5d2cc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"]', NULL);
INSERT INTO nightlife_events (id, name, type, venue, image, description, date, time, price, offer, rating, features, created_at, updated_at, gallery_images, partner_id) VALUES (5, 'Soirée de malade', 'Soirée Club', 'Le Gosier', 'https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/nightlife-images/0.7452050189360258.avif', 'Test de soirées', '15 juillet 2024', '20:00', 30, '50%', 4.5, '["DJ Live", "Climatisation", "Bar Premium"]', '2025-06-30T18:34:42.31728+00:00', '2025-06-30T18:34:42.31728+00:00', '["https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/nightlife-images/0.7452050189360258.avif"]', 10);

-- Table: partners_id_mapping

INSERT INTO partners_id_mapping (old_uuid, new_id, business_name, migrated_at) VALUES ('4b2da3b3-a322-4857-94ab-93fef458c30a', 7, 'Voyages Créole Évasion', '2025-06-26T17:58:42.638142');
INSERT INTO partners_id_mapping (old_uuid, new_id, business_name, migrated_at) VALUES ('60d89175-fd0e-4c5c-902e-74222d9608f1', 5, 'Tropical Tours Martinique', '2025-06-26T17:58:42.638142');
INSERT INTO partners_id_mapping (old_uuid, new_id, business_name, migrated_at) VALUES ('6ae93b70-e011-4b80-95d9-a59f48831d7a', 6, 'Antilles Premium Travel', '2025-06-26T17:58:42.638142');
INSERT INTO partners_id_mapping (old_uuid, new_id, business_name, migrated_at) VALUES ('fa3828ae-c133-4168-a4b9-2868589dac2e', 1, 'Caribbean Cars', '2025-06-26T17:58:42.638142');
INSERT INTO partners_id_mapping (old_uuid, new_id, business_name, migrated_at) VALUES ('e08ea2cf-c7ec-4f58-a507-34526fc4358e', 2, 'Eco Drive', '2025-06-26T17:58:42.638142');
INSERT INTO partners_id_mapping (old_uuid, new_id, business_name, migrated_at) VALUES ('8b5db2e9-e8b5-456c-a8c2-58480aea85fb', 3, 'Aventure 4x4', '2025-06-26T17:58:42.638142');
INSERT INTO partners_id_mapping (old_uuid, new_id, business_name, migrated_at) VALUES ('130c08aa-17ad-4f3c-8125-4b5f6c7e32f5', 4, 'Prestige Auto', '2025-06-26T17:58:42.638142');

-- Table: subscriptions


-- Table: travel_reservations

INSERT INTO travel_reservations (id, travel_offer_id, user_id, contact_name, contact_email, contact_phone, participants, special_requests, status, total_price, reservation_date, created_at, updated_at, contact_first_name, contact_last_name, participants_details) VALUES ('ebe4276c-ab3d-49c8-9988-26c2011d544a', 3, NULL, 'Luce Laurent', 'laurent.luce@hotmail.com', '+33766334653', 2, 'Je suis.végétarien', 'pending', 5198.0, '2025-07-01T15:06:59.470072+00:00', '2025-07-01T15:06:59.470072+00:00', '2025-07-01T18:12:48.604142+00:00', 'Luce', 'Laurent', NULL);
INSERT INTO travel_reservations (id, travel_offer_id, user_id, contact_name, contact_email, contact_phone, participants, special_requests, status, total_price, reservation_date, created_at, updated_at, contact_first_name, contact_last_name, participants_details) VALUES ('87c3fa76-4b19-4bd4-af8c-093df8065678', 3, '9acfe1f5-e3f6-4e21-9aa5-ea2abf5846dd', 'Laurent LUCE', 'laurent@gmail.com', '+33766334653', 4, NULL, 'pending', 10396.0, '2025-07-01T18:15:02.578428+00:00', '2025-07-01T18:15:02.578428+00:00', '2025-07-01T18:15:02.578428+00:00', 'Laurent', 'LUCE', '[{"lastName": "LUCE", "firstName": "Laurent"}, {"lastName": "LUCE", "firstName": "Meryl"}, {"lastName": "LUCE", "firstName": "Maxime"}, {"lastName": "LUCE", "firstName": "Michelyse"}]');

-- Table: voyance_mediums

INSERT INTO voyance_mediums (id, name, specialties, description, image, experience_years, rating, price_per_session, availability_schedule, contact_phone, contact_email, contact_whatsapp, languages, consultation_types, location, is_active, created_at, updated_at, gallery_images) VALUES (2, 'Maître Antoine', '["Cartomancie", "Num\u00e9rologie", "Astrologie"]', 'Cartomancien et numérologue expérimenté. Consultation personnalisée pour vous guider dans vos choix de vie et révéler votre potentiel caché.', 'https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/voyance-images/0.6114855468214323.jpg', 15, 4.6, 50.0, '{}', '+590 690 65 43 21', 'antoine.cartes@email.com', '+590 690 65 43 21', '["fran\u00e7ais"]', '["pr\u00e9sentiel", "t\u00e9l\u00e9phone"]', 'Basse-Terre', TRUE, '2025-06-20T09:40:44.571916+00:00', '2025-06-20T09:40:44.571916+00:00', '["https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/voyance-images/0.17565208637112995.jpg"]');
INSERT INTO voyance_mediums (id, name, specialties, description, image, experience_years, rating, price_per_session, availability_schedule, contact_phone, contact_email, contact_whatsapp, languages, consultation_types, location, is_active, created_at, updated_at, gallery_images) VALUES (3, 'Mama Josephine', '["Spiritisme", "D\u00e9senvo\u00fbtement", "Protection"]', 'Spécialiste en spiritisme et protection spirituelle. Plus de 25 ans d''expérience dans l''aide aux personnes en difficulté spirituelle.', 'https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/voyance-images/0.22106844601956455.png', 25, 4.9, 80.0, '{}', '+590 690 98 76 54', 'josephine.spirit@email.com', '', '["fran\u00e7ais", "cr\u00e9ole", "anglais"]', '["pr\u00e9sentiel"]', 'Le Gosier', TRUE, '2025-06-20T09:40:44.571916+00:00', '2025-06-20T09:40:44.571916+00:00', '[]');

-- Table: restaurant_reservations

INSERT INTO restaurant_reservations (id, restaurant_id, reservation_date, reservation_time, guests, name, email, phone, notes, created_at, status) VALUES ('cb513106-49df-41f3-af15-c7571c35605a', 1, '2025-05-23', '12:00', 6, 'Laurent', 'cmoinster@gmail.com', '0766334653', 'Allergie aux poulets', '2025-05-21T21:03:39.553067+00:00', 'confirmed');
INSERT INTO restaurant_reservations (id, restaurant_id, reservation_date, reservation_time, guests, name, email, phone, notes, created_at, status) VALUES ('f87c453a-8bf4-472e-911c-9f2883a18150', 1, '2025-05-23', '13:15', 7, 'Laurent', 'laurent.luce@hotmail.com', '0766334653', NULL, '2025-05-21T21:34:11.64994+00:00', 'confirmed');
INSERT INTO restaurant_reservations (id, restaurant_id, reservation_date, reservation_time, guests, name, email, phone, notes, created_at, status) VALUES ('d8a07ec2-aa32-49c1-a200-d86c7df4522a', 1, '2025-05-24', '12:15', 6, 'Luce', 'laurent.luce@hotmail.com', '0766334653', 'Allergie aux noisettes
', '2025-05-21T21:51:20.569644+00:00', 'confirmed');
INSERT INTO restaurant_reservations (id, restaurant_id, reservation_date, reservation_time, guests, name, email, phone, notes, created_at, status) VALUES ('109fe2fd-7131-4415-a5e8-6490ce6c0c14', 1, '2025-05-24', '14:15', 6, 'Laurent', 'cmoinster@gmail.com', '0766334653', NULL, '2025-05-21T21:52:46.637319+00:00', 'confirmed');
INSERT INTO restaurant_reservations (id, restaurant_id, reservation_date, reservation_time, guests, name, email, phone, notes, created_at, status) VALUES ('dc2124e9-5beb-42ea-856f-f7fb846b2eeb', 1, '2025-05-23', '13:15', 7, 'Laurent', 'laurent.luce@hotmail.com', '0766334653', NULL, '2025-05-21T21:54:00.427579+00:00', 'confirmed');
INSERT INTO restaurant_reservations (id, restaurant_id, reservation_date, reservation_time, guests, name, email, phone, notes, created_at, status) VALUES ('24d89413-d6e4-44c9-ab6a-6ae3f8d95c64', 1, '2025-05-23', '14:15', 5, 'Luce Laurent', 'laurent.luce@hotmail.com', '0766334653', 'Allergie', '2025-05-21T21:55:58.19243+00:00', 'confirmed');
INSERT INTO restaurant_reservations (id, restaurant_id, reservation_date, reservation_time, guests, name, email, phone, notes, created_at, status) VALUES ('15c86567-8981-47ae-b7a4-5c9504bcf6b1', 1, '2025-05-24', '12:15', 6, 'Laurent', 'Laurent.luce@hotmail.com', '0766334653', 'Allergie', '2025-05-21T22:04:21.075672+00:00', 'confirmed');
INSERT INTO restaurant_reservations (id, restaurant_id, reservation_date, reservation_time, guests, name, email, phone, notes, created_at, status) VALUES ('4deaaf9f-ed90-4696-be28-cd56a17b5f01', 1, '2025-05-30', '13:15', 3, 'Laurent Luce', 'laurent.luce@hotmail.com', '0766334653', 'Allergie', '2025-05-21T22:06:24.749911+00:00', 'confirmed');
INSERT INTO restaurant_reservations (id, restaurant_id, reservation_date, reservation_time, guests, name, email, phone, notes, created_at, status) VALUES ('64845f1d-5dd1-415d-8a3b-24100a540129', 1, '2025-05-24', '12:00', 10, 'Luce Laurent', 'cmoinster@gmail.com', '+33766334653', NULL, '2025-05-22T05:59:33.349596+00:00', 'confirmed');
INSERT INTO restaurant_reservations (id, restaurant_id, reservation_date, reservation_time, guests, name, email, phone, notes, created_at, status) VALUES ('8e51bd0b-9574-46f4-835a-0e07715fd18c', 4, '2025-05-23', '12:00', 3, 'Luce Laurent', 'cmoinster@gmail.com', '0766334653', 'Allergie de noix', '2025-05-22T11:04:35.131002+00:00', 'confirmed');

-- Table: restaurant_menus


-- Table: restaurant_dishes


-- Table: restaurant_categories


-- Table: business_partners


-- Table: profiles

INSERT INTO profiles (id, email, first_name, last_name, role, created_at, updated_at, admin_type, company_id) VALUES ('1e202ce4-24f9-4fad-9e67-7d31fa1ce5ea', 'cmoinster123@gmail.com', NULL, NULL, 'client', '2025-05-20T07:48:04.772484+00:00', '2025-05-20T07:48:04.772484+00:00', 'partner_admin', NULL);
INSERT INTO profiles (id, email, first_name, last_name, role, created_at, updated_at, admin_type, company_id) VALUES ('214053ff-c37e-48df-9c14-ba2792e190d2', 'partner@clubcreole.com', NULL, NULL, 'admin', '2025-05-20T08:12:16.741603+00:00', '2025-05-20T08:12:16.741603+00:00', 'partner_admin', NULL);
INSERT INTO profiles (id, email, first_name, last_name, role, created_at, updated_at, admin_type, company_id) VALUES ('75427f52-12f0-4aaa-b713-486a7f1b5d34', 'laurent.luce@hotmail.com', 'Laurent', 'Luce', 'admin', '2025-05-20T14:21:40.901087+00:00', '2025-06-22T07:16:22.001+00:00', 'partner_admin', NULL);
INSERT INTO profiles (id, email, first_name, last_name, role, created_at, updated_at, admin_type, company_id) VALUES ('905e739f-0b5a-41d1-bb86-380fa16846f9', 'client@clubcreole.com', NULL, NULL, 'admin', '2025-05-20T08:12:17.005903+00:00', '2025-06-29T08:47:53.488+00:00', 'partner_admin', NULL);
INSERT INTO profiles (id, email, first_name, last_name, role, created_at, updated_at, admin_type, company_id) VALUES ('13015987-1982-446b-b6e5-acba7b7da5f5', 'meryl@gmail.com', 'Meryl', 'LUCE', 'admin', '2025-05-20T13:25:00.028185+00:00', '2025-06-29T11:00:04.598+00:00', 'partner_admin', NULL);
INSERT INTO profiles (id, email, first_name, last_name, role, created_at, updated_at, admin_type, company_id) VALUES ('01eff973-7407-4773-baa9-b5f8385ee4d9', 'laurent@hotmail.com', NULL, NULL, 'client', '2025-06-29T15:27:25.379262+00:00', '2025-06-29T15:27:25.379262+00:00', 'partner_admin', NULL);
INSERT INTO profiles (id, email, first_name, last_name, role, created_at, updated_at, admin_type, company_id) VALUES ('9acfe1f5-e3f6-4e21-9aa5-ea2abf5846dd', 'laurent@gmail.com', NULL, NULL, 'client', '2025-06-29T15:43:53.281346+00:00', '2025-06-29T15:43:53.281346+00:00', 'partner_admin', NULL);
INSERT INTO profiles (id, email, first_name, last_name, role, created_at, updated_at, admin_type, company_id) VALUES ('21c105df-4d51-4fdd-a1f9-fe90de69b31c', 'test@gmail.com', NULL, NULL, 'client', '2025-06-29T15:38:47.114936+00:00', '2025-06-29T15:38:47.114936+00:00', 'restaurant_manager', NULL);
INSERT INTO profiles (id, email, first_name, last_name, role, created_at, updated_at, admin_type, company_id) VALUES ('474e3a74-5d59-4c89-b12e-ffa6198515ea', 'admin@clubcreole.com', 'Admin', 'System', 'admin', '2025-06-17T07:16:06.667+00:00', '2025-06-17T07:16:06.667+00:00', 'super_admin', NULL);
INSERT INTO profiles (id, email, first_name, last_name, role, created_at, updated_at, admin_type, company_id) VALUES ('753650a1-ba44-4f55-828e-41b500eb8cb3', 'cmoinster@gmail.com', NULL, NULL, 'admin', '2025-05-18T18:52:46.379514+00:00', '2025-06-30T20:06:21.193+00:00', 'partner_admin', NULL);
INSERT INTO profiles (id, email, first_name, last_name, role, created_at, updated_at, admin_type, company_id) VALUES ('d874f500-90d0-40dc-a157-d3b6d3b023f4', 'user@demo.com', NULL, NULL, 'client', '2025-07-01T06:41:07.689821+00:00', '2025-07-01T06:41:07.689821+00:00', 'partner_admin', NULL);

-- Table: leisure_activities

INSERT INTO leisure_activities (id, name, category, description, price_per_person, duration_hours, min_level, max_participants, equipment_provided, professional_guide, icon_name, created_at, updated_at) VALUES (1, 'Plongée sous marine', 'diving', 'Découvrez les fonds marins des Antilles lors d''une plongée sous-marine encadrée par nos moniteurs professionnels. Explorez la vie marine colorée et les récifs coralliens magnifiques.', 75, 2.0, 'beginner', 8, TRUE, TRUE, 'waves', '2025-05-29T10:44:25.049613+00:00', '2025-05-31T10:50:35.166275+00:00');

-- Table: leisure_registrations


-- Table: leisure_invitations


-- Table: leisure_time_slots


-- Table: leisure_reservation_details

