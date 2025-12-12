# Database Migration

## ADDED Requirements

### Requirement: Dump et Import de base de données Supabase

The system MUST allow creating a complete dump of the Supabase cloud database and importing it into a blank Supabase self-hosted instance. The process MUST preserve data integrity and schema structure.

#### Scenario: Création d'un dump complet de la base source

**Given** une instance Supabase cloud avec des données existantes
**And** les credentials PostgreSQL valides (host, port, user, password)
**When** l'utilisateur exécute la commande pg_dump avec les options appropriées
**Then** un fichier SQL contenant le schéma et les données est créé
**And** le fichier inclut les tables du schéma `public`
**And** le fichier inclut les extensions nécessaires

#### Scenario: Import du dump vers une instance vierge

**Given** un fichier dump SQL valide
**And** une instance Supabase self-hosted accessible
**And** les credentials PostgreSQL de l'instance cible
**When** l'utilisateur exécute psql avec le fichier dump en entrée
**Then** toutes les tables sont créées sur l'instance cible
**And** toutes les données sont importées
**And** les contraintes et index sont préservés

#### Scenario: Validation de l'intégrité post-migration

**Given** une migration terminée sans erreur
**When** l'utilisateur compare les deux bases de données
**Then** le nombre de tables est identique
**And** le nombre d'enregistrements par table critique est identique
**And** l'API Supabase de l'instance cible répond correctement
