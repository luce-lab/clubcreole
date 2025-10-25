# Proposition: Transfert de données Supabase vers nouvelle base

## Why

Besoin de migrer les données existantes de la base de données Supabase cloud actuelle vers une instance Supabase auto-hébergée. Ceci permet un contrôle total sur l'infrastructure, la souveraineté des données et potentiellement des coûts réduits.

## What Changes

- **Extraction** complète des données depuis Supabase cloud (PostgreSQL)
- **Migration directe** vers Supabase auto-hébergé (compatibilité native PostgreSQL)
- **Chargement** sécurisé vers la nouvelle instance Supabase
- **Validation** de l'intégrité des données migrées
- **Migration** des schémas, contraintes et index (compatibilité PostgreSQL native)
- **Tests** de continuité fonctionnelle
- **Configuration** de la nouvelle URL Supabase dans l'application

## Impact

- Affected specs: data-migration (nouvelle capacité)
- Affected code: 
  - Configuration Supabase uniquement (`src/integrations/supabase/client.ts`)
  - Scripts d'exportation existants (`scripts/export-data.ts`)
  - Variables d'environnement (SUPABASE_URL, SUPABASE_KEY)
- Infrastructure: Instance Supabase auto-hébergée à configurer
- Temps d'arrêt minimal durant le changement de configuration
- **Avantage** : Pas de migration d'authentification (Supabase Auth conservé)
- **Simplicité** : Compatibilité PostgreSQL native, pas de transformation de données

## Configuration cible confirmée

- **Base cible** : Supabase auto-hébergé (PostgreSQL + Supabase stack)
- **Stratégie** : Migration complète (Big Bang)
- **Authentification** : Conservation de Supabase Auth (pas de migration)
- **Compatibilité** : Native PostgreSQL, aucune transformation requise