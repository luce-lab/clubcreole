## ADDED Requirements

### Requirement: Pré-remplissage du formulaire d'abonnement

The system SHALL automatically pre-fill the subscription form fields with the information available in the connected user's profile. This pre-filling MUST include last_name, first_name, email, and phone when these values exist in the profile.

#### Scenario: Utilisateur connecté avec profil complet
- **WHEN** un utilisateur connecté ouvre le formulaire d'abonnement
- **AND** son profil contient first_name, last_name, email et phone
- **THEN** les champs nom, prénom, email et téléphone sont automatiquement pré-remplis avec ces valeurs

#### Scenario: Utilisateur connecté avec profil partiel
- **WHEN** un utilisateur connecté ouvre le formulaire d'abonnement
- **AND** son profil ne contient que l'email (first_name, last_name, phone sont vides)
- **THEN** seul le champ email est pré-rempli
- **AND** les autres champs restent vides et modifiables

#### Scenario: Correspondance des champs
- **WHEN** le formulaire est pré-rempli depuis le profil utilisateur
- **THEN** le mapping suivant est appliqué:
  - profil.last_name → champ "Nom"
  - profil.first_name → champ "Prénom"
  - profil.email → champ "Email"
  - profil.phone → champ "Téléphone"

### Requirement: Authentification requise pour l'abonnement

The system MUST require that a user is logged in before accessing the subscription form. A non-logged-in user SHALL be redirected to the login page or shown an invitation to log in before seeing the form.

#### Scenario: Utilisateur non connecté clique sur le bouton d'abonnement
- **WHEN** un utilisateur non connecté clique sur le bouton "Découvrez - Abonnez-vous - Profitez" dans le Hero
- **THEN** le système redirige vers la page de connexion ou affiche une invitation à se connecter
- **AND** le formulaire d'abonnement n'est pas affiché

#### Scenario: Utilisateur connecté accède au formulaire
- **WHEN** un utilisateur connecté clique sur le bouton d'abonnement
- **THEN** le formulaire d'abonnement s'affiche avec les champs pré-remplis

#### Scenario: Retour après connexion
- **WHEN** un utilisateur non connecté est redirigé vers la page de connexion depuis le bouton d'abonnement
- **AND** l'utilisateur se connecte avec succès
- **THEN** l'utilisateur peut retourner à la page d'accueil et accéder au formulaire d'abonnement
