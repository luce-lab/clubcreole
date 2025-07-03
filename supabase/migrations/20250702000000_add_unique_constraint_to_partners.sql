-- Ajouter une contrainte unique sur business_name pour éviter les doublons
ALTER TABLE public.partners ADD CONSTRAINT partners_business_name_unique UNIQUE (business_name);