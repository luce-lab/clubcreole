## Why

Le formulaire d'abonnement ne prérempli pas automatiquement les informations personnelles de l'utilisateur connecté (nom, prénom, téléphone) bien que ces données soient disponibles dans son profil. De plus, un utilisateur non connecté peut remplir tout le formulaire avant de découvrir qu'il doit se connecter, ce qui crée une mauvaise expérience utilisateur.

## What Changes

- **Pré-remplissage automatique** : Quand un utilisateur est connecté, le formulaire prérempli automatiquement le nom, prénom, email et téléphone depuis son profil
- **Authentification requise** : Le formulaire d'abonnement requiert une connexion préalable - les utilisateurs non connectés sont invités à se connecter avant d'accéder au formulaire
- **Champs en lecture seule** : Les champs préremplis depuis le profil peuvent être rendus en lecture seule ou modifiables selon les besoins

## Impact

- Affected specs: subscription (nouvelle spec à créer)
- Affected code:
  - `src/components/subscription/form/hooks/useSubscriptionForm.ts` - Ajouter le pré-remplissage
  - `src/components/subscription/form/components/PersonalInfoFields.tsx` - Optionnel: champs en lecture seule
  - `src/components/Hero.tsx` - Ajouter la vérification d'authentification
  - `src/components/Pricing.tsx` - Vérifier la cohérence du flux
