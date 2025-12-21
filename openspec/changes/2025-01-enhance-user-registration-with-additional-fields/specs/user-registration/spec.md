# user-registration Specification

## Why
Pour améliorer la collecte d'informations essentielles lors de l'inscription, permettant une meilleure gestion des profils utilisateurs, une communication plus personnalisée et une conformité accrue avec les exigences de service et de RGPD.

## ADDED Requirements

### Requirement: Enhanced User Registration with Personal Information
Le système SHALL permettre aux utilisateurs de fournir leurs informations personnelles (nom, prénom, téléphone) lors de l'inscription.

#### Scenario: Inscription avec informations complètes
- **WHEN** un utilisateur remplit le formulaire d'inscription
- **AND** il saisit son email, mot de passe, nom, prénom et numéro de téléphone
- **THEN** le compte est créé avec toutes ces informations
- **AND** les données sont stockées dans le profil utilisateur
- **AND** l'utilisateur peut se connecter immédiatement

#### Scenario: Validation des champs obligatoires
- **WHEN** un utilisateur tente de s'inscrire sans remplir tous les champs
- **THEN** des messages d'erreur appropriés s'affichent pour chaque champ manquant
- **AND** l'inscription ne peut pas être finalisée tant que tous les champs ne sont pas complétés

#### Scenario: Validation du format du numéro de téléphone
- **WHEN** un utilisateur saisit un numéro de téléphone invalide
- **THEN** un message d'erreur s'affiche indiquant le format attendu
- **AND** l'inscription est bloquée jusqu'à ce qu'un numéro valide soit fourni

## MODIFIED Requirements

### Requirement: User Registration Without Email Confirmation
Le système SHALL permettre aux utilisateurs de s'inscrire avec des informations complètes et de se connecter immédiatement sans nécessiter de confirmation par email.

#### Scenario: Inscription réussie avec informations personnelles
- **WHEN** un utilisateur soumet le formulaire d'inscription complet avec email, mot de passe, nom, prénom et téléphone valides
- **THEN** le compte est créé immédiatement avec toutes les informations
- **AND** l'utilisateur peut se connecter sans attendre de confirmation par email
- **AND** ses informations personnelles sont disponibles dans son profil

## ADDED Requirements

### Requirement: Personal Information Storage
Les informations personnelles des utilisateurs SHALL être stockées de manière sécurisée et conforme au RGPD.

#### Scenario: Stockage des informations utilisateur
- **WHEN** un utilisateur s'inscrit avec succès
- **THEN** le nom et prénom sont stockés dans les user_metadata ou table profiles
- **AND** le numéro de téléphone est stocké de manière sécurisée
- **AND** les données sont accessibles via le contexte d'authentification
- **AND** la conformité RGPD est maintenue

### Requirement: Backward Compatibility
Les utilisateurs existants SHALL continuer à pouvoir utiliser le système sans fournir les nouvelles informations obligatoires.

#### Scenario: Connexion utilisateur existant
- **WHEN** un utilisateur existant se connecte avec email et mot de passe
- **THEN** la connexion réussit normalement
- **AND** aucune interruption de service n'est provoquée par les nouveaux champs
- **AND** l'utilisateur est invité à compléter son profil (optionnellement)