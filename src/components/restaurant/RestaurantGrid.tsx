
import RestaurantCard from "./RestaurantCard";
import { Restaurant } from "./types";

interface RestaurantGridProps {
  restaurants: Restaurant[];
}

const RestaurantGrid = ({ restaurants }: RestaurantGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
};

export default RestaurantGrid;
