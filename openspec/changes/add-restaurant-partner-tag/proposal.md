## Why
Le système doit distinguer les restaurants partenaires qui peuvent accepter des réservations directes via la plateforme des restaurants non-parteniers qui n'affichent que leurs informations. Cette amélioration permettra de clarifier pour les utilisateurs quels restaurants offrent des réservations en ligne tout en maintenant la visibilité de tous les restaurants.

## What Changes
- Ajouter un champ `is_partner` aux restaurants dans la base de données
- Mettre à jour l'interface utilisateur pour afficher un badge "Partenaire" sur les restaurants partenaires
- Conditionner l'affichage du formulaire de réservation au statut de partenaire
- Mettre à jour les composants de gestion des restaurants pour l'administration
- Ajouter un filtre pour les restaurants partenaires dans les listes

## Impact
- **Affected specs**: restaurant (capability à créer)
- **Affected code**:
  - `src/pages/RestaurantDetail.tsx` - conditionner l'affichage du formulaire
  - `src/components/restaurant/RestaurantReservationForm.tsx` - afficher sur les partenaires seulement
  - `src/services/restaurantService.ts` - ajouter le champ is_partner
  - `src/pages/PartnersManagement.tsx` - gérer le statut partenaire
  - Base de données Supabase - ajouter la colonne is_partner