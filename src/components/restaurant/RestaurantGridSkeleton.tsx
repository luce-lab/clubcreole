
import RestaurantCardSkeleton from "./RestaurantCardSkeleton";

interface RestaurantGridSkeletonProps {
  count?: number;
}

const RestaurantGridSkeleton = ({ count = 6 }: RestaurantGridSkeletonProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      {Array.from({ length: count }).map((_, index) => (
        <RestaurantCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default RestaurantGridSkeleton;
