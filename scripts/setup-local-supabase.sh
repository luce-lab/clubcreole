#!/bin/bash

# Script de Configuration d'Instance Supabase Locale
# ==================================================

set -e

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

# Fonction de log
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ❌ $1${NC}"
}

warning() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] ⚠️  $1${NC}"
}

# Vérification des prérequis
log "🔍 Vérification des prérequis..."

# Vérifier Docker
if ! command -v docker &> /dev/null; then
    error "Docker n'est pas installé"
    exit 1
fi

# Vérifier Docker Compose
if ! command -v docker &> /dev/null; then
    error "Docker Compose n'est pas installé"
    exit 1
fi

log "✅ Prérequis vérifiés"

# Charger les variables d'environnement
if [ -f .env.supabase ]; then
    log "📋 Chargement de la configuration depuis .env.supabase"
    export $(cat .env.supabase | grep -v '^#' | xargs)
else
    error "Fichier .env.supabase non trouvé"
    exit 1
fi

# Arrêter les conteneurs existants si nécessaire
log "🛑 Arrêt des conteneurs existants..."
docker compose -f docker-compose.supabase.yml down 2>/dev/null || true

# Démarrer les services Supabase
log "🚀 Démarrage des services Supabase..."
docker compose -f docker-compose.supabase.yml up -d

# Attendre que PostgreSQL soit prêt
log "⏳ Attente du démarrage de PostgreSQL..."
for i in {1..30}; do
    if docker compose -f docker-compose.supabase.yml exec -T supabase-db pg_isready -U postgres &>/dev/null; then
        log "✅ PostgreSQL est prêt"
        break
    fi
    echo -n "."
    sleep 2
done

# Attendre que tous les services soient prêts
log "⏳ Attente du démarrage des services..."
sleep 10

# Vérifier l'état des services
log "📊 État des services:"
docker compose -f docker-compose.supabase.yml ps

# Initialiser le schéma de base
log "🔧 Initialisation du schéma de base..."

# Copier les migrations depuis l'extraction si disponible
if [ -d "supabase/migrations" ]; then
    log "📋 Application des migrations existantes..."
    for migration in supabase/migrations/*.sql; do
        if [ -f "$migration" ]; then
            log "  → Application de $(basename $migration)"
            docker compose -f docker-compose.supabase.yml exec -T supabase-db psql -U postgres -d postgres < "$migration"
        fi
    done
else
    warning "Aucun fichier de migration trouvé dans supabase/migrations/"
    
    # Créer le schéma minimal
    log "📋 Création du schéma minimal..."
    docker compose -f docker-compose.supabase.yml exec -T supabase-db psql -U postgres -d postgres <<EOF
-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create auth schema
CREATE SCHEMA IF NOT EXISTS auth;
CREATE SCHEMA IF NOT EXISTS storage;

-- Create basic tables structure
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE,
    full_name TEXT,
    phone TEXT,
    address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.partners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    company_name TEXT,
    description TEXT,
    category TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.accommodations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    partner_id UUID REFERENCES partners(id),
    name TEXT,
    description TEXT,
    price DECIMAL(10,2),
    images JSONB,
    amenities JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.restaurants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    partner_id UUID REFERENCES partners(id),
    name TEXT,
    description TEXT,
    cuisine_type TEXT,
    price_range TEXT,
    images JSONB,
    opening_hours JSONB,
    menus JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    partner_id UUID REFERENCES partners(id),
    name TEXT,
    description TEXT,
    price DECIMAL(10,2),
    duration TEXT,
    images JSONB,
    rating DECIMAL(2,1),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.leisure_activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    partner_id UUID REFERENCES partners(id),
    name TEXT,
    description TEXT,
    price DECIMAL(10,2),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    plan TEXT,
    status TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.restaurant_reservations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_id UUID,
    user_id UUID,
    date DATE,
    time TIME,
    guests INTEGER,
    status TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.travel_reservations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    package_data JSONB,
    status TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE accommodations ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE leisure_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurant_reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE travel_reservations ENABLE ROW LEVEL SECURITY;

-- Create basic RLS policies (allow all for now, to be refined)
CREATE POLICY "Allow all" ON profiles FOR ALL USING (true);
CREATE POLICY "Allow all" ON partners FOR ALL USING (true);
CREATE POLICY "Allow all" ON accommodations FOR ALL USING (true);
CREATE POLICY "Allow all" ON restaurants FOR ALL USING (true);
CREATE POLICY "Allow all" ON activities FOR ALL USING (true);
CREATE POLICY "Allow all" ON leisure_activities FOR ALL USING (true);
CREATE POLICY "Allow all" ON subscriptions FOR ALL USING (true);
CREATE POLICY "Allow all" ON restaurant_reservations FOR ALL USING (true);
CREATE POLICY "Allow all" ON travel_reservations FOR ALL USING (true);

EOF
fi

log "✅ Schéma de base créé"

# Afficher les URLs d'accès
echo ""
log "🎉 Instance Supabase locale démarrée avec succès!"
echo ""
echo "📍 URLs d'accès:"
echo "   - API Gateway: http://localhost:8000"
echo "   - Studio (Admin UI): http://localhost:3000"
echo "   - PostgreSQL: localhost:5432"
echo "   - Database: postgres"
echo "   - User: postgres"
echo "   - Password: ${SUPABASE_DB_PASSWORD}"
echo ""
echo "🔑 Clés API:"
echo "   - Anon Key: ${SUPABASE_ANON_KEY}"
echo "   - Service Key: ${SUPABASE_SERVICE_KEY}"
echo ""
echo "📝 Pour importer les données:"
echo "   npx vite-node scripts/import-extracted-data.ts ./migration-backups/extraction_2025-10-25T09-08-16-478Z"
echo ""
echo "🛑 Pour arrêter l'instance:"
echo "   docker compose -f docker-compose.supabase.yml down"
echo ""