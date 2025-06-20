
-- Créer une contrainte unique sur le nom de l'activité pour éviter les doublons
ALTER TABLE public.activities ADD CONSTRAINT activities_name_unique UNIQUE (name);

-- Insérer l'activité Voyages dans la table activities
INSERT INTO public.activities (name, path, icon_name)
VALUES ('Voyages', '/voyages', 'Plane');
