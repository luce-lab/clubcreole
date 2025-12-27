## Context

Le composant `Pricing.tsx` affiche actuellement les plans d'abonnement avec des données codées en dur :
- Gratuit (0€/an) - 3 features
- Passionné (15€/an) - 4 features
- Expert (90€/an) - 5 features

La table `subscription_plans` existe déjà avec une structure riche mais n'est pas exploitée pour l'affichage frontend. Elle contient un champ `features` JSONB avec des valeurs techniques (booléens, pourcentages) mais pas les textes marketing affichés.

**Contraintes:**
- Compatibilité avec le système Stripe existant
- Pas de régression sur le flux d'abonnement actuel
- Performance: chargement rapide des plans sur la homepage

## Goals / Non-Goals

**Goals:**
- Permettre la gestion des textes d'affichage des plans depuis la base de données
- Utiliser `is_public` pour contrôler la visibilité sur la homepage
- Maintenir la compatibilité avec le système de paiement Stripe

**Non-Goals:**
- Créer une interface d'administration pour les plans (hors scope)
- Modifier le système de facturation Stripe
- Changer les prix ou la logique métier des abonnements

## Decisions

### 1. Stockage des features d'affichage

**Décision**: Ajouter une colonne `display_features TEXT[]` à la table `subscription_plans`

**Alternatives considérées:**
- Utiliser le JSONB `features` existant avec des clés textuelles → Rejété car mélange données techniques et marketing
- Créer une table séparée `subscription_plan_features` → Sur-ingénierie pour ce besoin simple
- Stocker en JSONB `display_features` → TEXT[] plus simple pour une liste ordonnée de strings

**Rationale:** Un array PostgreSQL TEXT[] est le format le plus adapté pour une liste ordonnée de chaînes de caractères à afficher. Simple à requêter et mapper côté TypeScript.

### 2. Utilisation de `is_public` pour la visibilité

**Décision**: Réutiliser le champ `is_public` existant (boolean, default TRUE)

**Rationale:** Le champ existe déjà et correspond exactement au besoin. Pas besoin d'ajouter un nouveau champ `visible_on_homepage`.

### 3. Architecture du hook

**Décision**: Créer `useSubscriptionPlans()` avec React Query pour le caching

```typescript
interface SubscriptionPlan {
  plan_id: string;
  name: string;
  description: string;
  price: number;
  interval: string;
  display_features: string[];
  badge_text: string | null;
  display_order: number;
}
```

**Rationale:** React Query est déjà utilisé dans le projet et fournit le caching nécessaire pour éviter les requêtes répétées.

## Risks / Trade-offs

| Risque | Mitigation |
|--------|------------|
| Migration échoue en production | Tester sur environnement staging avant déploiement |
| Plans existants sans `display_features` | Migration populera avec les valeurs du composant actuel |
| Performance si beaucoup de plans | Index sur `is_public` + `is_active` déjà présent, limit côté query |

## Migration Plan

1. **Migration SQL**: Ajouter colonne `display_features TEXT[]`
2. **Seed data**: Populer avec les features actuellement codées en dur
3. **Hook**: Créer `useSubscriptionPlans`
4. **Composant**: Modifier `Pricing.tsx` pour utiliser le hook
5. **Cleanup**: Supprimer les données codées en dur

**Rollback**: En cas de problème, le composant peut temporairement revenir aux données codées en dur en commentant l'appel au hook.

## Open Questions

- Faut-il ajouter une interface admin pour gérer les plans ? (Décision: hors scope, à traiter ultérieurement)
