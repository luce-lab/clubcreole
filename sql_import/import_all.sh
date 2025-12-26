#!/bin/bash
# Script pour importer toutes les données

DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-5432}"
DB_NAME="${DB_NAME:-clubcreole_db}"
DB_USER="${DB_USER:-postgres}"

echo "Importing "objects".sql..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f sql_import/"objects".sql

echo "Importing accommodations.sql..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f sql_import/accommodations.sql

echo "Importing activities.sql..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f sql_import/activities.sql

echo "Importing activity_images.sql..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f sql_import/activity_images.sql

echo "Importing activity_inclusions.sql..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f sql_import/activity_inclusions.sql

echo "Importing activity_levels.sql..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f sql_import/activity_levels.sql

echo "Importing activity_time_slots.sql..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f sql_import/activity_time_slots.sql

echo "Importing audit_log_entries.sql..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f sql_import/audit_log_entries.sql

echo "Importing bons_plans.sql..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f sql_import/bons_plans.sql

echo "Importing car_client_reviews.sql..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f sql_import/car_client_reviews.sql

echo "Importing car_models.sql..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f sql_import/car_models.sql

echo "Importing car_rental_companies.sql..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f sql_import/car_rental_companies.sql

echo "Importing car_rental_features.sql..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f sql_import/car_rental_features.sql

echo "Importing categories.sql..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f sql_import/categories.sql

echo "Importing concerts.sql..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f sql_import/concerts.sql

echo "Importing extensions.sql..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f sql_import/extensions.sql

echo "Importing flow_state.sql..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f sql_import/flow_state.sql

echo "Importing identities.sql..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f sql_import/identities.sql

echo "Importing leisure_activities.sql..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f sql_import/leisure_activities.sql

echo "Importing loisirs.sql..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f sql_import/loisirs.sql

echo "Importing loyalty_cards.sql..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f sql_import/loyalty_cards.sql

echo "Importing mfa_amr_claims.sql..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f sql_import/mfa_amr_claims.sql

echo "Importing migrations.sql..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f sql_import/migrations.sql

echo "Importing newsletter_subscriptions.sql..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f sql_import/newsletter_subscriptions.sql

echo "Importing nightlife_events.sql..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f sql_import/nightlife_events.sql

echo "Importing offers.sql..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f sql_import/offers.sql

echo "Importing one_time_tokens.sql..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f sql_import/one_time_tokens.sql

echo "Importing partners.sql..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f sql_import/partners.sql

echo "Importing profiles.sql..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f sql_import/profiles.sql

echo "Importing promotions.sql..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f sql_import/promotions.sql

echo "Importing refresh_tokens.sql..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f sql_import/refresh_tokens.sql

echo "Importing restaurants.sql..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f sql_import/restaurants.sql

echo "Importing schema_migrations.sql..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f sql_import/schema_migrations.sql

echo "Importing sessions.sql..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f sql_import/sessions.sql

echo "Importing subscription_plans.sql..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f sql_import/subscription_plans.sql

echo "Importing tenants.sql..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f sql_import/tenants.sql

echo "Importing travel_offers.sql..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f sql_import/travel_offers.sql

echo "Importing user_subscriptions.sql..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f sql_import/user_subscriptions.sql

echo "Importing users.sql..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f sql_import/users.sql

echo "Importing voyance_mediums.sql..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f sql_import/voyance_mediums.sql

echo "Importing voyance_reviews.sql..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f sql_import/voyance_reviews.sql

echo "All imports completed!"
