
import RestaurantCard from "./RestaurantCard";
import RestaurantGridSkeleton from "./RestaurantGridSkeleton";
import LoadMoreButton from "./LoadMoreButton";
import { Restaurant } from "./types";

interface RestaurantGridProps {
  restaurants: Restaurant[];
  loading?: boolean;
  loadingMore?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  showLoadMore?: boolean;
}

const RestaurantGrid = ({ 
  restaurants, 
  loading = false,
  loadingMore = false,
  hasMore = false,
  onLoadMore,
  showLoadMore = false
}: RestaurantGridProps) => {
  if (loading && restaurants.length === 0) {
    return <RestaurantGridSkeleton count={6} />;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
      
      {loadingMore && <RestaurantGridSkeleton count={3} />}
      
      {showLoadMore && onLoadMore && (
        <LoadMoreButton 
          onLoadMore={onLoadMore}
          loading={loadingMore}
          hasMore={hasMore}
        />
      )}
    </>
  );
};

export default RestaurantGrid;
