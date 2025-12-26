#!/bin/bash
#
# Script d'importation des données Club Créole vers Supabase
#
# Usage: ./import_supabase.sh [option]
#
# Options:
#   --dry-run   : Affiche les commandes sans les exécuter
#   --test-only : Importe uniquement les tables de test (petits fichiers)
#   --full      : Importe toutes les données (défaut)

set -e  # Arrêter en cas d'erreur

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SQL_DIR="$SCRIPT_DIR"

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
log_info() {
    echo -e "${GREEN}✓${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}⚠${NC} $1"
}

log_error() {
    echo -e "${RED}✗${NC} $1"
}

# Vérifier les variables d'environnement
check_env() {
    if [[ -z "$SUPABASE_URL" ]]; then
        log_error "SUPABASE_URL n'est pas défini"
        echo "Exemple: export SUPABASE_URL=db.psryoyugyimibjhwhvlh.supabase.co"
        return 1
    fi

    if [[ -z "$SUPABASE_PASSWORD" ]]; then
        log_error "SUPABASE_PASSWORD n'est pas défini"
        echo "Exemple: export SUPABASE_PASSWORD=votre_mot_de_passe"
        return 1
    fi

    return 0
}

# Fonction d'importation
import_file() {
    local file=$1
    local description=$2

    if [[ ! -f "$SQL_DIR/$file" ]]; then
        log_error "Fichier non trouvé: $file"
        return 1
    fi

    log_info "$description"

    if [[ "$DRY_RUN" == "true" ]]; then
        echo "  psql -h $SUPABASE_URL -U postgres -d postgres -f $SQL_DIR/$file"
    else
        PGPASSWORD="$SUPABASE_PASSWORD" psql -h "$SUPABASE_URL" -U postgres \
            -d postgres -f "$SQL_DIR/$file" || log_warn "Échec de l'import: $file"
    fi

    sleep 1  # Pause pour éviter la surcharge
}

# Importation complète
import_all() {
    log_info "Début de l'importation complète..."

    # Tables de référence (sans dépendances)
    import_file "categories.sql" "Import des catégories"
    import_file "subscription_plans.sql" "Import des plans d'abonnement"
    import_file "car_rental_companies.sql" "Import des sociétés de location"
    import_file "car_rental_features.sql" "Import des options de véhicules"
    import_file "car_models.sql" "Import des modèles de véhicules"

    # Données principales
    import_file "accommodations.sql" "Import des hébergements (15 enregistrements)"
    import_file "activities.sql" "Import des activités (11 enregistrements)"
    import_file "activity_levels.sql" "Import des niveaux d'activités"
    import_file "activity_time_slots.sql" "Import des créneaux horaires"
    import_file "activity_inclusions.sql" "Import des inclusions d'activités"
    import_file "activity_images.sql" "Import des images d'activités"

    # Restaurants
    import_file "restaurants.sql" "Import des restaurants (43 enregistrements)"

    # Loisirs et événements
    import_file "loisirs.sql" "Import des loisirs"
    import_file "concerts.sql" "Import des concerts"
    import_file "nightlife_events.sql" "Import des événements nocturnes"

    # Voyance
    import_file "voyance_mediums.sql" "Import des médiums"
    import_file "voyance_reviews.sql" "Import des avis voyance"

    # Offres et promotions
    import_file "bons_plans.sql" "Import des bons plans"
    import_file "offers.sql" "Import des offres"
    import_file "promotions.sql" "Import des promotions"
    import_file "travel_offers.sql" "Import des offres de voyage"

    # Partenaires
    import_file "partners.sql" "Import des partenaires"

    # Utilisateurs et profils
    import_file "users.sql" "Import des utilisateurs"
    import_file "identities.sql" "Import des identités"
    import_file "profiles.sql" "Import des profils"
    import_file "user_subscriptions.sql" "Import des abonnements utilisateurs"
    import_file "newsletter_subscriptions.sql" "Import des inscriptions newsletter"

    # Divers
    import_file "loyalty_cards.sql" "Import des cartes de fidélité"
    import_file "leisure_activities.sql" "Import des activités de loisirs"
    import_file "car_client_reviews.sql" "Import des avis clients de location"

    log_info "Importation terminée !"
}

# Importation de test (petits fichiers seulement)
import_test() {
    log_info "Importation de test (petits fichiers)..."

    import_file "categories.sql" "Catégories"
    import_file "activity_levels.sql" "Niveaux d'activités"
    import_file "loyalty_cards.sql" "Cartes de fidélité"
    import_file "bons_plans.sql" "Bons plans"

    log_info "Importation de test terminée !"
}

# Fonction principale
main() {
    local mode="${1:---full}"

    # Configuration
    case "$mode" in
        --dry-run)
            DRY_RUN=true
            log_warn "Mode DRY RUN - Les commandes seront affichées mais non exécutées"
            ;;
        --test-only)
            TEST_ONLY=true
            ;;
        --full)
            # Importation complète
            ;;
        *)
            echo "Usage: $0 [--dry-run|--test-only|--full]"
            echo ""
            echo "Variables d'environnement requises:"
            echo "  SUPABASE_URL      - Ex: db.psryoyugyimibjhwhvlh.supabase.co"
            echo "  SUPABASE_PASSWORD - Votre mot de passe Supabase"
            exit 1
            ;;
    esac

    # Vérifier l'environnement
    check_env || exit 1

    # Afficher la configuration
    echo ""
    log_info "Configuration:"
    echo "  Supabase URL: $SUPABASE_URL"
    echo "  Mode: $mode"
    echo ""

    # Confirmer
    if [[ "$DRY_RUN" != "true" ]]; then
        read -p "Continuer l'importation ? (y/n) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            log_warn "Importation annulée"
            exit 0
        fi
    fi

    # Exécuter l'importation
    echo ""
    if [[ "$TEST_ONLY" == "true" ]]; then
        import_test
    else
        import_all
    fi

    echo ""
    log_info "Vous pouvez vérifier l'importation dans le Supabase Dashboard"
}

# Exécuter
main "$@"
