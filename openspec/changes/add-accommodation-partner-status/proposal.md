## Why
Le système doit distinguer les hébergements partenaires qui peuvent accepter des réservations directes via la plateforme des hébergements non-partenaires qui affichent seulement leurs informations. Cette amélioration permettra de clarifier pour les utilisateurs quels hébergements offrent des réservations en ligne, tout en encourageant les propriétaires d'hébergements à rejoindre la plateforme comme partenaires.

## What Changes
- Utiliser le champ `partner_id` existant pour lier les hébergements aux comptes partenaires
- Mettre à jour l'interface utilisateur pour afficher un badge "Partenaire" sur les hébergements partenaires
- Bloquer l'affichage du formulaire de réservation pour les hébergements sans partner_id
- Afficher un message détaillé invitant les propriétaires à s'inscrire comme partenaires
- Ajouter un filtre optionnel pour afficher uniquement les hébergements partenaires
- Mettre à jour le TypeScript pour inclure les informations de partenaire

## Impact
- **Affected specs**:
  - accommodation-partner-filtering (nouvelle capability)
  - accommodation-partner-display (nouvelle capability)
- **Affected code**:
  - `src/components/accommodation/AccommodationTypes.ts` - ajouter partner_id et informations partenaire
  - `src/services/accommodationService.ts` - inclure les données partenaire dans les requêtes
  - `src/pages/AccommodationDetail.tsx` - conditionner l'affichage du formulaire de réservation
  - `src/components/accommodation/ReservationCard.tsx` - remplacer par message d'inscription si non-partenaire
  - `src/components/accommodation/AccommodationCard.tsx` - afficher badge partenaire
  - `src/components/accommodation/AccommodationSearch.tsx` - ajouter filtre partenaire
  - Base de données Supabase - utiliser la colonne partner_id existante et ajouter jointure avec table partners

## Architecture Notes
Cette fonctionnalité réutilise l'infrastructure existante de la table partners et la colonne partner_id déjà présente dans accommodations. Aucune migration de base de données n'est nécessaire, seulement des modifications au niveau application pour exploiter cette relation.
