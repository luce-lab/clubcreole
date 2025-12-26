#!/bin/bash
#
# Exemples de commandes pour l'importation des données Club Créole
#
# Ce fichier contient des exemples de commandes à adapter selon votre environnement
#

################################################################################
# CONFIGURATION SUPABASE
################################################################################

# Pour Supabase Cloud - remplacer par vos valeurs
export SUPABASE_URL="db.psryoyugyimibjhwhvlh.supabase.co"
export SUPABASE_DB="postgres"
export SUPABASE_USER="postgres"
export SUPABASE_PASSWORD="votre_mot_de_passe_ici"

# Pour base locale
export LOCAL_DB_HOST="localhost"
export LOCAL_DB_NAME="clubcreole_db"
export LOCAL_DB_USER="postgres"


################################################################################
# MÉTHODE 1: Script d'importation Supabase (RECOMMANDÉ)
################################################################################

# Importation complète vers Supabase Cloud
./sql_import/import_supabase.sh --full

# Importation de test (quelques fichiers seulement)
./sql_import/import_supabase.sh --test-only

# Mode dry-run (voir les commandes sans les exécuter)
./sql_import/import_supabase.sh --dry-run


################################################################################
# MÉTHODE 2: Commandes psql directes
################################################################################

# Importer un fichier spécifique vers Supabase
PGPASSWORD=$SUPABASE_PASSWORD psql -h $SUPABASE_URL -U $SUPABASE_USER -d $SUPABASE_DB \
    -f sql_import/accommodations.sql

# Importer un fichier vers base locale
psql -h $LOCAL_DB_HOST -U $LOCAL_DB_USER -d $LOCAL_DB_NAME \
    -f sql_import/restaurants.sql

# Importer avec connection string
psql "postgresql://$SUPABASE_USER:$SUPABASE_PASSWORD@$SUPABASE_URL:5432/$SUPABASE_DB" \
    -f sql_import/partners.sql


################################################################################
# MÉTHODE 3: Importation par lot (tous les fichiers)
################################################################################

# Vers Supabase Cloud
for file in sql_import/*.sql; do
    echo "Import de $file..."
    PGPASSWORD=$SUPABASE_PASSWORD psql -h $SUPABASE_URL -U $SUPABASE_USER -d $SUPABASE_DB -f "$file"
done

# Vers base locale
for file in sql_import/*.sql; do
    echo "Import de $file..."
    psql -h $LOCAL_DB_HOST -U $LOCAL_DB_USER -d $LOCAL_DB_NAME -f "$file"
done


################################################################################
# ORDRE D'IMPORTATION RECOMMANDÉ (pour respecter les clés étrangères)
################################################################################

# 1. Tables de référence
PGPASSWORD=$SUPABASE_PASSWORD psql -h $SUPABASE_URL -U $SUPABASE_USER -d $SUPABASE_DB -f sql_import/categories.sql
PGPASSWORD=$SUPABASE_PASSWORD psql -h $SUPABASE_URL -U $SUPABASE_USER -d $SUPABASE_DB -f sql_import/subscription_plans.sql
PGPASSWORD=$SUPABASE_PASSWORD psql -h $SUPABASE_URL -U $SUPABASE_USER -d $SUPABASE_DB -f sql_import/car_rental_companies.sql

# 2. Données principales
PGPASSWORD=$SUPABASE_PASSWORD psql -h $SUPABASE_URL -U $SUPABASE_USER -d $SUPABASE_DB -f sql_import/accommodations.sql
PGPASSWORD=$SUPABASE_PASSWORD psql -h $SUPABASE_URL -U $SUPABASE_USER -d $SUPABASE_DB -f sql_import/activities.sql
PGPASSWORD=$SUPABASE_PASSWORD psql -h $SUPABASE_URL -U $SUPABASE_USER -d $SUPABASE_DB -f sql_import/restaurants.sql

# 3. Tables avec dépendances
PGPASSWORD=$SUPABASE_PASSWORD psql -h $SUPABASE_URL -U $SUPABASE_USER -d $SUPABASE_DB -f sql_import/activity_images.sql
PGPASSWORD=$SUPABASE_PASSWORD psql -h $SUPABASE_URL -U $SUPABASE_USER -d $SUPABASE_DB -f sql_import/car_rental_features.sql

# 4. Utilisateurs et profils
PGPASSWORD=$SUPABASE_PASSWORD psql -h $SUPABASE_URL -U $SUPABASE_USER -d $SUPABASE_DB -f sql_import/users.sql
PGPASSWORD=$SUPABASE_PASSWORD psql -h $SUPABASE_URL -U $SUPABASE_USER -d $SUPABASE_DB -f sql_import/profiles.sql


################################################################################
# VÉRIFICATION DE L'IMPORTATION
################################################################################

# Compter les enregistrements importés
PGPASSWORD=$SUPABASE_PASSWORD psql -h $SUPABASE_URL -U $SUPABASE_USER -d $SUPABASE_DB \
    -c "SELECT 'accommodations' as table_name, COUNT(*) FROM public.accommodations
        UNION ALL
        SELECT 'activities', COUNT(*) FROM public.activities
        UNION ALL
        SELECT 'restaurants', COUNT(*) FROM public.restaurants
        UNION ALL
        SELECT 'partners', COUNT(*) FROM public.partners;"

# Vérifier une table spécifique
PGPASSWORD=$SUPABASE_PASSWORD psql -h $SUPABASE_URL -U $SUPABASE_USER -d $SUPABASE_DB \
    -c "SELECT * FROM public.accommodations LIMIT 5;"

# Lister toutes les tables de public
PGPASSWORD=$SUPABASE_PASSWORD psql -h $SUPABASE_URL -U $SUPABASE_USER -d $SUPABASE_DB \
    -c "\dt public.*"


################################################################################
# NETTOYAGE (SI NÉCESSAIRE)
################################################################################

# ⚠️  ATTENTION: Ces commandes suppriment des données !

# Vider une table avant de ré-importer
PGPASSWORD=$SUPABASE_PASSWORD psql -h $SUPABASE_URL -U $SUPABASE_USER -d $SUPABASE_DB \
    -c "TRUNCATE TABLE public.accommodations CASCADE;"

# Réinitialiser une séquence
PGPASSWORD=$SUPABASE_PASSWORD psql -h $SUPABASE_URL -U $SUPABASE_USER -d $SUPABASE_DB \
    -c "SELECT setval('public.accommodations_id_seq', 1, false);"


################################################################################
# DÉPANNAGE
################################################################################

# Tester la connexion
PGPASSWORD=$SUPABASE_PASSWORD psql -h $SUPABASE_URL -U $SUPABASE_USER -d $SUPABASE_DB -c "SELECT version();"

# Vérifier si une table existe
PGPASSWORD=$SUPABASE_PASSWORD psql -h $SUPABASE_URL -U $SUPABASE_USER -d $SUPABASE_DB \
    -c "SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'accommodations');"

# Voir la structure d'une table
PGPASSWORD=$SUPABASE_PASSWORD psql -h $SUPABASE_URL -U $SUPABASE_USER -d $SUPABASE_DB \
    -c "\d public.accommodations"

# Importer un fichier avec affichage des erreurs détaillées
PGPASSWORD=$SUPABASE_PASSWORD psql -h $SUPABASE_URL -U $SUPABASE_USER -d $SUPABASE_DB \
    -f sql_import/accommodations.sql -v ON_ERROR_STOP=1


################################################################################
# ASTUCES
################################################################################

# Créer un alias pour faciliter les commandes
alias supabase_psql='PGPASSWORD=$SUPABASE_PASSWORD psql -h $SUPABASE_URL -U $SUPABASE_USER -d $SUPABASE_DB'

# Ensuite utiliser simplement:
supabase_psql -c "SELECT COUNT(*) FROM public.accommodations;"

# Sauvegarder la sortie dans un fichier
supabase_psql -f sql_import/accommodations.sql > import_log.txt 2>&1

# Importer en arrière-plan avec nohup
nohup supabase_psql -f sql_import/accommodations.sql > import_log.txt 2>&1 &


################################################################################
# INFORMATIONS
################################################################################

# Pour obtenir votre mot de passe Supabase:
# 1. Aller dans le Supabase Dashboard
# 2. Settings → Database
# 3. Connection string → URI
# 4. Copier le mot de passe après "postgresql://postgres:[PASSWORD]@..."
