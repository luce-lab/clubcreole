# Guide pour créer un dump de la base de données ClubCreole

## Vue d'ensemble

Votre application utilise **PostgreSQL** via **Supabase** :
- **Project ID** : `psryoyugyimibjhwhvlh`
- **URL** : `https://psryoyugyimibjhwhvlh.supabase.co`

Il existe plusieurs méthodes pour créer un dump complet de votre base de données.

---

## Méthode 1 : Dump via le Dashboard Supabase (Le plus simple) ⭐

### Étapes :

1. **Connectez-vous à votre Dashboard Supabase**
   ```
   https://supabase.com/dashboard/project/psryoyugyimibjhwhvlh
   ```

2. **Accédez aux paramètres de la base de données**
   - Allez dans `Settings` → `Database`
   - Faites défiler jusqu'à "Connection string"
   - Cliquez sur "Connection pooling" ou "Direct connection"

3. **Obtenez la chaîne de connexion PostgreSQL**
   - Format : `postgresql://postgres:[PASSWORD]@db.psryoyugyimibjhwhvlh.supabase.co:5432/postgres`

4. **Utilisez pg_dump sur votre machine locale**
   ```bash
   # Structure + Données (dump complet)
   pg_dump "postgresql://postgres:[PASSWORD]@db.psryoyugyimibjhwhvlh.supabase.co:5432/postgres" > clubcreole_full_dump.sql

   # Structure uniquement
   pg_dump --schema-only "postgresql://postgres:[PASSWORD]@db.psryoyugyimibjhwhvlh.supabase.co:5432/postgres" > clubcreole_schema.sql

   # Données uniquement
   pg_dump --data-only "postgresql://postgres:[PASSWORD]@db.psryoyugyimibjhwhvlh.supabase.co:5432/postgres" > clubcreole_data.sql
   ```

---

## Méthode 2 : Utiliser les scripts fournis (Pour développement)

### 2.1 Dump du schéma (Structure de la base)

Ce script combine toutes vos migrations SQL en un seul fichier :

```bash
cd /home/user/clubcreole
./scripts/create-schema-dump.sh
```

**Sortie** : `database-schema-dump.sql`

### 2.2 Dump des données

Ce script exporte toutes les données des tables principales :

```bash
cd /home/user/clubcreole
npm run insert-data  # ou vite-node scripts/export-data.ts
```

**Sortie** : `database-data-dump.sql`

**Note** : Ce script exporte les tables suivantes :
- profiles
- accommodations, accommodation_rooms, accommodation_bookings
- restaurants, restaurant_reservations
- car_rentals, car_rental_bookings
- leisure_activities, activities, activity_bookings
- travel_packages, travel_reservations
- subscriptions
- partners, partner_accommodations

---

## Méthode 3 : Utiliser le CLI Supabase

### Installation du CLI (si pas déjà installé globalement)

```bash
npm install -g supabase
# ou
brew install supabase/tap/supabase  # sur macOS
```

### Créer un dump

```bash
# Se connecter à votre projet
supabase login

# Lier votre projet local
supabase link --project-ref psryoyugyimibjhwhvlh

# Créer un dump
supabase db dump --local > clubcreole_dump.sql

# Ou depuis le projet distant
supabase db dump --db-url "postgresql://postgres:[PASSWORD]@db.psryoyugyimibjhwhvlh.supabase.co:5432/postgres" > clubcreole_dump.sql
```

---

## Méthode 4 : Via l'API Supabase Management

Vous pouvez utiliser l'API de gestion Supabase pour créer un backup :

```bash
curl -X POST "https://api.supabase.com/v1/projects/psryoyugyimibjhwhvlh/database/backups" \
  -H "Authorization: Bearer YOUR_SUPABASE_ACCESS_TOKEN" \
  -H "Content-Type: application/json"
```

Ensuite, récupérez le backup depuis le dashboard.

---

## Restaurer le dump dans une nouvelle base

### Option A : Nouvelle base Supabase

1. Créez un nouveau projet Supabase
2. Obtenez la chaîne de connexion de la nouvelle base
3. Restaurez le dump :

```bash
psql "postgresql://postgres:[NEW_PASSWORD]@db.[NEW_PROJECT_ID].supabase.co:5432/postgres" < clubcreole_full_dump.sql
```

### Option B : Base PostgreSQL locale

```bash
# Créer une nouvelle base de données
createdb clubcreole_new

# Restaurer le dump
psql clubcreole_new < clubcreole_full_dump.sql
```

---

## Structure de la base de données

Votre base contient les tables principales suivantes (d'après CLAUDE.md) :

### Tables de base
- `profiles` - Profils utilisateurs
- `subscriptions` - Abonnements
- `partners` - Partenaires

### Hébergement
- `accommodations` - Hébergements
- `accommodation_rooms` - Chambres
- `accommodation_bookings` - Réservations d'hébergement
- `partner_accommodations` - Relation partenaires-hébergements

### Restaurants
- `restaurants` - Restaurants
- `restaurant_reservations` - Réservations de restaurant

### Location de voitures
- `car_rentals` - Véhicules disponibles
- `car_rental_bookings` - Réservations de véhicules

### Activités
- `leisure_activities` - Activités de loisirs
- `activities` - Activités générales
- `activity_bookings` - Réservations d'activités

### Voyages
- `travel_packages` - Forfaits de voyage
- `travel_reservations` - Réservations de voyage

---

## Commandes utiles

### Lister toutes les tables
```bash
psql "[CONNECTION_STRING]" -c "\dt"
```

### Voir la taille de la base
```bash
psql "[CONNECTION_STRING]" -c "SELECT pg_size_pretty(pg_database_size('postgres'));"
```

### Exporter une seule table
```bash
pg_dump --table=accommodations "[CONNECTION_STRING]" > accommodations_dump.sql
```

---

## Recommandations

1. **Pour un dump complet de production** : Utilisez la **Méthode 1** (pg_dump via le dashboard)
2. **Pour le développement** : Utilisez les **scripts fournis** (Méthode 2)
3. **Pour l'intégration CI/CD** : Utilisez le **CLI Supabase** (Méthode 3)

---

## Sécurité

⚠️ **Important** :
- Ne commitez jamais vos dumps dans Git (ils contiennent des données sensibles)
- Ajoutez `*.sql` et `*_dump.sql` à votre `.gitignore`
- Stockez vos backups de manière sécurisée
- Ne partagez jamais votre mot de passe de base de données

---

## Support

Pour plus d'informations :
- Documentation Supabase : https://supabase.com/docs/guides/database/backups
- Documentation PostgreSQL : https://www.postgresql.org/docs/current/app-pgdump.html
