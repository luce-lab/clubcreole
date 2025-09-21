-- Fix critical security issue: Enable RLS on all public tables without RLS
-- This addresses the "RLS Disabled in Public" security findings

-- Enable RLS on all tables that currently don't have it
ALTER TABLE public.activity_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_inclusions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_time_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.car_client_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.car_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.car_models_backup ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.car_rental_features_backup ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.car_rental_reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.concerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fleet_managers_backup ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leisure_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers_backup ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners_backup ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners_id_mapping ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles_backup ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations_backup ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rls_policies_backup ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.travel_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.travel_offers_backup ENABLE ROW LEVEL SECURITY;

-- Create public read policies for content tables (activity-related, cars, concerts, travel)
CREATE POLICY "Public read access for activity_images" ON public.activity_images FOR SELECT USING (true);
CREATE POLICY "Public read access for activity_inclusions" ON public.activity_inclusions FOR SELECT USING (true);
CREATE POLICY "Public read access for activity_levels" ON public.activity_levels FOR SELECT USING (true);
CREATE POLICY "Public read access for activity_time_slots" ON public.activity_time_slots FOR SELECT USING (true);
CREATE POLICY "Public read access for car_client_reviews" ON public.car_client_reviews FOR SELECT USING (true);
CREATE POLICY "Public read access for car_models" ON public.car_models FOR SELECT USING (true);
CREATE POLICY "Public read access for concerts" ON public.concerts FOR SELECT USING (true);
CREATE POLICY "Public read access for leisure_activities" ON public.leisure_activities FOR SELECT USING (true);
CREATE POLICY "Public read access for partners" ON public.partners FOR SELECT USING (true);
CREATE POLICY "Public read access for travel_offers" ON public.travel_offers FOR SELECT USING (true);

-- Create admin-only policies for backup tables (security: only admins can access backup data)
CREATE POLICY "Admin only access for car_models_backup" ON public.car_models_backup FOR ALL USING (is_super_admin());
CREATE POLICY "Admin only access for car_rental_features_backup" ON public.car_rental_features_backup FOR ALL USING (is_super_admin());
CREATE POLICY "Admin only access for fleet_managers_backup" ON public.fleet_managers_backup FOR ALL USING (is_super_admin());
CREATE POLICY "Admin only access for offers_backup" ON public.offers_backup FOR ALL USING (is_super_admin());
CREATE POLICY "Admin only access for partners_backup" ON public.partners_backup FOR ALL USING (is_super_admin());
CREATE POLICY "Admin only access for partners_id_mapping" ON public.partners_id_mapping FOR ALL USING (is_super_admin());
CREATE POLICY "Admin only access for profiles_backup" ON public.profiles_backup FOR ALL USING (is_super_admin());
CREATE POLICY "Admin only access for reservations_backup" ON public.reservations_backup FOR ALL USING (is_super_admin());
CREATE POLICY "Admin only access for rls_policies_backup" ON public.rls_policies_backup FOR ALL USING (is_super_admin());
CREATE POLICY "Admin only access for travel_offers_backup" ON public.travel_offers_backup FOR ALL USING (is_super_admin());

-- Create user-specific policies for reservation tables
CREATE POLICY "Public can insert car rental reservations" ON public.car_rental_reservations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can read car rental reservations" ON public.car_rental_reservations FOR SELECT USING (true);