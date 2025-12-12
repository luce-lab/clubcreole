## Why
Le système doit permettre aux entreprises de soumettre des candidatures pour devenir partenaires de la plateforme ClubCreole. Cette fonctionnalité essentielle permet de gérer le processus de recrutement de partenaires commerciaux (restaurants, activités de loisirs, locations de voiture, agences de voyage) de manière structurée avec validation, approbation et gestion administrative.

## What Changes
- Ajouter les champs `email` et `contact_name` à la table `partners` dans la base de données
- Configurer les politiques RLS (Row Level Security) pour permettre les soumissions publiques
- Compléter le formulaire de candidature partenaire avec tous les champs requis
- Implémenter la validation et la gestion des erreurs (doublons, contraintes)
- Créer une interface d'administration pour approuver/rejeter les candidatures
- Ajouter des index et contraintes pour l'intégrité des données

## Impact
- **Affected specs**: partner-application (nouvelle capacité)
- **Affected code**:
  - `src/components/partner/PartnerApplicationForm.tsx` - formulaire de candidature complet
  - `src/pages/DevenirPartenaire.tsx` - page publique pour devenir partenaire
  - `src/pages/PartnersManagement.tsx` - interface admin de gestion
  - Base de données Supabase - ajout des colonnes email et contact_name
  - Politiques RLS - permettre INSERT public avec status='en_attente'
- **User-facing changes**:
  - Les entreprises peuvent maintenant soumettre des candidatures via `/devenir-partenaire`
  - Les administrateurs peuvent voir, approuver ou rejeter les candidatures
  - Protection contre les doublons (nom d'entreprise et email)
  - Messages d'erreur clairs et informatifs
