
import CarRentalHeader from "@/components/car-rental/CarRentalHeader";
import CarRentalCard from "@/components/car-rental/CarRentalCard";
import ReviewCarousel from "@/components/car-rental/ReviewCarousel";
import MembershipBenefits from "@/components/car-rental/MembershipBenefits";
import { CarRentalsSearchBar } from "@/components/car-rental/CarRentalsSearchBar";
import { useCarRentals, useClientReviews } from "@/hooks/useCarRentals";
import { useCarRentalsSearch } from "@/hooks/useCarRentalsSearch";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const CarRentalActivity = () => {
  const { carRentals, loading: carRentalsLoading, error: carRentalsError } = useCarRentals();
  const { reviews, loading: reviewsLoading, error: reviewsError } = useClientReviews();
  const { 
    searchQuery, 
    setSearchQuery, 
    filteredCarRentals, 
    hasResults, 
    totalResults,
    isSearching 
  } = useCarRentalsSearch(carRentals || []);

  if (carRentalsError || reviewsError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Une erreur est survenue lors du chargement des données. Veuillez réessayer plus tard.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CarRentalHeader />
      
      {/* Barre de recherche */}
      <div className="flex flex-col items-center mb-8 gap-4">
        <CarRentalsSearchBar 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        {isSearching && (
          <div className="text-sm text-gray-600">
            {totalResults} résultat{totalResults > 1 ? 's' : ''} pour "{searchQuery}"
          </div>
        )}
      </div>
      
      {/* Affichage des résultats */}
      {isSearching && !hasResults && !carRentalsLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Aucune entreprise de location trouvée pour "{searchQuery}"
          </p>
          <p className="text-gray-400 mt-2">
            Essayez avec d'autres mots-clés ou supprimez les filtres
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {carRentalsLoading ? (
            // Skeleton loading pour les cartes
            Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="space-y-4">
                <Skeleton className="h-48 w-full rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </div>
            ))
          ) : (
            filteredCarRentals.map((rental) => (
              <CarRentalCard key={rental.id} rental={rental} />
            ))
          )}
        </div>
      )}
      
      {reviewsLoading ? (
        <div className="mb-10">
          <Skeleton className="h-8 w-1/3 mb-4" />
          <Skeleton className="h-32 w-full" />
        </div>
      ) : (
        <ReviewCarousel reviews={reviews} />
      )}
      
      <MembershipBenefits />
    </div>
  );
};

export default CarRentalActivity;
