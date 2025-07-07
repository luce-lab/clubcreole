
import { useState, useMemo } from "react";
import { Restaurant } from "@/components/restaurant/types";
import { matchesIgnoreAccents } from "@/lib/textUtils";

export const useRestaurantsSearch = (restaurants: Restaurant[]) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRestaurants = useMemo(() => {
    if (!searchQuery.trim()) {
      return restaurants;
    }

    const query = searchQuery.trim();
    
    return restaurants.filter((restaurant) => {
      return (
        matchesIgnoreAccents(query, restaurant.name) ||
        matchesIgnoreAccents(query, restaurant.description) ||
        matchesIgnoreAccents(query, restaurant.location) ||
        matchesIgnoreAccents(query, restaurant.type) ||
        matchesIgnoreAccents(query, restaurant.offer)
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
