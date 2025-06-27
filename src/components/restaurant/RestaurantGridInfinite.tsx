import RestaurantCard from "./RestaurantCard";
import RestaurantCardSkeleton from "./RestaurantCardSkeleton";
import { Restaurant } from "./types";
import { Loader2 } from "lucide-react";

interface RestaurantGridInfiniteProps {
  restaurants: Restaurant[];
  isLoadingMore: boolean;
  hasMore: boolean;
  error: string | null;
}

const RestaurantGridInfinite = ({ 
  restaurants, 
  isLoadingMore, 
  hasMore, 
  error 
}: RestaurantGridInfiniteProps) => {
  return (
    <div className="space-y-6">
      {/* Grille des restaurants */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
        
        {/* Skeletons pendant le chargement */}
        {isLoadingMore && (
          <>
            {[...Array(6)].map((_, index) => (
              <RestaurantCardSkeleton key={`skeleton-${Date.now()}-${index}`} />
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
      {!hasMore && restaurants.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600 text-lg">
            Vous avez vu tous les restaurants disponibles !
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

export default RestaurantGridInfinite;