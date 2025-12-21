# Guide de Test du Système d'Abonnement Stripe

Ce document décrit les procédures de test pour le système d'abonnement Stripe intégré à Club Créole.

## Table des Matières

1. [Configuration de l'Environnement de Test](#configuration-de-lenvironnement-de-test)
2. [Tests Unitaires](#tests-unitaires)
3. [Tests des Webhooks](#tests-des-webhooks)
4. [Tests End-to-End](#tests-end-to-end)
5. [Tests de Sécurité](#tests-de-sécurité)

---

## Configuration de l'Environnement de Test

### Prérequis

1. **Stripe CLI** installé et configuré
   ```bash
   # Installation
   brew install stripe/stripe-cli/stripe

   # Login
   stripe login
   ```

2. **Clés API Stripe en mode test**
   - `STRIPE_SECRET_KEY` (sk_test_...)
   - `STRIPE_WEBHOOK_SECRET` (whsec_...)

3. **Variables d'environnement**
   ```env
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   RESEND_API_KEY=re_...
   ```

### Cartes de Test Stripe

| Numéro de carte | Scénario |
|-----------------|----------|
| 4242 4242 4242 4242 | Paiement réussi |
| 4000 0000 0000 0002 | Carte refusée |
| 4000 0000 0000 9995 | Fonds insuffisants |
| 4000 0000 0000 3220 | Authentification 3D Secure requise |
| 4000 0025 0000 3155 | Authentification 3D Secure échoue |

---

## Tests Unitaires

### Exécution des Tests

```bash
# Tous les tests
npm run test

# Tests de subscription spécifiquement
npm run test -- --grep "useSubscription"
npm run test -- --grep "webhook"
npm run test -- --grep "email"

# Tests avec couverture
npm run test:coverage
```

### Tests Couverts

#### 1. Tests du Hook useSubscription (`src/hooks/__tests__/useSubscription.test.ts`)
- ✅ `getStatusLabel()` - Labels de statut en français
- ✅ `getStatusColor()` - Couleurs de badges selon le statut
- ✅ `hasPaymentIssues()` - Détection des problèmes de paiement

#### 2. Tests des Utilitaires Webhook (`src/lib/__tests__/webhookUtils.test.ts`)
- ✅ `getSubscriptionTier()` - Détermination du tier selon le prix
- ✅ Logique d'idempotence des événements
- ✅ Logique de retry avec exponential backoff
- ✅ Parsing de signature Stripe
- ✅ Détection des erreurs retryables

#### 3. Tests des Templates Email (`src/lib/__tests__/emailTemplates.test.ts`)
- ✅ Génération des sujets d'email
- ✅ Validation des données email
- ✅ Formatage des montants et dates
- ✅ Suivi de livraison des emails

---

## Tests des Webhooks

### Test avec Stripe CLI

1. **Démarrer le tunnel de webhook**
   ```bash
   stripe listen --forward-to http://localhost:54321/functions/v1/stripe-webhook
   ```

2. **Simuler des événements**
   ```bash
   # Paiement réussi
   stripe trigger invoice.payment_succeeded

   # Paiement échoué
   stripe trigger invoice.payment_failed

   # Abonnement annulé
   stripe trigger customer.subscription.deleted

   # Abonnement mis à jour
   stripe trigger customer.subscription.updated
   ```

### Vérifications des Webhooks

#### Test d'Idempotence (7.2)
```bash
# Envoyer le même événement deux fois
stripe trigger invoice.payment_succeeded --event-id evt_test_123
stripe trigger invoice.payment_succeeded --event-id evt_test_123

# Vérifier que l'événement n'est traité qu'une fois
# Consulter les logs: le second appel doit retourner "Event already processed"
```

#### Test de Validation de Signature (7.3)
```bash
# Test avec signature valide (via Stripe CLI)
stripe trigger invoice.payment_succeeded

# Test avec signature invalide (curl direct)
curl -X POST http://localhost:54321/functions/v1/stripe-webhook \
  -H "Content-Type: application/json" \
  -H "stripe-signature: t=invalid,v1=invalid" \
  -d '{"type":"invoice.payment_succeeded","data":{}}'

# Résultat attendu: 401 Unauthorized
```

### Logs à Vérifier

```bash
# Voir les logs des Edge Functions
supabase functions logs stripe-webhook

# Filtrer par niveau
supabase functions logs stripe-webhook | grep "ERROR"
supabase functions logs stripe-webhook | grep "WARN"
```

---

## Tests End-to-End

### Scénario 1: Nouvel Abonnement Réussi

1. **Actions utilisateur:**
   - Se connecter à l'application
   - Cliquer sur "S'abonner" depuis la page d'accueil
   - Choisir la formule "Passionné" (15€/2 mois)
   - Entrer la carte test: 4242 4242 4242 4242
   - Valider le paiement

2. **Vérifications:**
   - [ ] Redirection vers la page de succès
   - [ ] Badge "Abonné" affiché dans le header
   - [ ] Statut "Actif" dans le profil
   - [ ] Email de confirmation reçu
   - [ ] Entrée dans la table `subscribers` avec `subscribed = true`
   - [ ] Entrée dans la table `purchases` avec `status = 'completed'`
   - [ ] Entrée dans la table `webhook_events` avec `processing_status = 'success'`

### Scénario 2: Paiement Échoué

1. **Actions utilisateur:**
   - Se connecter à l'application
   - Cliquer sur "S'abonner"
   - Choisir une formule
   - Entrer la carte test: 4000 0000 0000 0002 (refusée)

2. **Vérifications:**
   - [ ] Message d'erreur affiché sur Stripe Checkout
   - [ ] Pas de modification du statut d'abonnement
   - [ ] Email d'échec de paiement reçu (si tentative précédente)

### Scénario 3: Annulation d'Abonnement

1. **Prérequis:** Avoir un abonnement actif

2. **Actions utilisateur:**
   - Aller dans "Mon compte" > "Gérer mon abonnement"
   - Cliquer sur le portail client Stripe
   - Annuler l'abonnement

3. **Vérifications:**
   - [ ] Badge devient "Annulation programmée"
   - [ ] Email de confirmation d'annulation reçu
   - [ ] `cancel_at_period_end = true` dans la base
   - [ ] Accès maintenu jusqu'à la fin de la période

### Scénario 4: Retry de Paiement Échoué

1. **Simulation:**
   ```bash
   # Créer un abonnement avec carte qui échoue après
   stripe subscriptions create \
     --customer=cus_xxx \
     --price=price_xxx \
     --payment-behavior=error_if_incomplete
   ```

2. **Vérifications:**
   - [ ] Alerte de paiement échoué affichée dans l'UI
   - [ ] Bouton "Réessayer le paiement" visible
   - [ ] Clic sur le bouton ouvre le portail client
   - [ ] Mise à jour de la carte permet le paiement

---

## Tests de Sécurité

### Validation de Signature Webhook

```bash
# Test 1: Signature absente
curl -X POST http://localhost:54321/functions/v1/stripe-webhook \
  -H "Content-Type: application/json" \
  -d '{"type":"invoice.payment_succeeded"}'
# Attendu: 400 Bad Request "Missing signature"

# Test 2: Signature invalide
curl -X POST http://localhost:54321/functions/v1/stripe-webhook \
  -H "Content-Type: application/json" \
  -H "stripe-signature: invalid" \
  -d '{"type":"invoice.payment_succeeded"}'
# Attendu: 401 Unauthorized "Invalid signature"

# Test 3: Signature expirée (timestamp trop ancien)
# La signature Stripe inclut un timestamp, les anciennes signatures sont rejetées
```

### Protection RLS (Row Level Security)

```sql
-- Vérifier que les utilisateurs ne peuvent voir que leurs propres données
SELECT * FROM subscribers WHERE email = 'autre@utilisateur.com';
-- Devrait retourner 0 résultats si connecté avec un autre utilisateur
```

### Test d'Injection

```bash
# Tentative d'injection via les champs email
curl -X POST http://localhost:54321/functions/v1/stripe-webhook \
  -H "Content-Type: application/json" \
  -H "stripe-signature: $VALID_SIG" \
  -d '{"type":"invoice.payment_succeeded","data":{"object":{"customer_email":"test@example.com; DROP TABLE subscribers;--"}}}'
# L'email doit être échappé correctement
```

---

## Checklist de Déploiement Production

### Avant le Déploiement

- [ ] Toutes les clés API en mode production configurées
- [ ] Webhook endpoint enregistré dans Stripe Dashboard
- [ ] Signature webhook en production (`STRIPE_WEBHOOK_SECRET`)
- [ ] Variables d'environnement Supabase configurées
- [ ] Tests unitaires passent
- [ ] Tests manuels terminés sur environnement de staging

### Après le Déploiement

- [ ] Vérifier la connectivité webhook (Stripe Dashboard > Developers > Webhooks)
- [ ] Tester un vrai abonnement avec une petite somme
- [ ] Vérifier la réception des emails
- [ ] Monitorer les logs pendant 24h

### Monitoring Continu

- [ ] Configurer alertes Stripe pour échecs de paiement
- [ ] Configurer alertes Supabase pour erreurs Edge Functions
- [ ] Dashboard de suivi des abonnements actif

---

## Résolution de Problèmes

### Webhook ne reçoit pas les événements

1. Vérifier l'URL du webhook dans Stripe Dashboard
2. Vérifier les logs Supabase Edge Functions
3. Tester avec Stripe CLI en local

### Emails non envoyés

1. Vérifier la clé API Resend
2. Consulter les logs `subscription-emails`
3. Vérifier le domaine d'envoi vérifié dans Resend

### Données incohérentes

1. Comparer les données Stripe avec la base locale
2. Vérifier les événements traités dans `webhook_events`
3. Forcer une synchronisation via `check-subscription`

---

## Commandes Utiles

```bash
# Lancer les tests
npm run test

# Voir les fonctions déployées
supabase functions list

# Logs en temps réel
supabase functions logs stripe-webhook --tail

# Vérifier les abonnés dans la base
supabase db query "SELECT email, subscribed, subscription_tier, subscription_status FROM subscribers"

# Vérifier les événements webhook
supabase db query "SELECT stripe_event_id, event_type, processing_status FROM webhook_events ORDER BY created_at DESC LIMIT 10"
```
