
ALTER TABLE public.travel_offers
ADD CONSTRAINT travel_offers_partner_id_fkey
FOREIGN KEY (partner_id)
REFERENCES public.partners(id)
ON DELETE CASCADE;
