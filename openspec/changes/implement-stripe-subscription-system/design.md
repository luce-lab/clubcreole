## Context
Le système actuel dispose déjà de :
- Edge functions pour créer des sessions de checkout
- Hook React pour gérer les abonnements côté client
- Table `subscribers` pour stocker les informations d'abonnement
- Interface Pricing avec plans Gratuit/Passionné/Expert

Cependant, il manque la synchronisation côté serveur via webhooks, la gestion des erreurs, et l'administration complète.

## Goals / Non-Goals
**Goals:**
- Synchronisation automatique et fiable des statuts d'abonnement
- Gestion complète du cycle de vie des abonnements
- Interface d'administration pour le support client
- Notifications automatiques pour les utilisateurs
- Historique complet des transactions

**Non-Goals:**
- Remplacer l'interface Stripe Checkout existante (on l'améliore)
- Gérer les paiements one-time hors abonnement
- Implémenter un système de facturation personnalisé

## Decisions
- **Webhook Stripe**: Utilisation des webhooks Stripe pour une synchronisation fiable plutôt que du polling côté client
- **Supabase Edge Functions**: Continuer avec Supabase Functions pour la logique backend (cohérence architecturale)
- **Customer Portal Stripe**: Utilisation du portail client natif de Stripe pour la gestion d'abonnement (vs réimplémentation)
- **Email notifications**: Intégration via Supabase Auth ou service externe pour les notifications transactionnelles

**Alternatives considered:**
- Polling côté client (rejeté: moins fiable, plus complexe)
- Backend Node.js dédié (rejeté: ajoute de la complexité opérationnelle)
- Portail client custom (rejeté: maintenance coûteuse, Stripe le fait déjà bien)

## Risks / Trade-offs
- **Sécurité webhook**: Nécessité de valider les signatures Stripe pour éviter les attaques
- **Idempotence**: Les webhooks peuvent être appelés plusieurs fois, besoin de gérer la duplication
- **Performance**: Volume potentiellement élevé d'appels webhook lors d'opérations de masse
- **Migration**: Données existantes dans `subscribers` à synchroniser avec Stripe

## Migration Plan
1. **Phase 1**: Créer l'endpoint webhook avec validation et logging
2. **Phase 2**: Implémenter la synchronisation pour les événements critiques
3. **Phase 3**: Ajouter les notifications et la gestion d'erreurs
4. **Phase 4**: Créer le tableau de bord admin
5. **Phase 5**: Tester en production avec monitoring étroit

**Rollback**: Désactiver les webhooks via la dashboard Stripe, le système continue de fonctionner avec la synchronisation manuelle existante.

## Open Questions
- Service email à utiliser pour les notifications (Supabase Auth, SendGrid, autre) ?
- Fréquence des notifications pour les échecs de paiement ?
- Niveau de détail requis dans le tableau de bord admin ?