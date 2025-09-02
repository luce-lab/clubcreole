-- Fix critical security vulnerability: profiles table publicly readable
-- Enable Row Level Security on profiles table and create proper access policies

-- Enable RLS on profiles table (if not already enabled)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Remove any existing overly permissive policies (if they exist)
DROP POLICY IF EXISTS "Allow public read access to profiles" ON public.profiles;
DROP POLICY IF EXISTS "Public read access for profiles" ON public.profiles;

-- Policy 1: Users can view their own profile
CREATE POLICY "Users can view own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

-- Policy 2: Super admins can view all profiles (for user management)
CREATE POLICY "Super admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (is_super_admin());

-- Policy 3: Users can update their own profile
CREATE POLICY "Users can update own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id);

-- Policy 4: Super admins can update all profiles
CREATE POLICY "Super admins can update all profiles" 
ON public.profiles 
FOR UPDATE 
USING (is_super_admin());

-- Policy 5: Only super admins can insert new profiles (for user creation)
CREATE POLICY "Super admins can insert profiles" 
ON public.profiles 
FOR INSERT 
WITH CHECK (is_super_admin());

-- Policy 6: Super admins can delete profiles (for user management)
CREATE POLICY "Super admins can delete profiles" 
ON public.profiles 
FOR DELETE 
USING (is_super_admin());