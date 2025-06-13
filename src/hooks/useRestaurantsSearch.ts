
import { useState, useMemo } from "react";
import { Restaurant } from "@/components/restaurant/types";

export const useRestaurantsSearch = (restaurants: Restaurant[]) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRestaurants = useMemo(() => {
    if (!searchQuery.trim()) {
      return restaurants;
    }

    const query = searchQuery.toLowerCase();
    
    return restaurants.filter((restaurant) => {
      return (
        restaurant.name.toLowerCase().includes(query) ||
        restaurant.description.toLowerCase().includes(query) ||
        restaurant.location.toLowerCase().includes(query) ||
        restaurant.type.toLowerCase().includes(query) ||
        restaurant.offer.toLowerCase().includes(query)
      );
    });
  }, [restaurants, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredRestaurants,
    hasResults: filteredRestaurants.length > 0,
    totalResults: filteredRestaurants.length,
    isSearching: searchQuery.trim().length > 0
  };
};
