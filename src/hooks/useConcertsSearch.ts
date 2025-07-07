
import { useState, useMemo } from "react";
import { Concert } from "@/components/concert/ConcertTypes";
import { matchesIgnoreAccents } from "@/lib/textUtils";

export const useConcertsSearch = (concerts: Concert[]) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConcerts = useMemo(() => {
    if (!searchQuery.trim()) {
      return concerts;
    }

    const query = searchQuery.trim();
    
    return concerts.filter((concert) => {
      return (
        matchesIgnoreAccents(query, concert.name) ||
        matchesIgnoreAccents(query, concert.artist) ||
        matchesIgnoreAccents(query, concert.genre) ||
        matchesIgnoreAccents(query, concert.location) ||
        matchesIgnoreAccents(query, concert.offer) ||
        matchesIgnoreAccents(query, concert.description)
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
