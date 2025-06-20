
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
