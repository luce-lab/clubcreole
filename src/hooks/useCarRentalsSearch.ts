import { useState, useMemo } from "react";
import { CarRental } from "@/components/car-rental/CarRentalTypes";
import { matchesIgnoreAccents } from "@/lib/textUtils";

export const useCarRentalsSearch = (carRentals: CarRental[]) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCarRentals = useMemo(() => {
    if (!searchQuery.trim()) {
      return carRentals;
    }

    const query = searchQuery.trim();
    
    return carRentals.filter((carRental) => {
      return (
        matchesIgnoreAccents(query, carRental.name) ||
        matchesIgnoreAccents(query, carRental.type) ||
        matchesIgnoreAccents(query, carRental.location) ||
        matchesIgnoreAccents(query, carRental.description) ||
        matchesIgnoreAccents(query, carRental.offer) ||
        carRental.features?.some(feature => matchesIgnoreAccents(query, feature)) ||
        carRental.models?.some(model => matchesIgnoreAccents(query, model.name) || matchesIgnoreAccents(query, model.category))
      );
    });
  }, [carRentals, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredCarRentals,
    hasResults: filteredCarRentals.length > 0,
    totalResults: filteredCarRentals.length,
    isSearching: searchQuery.trim().length > 0
  };
};