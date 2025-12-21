## ADDED Requirements

### Requirement: Partner Account Creation
The system SHALL automatically create a user account (auth.users) when a partner application is submitted. The account MUST have the "partner" role to allow access to the partner dashboard.

#### Scenario: Successful partner registration with account creation
- **WHEN** un visiteur remplit et soumet le formulaire de candidature partenaire avec email et mot de passe
- **THEN** un compte auth.users est cree avec le role "partner"
- **AND** une entree partners est creee avec user_id reference vers le compte
- **AND** un email de confirmation est envoye a l'adresse fournie
- **AND** un message de succes est affiche

#### Scenario: Registration with existing email
- **WHEN** un visiteur soumet une candidature avec un email deja utilise
- **THEN** un message d'erreur indique que l'email est deja enregistre
- **AND** aucun compte n'est cree

### Requirement: Enhanced Partner Form Fields
The partner application form MUST include additional fields for better partner qualification. Required fields SHALL be clearly identified.

#### Scenario: Complete partner form with all fields
- **WHEN** un visiteur accede au formulaire de candidature
- **THEN** il peut remplir: nom d'entreprise, type d'activite, nom du contact, email, telephone, adresse, description, site web, numero SIRET (optionnel), horaires d'ouverture (optionnel)
- **AND** les champs obligatoires sont marques comme tels
- **AND** la validation HTML5 et JavaScript s'applique

#### Scenario: Form validation errors
- **WHEN** un visiteur soumet le formulaire avec des champs obligatoires manquants
- **THEN** des messages d'erreur s'affichent pour chaque champ invalide
- **AND** le formulaire n'est pas soumis

### Requirement: Partner Registration Password
The form MUST allow password creation during partner registration. The password SHALL meet minimum security criteria.

#### Scenario: Password fields display
- **WHEN** un visiteur remplit le formulaire de candidature
- **THEN** des champs mot de passe et confirmation mot de passe sont affiches
- **AND** les champs sont obligatoires

#### Scenario: Password validation
- **WHEN** les mots de passe ne correspondent pas
- **THEN** un message d'erreur s'affiche
- **AND** le formulaire n'est pas soumis

#### Scenario: Password strength requirements
- **WHEN** le mot de passe est trop faible (moins de 8 caracteres)
- **THEN** un message d'erreur indique les exigences minimales

### Requirement: Email Notifications on Registration
The system MUST send email notifications during partner registration. Emails SHALL be sent via Supabase Edge Functions.

#### Scenario: Confirmation email to partner
- **WHEN** une candidature partenaire est soumise avec succes
- **THEN** un email de confirmation est envoye a l'adresse du partenaire
- **AND** l'email contient les informations de la candidature et les prochaines etapes

#### Scenario: Notification email to admin
- **WHEN** une nouvelle candidature partenaire est soumise
- **THEN** un email de notification est envoye aux administrateurs
- **AND** l'email contient un lien vers l'interface d'administration

### Requirement: Partner-User Link in Database
The partners table MUST be linked to auth.users via a user_id foreign key. This link SHALL allow partners to access their own data.

#### Scenario: Database schema with user link
- **WHEN** une candidature partenaire est creee avec un compte utilisateur
- **THEN** la colonne user_id dans partners reference l'UUID du compte auth.users
- **AND** la contrainte de cle etrangere est respectee

#### Scenario: Orphan partner records
- **WHEN** une candidature partenaire existante n'a pas de user_id
- **THEN** le systeme permet toujours la lecture et modification par les admins
- **AND** ces enregistrements peuvent etre lies manuellement plus tard

### Requirement: RLS Policies for Partner Registration
RLS policies MUST allow public insertion with account creation. Authenticated partners SHALL be able to read their own data.

#### Scenario: Public insert allowed
- **WHEN** un visiteur non authentifie soumet une candidature
- **THEN** la politique RLS permet l'insertion avec status='en_attente'

#### Scenario: Authenticated partner can view own data
- **WHEN** un partenaire authentifie accede a ses donnees
- **THEN** il peut voir uniquement ses propres informations via user_id
