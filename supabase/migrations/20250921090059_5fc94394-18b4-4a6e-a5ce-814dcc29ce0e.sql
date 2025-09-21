-- Fix the final RLS security issue: Enable RLS on the remaining table
ALTER TABLE public.car_rental_reservations_backup ENABLE ROW LEVEL SECURITY;

-- Create admin-only policy for this backup table
CREATE POLICY "Admin only access for car_rental_reservations_backup" ON public.car_rental_reservations_backup FOR ALL USING (is_super_admin());