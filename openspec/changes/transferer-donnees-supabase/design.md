# Design : Migration Supabase Cloud vers Auto-hébergé

## Context

Le projet ClubCreole utilise actuellement Supabase cloud comme backend (PostgreSQL + Auth + Edge Functions). La migration consiste à transférer vers une instance Supabase auto-hébergée :

- **Données applicatives** : 34+ tables incluant accommodations, restaurants, car_rentals, etc.
- **Données utilisateurs** : Profils et abonnements (Auth conservé)
- **Données métier** : Réservations, partenaires, activités de loisirs
- **Schéma PostgreSQL** : Structure, contraintes, index, RLS policies
- **Pas de migration** : Supabase Auth, Edge Functions, Storage (selon spécifications)

**Contraintes** :
- Minimiser le temps d'arrêt de l'application
- Préserver l'intégrité référentielle et fonctionnalités Supabase
- Maintenir la compatibilité totale avec l'application React existante
- Conserver les politiques RLS et API auto-générée

## Goals / Non-Goals

**Goals** :
- Migration PostgreSQL native entre instances Supabase
- Conservation de toutes les fonctionnalités Supabase (RLS, API, triggers)
- Validation automatisée de la migration
- Stratégie de rollback sécurisée
- Temps d'arrêt minimal (changement d'URL uniquement)

**Non-Goals** :
- Migration de l'authentification Supabase Auth (conservé tel quel)
- Migration des Edge Functions (conservées sur cloud)
- Migration du Storage Supabase (conservé sur cloud)
- Modification de la structure de données existante
- Transformation des données (compatibilité PostgreSQL native)

## Decisions

### Architecture de Migration
**Decision** : Utiliser pg_dump/pg_restore PostgreSQL natif avec validation Supabase
**Rationale** : 
- Compatibilité PostgreSQL native entre instances Supabase
- Préservation des types, contraintes et fonctionnalités Supabase
- Performance optimale pour migration complète
- Simplicité et fiabilité éprouvée

**Alternatives considérées** :
- Migration via API Supabase : Plus lent, risque de timeouts
- ETL personnalisé : Complexité inutile pour même type de base

### Méthode d'extraction
**Decision** : pg_dump direct sur la base PostgreSQL sous-jacente
**Rationale** :
- Extraction native PostgreSQL la plus rapide
- Préservation complète des métadonnées (RLS, triggers, functions)
- Compatibilité garantie avec instance Supabase cible

### Stratégie de chargement
**Decision** : pg_restore avec validation des fonctionnalités Supabase
**Rationale** :
- Restauration PostgreSQL native optimale
- Validation post-restore de l'API Supabase auto-générée
- Tests des politiques RLS et authentification

### Stratégie de validation
**Decision** : Validation par checksum MD5 et comptage d'enregistrements
**Rationale** :
- Détection rapide des corruptions
- Vérification de complétude
- Indépendant du type de base cible

## Risks / Trade-offs

**Risque** : Corruption de données durant l'export → **Mitigation** : Checksums et exports transactionnels
**Risque** : Temps d'arrêt prolongé → **Mitigation** : Test complet sur environnement de staging
**Risque** : Perte de données critiques → **Mitigation** : Sauvegarde complète avant migration + tests de rollback
**Risque** : Incompatibilité de types de données → **Mitigation** : Mapping détaillé et transformation automatisée

**Trade-off** : Sécurité vs Performance
- **Choix** : Privilégier la sécurité avec transactions et validations
- **Impact** : Migration plus lente mais plus fiable

## Migration Plan

### Phase 1 : Préparation (1 jour)
1. Configuration de l'instance Supabase auto-hébergée
2. Test de connectivité PostgreSQL directe
3. Analyse du schéma actuel (migrations Supabase)
4. Test de pg_dump/pg_restore sur environnement de développement

### Phase 2 : Test complet (2-4 heures)
1. Migration complète sur environnement de staging
2. Validation de l'API Supabase auto-générée
3. Tests des politiques RLS et authentification
4. Test de rollback

### Phase 3 : Migration production (1-2 heures)
1. Notification utilisateurs (maintenance programmée courte)
2. Sauvegarde de sécurité de l'instance cible
3. pg_dump de l'instance Supabase cloud
4. pg_restore vers l'instance auto-hébergée
5. Validation de l'intégrité et de l'API
6. Changement de configuration (SUPABASE_URL)
7. Tests fonctionnels et remise en service

### Phase 4 : Monitoring post-migration (quelques jours)
1. Surveillance des performances de la nouvelle instance
2. Monitoring des erreurs applicatives
3. Validation continue de l'intégrité des données

## Configuration Confirmée

✅ **Base cible** : Supabase auto-hébergé (PostgreSQL + stack Supabase)  
✅ **Stratégie** : Migration complète (Big Bang)  
✅ **Authentification** : Conservation de Supabase Auth (pas de migration)  
✅ **Compatibilité** : PostgreSQL native, aucune transformation requise  

## Open Questions

1. **Infrastructure auto-hébergée** : Docker Compose, Kubernetes, ou installation directe ?
2. **Ressources serveur** : Spécifications CPU/RAM/Storage pour l'instance cible ?
3. **Réseau** : Configuration VPN ou accès direct pour la migration ?
4. **Fenêtre de maintenance** : Quel créneau optimal pour minimiser l'impact utilisateur ?
5. **Backup stratégie** : Fréquence et rétention des sauvegardes sur l'instance auto-hébergée ?

## Technical Implementation Details

### Migration PostgreSQL native
- Utilisation de `pg_dump` avec options `--no-owner --no-privileges`
- Conservation des extensions PostgreSQL nécessaires à Supabase
- Préservation des politiques RLS et triggers

### Scripts proposés
- `migrate-supabase.sh` : Script bash de migration complète pg_dump/pg_restore
- `validate-supabase-migration.ts` : Validation API et données post-migration
- `rollback-supabase.sh` : Restauration d'urgence vers cloud
- `update-config.ts` : Mise à jour automatique des URLs dans le code
- `test-env-migration.ts` : Test et validation de la configuration d'environnement

### Environment Variables Configuration

#### Auto-Detection depuis .env existant
Les scripts détectent automatiquement la configuration depuis le fichier `.env` existant :

**Configuration Source (Cloud actuel)** :
```bash
VITE_SUPABASE_URL="https://psryoyugyimibjhwhvlh.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="eyJhbGciOiJIUzI1NiIs..."
```

**Configuration Cible (Auto-hébergé)** :
```bash
SERVICE_SUPABASE_ANON_KEY="eyJ0eXAiOiJKV1QiLCJh..."         # Clé anonyme cible
SERVICE_SUPABASESERVICE_KEY="eyJ0eXAiOiJKV1QiLCJh..."       # Clé service cible
# URL cible auto-détectée : https://services-supabase.clubcreole.fr
```

**Variables PostgreSQL (configuration manuelle requise)** :
```bash
SUPABASE_SOURCE_PASSWORD="your_source_pg_password"     # Mot de passe PostgreSQL source
SUPABASE_TARGET_PASSWORD="your_target_pg_password"     # Mot de passe PostgreSQL cible
```

#### Logique d'Auto-Détection
- **URL Cible** : Automatiquement définie à `https://services-supabase.clubcreole.fr` si `SERVICE_SUPABASE_ANON_KEY` est présente
- **Clés Cible** : Utilise `SERVICE_SUPABASE_ANON_KEY` et `SERVICE_SUPABASESERVICE_KEY` du `.env` existant
- **Config Source** : Utilise `VITE_SUPABASE_URL` et `VITE_SUPABASE_PUBLISHABLE_KEY` existants
- **Validation** : Les scripts vérifient que les URLs correspondent aux alternatives commentées dans `src/integrations/supabase/client.ts`

#### Test de Configuration
Le script `test-env-migration.ts` valide automatiquement :
- ✅ Détection des variables d'environnement
- ✅ Auto-détection de l'URL cible
- ✅ Validation de la correspondance avec les URLs commentées
- ✅ Génération du rapport de configuration
- ✅ Recommandations de commandes de migration