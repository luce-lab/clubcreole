# Guide d'Importation des Données Club Créole

## 📁 Structure des Fichiers

Le dossier `sql_import/` contient **42 fichiers SQL** découpés par table :

### Tables Supabase (système)
- `schema_migrations.sql` - Migrations du schéma
- `extensions.sql` - Extensions PostgreSQL
- `tenants.sql` - Configuration multi-tenant

### Tables Auth (authentification)
- `users.sql` - Utilisateurs Supabase Auth
- `identities.sql` - Identités des utilisateurs
- `sessions.sql` - Sessions actives
- `refresh_tokens.sql` - Tokens de rafraîchissement
- `audit_log_entries.sql` - Journal d'audit
- `mfa_amr_claims.sql` - MFA (Multi-Factor Authentication)
- `flow_state.sql` - États de flux d'authentification
- `one_time_tokens.sql` - Tokens à usage unique

### Tables Applications (public)
- `accommodations.sql` - Hébergements (15 enregistrements)
- `activities.sql` - Activités (11 enregistrements)
- `activity_images.sql` - Images d'activités
- `activity_inclusions.sql` - Inclusions d'activités
- `activity_levels.sql` - Niveaux d'activités
- `activity_time_slots.sql` - Créneaux horaires
- `restaurants.sql` - Restaurants (43 enregistrements)
- `car_models.sql` - Modèles de véhicules (12 enregistrements)
- `car_rental_companies.sql` - Sociétés de location
- `car_rental_features.sql` - Options des véhicules
- `car_client_reviews.sql` - Avis clients de location
- `partners.sql` - Partenaires
- `bons_plans.sql` - Bons plans
- `concerts.sql` - Concerts
- `nightlife_events.sql` - Événements nocturnes
- `loisirs.sql` - Loisirs
- `voyance_mediums.sql` - Médiums de voyance
- `voyance_reviews.sql` - Avis voyance
- `newsletter_subscriptions.sql` - Inscriptions newsletter
- `subscription_plans.sql` - Plans d'abonnement
- `user_subscriptions.sql` - Abonnements utilisateurs
- `travel_offers.sql` - Offres de voyage
- `promotions.sql` - Promotions
- `offers.sql` - Offres
- `categories.sql` - Catégories
- `loyalty_cards.sql` - Cartes de fidélité
- `leisure_activities.sql` - Activités de loisirs
- `migrations.sql` - Migrations
- `profiles.sql` - Profils utilisateurs

---

## 🚀 Méthodes d'Importation

### Méthode 1: Importation Automatisée (Recommandée)

Le script `import_all.sh` importe tous les fichiers dans l'ordre.

```bash
# Rendre le script exécutable
chmod +x sql_import/import_all.sh

# Configurer les variables d'environnement
export DB_HOST="votre-host-supabase"
export DB_PORT="5432"
export DB_NAME="postgres"
export DB_USER="postgres"

# Exécuter l'import
./sql_import/import_all.sh
```

### Méthode 2: Importation Directe avec psql

**Importation vers Supabase Cloud :**

```bash
# Variables
SUPABASE_URL="psryoyugyimibjhwhvlh.supabase.co"
DB_USER="postgres"
DB_PASSWORD="votre_password"
DB_NAME="postgres"

# Importer un fichier spécifique
psql -h $SUPABASE_URL -U $DB_USER -d $DB_NAME \
     -f sql_import/accommodations.sql
```

**Importation vers base locale :**

```bash
psql -h localhost -U postgres -d clubcreole_db \
     -f sql_import/restaurants.sql
```

### Méthode 3: Importation via Table Editor (Supabase Dashboard)

1. Aller dans le Supabase Dashboard
2. Choisir **Table Editor**
3. Sélectionner une table
4. Cliquer sur **Insert** → **Insert via SQL**
5. Copier/coller le contenu du fichier SQL correspondant

---

## 📋 Ordre d'Importation Recommandé

Pour respecter les contraintes de clés étrangères :

```bash
# 1. Tables système (facultatif pour Supabase Cloud)
psql -h HOST -U USER -d DB -f sql_import/extensions.sql
psql -h HOST -U USER -d DB -f sql_import/schema_migrations.sql

# 2. Tables de référence (sans dépendances)
psql -h HOST -U USER -d DB -f sql_import/categories.sql
psql -h HOST -U USER -d DB -f sql_import/subscription_plans.sql
psql -h HOST -U USER -d DB -f sql_import/car_rental_companies.sql
psql -h HOST -U USER -d DB -f sql_import/car_models.sql

# 3. Données principales
psql -h HOST -U USER -d DB -f sql_import/accommodations.sql
psql -h HOST -U USER -d DB -f sql_import/activities.sql
psql -h HOST -U USER -d DB -f sql_import/restaurants.sql
psql -h HOST -U USER -d DB -f sql_import/partners.sql

# 4. Tables avec dépendances
psql -h HOST -U USER -d DB -f sql_import/activity_images.sql
psql -h HOST -U USER -d DB -f sql_import/activity_inclusions.sql
psql -h HOST -U USER -d DB -f sql_import/car_rental_features.sql

# 5. Tables utilisateurs (auth)
psql -h HOST -U USER -d DB -f sql_import/users.sql
psql -h HOST -U USER -d DB -f sql_import/profiles.sql
psql -h HOST -U USER -d DB -f sql_import/user_subscriptions.sql
psql -h HOST -U USER -d DB -f sql_import/newsletter_subscriptions.sql
```

---

## 🔧 Connection String pour psql

**Format connexion Supabase :**
```
postgresql://postgres.project_ref:PASSWORD@db.project_ref.supabase.co:5432/postgres
```

**Exemple concret :**
```bash
export DATABASE_URL="postgresql://postgres.psryoyugyimibjhwhvlh:PASSWORD@db.psryoyugyimibjhwhvlh.supabase.co:5432/postgres"
psql $DATABASE_URL -f sql_import/accommodations.sql
```

---

## ⚠️ Notes Importantes

1. **Contraintes de clés étrangères** : L'ordre d'importation est important
2. **Données existantes** : Les INSERT peuvent échouer si des enregistrements avec le même ID existent déjà
3. **Tables Auth** : Sur Supabase Cloud, certaines tables `auth.*` sont gérées automatiquement
4. **RLS Policies** : Assurez-vous que les politiques RLS permettent l'insertion

---

## 🛠️ Dépannage

### Erreur "relation does not exist"
```bash
# Vérifier que la table existe
psql -h HOST -U USER -d DB -c "\dt public.*"
```

### Erreur "duplicate key value"
```bash
# Modifier le fichier SQL pour utiliser ON CONFLICT
# Ou supprimer les données existantes d'abord
psql -h HOST -U USER -d DB -c "TRUNCATE TABLE public.accommodations CASCADE;"
```

### Tester l'importation
```bash
# Importer un seul fichier pour tester
psql -h HOST -U USER -d DB -f sql_import/categories.sql

# Vérifier les données
psql -h HOST -U USER -d DB -c "SELECT * FROM public.categories;"
```

---

## 📊 Statistiques

- **Total fichiers** : 42
- **Taille totale** : ~450 Ko
- **Tables principales** : accommodations, activities, restaurants
- **Tables utilisateurs** : users, profiles, subscriptions

---

## 🎯 Prochaines Étapes

1. **Vérifier l'importation**
   ```bash
   psql -h HOST -U USER -d DB -c "SELECT COUNT(*) FROM public.accommodations;"
   ```

2. **Valider les données**
   ```bash
   psql -h HOST -U USER -d DB -c "SELECT * FROM public.partners;"
   ```

3. **Tester l'application**
   - Vérifier que les données s'affichent correctement
   - Tester les fonctionnalités de recherche

---

**Créé le :** 2025-12-25
**Source :** backup_insert.sql
**Script :** split_backup_insert.py
