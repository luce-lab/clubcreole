
-- Créer une table pour les réservations de voyage
CREATE TABLE public.travel_reservations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  travel_offer_id INTEGER NOT NULL REFERENCES public.travel_offers(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  participants INTEGER NOT NULL DEFAULT 1,
  special_requests TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  total_price NUMERIC(10,2) NOT NULL,
  reservation_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Activer Row Level Security
ALTER TABLE public.travel_reservations ENABLE ROW LEVEL SECURITY;

-- Créer une politique pour permettre aux utilisateurs de créer des réservations
CREATE POLICY "Users can create travel reservations" 
  ON public.travel_reservations 
  FOR INSERT 
  WITH CHECK (true);

-- Créer une politique pour permettre aux utilisateurs de voir leurs propres réservations
CREATE POLICY "Users can view their own travel reservations" 
  ON public.travel_reservations 
  FOR SELECT 
  USING (auth.uid() = user_id OR auth.uid() IS NULL);

-- Créer une politique pour permettre aux partenaires de voir les réservations de leurs offres
CREATE POLICY "Partners can view reservations for their offers" 
  ON public.travel_reservations 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.travel_offers 
      WHERE id = travel_offer_id 
      AND partner_id = (
        SELECT id FROM public.partners 
        WHERE user_id = auth.uid()
      )
    )
  );

-- Ajouter un trigger pour mettre à jour automatiquement updated_at
CREATE TRIGGER update_travel_reservations_updated_at
  BEFORE UPDATE ON public.travel_reservations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
