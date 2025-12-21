## 1. Diagnostic et Correction du Workflow Existant
- [x] 1.1 Tester le formulaire actuel et identifier les erreurs specifiques
- [x] 1.2 Verifier que les politiques RLS sont correctement deployees en production
- [x] 1.3 Corriger les problemes identifies dans PartnerApplicationForm.tsx
- [x] 1.4 Valider que l'insertion dans la table partners fonctionne

## 2. Schema Database - Liaison Partners-Users
- [x] 2.1 Creer migration pour ajouter colonne `user_id` (UUID, nullable, FK vers auth.users)
- [x] 2.2 Ajouter colonnes supplementaires: `siret`, `opening_hours`
- [x] 2.3 Mettre a jour les politiques RLS pour permettre aux partenaires de voir leurs propres donnees
- [x] 2.4 Mettre a jour les types TypeScript (types.ts)

## 3. Creation de Compte lors de l'Inscription
- [x] 3.1 Ajouter champs mot de passe et confirmation au formulaire
- [x] 3.2 Implementer la validation du mot de passe (longueur, correspondance)
- [x] 3.3 Modifier handleSubmit pour: signup auth.users → insert partners avec user_id
- [x] 3.4 Gerer les erreurs de creation de compte (email existe deja, etc.)
- [x] 3.5 Creer l'entree dans profiles avec role="partner"
- [x] 3.6 Tester le workflow complet de creation de compte

## 4. Amelioration du Formulaire
- [x] 4.1 Ajouter champ SIRET (optionnel) avec validation format
- [x] 4.2 Ajouter champ horaires d'ouverture (optionnel)
- [x] 4.3 Ameliorer les messages d'erreur avec feedback precis
- [x] 4.4 Ajouter indicateurs visuels pour champs requis
- [x] 4.5 Organiser le formulaire en sections claires

## 5. Notifications Email - Edge Functions (NON IMPLEMENTE)
- [ ] 5.1 Creer Edge Function `send-partner-confirmation` pour email de confirmation
- [ ] 5.2 Creer Edge Function `notify-admin-new-partner` pour notification admin
- [ ] 5.3 Creer Edge Function `send-partner-status-change` pour changement de statut
- [ ] 5.4 Configurer le service d'email (Resend ou SendGrid)
- [ ] 5.5 Ajouter les secrets necessaires dans Supabase
- [ ] 5.6 Appeler les Edge Functions depuis le frontend apres inscription
- [ ] 5.7 Tester l'envoi des emails

## 6. Tableau de Bord Partenaire - Structure
- [x] 6.1 Creer le composant `PartnerStatusCard.tsx`
- [x] 6.2 Creer le composant `PartnerProfileForm.tsx`
- [x] 6.3 Creer la page `PartnerDashboard.tsx`
- [x] 6.4 Ajouter la route `/partner-dashboard` dans App.tsx
- [x] 6.5 Implementer la protection de route (user authentifie requis)
- [x] 6.6 Rediriger vers /devenir-partenaire si pas de candidature

## 7. Tableau de Bord Partenaire - Fonctionnalites
- [x] 7.1 Afficher le statut de candidature avec icones appropriees
- [x] 7.2 Afficher les informations du partenaire
- [x] 7.3 Implementer l'edition du profil (pour partenaires approuves)
- [x] 7.4 Creer le panneau de notifications
- [x] 7.5 Integrer les onglets (Apercu, Profil, Notifications)

## 8. Navigation et Integration
- [x] 8.1 Modifier le Header pour afficher "Espace Partenaire" pour les partenaires connectes
- [x] 8.2 Differecier les boutons selon le role (partner vs admin/client)
- [ ] 8.3 Ajouter lien vers `/devenir-partenaire` dans le footer

## 9. Deploiement
- [ ] 9.1 Deployer la migration database (20251221000001_enhance_partner_registration.sql)
- [ ] 9.2 Deployer le frontend mis a jour
- [ ] 9.3 Verifier le fonctionnement en production
- [ ] 9.4 Monitorer les erreurs

## Resume des fichiers modifies/crees

### Nouveaux fichiers
- `supabase/migrations/20251221000001_enhance_partner_registration.sql`
- `src/components/partner-dashboard/PartnerStatusCard.tsx`
- `src/components/partner-dashboard/PartnerProfileForm.tsx`
- `src/pages/PartnerDashboard.tsx`

### Fichiers modifies
- `src/integrations/supabase/types.ts` - Ajout colonnes email, contact_name, siret, opening_hours
- `src/components/partner/PartnerApplicationForm.tsx` - Refonte complete avec creation de compte
- `src/App.tsx` - Ajout route /partner-dashboard
- `src/components/Header.tsx` - Lien conditionnel vers Espace Partenaire

## Notes
- Les Edge Functions pour les notifications email ne sont pas encore implementees
- La migration doit etre deployee en production avant de tester le formulaire
- Le role 'partner' est utilise pour identifier les partenaires dans le systeme d'auth
