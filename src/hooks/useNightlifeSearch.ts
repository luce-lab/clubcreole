import { useState, useMemo } from "react";
import { NightEvent } from "@/components/nightlife/NightlifeTypes";
import { matchesIgnoreAccents } from "@/lib/textUtils";

export const useNightlifeSearch = (nightEvents: NightEvent[]) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNightEvents = useMemo(() => {
    if (!searchQuery.trim()) {
      return nightEvents;
    }

    const query = searchQuery.trim();
    
    return nightEvents.filter((event) => {
      return (
        matchesIgnoreAccents(query, event.name) ||
        matchesIgnoreAccents(query, event.type) ||
        matchesIgnoreAccents(query, event.venue) ||
        matchesIgnoreAccents(query, event.description) ||
        matchesIgnoreAccents(query, event.offer) ||
        event.features?.some(feature => matchesIgnoreAccents(query, feature))
      );
    });
  }, [nightEvents, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredNightEvents,
    hasResults: filteredNightEvents.length > 0,
    totalResults: filteredNightEvents.length,
    isSearching: searchQuery.trim().length > 0
  };
};