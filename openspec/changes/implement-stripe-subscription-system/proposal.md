## Why
Le système actuel de paiement par abonnement avec Stripe est partiellement implémenté. Il manque des composants critiques : webhooks pour la synchronisation des paiements, gestion des échecs de paiement, tableau de bord d'administration des abonnements, et une gestion complète du cycle de vie des abonnements.

## What Changes
- **Webhook Stripe**: Implémentation d'un endpoint pour traiter les événements Stripe (invoice.payment_succeeded, invoice.payment_failed, customer.subscription.deleted)
- **Synchronisation automatique**: Mise à jour en temps réel du statut d'abonnement dans la base de données via webhooks
- **Gestion des échecs de paiement**: Notifications et gestion des tentatives de paiement échouées
- **Tableau de bord admin**: Interface d'administration pour surveiller et gérer les abonnements
- **Historique complet**: Amélioration de l'historique d'achats avec les transactions Stripe
- **Portail client amélioré**: Intégration complète du customer portal Stripe pour la gestion d'abonnement
- **Notifications email**: Alertes pour les renouvellements, échecs et annulations

## Impact
- **Affected specs**: payment-processing (nouvelle capability)
- **Affected code**:
  - `supabase/functions/` (nouvelles edge functions)
  - `src/components/subscription/` (amélioration des composants existants)
  - `src/hooks/useSubscription.ts` (extension des fonctionnalités)
  - `src/pages/dashboard/admin/` (nouveau tableau de bord)
  - Base de données `subscribers`, `purchases` (amélioration)
- **External services**: Stripe (configuration webhooks), service email (notifications)