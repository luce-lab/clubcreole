## ADDED Requirements

### Requirement: Supabase Cloud Data Extraction
Le système SHALL permettre l'extraction complète et fiable de toutes les données depuis l'instance Supabase cloud source.

#### Scenario: Extraction complète des tables
- **WHEN** l'outil d'extraction est exécuté
- **THEN** toutes les données des tables principales sont extraites au format SQL ou JSON
- **AND** l'intégrité référentielle est préservée dans l'export

#### Scenario: Gestion des volumes importants
- **WHEN** une table contient plus de 100k enregistrements
- **THEN** l'extraction utilise la pagination pour éviter les timeouts
- **AND** un fichier de progression est maintenu pour reprendre en cas d'interruption

### Requirement: PostgreSQL Native Transfer
Le système SHALL transférer les données en utilisant la compatibilité native PostgreSQL entre instances Supabase.

#### Scenario: Dump SQL natif
- **WHEN** l'extraction est effectuée
- **THEN** un dump PostgreSQL standard (pg_dump) est généré
- **AND** le format est directement compatible avec la cible Supabase

#### Scenario: Conservation des types natifs
- **WHEN** les données sont transférées
- **THEN** tous les types PostgreSQL sont préservés sans transformation
- **AND** les contraintes et index sont maintenus nativement

### Requirement: Secure Data Loading
Le système SHALL charger les données PostgreSQL dans l'instance Supabase cible de manière sécurisée et vérifiable.

#### Scenario: Chargement transactionnel
- **WHEN** les données sont chargées dans la base cible
- **THEN** le processus utilise des transactions pour assurer la cohérence
- **AND** en cas d'erreur, un rollback automatique est effectué

#### Scenario: Validation post-chargement
- **WHEN** le chargement est terminé
- **THEN** le nombre d'enregistrements source et cible est comparé
- **AND** l'intégrité des données critiques est vérifiée par checksum

### Requirement: Supabase Schema Migration
Le système SHALL migrer la structure PostgreSQL (schémas, index, contraintes) vers l'instance Supabase auto-hébergée.

#### Scenario: Migration PostgreSQL native
- **WHEN** la migration de schéma est exécutée
- **THEN** toutes les tables PostgreSQL sont créées dans l'instance Supabase cible
- **AND** les contraintes, types et extensions PostgreSQL sont préservés

#### Scenario: Conservation des fonctionnalités Supabase
- **WHEN** les index et triggers sont migrés
- **THEN** les fonctionnalités Supabase (RLS, triggers) sont maintenues
- **AND** l'API auto-générée reste fonctionnelle

### Requirement: Migration Validation
Le système SHALL valider la complétude et l'intégrité de la migration.

#### Scenario: Validation des comptes d'enregistrements
- **WHEN** la validation est lancée
- **THEN** le nombre total d'enregistrements de chaque table source et cible est comparé
- **AND** tout écart est rapporté avec les détails des différences

#### Scenario: Test de continuité fonctionnelle
- **WHEN** les tests de validation sont exécutés
- **THEN** les fonctionnalités critiques de l'application sont testées sur la nouvelle base
- **AND** les performances de lecture/écriture sont mesurées et comparées

### Requirement: Rollback Capability
Le système SHALL permettre un retour en arrière sécurisé en cas de problème durant la migration.

#### Scenario: Sauvegarde avant migration
- **WHEN** la migration commence
- **THEN** une sauvegarde complète de la base cible est créée
- **AND** un point de restauration est établi

#### Scenario: Restauration d'urgence
- **WHEN** une erreur critique survient durant la migration
- **THEN** la restauration vers l'état précédent peut être effectuée en moins de 30 minutes
- **AND** les utilisateurs sont notifiés du statut de la migration