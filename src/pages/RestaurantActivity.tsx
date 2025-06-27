
import RestaurantHeader from "@/components/restaurant/RestaurantHeader";
import RestaurantGridInfinite from "@/components/restaurant/RestaurantGridInfinite";
import RestaurantInfo from "@/components/restaurant/RestaurantInfo";
import RestaurantsSearchBar from "@/components/restaurant/RestaurantsSearchBar";
import RestaurantsEmptyState from "@/components/restaurant/RestaurantsEmptyState";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useState } from "react";

const RestaurantActivity = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const {
    restaurants,
    loading,
    error,
    hasMore,
    totalCount,
    reset,
    isLoadingMore
  } = useInfiniteScroll({
    initialLimit: 12,
    threshold: 200,
    searchQuery
  });

  const hasResults = restaurants.length > 0;
  const isSearching = searchQuery.trim().length > 0;

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <RestaurantHeader />
        <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700 mb-4">
          {error}
        </div>
        <button 
          onClick={reset}
          className="px-4 py-2 bg-creole-green text-white rounded hover:bg-creole-green/90"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <RestaurantHeader />
      
      <RestaurantsSearchBar 
        onSearch={setSearchQuery}
        placeholder="Rechercher par nom, type, lieu, offre..."
      />

      {isSearching && totalCount > 0 && (
        <div className="mb-6 text-center">
          <p className="text-gray-600">
            {totalCount} restaurant{totalCount !== 1 ? 's' : ''} trouvé{totalCount !== 1 ? 's' : ''}
            {` pour "${searchQuery}"`}
          </p>
        </div>
      )}

      {hasResults || loading ? (
        <>
          <RestaurantGridInfinite 
            restaurants={restaurants}
            isLoadingMore={isLoadingMore}
            hasMore={hasMore}
            error={null}
          />
          <RestaurantInfo />
        </>
      ) : (
        <RestaurantsEmptyState 
          isSearching={isSearching} 
          searchQuery={searchQuery}
        />
      )}
    </div>
  );
};

export default RestaurantActivity;
