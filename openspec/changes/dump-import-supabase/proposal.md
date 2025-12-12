# Proposition: Dump et Import Base de Données vers Supabase Vierge

## Why

Nécessité de transférer les données de l'instance Supabase cloud (`psryoyugyimibjhwhvlh.supabase.co`) vers une nouvelle instance Supabase self-hosted. Cette migration permet un contrôle total sur les données et l'infrastructure.

## What Changes

- **Dump complet** de la base PostgreSQL source (schéma + données)
- **Préparation** de l'instance cible (nettoyage préalable si nécessaire)
- **Import** du dump vers l'instance Supabase vierge
- **Validation** de l'intégrité des données post-import

## Configuration cible

- **URL API**: `http://supabasekong-o0cwk88gwkk8o0ss0s4o8o8c.168.231.74.5.sslip.io`
- **Anon Key**: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2NTQ1NTg0MCwiZXhwIjo0OTIxMTI5NDQwLCJyb2xlIjoiYW5vbiJ9.9EV9qQ5zUttYzhN6hZwi4rlZvKoq02RzE-OJVI_pIbE`
- **IP serveur**: `168.231.74.5`

## Impact

- **Specs affectées**: Aucune modification de spec requise
- **Code affecté**:
  - Mise à jour des variables d'environnement (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)
  - Fichier de configuration `src/integrations/supabase/client.ts`
- **Infrastructure**:
  - Instance source: `psryoyugyimibjhwhvlh.supabase.co` (lecture seule)
  - Instance cible: `168.231.74.5` (Supabase self-hosted via Coolify)
- **Risques**:
  - Temps d'arrêt pendant le basculement de configuration
  - Nécessite les credentials des deux instances

## Prérequis

1. Accès PostgreSQL à l'instance source (mot de passe database depuis Supabase Dashboard)
2. Accès PostgreSQL à l'instance cible (via Coolify ou service DB exposé)
3. Outils `pg_dump` et `psql` installés localement
4. Espace disque suffisant pour le dump temporaire

## Accès PostgreSQL cible

Pour Supabase self-hosted via Coolify, le service PostgreSQL est généralement:
- **Host**: `supabase-db` (interne) ou `168.231.74.5` (si exposé)
- **Port**: `5432` (standard) ou port personnalisé Coolify
- **User**: `postgres`
- **Password**: Défini dans les variables d'environnement Coolify (POSTGRES_PASSWORD)

## Commandes de référence

```bash
# Dump depuis Supabase cloud
pg_dump -h db.psryoyugyimibjhwhvlh.supabase.co \
  -p 6543 \
  -U postgres.psryoyugyimibjhwhvlh \
  -d postgres \
  --clean --if-exists --no-owner --no-privileges \
  -f supabase_dump.sql

# Import vers instance cible (adapter host/port selon config Coolify)
psql -h 168.231.74.5 -p 5432 -U postgres -d postgres -f supabase_dump.sql
```

## Scripts existants

Des scripts sont déjà disponibles dans le projet:
- `scripts/migrate-supabase.sh` - Script complet de migration
- `scripts/create-schema-dump.sh` - Création de dump schéma
- `complete_transfer_import.sh` - Transfert et import automatisés
