# Guide de Déploiement Stripe - Club Créole

Ce document détaille les étapes de déploiement du système d'abonnement Stripe en production.

## Table des Matières

1. [Prérequis](#prérequis)
2. [Configuration Stripe Dashboard](#configuration-stripe-dashboard)
3. [Variables d'Environnement](#variables-denvironnement)
4. [Déploiement des Edge Functions](#déploiement-des-edge-functions)
5. [Migration des Données](#migration-des-données)
6. [Monitoring et Alertes](#monitoring-et-alertes)
7. [Validation Post-Déploiement](#validation-post-déploiement)

---

## Prérequis

### Comptes et Accès
- [ ] Compte Stripe en mode live activé
- [ ] Accès admin au projet Supabase
- [ ] Accès au serveur de déploiement (Coolify)
- [ ] Compte Resend configuré avec domaine vérifié

### Outils
- [ ] Stripe CLI installé
- [ ] Supabase CLI installé
- [ ] Accès SSH au serveur

---

## Configuration Stripe Dashboard

### 1. Créer les Produits et Prix

Accédez à [Stripe Dashboard > Products](https://dashboard.stripe.com/products)

#### Produit: Abonnement Passionné
```
Nom: Abonnement Passionné - Club Créole
Description: Accès aux avantages Passionné avec 15% de réduction
Prix: 15,00 € tous les 2 mois
ID Prix: price_passionne_prod (noter l'ID généré)
```

#### Produit: Abonnement Expert
```
Nom: Abonnement Expert - Club Créole
Description: Accès complet avec 25% de réduction et services premium
Prix: 89,99 € par mois
ID Prix: price_expert_prod (noter l'ID généré)
```

### 2. Configurer le Webhook Endpoint

Accédez à [Stripe Dashboard > Developers > Webhooks](https://dashboard.stripe.com/webhooks)

1. Cliquez sur **"Add endpoint"**

2. Configurez l'endpoint:
   ```
   URL: https://[VOTRE-PROJET].supabase.co/functions/v1/stripe-webhook
   Description: Club Créole - Webhook de gestion des abonnements
   ```

3. Sélectionnez les événements à écouter:
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `customer.subscription.paused`
   - `customer.subscription.resumed`

4. Cliquez sur **"Add endpoint"**

5. **Copiez le Signing Secret** (commence par `whsec_`)
   - Ce secret sera utilisé dans `STRIPE_WEBHOOK_SECRET`

### 3. Configurer le Portail Client

Accédez à [Stripe Dashboard > Settings > Billing > Customer portal](https://dashboard.stripe.com/settings/billing/portal)

1. Activez les fonctionnalités:
   - [x] Permettre aux clients de mettre à jour leur moyen de paiement
   - [x] Permettre aux clients d'annuler leur abonnement
   - [x] Permettre aux clients de voir l'historique des factures

2. Configurez les liens:
   ```
   URL de redirection après déconnexion: https://clubcreole.guadeloupe/dashboard
   Conditions d'utilisation: https://clubcreole.guadeloupe/terms
   Politique de confidentialité: https://clubcreole.guadeloupe/privacy
   ```

---

## Variables d'Environnement

### Supabase Edge Functions

Configurez les secrets dans Supabase Dashboard > Project Settings > Edge Functions:

```bash
# Via CLI
supabase secrets set STRIPE_SECRET_KEY=sk_live_...
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...
supabase secrets set RESEND_API_KEY=re_...

# Ou via Dashboard
# Project Settings > Edge Functions > Secrets
```

### Variables Requises

| Variable | Description | Exemple |
|----------|-------------|---------|
| `STRIPE_SECRET_KEY` | Clé API secrète Stripe (live) | `sk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | Secret de signature webhook | `whsec_...` |
| `RESEND_API_KEY` | Clé API Resend pour emails | `re_...` |
| `SUPABASE_URL` | URL du projet Supabase | Auto-configuré |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé service role | Auto-configuré |

### Application Frontend

Dans le fichier `.env.production` ou via Coolify:

```env
VITE_SUPABASE_URL=https://[projet].supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

---

## Déploiement des Edge Functions

### 1. Vérifier les fonctions localement

```bash
# Lister les fonctions
supabase functions list

# Tester localement
supabase functions serve stripe-webhook --env-file .env.local
```

### 2. Déployer les fonctions

```bash
# Déployer toutes les fonctions
supabase functions deploy

# Ou déployer individuellement
supabase functions deploy stripe-webhook
supabase functions deploy subscription-emails
supabase functions deploy create-checkout
supabase functions deploy check-subscription
supabase functions deploy customer-portal
```

### 3. Vérifier le déploiement

```bash
# Voir les logs
supabase functions logs stripe-webhook

# Tester l'endpoint
curl -X POST https://[projet].supabase.co/functions/v1/stripe-webhook \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

---

## Migration des Données

### Script de Synchronisation des Abonnés Existants

Exécutez ce script pour synchroniser les abonnés existants avec Stripe:

```sql
-- Vérifier les abonnés sans stripe_customer_id
SELECT id, email, subscribed, subscription_tier
FROM subscribers
WHERE stripe_customer_id IS NULL AND subscribed = true;
```

### Créer les Customers Stripe pour les abonnés existants

```javascript
// scripts/sync-stripe-customers.js
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function syncExistingSubscribers() {
  // Récupérer les abonnés sans customer_id Stripe
  const { data: subscribers, error } = await supabase
    .from('subscribers')
    .select('*')
    .is('stripe_customer_id', null)
    .eq('subscribed', true);

  if (error) {
    console.error('Erreur:', error);
    return;
  }

  console.log(`${subscribers.length} abonnés à synchroniser`);

  for (const subscriber of subscribers) {
    try {
      // Créer le customer Stripe
      const customer = await stripe.customers.create({
        email: subscriber.email,
        metadata: {
          subscriber_id: subscriber.id.toString(),
          migrated: 'true',
          original_tier: subscriber.subscription_tier
        }
      });

      // Mettre à jour la base de données
      await supabase
        .from('subscribers')
        .update({
          stripe_customer_id: customer.id,
          updated_at: new Date().toISOString()
        })
        .eq('id', subscriber.id);

      console.log(`✓ ${subscriber.email} -> ${customer.id}`);
    } catch (err) {
      console.error(`✗ ${subscriber.email}: ${err.message}`);
    }
  }
}

syncExistingSubscribers();
```

---

## Monitoring et Alertes

### 1. Alertes Stripe

Configurez les alertes dans [Stripe Dashboard > Settings > Team and security > Alerts](https://dashboard.stripe.com/settings/alerts):

- [x] Paiements échoués (seuil: > 5 par jour)
- [x] Taux de refus élevé (seuil: > 10%)
- [x] Webhook failures (seuil: > 3)
- [x] Litiges ouverts

### 2. Monitoring Supabase

Configurez dans Supabase Dashboard > Project Settings > Integrations:

```sql
-- Créer une vue pour le monitoring
CREATE OR REPLACE VIEW subscription_metrics AS
SELECT
  COUNT(*) FILTER (WHERE subscribed = true) as active_subscribers,
  COUNT(*) FILTER (WHERE subscription_status = 'past_due') as past_due,
  COUNT(*) FILTER (WHERE subscription_status = 'cancelled') as cancelled_today,
  SUM(CASE WHEN subscription_tier = 'Passionné' THEN 1 ELSE 0 END) as passionne_count,
  SUM(CASE WHEN subscription_tier = 'Expert' THEN 1 ELSE 0 END) as expert_count
FROM subscribers;

-- Créer une vue pour les erreurs webhook
CREATE OR REPLACE VIEW webhook_errors AS
SELECT
  event_type,
  COUNT(*) as error_count,
  MAX(created_at) as last_error
FROM webhook_events
WHERE processing_status = 'error'
AND created_at > NOW() - INTERVAL '24 hours'
GROUP BY event_type;
```

### 3. Script de Health Check

```bash
#!/bin/bash
# scripts/health-check.sh

echo "=== Stripe Subscription Health Check ==="

# Vérifier la connectivité webhook
WEBHOOK_STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
  -X OPTIONS \
  "https://[projet].supabase.co/functions/v1/stripe-webhook")

if [ "$WEBHOOK_STATUS" == "204" ]; then
  echo "✓ Webhook endpoint accessible"
else
  echo "✗ Webhook endpoint inaccessible (HTTP $WEBHOOK_STATUS)"
fi

# Vérifier les derniers événements
echo ""
echo "=== Derniers événements webhook ==="
supabase db query "
  SELECT stripe_event_id, event_type, processing_status, created_at
  FROM webhook_events
  ORDER BY created_at DESC
  LIMIT 5
"

# Vérifier les erreurs récentes
echo ""
echo "=== Erreurs des 24 dernières heures ==="
supabase db query "
  SELECT event_type, COUNT(*) as count
  FROM webhook_events
  WHERE processing_status = 'error'
  AND created_at > NOW() - INTERVAL '24 hours'
  GROUP BY event_type
"
```

---

## Validation Post-Déploiement

### Checklist de Validation

#### 1. Webhook Connectivity
- [ ] Endpoint répond avec 200/400 (pas 500)
- [ ] Signature validation fonctionne
- [ ] Événements apparaissent dans Stripe Dashboard > Webhooks > Recent events

#### 2. Flux d'Abonnement
- [ ] Checkout session se crée correctement
- [ ] Paiement réussi met à jour la base de données
- [ ] Email de confirmation envoyé
- [ ] Badge "Abonné" affiché

#### 3. Gestion des Erreurs
- [ ] Paiement échoué enregistré correctement
- [ ] Email d'échec envoyé
- [ ] Retry logic fonctionne

#### 4. Portail Client
- [ ] Accès au portail fonctionne
- [ ] Mise à jour de carte possible
- [ ] Annulation possible

### Test de Production (avec montant réel minimal)

```bash
# 1. Créer un abonnement test en production
# Utiliser une vraie carte avec un petit montant

# 2. Vérifier dans Stripe Dashboard
# Payments > voir le paiement

# 3. Vérifier dans la base de données
supabase db query "
  SELECT * FROM subscribers
  WHERE email = 'test@example.com'
  ORDER BY updated_at DESC LIMIT 1
"

# 4. Vérifier le webhook event
supabase db query "
  SELECT * FROM webhook_events
  ORDER BY created_at DESC LIMIT 5
"

# 5. Annuler l'abonnement test
# Via Stripe Dashboard ou portail client
```

---

## Rollback Procedure

En cas de problème critique:

### 1. Désactiver le Webhook
```bash
# Dans Stripe Dashboard > Webhooks
# Cliquer sur l'endpoint > Disable
```

### 2. Restaurer la Version Précédente
```bash
# Redéployer la version précédente
git checkout [commit-precedent]
supabase functions deploy stripe-webhook
```

### 3. Communiquer
- Notifier les utilisateurs si nécessaire
- Documenter l'incident

---

## Contacts et Support

- **Stripe Support**: support@stripe.com
- **Supabase Support**: support@supabase.io
- **Resend Support**: support@resend.com

## Ressources

- [Documentation Stripe Webhooks](https://stripe.com/docs/webhooks)
- [Documentation Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Guide de Test Stripe](https://stripe.com/docs/testing)
