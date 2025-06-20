
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
