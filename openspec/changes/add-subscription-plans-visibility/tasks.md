## 1. Database Migration

- [x] 1.1 Créer la migration SQL pour ajouter la colonne `display_features TEXT[]` à `subscription_plans`
- [x] 1.2 Populer `display_features` avec les données actuellement codées en dur dans `Pricing.tsx`
- [x] 1.3 Vérifier que les plans existants ont `is_public = TRUE` pour maintenir l'affichage actuel

**Fichier créé:** `supabase/migrations/20251227000000_add_display_features_to_subscription_plans.sql`

## 2. Backend / Types

- [x] 2.1 Créer l'interface TypeScript `SubscriptionPlan` pour le frontend
- [x] 2.2 Interface intégrée directement dans le hook (pas de modification de types.ts car table non générée)

**Note:** La table `subscription_plans` n'était pas dans les types Supabase générés. L'interface est définie dans le hook.

## 3. Frontend Hook

- [x] 3.1 Créer le hook `src/hooks/useSubscriptionPlans.ts` avec React Query
- [x] 3.2 Implémenter la requête Supabase filtrant par `is_public = TRUE` et `is_active = TRUE`
- [x] 3.3 Ajouter le tri par `display_order`

**Fichier créé:** `src/hooks/useSubscriptionPlans.ts`

## 4. Component Refactoring

- [x] 4.1 Modifier `src/components/Pricing.tsx` pour utiliser `useSubscriptionPlans`
- [x] 4.2 Ajouter l'état de chargement (skeleton)
- [x] 4.3 Supprimer les données codées en dur du composant
- [x] 4.4 Gérer le cas d'erreur de chargement

**Fichier modifié:** `src/components/Pricing.tsx`

## 5. Validation

- [x] 5.1 Build de développement réussi (`npm run build:dev`)
- [ ] 5.2 Tester l'affichage des plans sur la homepage (nécessite la migration en base)
- [ ] 5.3 Vérifier que le flux d'abonnement Stripe fonctionne toujours
- [ ] 5.4 Tester la modification de `is_public` pour masquer/afficher un plan
- [ ] 5.5 Vérifier le comportement avec un plan sans `display_features`

## Fichiers créés/modifiés

| Fichier | Action |
|---------|--------|
| `supabase/migrations/20251227000000_add_display_features_to_subscription_plans.sql` | Créé |
| `src/hooks/useSubscriptionPlans.ts` | Créé |
| `src/components/Pricing.tsx` | Modifié |

## Prochaines étapes

1. **Appliquer la migration** sur la base de données Supabase
2. **Tester** l'affichage sur la homepage
3. **Valider** le flux de paiement Stripe
