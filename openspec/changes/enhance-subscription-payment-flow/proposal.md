## Why

Le flux de paiement des abonnements nécessite une amélioration pour offrir une meilleure expérience utilisateur. Actuellement :
- Lorsqu'un utilisateur non connecté clique sur un abonnement payant, il est redirigé vers la page de login mais ne revient pas à la section abonnements après connexion
- Les abonnements Stripe sont configurés en mensuel/bi-mensuel, mais l'affichage indique des prix annuels (15€/an, 90€/an)

## What Changes

- **MODIFIED** Redirection vers login avec paramètre `redirect=/?scrollTo=pricing` pour revenir à la section abonnements
- **MODIFIED** Page Login gère le paramètre `scrollTo` pour scroller vers une section après redirection
- **MODIFIED** Configuration Stripe pour supporter les abonnements annuels (interval: "year")
- **ADDED** Synchronisation des prix Stripe avec les prix affichés (15€/an pour Passionné, 90€/an pour Expert)

## Impact

- **Affected code**:
  - `src/components/Pricing.tsx` - Redirection avec paramètre redirect
  - `src/pages/Login.tsx` - Gestion du scroll après redirection
  - `src/pages/Index.tsx` - Gestion du scroll au chargement si paramètre présent
  - `supabase/functions/create-checkout/index.ts` - Configuration prix annuels
