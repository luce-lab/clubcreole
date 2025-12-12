-- ============================================
-- Import du schéma des profils utilisateurs
-- ============================================

-- Créer le type enum admin_type s'il n'existe pas
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'admin_type') THEN
        CREATE TYPE public.admin_type AS ENUM ('super_admin', 'partner_admin');
    END IF;
END $$;

DROP TABLE IF EXISTS public.profiles CASCADE;

-- Création de la table profiles
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY,
    email TEXT NOT NULL,
    first_name TEXT NULL,
    last_name TEXT NULL,
    role TEXT NOT NULL DEFAULT 'client',
    admin_type public.admin_type DEFAULT 'partner_admin',
    company_id INTEGER NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    CONSTRAINT profiles_role_check CHECK (
        role = ANY (ARRAY['admin', 'partner', 'client'])
    )
);

-- Index
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

-- Activer RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Politique de lecture publique des profils
DROP POLICY IF EXISTS "Allow public read access on profiles" ON public.profiles;
CREATE POLICY "Allow public read access on profiles"
ON public.profiles FOR SELECT
TO public, anon, authenticated
USING (true);

-- Politique pour permettre aux utilisateurs de voir leur propre profil
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
ON public.profiles FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Politique pour permettre aux utilisateurs de modifier leur propre profil
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id);

-- Politique pour permettre l'insertion de profils
DROP POLICY IF EXISTS "Allow insert on profiles" ON public.profiles;
CREATE POLICY "Allow insert on profiles"
ON public.profiles FOR INSERT
TO public, anon, authenticated
WITH CHECK (true);

