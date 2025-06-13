
import { useState, useMemo } from "react";
import { Concert } from "@/components/concert/ConcertTypes";

export const useConcertsSearch = (concerts: Concert[]) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConcerts = useMemo(() => {
    if (!searchQuery.trim()) {
      return concerts;
    }

    const query = searchQuery.toLowerCase();
    
    return concerts.filter((concert) => {
      return (
        concert.name.toLowerCase().includes(query) ||
        concert.artist.toLowerCase().includes(query) ||
        concert.genre.toLowerCase().includes(query) ||
        concert.location.toLowerCase().includes(query) ||
        concert.offer.toLowerCase().includes(query) ||
        concert.description.toLowerCase().includes(query)
      );
    });
  }, [concerts, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredConcerts,
    hasResults: filteredConcerts.length > 0,
    totalResults: filteredConcerts.length,
    isSearching: searchQuery.trim().length > 0
  };
};
