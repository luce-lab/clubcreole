# Guide de Dépannage - Système d'Abonnement

Ce guide aide à diagnostiquer et résoudre les problèmes courants du système d'abonnement Stripe.

---

## Table des Matières

1. [Problèmes de Paiement](#problèmes-de-paiement)
2. [Problèmes de Webhook](#problèmes-de-webhook)
3. [Problèmes de Synchronisation](#problèmes-de-synchronisation)
4. [Problèmes d'Email](#problèmes-demail)
5. [Problèmes Frontend](#problèmes-frontend)
6. [Commandes de Diagnostic](#commandes-de-diagnostic)

---

## Problèmes de Paiement

### Symptôme: Paiement réussi mais abonnement non actif

**Causes possibles:**
1. Webhook non reçu
2. Erreur dans le traitement du webhook
3. Événement traité mais base de données non mise à jour

**Diagnostic:**
```sql
-- Vérifier les événements webhook récents
SELECT * FROM webhook_events
WHERE event_type = 'invoice.payment_succeeded'
ORDER BY created_at DESC
LIMIT 10;

-- Vérifier le statut de l'abonné
SELECT * FROM subscribers
WHERE email = 'utilisateur@example.com';

-- Vérifier les achats
SELECT * FROM purchases
WHERE stripe_invoice_id = 'inv_xxx';
```

**Solution:**
```bash
# 1. Vérifier les logs du webhook
supabase functions logs stripe-webhook --limit 50

# 2. Renvoyer l'événement depuis Stripe Dashboard
# Developers > Webhooks > Recent events > Resend

# 3. Ou mise à jour manuelle
```
```sql
UPDATE subscribers SET
  subscribed = true,
  subscription_tier = 'Passionné',
  subscription_status = 'active',
  updated_at = NOW()
WHERE email = 'utilisateur@example.com';
```

---

### Symptôme: Carte refusée répétitivement

**Causes possibles:**
1. Fonds insuffisants
2. Carte expirée
3. Blocage par la banque
4. Limite de carte atteinte

**Solution pour l'utilisateur:**
1. Vérifier les fonds disponibles
2. Contacter la banque
3. Mettre à jour la carte via le portail client:
   ```
   Dashboard > Mon compte > Gérer mon abonnement
   ```

**Vérification admin:**
```sql
-- Voir les échecs de paiement
SELECT * FROM purchases
WHERE status = 'failed'
AND user_id = (SELECT id FROM subscribers WHERE email = 'utilisateur@example.com')
ORDER BY purchase_date DESC;
```

---

### Symptôme: Double facturation

**Causes possibles:**
1. Abonnement dupliqué dans Stripe
2. Problème d'idempotence

**Diagnostic:**
```bash
# Vérifier dans Stripe CLI
stripe subscriptions list --customer=cus_xxx
```

**Solution:**
1. Identifier l'abonnement en double dans Stripe Dashboard
2. Annuler l'abonnement dupliqué
3. Effectuer un remboursement si nécessaire

---

## Problèmes de Webhook

### Symptôme: Webhooks non reçus

**Causes possibles:**
1. URL de webhook incorrecte
2. Endpoint non accessible
3. Secret webhook incorrect

**Diagnostic:**
```bash
# Tester la connectivité
curl -X OPTIONS https://[projet].supabase.co/functions/v1/stripe-webhook

# Vérifier dans Stripe Dashboard
# Developers > Webhooks > Your endpoint > Recent events
```

**Solutions:**
1. Vérifier l'URL dans Stripe Dashboard
2. Vérifier que les Edge Functions sont déployées:
   ```bash
   supabase functions list
   ```
3. Vérifier le secret:
   ```bash
   supabase secrets list
   ```

---

### Symptôme: Erreur de signature webhook

**Message d'erreur:** `Invalid signature` ou `401 Unauthorized`

**Causes possibles:**
1. STRIPE_WEBHOOK_SECRET incorrect
2. Corps de requête modifié en transit
3. Timestamp expiré

**Solution:**
```bash
# Régénérer le secret dans Stripe Dashboard
# Developers > Webhooks > Your endpoint > Reveal signing secret

# Mettre à jour dans Supabase
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_nouveau_secret

# Redéployer la fonction
supabase functions deploy stripe-webhook
```

---

### Symptôme: Événements en statut "retry"

**Diagnostic:**
```sql
SELECT * FROM webhook_events
WHERE processing_status = 'retry'
ORDER BY created_at DESC;
```

**Causes possibles:**
1. Erreur temporaire de base de données
2. Timeout de connexion
3. Rate limiting

**Solution:**
Les retries sont automatiques. Si persistent:
```sql
-- Réinitialiser pour retraitement
UPDATE webhook_events
SET processing_status = 'pending', retry_count = 0
WHERE stripe_event_id = 'evt_xxx';
```

---

## Problèmes de Synchronisation

### Symptôme: Statut Stripe différent de la base de données

**Diagnostic:**
```bash
# Comparer avec Stripe
stripe customers retrieve cus_xxx
stripe subscriptions retrieve sub_xxx
```

```sql
-- Vérifier en base
SELECT * FROM subscribers WHERE stripe_customer_id = 'cus_xxx';
```

**Solution: Forcer la synchronisation**
```bash
# Appeler manuellement check-subscription pour l'utilisateur
curl -X POST https://[projet].supabase.co/functions/v1/check-subscription \
  -H "Authorization: Bearer [user_access_token]" \
  -H "Content-Type: application/json"
```

---

### Symptôme: Abonné sans stripe_customer_id

**Diagnostic:**
```sql
SELECT * FROM subscribers
WHERE stripe_customer_id IS NULL
AND subscribed = true;
```

**Solution:**
```bash
# Utiliser le script de synchronisation
npm run stripe:sync
```

---

## Problèmes d'Email

### Symptôme: Emails non reçus

**Causes possibles:**
1. Clé API Resend invalide
2. Domaine non vérifié
3. Email en spam
4. Erreur dans la fonction

**Diagnostic:**
```bash
# Vérifier les logs
supabase functions logs subscription-emails --limit 20
```

**Vérifications:**
1. Vérifier la clé API Resend
2. Vérifier le domaine dans Resend Dashboard
3. Tester l'envoi manuel:
   ```bash
   curl -X POST https://[projet].supabase.co/functions/v1/subscription-emails \
     -H "Content-Type: application/json" \
     -d '{
       "type": "payment_success",
       "recipientEmail": "test@example.com",
       "recipientName": "Test",
       "subscriptionTier": "Passionné",
       "amount": 15,
       "currency": "EUR"
     }'
   ```

---

### Symptôme: Emails envoyés mais pas reçus

**Solutions:**
1. Vérifier le dossier spam
2. Vérifier les enregistrements DNS (SPF, DKIM) dans Resend
3. Ajouter l'adresse d'envoi aux contacts

---

## Problèmes Frontend

### Symptôme: Badge "Abonné" non affiché

**Diagnostic:**
1. Vérifier dans la console du navigateur
2. Vérifier l'état du hook useSubscription

**Solution:**
```javascript
// Dans la console du navigateur
// Vérifier le contexte auth
console.log(authContext.user);

// Forcer un refresh
location.reload();
```

---

### Symptôme: Bouton "S'abonner" ne fonctionne pas

**Causes possibles:**
1. Utilisateur non connecté
2. Erreur de création de session Stripe
3. Pop-up bloquée

**Diagnostic:**
```bash
supabase functions logs create-checkout --limit 10
```

**Solution:**
1. Vérifier que l'utilisateur est connecté
2. Autoriser les pop-ups pour le site
3. Vérifier les clés Stripe (VITE_STRIPE_PUBLISHABLE_KEY)

---

### Symptôme: Portail client ne s'ouvre pas

**Diagnostic:**
```bash
supabase functions logs customer-portal --limit 10
```

**Causes possibles:**
1. Pas de stripe_customer_id pour l'utilisateur
2. Configuration du portail incorrecte dans Stripe

**Solution:**
1. Vérifier la configuration du portail dans Stripe Dashboard
2. S'assurer que l'utilisateur a un customer_id

---

## Commandes de Diagnostic

### Health Check Complet

```bash
npm run stripe:health
```

### Logs des Fonctions

```bash
# Webhook principal
supabase functions logs stripe-webhook --limit 50

# Emails
supabase functions logs subscription-emails --limit 20

# Checkout
supabase functions logs create-checkout --limit 20

# Portail client
supabase functions logs customer-portal --limit 20
```

### Requêtes SQL Utiles

```sql
-- Résumé des abonnements
SELECT
  subscription_status,
  subscription_tier,
  COUNT(*) as count
FROM subscribers
WHERE subscribed = true
GROUP BY subscription_status, subscription_tier;

-- Événements webhook des dernières 24h
SELECT
  event_type,
  processing_status,
  COUNT(*) as count
FROM webhook_events
WHERE created_at > NOW() - INTERVAL '24 hours'
GROUP BY event_type, processing_status;

-- Erreurs récentes
SELECT * FROM webhook_events
WHERE processing_status = 'error'
ORDER BY created_at DESC
LIMIT 10;

-- Revenus du mois
SELECT
  SUM(amount) as total_revenue,
  COUNT(*) as transaction_count
FROM purchases
WHERE status = 'completed'
AND purchase_date > date_trunc('month', NOW());
```

### Stripe CLI

```bash
# Lister les abonnements d'un client
stripe subscriptions list --customer=cus_xxx

# Voir les détails d'une facture
stripe invoices retrieve inv_xxx

# Renvoyer un événement webhook
stripe events resend evt_xxx
```

---

## Escalade

Si le problème persiste après ces étapes:

1. **Collecter les informations:**
   - ID de l'événement Stripe
   - Email de l'utilisateur
   - Logs pertinents
   - Screenshots

2. **Contacter le support:**
   - Stripe: support@stripe.com
   - Supabase: support@supabase.io

3. **Documenter l'incident:**
   - Date et heure
   - Étapes de diagnostic effectuées
   - Solution appliquée
