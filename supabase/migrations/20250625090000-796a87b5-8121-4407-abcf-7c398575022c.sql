
-- Ajouter une colonne status à la table partners existante
ALTER TABLE public.partners 
ADD COLUMN status TEXT DEFAULT 'en_attente' NOT NULL;

-- Ajouter une contrainte pour s'assurer que seules les valeurs valides sont utilisées
ALTER TABLE public.partners 
ADD CONSTRAINT partners_status_check 
CHECK (status IN ('en_attente', 'approuve', 'rejete'));

-- Mettre à jour les partenaires existants pour avoir le statut "approuve" par défaut
UPDATE public.partners 
SET status = 'approuve' 
WHERE status = 'en_attente';
