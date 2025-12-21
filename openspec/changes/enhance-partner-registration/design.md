## Context
Le systeme d'inscription partenaire actuel permet de soumettre une candidature mais ne cree pas de compte utilisateur, n'envoie pas de notifications et n'offre pas d'espace de suivi pour les partenaires. Cette proposition vise a creer un workflow complet d'inscription partenaire integre avec l'authentification Supabase.

### Contraintes
- Supabase Auth existant avec roles (admin, client, partner)
- Table `partners` existante avec champs email, contact_name, status
- Migrations existantes pour RLS et contraintes d'unicite
- Frontend React avec React Query et shadcn/ui

### Stakeholders
- Partenaires potentiels (restaurants, activites, locations)
- Administrateurs ClubCreole
- Equipe de developpement

## Goals / Non-Goals

### Goals
- Corriger le workflow d'inscription qui ne fonctionne pas
- Creer un compte utilisateur lors de l'inscription partenaire
- Envoyer des notifications email automatiques
- Fournir un tableau de bord partenaire pour le suivi
- Maintenir la compatibilite avec les candidatures existantes

### Non-Goals
- Migration des candidatures existantes vers des comptes (sera fait manuellement)
- Systeme de paiement pour les partenaires
- Gestion des reservations par les partenaires (scope separe)
- Internationalisation du systeme d'email

## Decisions

### Decision 1: Workflow d'inscription en deux etapes
**Choix**: Creer le compte auth.users PUIS inserer dans partners avec user_id

**Alternatives considerees**:
1. Trigger database sur insert partners → Complexe, problemes de gestion des erreurs
2. Edge Function complete → Plus de code serveur, moins de controle client
3. Inscription puis liaison manuelle → Mauvaise UX

**Rationale**: Le workflow cote client permet un meilleur controle des erreurs et une UX plus fluide. Si l'une des etapes echoue, on peut rollback proprement.

### Decision 2: Structure de la table partners
**Choix**: Ajouter colonne `user_id` (UUID, nullable, FK vers auth.users)

```sql
ALTER TABLE public.partners
ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;
```

**Rationale**: Nullable pour supporter les candidatures existantes sans compte. SET NULL au lieu de CASCADE pour preserver les donnees partenaires meme si le compte est supprime.

### Decision 3: Notifications via Supabase Edge Functions
**Choix**: Utiliser Supabase Edge Functions avec Resend ou SendGrid

**Structure**:
```
supabase/functions/
├── send-partner-confirmation/
│   └── index.ts
├── notify-admin-new-partner/
│   └── index.ts
└── send-partner-status-change/
    └── index.ts
```

**Alternatives considerees**:
1. Database triggers + pg_net → Complexe, debugging difficile
2. Webhook externe → Dependance externe supplementaire
3. Pas de notifications → Mauvaise UX

### Decision 4: Tableau de bord partenaire
**Choix**: Nouvelle page `/partner-dashboard` avec layout similaire a Dashboard

**Structure composants**:
```
src/
├── pages/
│   └── PartnerDashboard.tsx
└── components/
    └── partner-dashboard/
        ├── PartnerDashboardLayout.tsx
        ├── PartnerStatusCard.tsx
        ├── PartnerProfileForm.tsx
        └── PartnerNotifications.tsx
```

### Decision 5: Gestion des roles
**Choix**: Utiliser le champ `role` dans profiles avec valeur "partner"

**Rationale**: Coherent avec le systeme existant (admin, client). Le role partner donne acces au tableau de bord partenaire uniquement.

## Risks / Trade-offs

### Risk 1: Incoherence entre auth.users et partners
**Mitigation**: Validation cote client avant insertion, transaction logique (signup → insert partners)

### Risk 2: Emails non delivres
**Mitigation**: Logging des envois, queue de retry dans Edge Functions, monitoring

### Risk 3: Candidatures existantes sans compte
**Mitigation**: Le user_id est nullable, ces candidatures restent accessibles aux admins. Migration manuelle possible.

### Risk 4: Performance des Edge Functions
**Mitigation**: Les notifications sont asynchrones, pas bloquantes pour l'UX

## Migration Plan

### Phase 1: Schema Database
1. Ajouter colonne `user_id` a partners (nullable)
2. Ajouter colonnes supplementaires (siret, horaires)
3. Mettre a jour les politiques RLS

### Phase 2: Backend (Edge Functions)
1. Creer les Edge Functions pour les notifications
2. Configurer les secrets (API keys email service)
3. Tester en environnement de dev

### Phase 3: Frontend
1. Modifier PartnerApplicationForm pour creation de compte
2. Creer les composants du tableau de bord
3. Ajouter la route /partner-dashboard
4. Mettre a jour la navigation

### Phase 4: Test et Deploiement
1. Tests manuels du workflow complet
2. Deploiement en production
3. Verification des notifications

### Rollback
En cas de probleme:
- Les candidatures existantes restent fonctionnelles (user_id nullable)
- Edge Functions peuvent etre desactivees independamment
- Le formulaire peut revenir a l'ancienne version

## Open Questions
- [ ] Quel service d'email utiliser? (Resend recommande pour Supabase)
- [ ] Faut-il une verification email avant de soumettre? (Recommande: non, juste confirmation)
- [ ] Limite de caracteres pour la description? (Suggere: 1000 caracteres)
- [ ] Les partenaires rejetes peuvent-ils resoumettre? (Suggere: oui, apres 30 jours)
