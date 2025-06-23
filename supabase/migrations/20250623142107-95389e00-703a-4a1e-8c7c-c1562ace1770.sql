
-- Créer une table pour les promotions du carousel
CREATE TABLE public.promotions (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  badge TEXT,
  cta_text TEXT NOT NULL,
  cta_url TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Activer Row Level Security
ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;

-- Créer une politique pour permettre la lecture publique des promotions actives
CREATE POLICY "Lecture publique des promotions actives" 
  ON public.promotions 
  FOR SELECT 
  USING (is_active = true);

-- Ajouter un trigger pour mettre à jour automatiquement updated_at
CREATE TRIGGER update_promotions_updated_at
  BEFORE UPDATE ON public.promotions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insérer les données existantes du PromoCarousel
INSERT INTO public.promotions (title, description, image, badge, cta_text, cta_url, sort_order) VALUES 
(
  'Découvrez nos hébergements de charme',
  'Profitez d''un séjour inoubliable dans nos établissements partenaires avec des réductions exclusives pour les membres Club Créole.',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945',
  'Offre Spéciale',
  'Découvrir les hébergements',
  '/hebergements',
  1
),
(
  'Saveurs authentiques créoles',
  'Explorez la richesse de la gastronomie antillaise dans nos restaurants partenaires et bénéficiez d''avantages exclusifs.',
  'https://images.unsplash.com/photo-1559339352-11d035aa65de',
  'Nouveau',
  'Explorer les restaurants',
  '/restauration',
  2
),
(
  'Aventures et sensations fortes',
  'Plongée, randonnée, canoë... Vivez des expériences uniques avec nos activités outdoor et profitez de tarifs préférentiels.',
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
  'Aventure',
  'Voir les activités',
  '/loisirs',
  3
),
(
  'Soirées et événements exclusifs',
  'Accédez en priorité aux concerts et soirées les plus prisés des Antilles. Réservez vos places dès maintenant.',
  'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14',
  'Exclusif',
  'Découvrir les événements',
  '/concerts',
  4
);
