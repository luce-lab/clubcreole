
import RestaurantHeader from "@/components/restaurant/RestaurantHeader";
import RestaurantGrid from "@/components/restaurant/RestaurantGrid";
import RestaurantInfo from "@/components/restaurant/RestaurantInfo";
import RestaurantsSearchBar from "@/components/restaurant/RestaurantsSearchBar";
import RestaurantsEmptyState from "@/components/restaurant/RestaurantsEmptyState";
import { useRestaurantsSearch } from "@/hooks/useRestaurantsSearch";
import { useProgressiveRestaurants } from "@/hooks/useProgressiveRestaurants";

const RestaurantActivity = () => {
  const {
    restaurants,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
    refresh
  } = useProgressiveRestaurants();

  const { 
    searchQuery, 
    setSearchQuery, 
    filteredRestaurants, 
    hasResults, 
    totalResults, 
    isSearching 
  } = useRestaurantsSearch(restaurants);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <RestaurantHeader />
        <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700 mb-4">
          {error}
        </div>
        <button 
          onClick={refresh}
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

      {isSearching && (
        <div className="mb-6 text-center">
          <p className="text-gray-600">
            {totalResults} restaurant{totalResults !== 1 ? 's' : ''} trouvé{totalResults !== 1 ? 's' : ''}
            {totalResults > 0 && ` pour "${searchQuery}"`}
          </p>
        </div>
      )}

      {hasResults || loading ? (
        <>
          <RestaurantGrid 
            restaurants={filteredRestaurants}
            loading={loading}
            loadingMore={loadingMore}
            hasMore={hasMore && !isSearching}
            onLoadMore={loadMore}
            showLoadMore={!isSearching}
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
