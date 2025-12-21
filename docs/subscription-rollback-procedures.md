# Procédures de Rollback - Système d'Abonnement

Ce document décrit les procédures d'urgence pour restaurer le système d'abonnement en cas de problème critique.

---

## Niveaux de Sévérité

| Niveau | Description | Temps de réponse |
|--------|-------------|------------------|
| **P1 - Critique** | Système complètement hors service, paiements impossibles | < 15 min |
| **P2 - Majeur** | Fonctionnalité importante dégradée, webhooks non traités | < 1 heure |
| **P3 - Mineur** | Problème isolé, emails non envoyés | < 4 heures |
| **P4 - Faible** | Anomalie cosmétique, logs manquants | < 24 heures |

---

## P1 - Rollback Critique

### Scénario: Système d'abonnement complètement hors service

#### Étape 1: Désactiver les Webhooks (< 5 min)

**Via Stripe Dashboard:**
1. Aller sur [dashboard.stripe.com/webhooks](https://dashboard.stripe.com/webhooks)
2. Cliquer sur votre endpoint
3. Cliquer sur "..." > "Disable"

**Ou via CLI:**
```bash
# Lister les webhooks
stripe webhook_endpoints list

# Désactiver (remplacer we_xxx par l'ID)
stripe webhook_endpoints update we_xxx --disabled
```

⚠️ **Impact:** Les événements Stripe ne seront plus traités automatiquement. Les paiements continueront mais la base de données ne sera pas mise à jour.

#### Étape 2: Rollback des Edge Functions (< 10 min)

```bash
# Identifier le dernier déploiement fonctionnel
git log --oneline supabase/functions/stripe-webhook/index.ts

# Checkout de la version précédente
git checkout <commit-hash> -- supabase/functions/stripe-webhook/index.ts

# Redéployer
supabase functions deploy stripe-webhook
```

#### Étape 3: Vérification

```bash
# Tester l'endpoint
curl -X OPTIONS https://[projet].supabase.co/functions/v1/stripe-webhook

# Réactiver le webhook dans Stripe
stripe webhook_endpoints update we_xxx --enabled

# Surveiller les logs
supabase functions logs stripe-webhook --tail
```

#### Étape 4: Retraitement des événements manqués

```bash
# Dans Stripe Dashboard > Webhooks > Recent events
# Sélectionner les événements échoués
# Cliquer sur "Resend"
```

---

## P2 - Rollback Majeur

### Scénario: Webhooks traités mais données incorrectes

#### Étape 1: Identifier le problème

```sql
-- Trouver les événements récents avec erreur
SELECT * FROM webhook_events
WHERE processing_status = 'error'
ORDER BY created_at DESC
LIMIT 20;

-- Identifier les abonnés affectés
SELECT s.*, we.stripe_event_id, we.error_message
FROM subscribers s
JOIN webhook_events we ON we.stripe_event_id LIKE '%' || s.stripe_customer_id || '%'
WHERE we.processing_status = 'error'
AND we.created_at > NOW() - INTERVAL '24 hours';
```

#### Étape 2: Corriger les données

```sql
-- Sauvegarde avant correction
CREATE TABLE subscribers_backup_YYYYMMDD AS
SELECT * FROM subscribers;

-- Correction manuelle (exemple)
UPDATE subscribers SET
  subscribed = true,
  subscription_status = 'active',
  updated_at = NOW()
WHERE stripe_subscription_id = 'sub_xxx';
```

#### Étape 3: Retraiter les événements

```sql
-- Marquer les événements pour retraitement
UPDATE webhook_events
SET processing_status = 'pending', retry_count = 0
WHERE processing_status = 'error'
AND created_at > NOW() - INTERVAL '24 hours';
```

---

## P3 - Rollback Email

### Scénario: Emails non envoyés

#### Étape 1: Diagnostic

```bash
# Vérifier les logs
supabase functions logs subscription-emails --limit 50

# Vérifier la clé Resend
supabase secrets list | grep RESEND
```

#### Étape 2: Correction

```bash
# Si clé invalide
supabase secrets set RESEND_API_KEY=re_nouvelle_cle

# Redéployer
supabase functions deploy subscription-emails
```

#### Étape 3: Envoi manuel des emails manqués

```bash
# Script d'envoi manuel
curl -X POST https://[projet].supabase.co/functions/v1/subscription-emails \
  -H "Content-Type: application/json" \
  -d '{
    "type": "payment_success",
    "recipientEmail": "utilisateur@example.com",
    "recipientName": "Utilisateur",
    "subscriptionTier": "Passionné",
    "amount": 15,
    "currency": "EUR"
  }'
```

---

## Restauration de Base de Données

### Sauvegarde Automatique

Supabase effectue des sauvegardes automatiques. Pour restaurer:

1. Aller dans Supabase Dashboard > Project Settings > Backups
2. Sélectionner le point de restauration
3. Cliquer sur "Restore"

⚠️ **Attention:** Cette action restaure TOUTE la base de données.

### Restauration Partielle

```sql
-- Restaurer uniquement la table subscribers depuis une sauvegarde
-- (Nécessite d'avoir fait une sauvegarde manuelle)

-- 1. Créer une table temporaire depuis la sauvegarde
CREATE TABLE subscribers_restore AS
SELECT * FROM subscribers_backup_YYYYMMDD;

-- 2. Identifier les différences
SELECT b.*, s.subscribed as current_subscribed
FROM subscribers_restore b
LEFT JOIN subscribers s ON s.id = b.id
WHERE b.subscribed != s.subscribed
OR b.subscription_tier != s.subscription_tier;

-- 3. Appliquer les corrections sélectivement
UPDATE subscribers s SET
  subscribed = b.subscribed,
  subscription_tier = b.subscription_tier,
  subscription_status = b.subscription_status
FROM subscribers_restore b
WHERE s.id = b.id
AND s.id IN (1, 2, 3); -- IDs spécifiques à restaurer
```

---

## Rollback de Déploiement Frontend

### Scénario: Bug dans l'interface utilisateur

#### Via Coolify (si déployé)

1. Aller dans Coolify Dashboard
2. Sélectionner le projet
3. Cliquer sur "Deployments"
4. Trouver le dernier déploiement fonctionnel
5. Cliquer sur "Rollback"

#### Via Git

```bash
# Identifier le commit fonctionnel
git log --oneline

# Créer un revert
git revert HEAD

# Ou checkout et force push (dangereux)
git checkout <commit-hash>
git checkout -b hotfix/rollback
git push origin hotfix/rollback

# Redéployer depuis cette branche
```

---

## Procédure de Communication

### En cas de P1 ou P2

1. **Notification immédiate** à l'équipe technique
2. **Message de maintenance** sur le site si nécessaire
3. **Suivi** dans un canal dédié (Slack, Discord, etc.)

### Template de message utilisateurs

```
🔧 Maintenance en cours

Nous rencontrons actuellement un problème technique
avec notre système d'abonnement.

Vos paiements et abonnements sont sécurisés.
Notre équipe travaille à résoudre ce problème.

Nous vous tiendrons informés de l'avancement.

Merci de votre patience.
L'équipe Club Créole
```

---

## Checklist Post-Rollback

### Immédiat
- [ ] Système opérationnel
- [ ] Webhooks fonctionnels
- [ ] Emails envoyés
- [ ] Aucune erreur dans les logs

### Dans l'heure
- [ ] Événements manqués retraités
- [ ] Données utilisateurs vérifiées
- [ ] Tests manuels effectués

### Dans les 24h
- [ ] Rapport d'incident rédigé
- [ ] Cause racine identifiée
- [ ] Plan de prévention établi
- [ ] Utilisateurs affectés contactés si nécessaire

---

## Contacts d'Urgence

| Rôle | Contact |
|------|---------|
| Lead Tech | [contact] |
| Support Stripe | support@stripe.com |
| Support Supabase | support@supabase.io |
| Support Resend | support@resend.com |

---

## Historique des Incidents

| Date | Sévérité | Description | Résolution | Durée |
|------|----------|-------------|------------|-------|
| - | - | - | - | - |

*Documenter chaque incident pour améliorer les procédures*
