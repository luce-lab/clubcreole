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