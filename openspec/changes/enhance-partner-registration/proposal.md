## Why
Le workflow d'inscription partenaire actuel sur `/devenir-partenaire` ne fonctionne pas correctement et nécessite plusieurs améliorations pour offrir une expérience complète aux futurs partenaires. Les partenaires ont besoin de pouvoir créer un compte utilisateur, recevoir des notifications, suivre leur candidature et gérer leur profil une fois approuvés.

## What Changes
- **Correction du workflow existant**: Vérifier et corriger les problèmes de soumission du formulaire et les politiques RLS
- **Création de compte utilisateur**: Lors de l'inscription partenaire, créer automatiquement un compte auth.users avec rôle "partner"
- **Notifications email**: Envoyer des emails de confirmation à l'inscrit et notification aux admins via Supabase Edge Functions
- **Amélioration du formulaire**: Ajouter des champs supplémentaires (SIRET, documents, horaires, images)
- **Tableau de bord partenaire**: Créer un espace dédié où le partenaire peut suivre sa candidature et gérer son profil

## Impact
- **Affected specs**: partner-registration (nouvelle capacité), partner-dashboard (nouvelle capacité)
- **Affected code**:
  - `src/components/partner/PartnerApplicationForm.tsx` - refonte du formulaire avec création de compte
  - `src/pages/DevenirPartenaire.tsx` - amélioration de la page
  - `src/pages/PartnerDashboard.tsx` - nouvelle page pour le tableau de bord partenaire
  - `supabase/functions/` - Edge functions pour notifications email
  - Base de données Supabase - liaison partners-users, nouveaux champs
- **User-facing changes**:
  - Les partenaires créent un compte lors de l'inscription
  - Confirmation email automatique
  - Accès à un tableau de bord dédié pour suivre la candidature
  - Interface de gestion du profil partenaire après approbation
- **Breaking changes**: Aucun - les candidatures existantes restent valides
