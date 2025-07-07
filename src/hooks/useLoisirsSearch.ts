
import { useState, useMemo } from "react";
import { Loisir } from "@/components/loisirs/types";
import { matchesIgnoreAccents } from "@/lib/textUtils";

export const useLoisirsSearch = (loisirs: Loisir[]) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLoisirs = useMemo(() => {
    if (!searchQuery.trim()) {
      return loisirs;
    }

    const query = searchQuery.trim();
    
    return loisirs.filter((loisir) => {
      return (
        matchesIgnoreAccents(query, loisir.title) ||
        matchesIgnoreAccents(query, loisir.description) ||
        matchesIgnoreAccents(query, loisir.location)
      );
    });
  }, [loisirs, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredLoisirs,
    hasResults: filteredLoisirs.length > 0,
    totalResults: filteredLoisirs.length,
    isSearching: searchQuery.trim().length > 0
  };
};
