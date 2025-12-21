# Guide d'Utilisation - Dashboard Admin Abonnements

Ce guide explique comment utiliser le dashboard administrateur pour gérer les abonnements Club Créole.

---

## Accès au Dashboard

### Prérequis
- Compte admin (email: admin@clubcreole.com ou rôle 'admin')
- Connexion active à l'application

### Navigation
1. Se connecter à l'application
2. Accéder au **Dashboard**
3. Dans le menu latéral, cliquer sur **Gestion > Abonnements**
4. Ou utiliser la carte "Gestion des Abonnements" sur le dashboard principal

---

## Vue d'Ensemble (Overview)

### Statistiques Affichées

| Métrique | Description |
|----------|-------------|
| **Abonnés Actifs** | Nombre total d'utilisateurs avec abonnement actif |
| **Nouveaux ce mois** | Nouvelles souscriptions du mois en cours |
| **Taux de rétention** | Pourcentage d'abonnés conservés |
| **Revenus Mensuels** | MRR (Monthly Recurring Revenue) estimé |

### Cards de Statut

- **🟢 Active** - Abonnements actifs et à jour
- **🔵 Trialing** - En période d'essai
- **🟠 Past Due** - Paiement en retard
- **🔴 Cancelled** - Abonnements annulés

### Répartition par Tier

Graphique montrant la distribution entre:
- **Passionné** (15€/2 mois)
- **Expert** (89,99€/mois)

---

## Liste des Abonnés

### Filtres Disponibles

#### Par Statut
- **Tous** - Affiche tous les enregistrements
- **Actif** - Abonnements en cours
- **Inactif** - Non abonnés
- **Past Due** - Paiement en retard
- **Trialing** - Période d'essai
- **Cancelled** - Annulés

#### Par Tier
- **Tous**
- **Passionné**
- **Expert**

#### Recherche
- Recherche par email (saisie libre)

### Colonnes du Tableau

| Colonne | Description |
|---------|-------------|
| **Email** | Adresse email de l'abonné |
| **Tier** | Formule d'abonnement (Passionné/Expert) |
| **Statut** | État actuel de l'abonnement |
| **Fin d'abonnement** | Date de fin de la période actuelle |
| **Dernière facture** | Montant et date du dernier paiement |
| **Actions** | Bouton pour voir les détails |

### Pagination
- 10 abonnés par page par défaut
- Navigation via les boutons Précédent/Suivant

---

## Détail d'un Abonné

### Informations Affichées

#### Section Informations Générales
- Email
- Date de création du compte
- Dernière mise à jour

#### Section Abonnement
- **Tier actuel** - Passionné ou Expert
- **Statut** - Active, Past Due, Cancelled, etc.
- **Date de fin** - Fin de la période de facturation
- **Annulation programmée** - Si l'utilisateur a demandé l'annulation

#### Section Stripe
- **Customer ID** - Lien vers Stripe Dashboard
- **Subscription ID** - Lien vers l'abonnement dans Stripe

#### Section Facturation
- **Dernier montant** - Montant de la dernière facture
- **Date du dernier paiement**

### Actions Disponibles

#### ⏸️ Annuler à la fin de période
- L'abonnement reste actif jusqu'à la fin de la période payée
- L'utilisateur conserve l'accès aux avantages
- Pas de remboursement

**Quand utiliser:** L'utilisateur demande l'annulation mais souhaite profiter du temps restant.

#### 🔄 Réactiver l'abonnement
- Annule une demande d'annulation programmée
- L'abonnement se renouvellera automatiquement

**Quand utiliser:** L'utilisateur change d'avis après avoir demandé l'annulation.

#### ❌ Annuler immédiatement
- Annulation instantanée de l'abonnement
- L'accès aux avantages est révoqué immédiatement
- Peut nécessiter un remboursement au prorata

**Quand utiliser:**
- Fraude détectée
- Demande explicite de l'utilisateur
- Violation des conditions d'utilisation

⚠️ **Attention:** Cette action est irréversible et peut nécessiter un remboursement manuel.

### Historique des Achats

Tableau des transactions de l'abonné:
- Date d'achat
- Type (abonnement, renouvellement, etc.)
- Montant
- Statut (completed, failed)
- ID de facture Stripe (avec lien)

---

## Cas d'Usage Courants

### 1. Un utilisateur signale ne pas avoir reçu son abonnement

1. Rechercher l'utilisateur par email
2. Vérifier le statut d'abonnement
3. Consulter l'historique des achats
4. Si paiement réussi mais non actif → Contacter le support technique
5. Si aucun paiement → Vérifier avec l'utilisateur

### 2. Un utilisateur demande l'annulation

1. Rechercher l'utilisateur
2. Cliquer sur "Voir les détails"
3. Utiliser "Annuler à la fin de période"
4. Confirmer l'action
5. Informer l'utilisateur de la date de fin d'accès

### 3. Un utilisateur a un paiement en échec

1. Filtrer par statut "Past Due"
2. Identifier l'utilisateur
3. Consulter l'historique pour voir le nombre de tentatives
4. Contacter l'utilisateur pour mettre à jour sa carte
5. Ou diriger vers le portail client

### 4. Vérifier les revenus du mois

1. Aller dans l'onglet "Vue d'ensemble"
2. Consulter la carte "Revenus Mensuels"
3. Pour plus de détails, utiliser Stripe Dashboard

### 5. Identifier les abonnés à risque

1. Filtrer par statut "Past Due"
2. Lister les utilisateurs avec paiement en retard
3. Envoyer un rappel ou contacter directement
4. Suivre dans Stripe Dashboard les retries automatiques

---

## Bonnes Pratiques

### À Faire ✅
- Vérifier régulièrement les abonnés "Past Due"
- Répondre rapidement aux demandes d'annulation
- Documenter les actions manuelles effectuées
- Utiliser les liens vers Stripe Dashboard pour les actions complexes

### À Éviter ❌
- Annuler immédiatement sans confirmation
- Ignorer les alertes de paiement échoué
- Modifier manuellement la base de données sans passer par l'interface
- Promettre des fonctionnalités non disponibles

---

## Raccourcis

| Action | Chemin |
|--------|--------|
| Liste des abonnés | Dashboard > Gestion > Abonnements > Abonnés |
| Vue d'ensemble | Dashboard > Gestion > Abonnements > Vue d'ensemble |
| Stripe Dashboard | [dashboard.stripe.com](https://dashboard.stripe.com) |
| Logs Supabase | Supabase Dashboard > Edge Functions > Logs |

---

## Support

En cas de problème technique:
1. Consulter le [Guide de Dépannage](./subscription-troubleshooting.md)
2. Vérifier les logs des Edge Functions
3. Contacter l'équipe technique

Pour les questions métier:
- Politique de remboursement → Direction
- Cas particuliers → Responsable service client
