## ADDED Requirements

### Requirement: Partner Dashboard Access
Authenticated partners MUST have access to a dedicated dashboard at `/partner-dashboard`. The system SHALL verify the user role before granting access.

#### Scenario: Authenticated partner access
- **WHEN** un partenaire authentifie accede a `/partner-dashboard`
- **THEN** il voit son tableau de bord personnalise
- **AND** les informations de sa candidature sont affichees

#### Scenario: Unauthenticated access redirect
- **WHEN** un visiteur non authentifie accede a `/partner-dashboard`
- **THEN** il est redirige vers la page de connexion
- **AND** apres connexion, il revient au tableau de bord

#### Scenario: Non-partner user access denied
- **WHEN** un utilisateur authentifie sans role partner accede a `/partner-dashboard`
- **THEN** un message d'acces refuse est affiche
- **AND** l'utilisateur est redirige vers la page d'accueil

### Requirement: Application Status Tracking
The dashboard MUST display the current partner application status. The status SHALL be updated in real-time.

#### Scenario: Pending application status
- **WHEN** un partenaire avec candidature en attente accede au tableau de bord
- **THEN** le statut "En attente" est affiche avec une icone appropriee
- **AND** un message explique que la candidature est en cours d'examen

#### Scenario: Approved application status
- **WHEN** un partenaire approuve accede au tableau de bord
- **THEN** le statut "Approuve" est affiche en vert
- **AND** les fonctionnalites de gestion du profil sont accessibles

#### Scenario: Rejected application status
- **WHEN** un partenaire rejete accede au tableau de bord
- **THEN** le statut "Rejete" est affiche en rouge
- **AND** un message explique les options disponibles (resoumission, contact)

### Requirement: Partner Profile Management
Approved partners MUST be able to modify their profile from the dashboard. Changes SHALL be persisted to the database.

#### Scenario: Edit partner profile
- **WHEN** un partenaire approuve clique sur "Modifier le profil"
- **THEN** un formulaire d'edition s'affiche avec les donnees actuelles pre-remplies
- **AND** il peut modifier: description, telephone, adresse, site web, horaires

#### Scenario: Save profile changes
- **WHEN** un partenaire soumet les modifications de son profil
- **THEN** les donnees sont mises a jour dans la base de donnees
- **AND** un message de confirmation s'affiche

#### Scenario: Profile edit restrictions for pending partners
- **WHEN** un partenaire en attente tente de modifier son profil
- **THEN** la fonctionnalite d'edition est desactivee
- **AND** un message indique que l'edition sera disponible apres approbation

### Requirement: Partner Dashboard Navigation
The partner dashboard MUST have clear and intuitive navigation. Navigation SHALL be consistent with the rest of the site.

#### Scenario: Dashboard navigation structure
- **WHEN** un partenaire accede au tableau de bord
- **THEN** il voit les sections: Apercu, Mon Profil, Statistiques (pour approuves)
- **AND** la navigation laterale ou par onglets est coherente avec le reste du site

#### Scenario: Dashboard header with partner info
- **WHEN** un partenaire accede au tableau de bord
- **THEN** son nom d'entreprise et statut sont affiches dans l'en-tete
- **AND** un lien vers la deconnexion est disponible

### Requirement: Partner Notifications Panel
The dashboard MUST display important notifications and updates. Notifications SHALL be timestamped and sorted by descending date.

#### Scenario: Display status change notifications
- **WHEN** le statut d'une candidature change
- **THEN** une notification est affichee dans le tableau de bord
- **AND** la notification indique la date et le nouveau statut

#### Scenario: Empty notifications
- **WHEN** un partenaire n'a aucune notification
- **THEN** un message "Aucune notification" s'affiche

### Requirement: Email Notification on Status Change
The system MUST send an email to the partner when their application status changes. Emails SHALL be sent via Supabase Edge Functions.

#### Scenario: Email on approval
- **WHEN** un admin approuve une candidature partenaire
- **THEN** un email de felicitations est envoye au partenaire
- **AND** l'email contient les prochaines etapes et un lien vers le tableau de bord

#### Scenario: Email on rejection
- **WHEN** un admin rejette une candidature partenaire
- **THEN** un email est envoye au partenaire
- **AND** l'email contient des informations sur la possibilite de resoumettre
