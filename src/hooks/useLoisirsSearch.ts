
import { useState, useMemo } from "react";
import { Loisir } from "@/components/loisirs/types";

export const useLoisirsSearch = (loisirs: Loisir[]) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLoisirs = useMemo(() => {
    if (!searchQuery.trim()) {
      return loisirs;
    }

    const query = searchQuery.toLowerCase();
    
    return loisirs.filter((loisir) => {
      return (
        loisir.title.toLowerCase().includes(query) ||
        loisir.description.toLowerCase().includes(query) ||
        loisir.location.toLowerCase().includes(query)
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
