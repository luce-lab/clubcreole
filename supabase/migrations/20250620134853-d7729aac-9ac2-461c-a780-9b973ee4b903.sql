
-- Créer une table pour les bons plans
CREATE TABLE public.bons_plans (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  image TEXT,
  badge TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insérer les données existantes des bons plans
INSERT INTO public.bons_plans (title, description, icon, image, badge) VALUES
('Des réductions', 'Profitez de réductions exclusives chez nos partenaires', 'Gift', 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=1760&auto=format&fit=crop', NULL),
('Prêt de matériel', 'Accédez à du matériel de réception et des outils', 'Wrench', '/lovable-uploads/c7dc7b94-fcb7-46f8-aa26-0740b8bbdad1.png', NULL),
('Services gratuits', 'Bénéficiez de services d''assistance gratuits', 'HeartHandshake', 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=1760&auto=format&fit=crop', NULL),
('Concert de Francis CABREL', 'Profitez d''une réduction de 20% sur le concert du 15 mars', 'Music', 'https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?q=80&w=1760&auto=format&fit=crop', 'Coup de cœur'),
('La Toubana Hôtel 5★', '2 nuits = 1 dîner gastronomique pour 2 offert', 'Hotel', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1760&auto=format&fit=crop', 'Exclusivité'),
('Parc l''Infini', '2 entrées gratuites au parc d''attractions', 'Ticket', 'https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=1760&auto=format&fit=crop', 'Gratuit');

-- Activer Row Level Security (RLS) - lecture publique pour les bons plans actifs
ALTER TABLE public.bons_plans ENABLE ROW LEVEL SECURITY;

-- Créer une politique pour permettre la lecture publique des bons plans actifs
CREATE POLICY "Lecture publique des bons plans actifs" 
  ON public.bons_plans 
  FOR SELECT 
  USING (is_active = true);

-- Ajouter un trigger pour mettre à jour automatiquement updated_at
CREATE TRIGGER update_bons_plans_updated_at
  BEFORE UPDATE ON public.bons_plans
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
