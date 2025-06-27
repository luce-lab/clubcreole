import { Accommodation } from "@/components/accommodation/AccommodationTypes";
import { AccommodationCard } from "@/components/accommodation/AccommodationCard";
import { Loader2 } from "lucide-react";

interface AccommodationGridInfiniteProps {
  accommodations: Accommodation[];
  isLoadingMore: boolean;
  hasMore: boolean;
  error: string | null;
}

export const AccommodationGridInfinite = ({ 
  accommodations, 
  isLoadingMore, 
  hasMore, 
  error 
}: AccommodationGridInfiniteProps) => {
  return (
    <div className="space-y-6">
      {/* Grille des hébergements */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {accommodations.map((accommodation) => (
          <AccommodationCard key={accommodation.id} accommodation={accommodation} />
        ))}
        
        {/* Skeletons pendant le chargement */}
        {isLoadingMore && (
          <>
            {[...Array(6)].map((_, index) => (
              <div key={`skeleton-${Date.now()}-${index}`} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Indicateur de chargement */}
      {isLoadingMore && (
        <div className="flex justify-center py-8">
          <div className="flex items-center space-x-2 text-creole-blue">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="text-lg font-medium">Chargement...</span>
          </div>
        </div>
      )}

      {/* Message de fin */}
      {!hasMore && accommodations.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600 text-lg">
            Vous avez vu tous les hébergements disponibles !
          </p>
        </div>
      )}

      {/* Message d'erreur */}
      {error && (
        <div className="text-center py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 inline-block">
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};