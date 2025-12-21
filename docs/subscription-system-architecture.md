# Architecture du Système d'Abonnement Stripe

## Vue d'Ensemble

Le système d'abonnement Club Créole utilise Stripe pour gérer les paiements récurrents, avec une architecture basée sur les webhooks pour synchroniser les données en temps réel.

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Application   │     │     Stripe      │     │    Supabase     │
│   React/Vite    │────▶│   Checkout &    │────▶│  Edge Functions │
│                 │     │   Subscriptions │     │   & Database    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │                       │
        │                       │ Webhooks              │
        │                       ▼                       │
        │               ┌───────────────┐               │
        │               │ stripe-webhook│               │
        │               │ Edge Function │               │
        │               └───────────────┘               │
        │                       │                       │
        │                       ▼                       │
        │               ┌───────────────┐               │
        │               │  Database     │◀──────────────┘
        │               │  Updates      │
        │               └───────────────┘
        │                       │
        │                       ▼
        │               ┌───────────────┐
        └──────────────▶│ Real-time     │
                        │ Subscriptions │
                        └───────────────┘
```

---

## Flux des Événements Webhook

### 1. invoice.payment_succeeded

**Déclencheur:** Stripe traite un paiement avec succès

**Flux:**
```
1. Stripe envoie l'événement webhook
2. stripe-webhook/index.ts reçoit l'événement
3. Validation de la signature Stripe
4. Vérification d'idempotence (webhook_events table)
5. Extraction des données de l'invoice
6. getOrCreateSubscriber() - trouve ou crée l'abonné
7. Récupération des détails d'abonnement depuis Stripe API
8. Détermination du tier (getSubscriptionTier())
9. Mise à jour de la table subscribers:
   - subscribed = true
   - subscription_tier = "Passionné" ou "Expert"
   - subscription_end = date de fin de période
   - stripe_subscription_id = ID de l'abonnement
10. Enregistrement dans la table purchases
11. Envoi d'email de confirmation via subscription-emails
12. Marquage de l'événement comme traité
```

**Données mises à jour:**
```sql
UPDATE subscribers SET
  subscribed = true,
  subscription_tier = 'Passionné',
  subscription_status = 'active',
  subscription_end = '2025-06-30T00:00:00Z',
  stripe_subscription_id = 'sub_xxx',
  updated_at = NOW()
WHERE id = <subscriber_id>;

INSERT INTO purchases (user_id, item_type, item_name, amount, status, stripe_invoice_id)
VALUES (<id>, 'subscription', 'Abonnement renouvellement', 15.00, 'completed', 'inv_xxx');
```

### 2. invoice.payment_failed

**Déclencheur:** Un paiement échoue (carte refusée, fonds insuffisants, etc.)

**Flux:**
```
1. Réception et validation de l'événement
2. Vérification d'idempotence
3. Récupération des données de l'invoice
4. getOrCreateSubscriber()
5. Enregistrement de l'échec dans purchases
6. Si attempt_count >= 3:
   - subscribed = false
   - subscription_status = 'past_due'
7. Envoi d'email d'alerte via subscription-emails
8. Marquage de l'événement
```

**Données mises à jour:**
```sql
INSERT INTO purchases (user_id, item_type, item_name, amount, status, metadata)
VALUES (<id>, 'subscription', 'Échec de paiement', 15.00, 'failed',
  '{"attempt_count": 2, "next_retry": "2025-01-05T00:00:00Z"}');

-- Si 3ème tentative échouée:
UPDATE subscribers SET
  subscribed = false,
  subscription_status = 'past_due',
  updated_at = NOW()
WHERE id = <subscriber_id>;
```

### 3. customer.subscription.deleted

**Déclencheur:** Un abonnement est annulé (par l'utilisateur ou automatiquement)

**Flux:**
```
1. Réception et validation de l'événement
2. Vérification d'idempotence
3. Récupération des données de l'abonnement
4. getOrCreateSubscriber()
5. Mise à jour du statut:
   - subscribed = false
   - subscription_tier = null
   - subscription_status = 'cancelled'
   - stripe_subscription_id = null
6. Enregistrement de l'annulation dans purchases
7. Envoi d'email de confirmation d'annulation
8. Marquage de l'événement
```

### 4. customer.subscription.updated

**Déclencheur:** Changement de plan, pause, reprise, ou modification

**Flux:**
```
1. Réception et validation de l'événement
2. Vérification d'idempotence
3. Récupération des nouvelles données
4. getOrCreateSubscriber()
5. Recalcul du tier si changement de prix
6. Mise à jour de tous les champs pertinents:
   - subscription_tier
   - subscription_status
   - subscription_end
   - cancel_at_period_end
7. Marquage de l'événement
```

---

## Structure des Tables de Données

### Table: subscribers

```sql
CREATE TABLE subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed BOOLEAN DEFAULT false,
  subscription_tier VARCHAR(50),           -- 'Passionné' | 'Expert' | null
  subscription_status VARCHAR(50),         -- 'active' | 'trialing' | 'past_due' | 'cancelled'
  subscription_end TIMESTAMP,
  stripe_customer_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255),
  cancel_at_period_end BOOLEAN DEFAULT false,
  last_invoice_amount DECIMAL(10,2),
  last_invoice_date TIMESTAMP,
  trial_end TIMESTAMP,
  payment_method VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Table: webhook_events

```sql
CREATE TABLE webhook_events (
  id SERIAL PRIMARY KEY,
  stripe_event_id VARCHAR(255) UNIQUE NOT NULL,
  event_type VARCHAR(100) NOT NULL,
  processing_status VARCHAR(50) DEFAULT 'pending',  -- 'pending' | 'success' | 'error' | 'retry'
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,
  processed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Table: purchases

```sql
CREATE TABLE purchases (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES subscribers(id),
  item_type VARCHAR(50) NOT NULL,          -- 'subscription'
  item_name VARCHAR(255),
  amount DECIMAL(10,2),
  currency VARCHAR(10) DEFAULT 'eur',
  purchase_date TIMESTAMP DEFAULT NOW(),
  status VARCHAR(50),                      -- 'completed' | 'failed' | 'pending'
  stripe_invoice_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255),
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Edge Functions

### stripe-webhook

**Chemin:** `supabase/functions/stripe-webhook/index.ts`

**Responsabilités:**
- Validation de signature Stripe
- Routage des événements vers les handlers appropriés
- Gestion de l'idempotence
- Logique de retry
- Logging

**Événements gérés:**
- `invoice.payment_succeeded`
- `invoice.payment_failed`
- `customer.subscription.deleted`
- `customer.subscription.updated`

### subscription-emails

**Chemin:** `supabase/functions/subscription-emails/index.ts`

**Responsabilités:**
- Génération des templates d'email
- Envoi via Resend API
- Tracking de livraison

**Types d'emails:**
- `payment_success` - Confirmation de paiement
- `payment_failed` - Alerte d'échec
- `subscription_cancelled` - Confirmation d'annulation

### create-checkout

**Chemin:** `supabase/functions/create-checkout/index.ts`

**Responsabilités:**
- Création de session Stripe Checkout
- Configuration des prix selon le tier choisi

### customer-portal

**Chemin:** `supabase/functions/customer-portal/index.ts`

**Responsabilités:**
- Création d'URL de portail client Stripe
- Permet à l'utilisateur de gérer son abonnement

### check-subscription

**Chemin:** `supabase/functions/check-subscription/index.ts`

**Responsabilités:**
- Synchronisation Stripe ↔ Base de données
- Vérification du statut d'abonnement

---

## Composants Frontend

### Hooks

**useSubscription** (`src/hooks/useSubscription.ts`)
- Gestion de l'état d'abonnement
- Synchronisation avec Stripe
- Real-time updates via Supabase subscriptions

### Composants Utilisateur

- `SubscriptionStatus` - Affichage du statut
- `PurchaseHistory` - Historique des achats
- `PaymentRetryAlert` - Alerte de paiement échoué

### Composants Admin

- `SubscriptionsList` - Liste des abonnés avec filtres
- `SubscriptionDetail` - Détail d'un abonné
- `SubscriptionStats` - Statistiques et analytics

---

## Sécurité

### Validation de Signature Webhook

```typescript
// Utilisation de la méthode Stripe officielle
const event = stripe.webhooks.constructEvent(
  body,
  stripeSignature,
  webhookSecret
);
```

### Idempotence

Chaque événement est tracké par son `stripe_event_id` pour éviter les doubles traitements:

```typescript
const isProcessed = await isEventProcessed(supabaseClient, event.id);
if (isProcessed) {
  return { message: "Event already processed" };
}
```

### Row Level Security (RLS)

Les utilisateurs ne peuvent voir que leurs propres données d'abonnement via les politiques RLS Supabase.

---

## Détermination du Tier

```typescript
const getSubscriptionTier = (amount: number, interval: string, intervalCount?: number): string | null => {
  if (amount === 1500 && interval === 'month' && intervalCount === 2) {
    return "Passionné";  // 15€ tous les 2 mois
  } else if (amount === 8999 && interval === 'month') {
    return "Expert";     // 89.99€ par mois
  } else if (amount === 15000 && interval === 'year') {
    return "Passionné";  // 150€ par an
  } else if (amount === 90000 && interval === 'year') {
    return "Expert";     // 900€ par an
  }
  return null;
};
```

---

## Monitoring

### Vues de Monitoring

- `subscription_metrics` - Métriques temps réel
- `webhook_event_stats` - Stats des événements par heure
- `webhook_errors_24h` - Erreurs récentes
- `webhook_pending_retries` - Retries en attente

### Script de Health Check

```bash
npm run stripe:health
```

Vérifie:
- Connectivité du webhook endpoint
- Événements récents
- Erreurs des dernières 24h
- Statistiques d'abonnement
- Retries en attente
