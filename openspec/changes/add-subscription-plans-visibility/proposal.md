## Why

Les données des abonnements affichées sur la page d'accueil (section "Nos Abonnements") sont actuellement codées en dur dans le composant `src/components/Pricing.tsx`. Cela empêche les administrateurs de modifier facilement les textes, prix ou visibilité des plans sans intervention développeur.

La table `subscription_plans` existe déjà en base de données mais :
1. N'est pas utilisée par le composant Pricing
2. Manque d'un champ pour stocker les "features" textuelles affichées à l'utilisateur (différent du JSONB `features` technique)
3. Le champ `is_public` existe mais n'est pas exploité pour contrôler la visibilité sur la homepage

## What Changes

- **ADDED** Colonne `display_features` (TEXT[]) pour stocker la liste des avantages affichés
- **MODIFIED** Utilisation du champ `is_public` comme tag de visibilité pour l'affichage homepage
- **MODIFIED** Le composant `Pricing.tsx` récupère désormais les plans depuis Supabase
- **ADDED** Hook `useSubscriptionPlans` pour charger les plans actifs et visibles
- **ADDED** Type TypeScript pour les plans d'abonnement côté frontend

## Impact

- **Affected specs**: subscription-plans (nouvelle capability)
- **Affected code**:
  - `src/components/Pricing.tsx` - Refactoring pour utiliser les données dynamiques
  - `src/hooks/useSubscriptionPlans.ts` - Nouveau hook
  - `src/integrations/supabase/types.ts` - Types mis à jour
  - `supabase/migrations/` - Nouvelle migration pour `display_features`
