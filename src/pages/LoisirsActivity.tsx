
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import LoisirsHeader from "@/components/loisirs/LoisirsHeader";
import LoisirsLoader from "@/components/loisirs/LoisirsLoader";
import LoisirsGridInfinite from "@/components/loisirs/LoisirsGridInfinite";
import LoisirsSearchBar from "@/components/loisirs/LoisirsSearchBar";
import LoisirsEmptyState from "@/components/loisirs/LoisirsEmptyState";
import { useInfiniteLoisirs } from "@/hooks/useInfiniteLoisirs";
import { useDebounce } from "@/hooks/useDebounce";
import { Loisir } from "@/components/loisirs/types";

const LoisirsActivity = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Debouncer la recherche pour éviter trop de requêtes
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const {
    loisirs,
    loading,
    error,
    hasMore,
    totalCount,
    reset,
    isLoadingMore
  } = useInfiniteLoisirs({
    initialLimit: 12,
    threshold: 200,
    searchQuery: debouncedSearchQuery
  });

  const hasResults = loisirs.length > 0;
  const isSearching = searchQuery.trim().length > 0;
  const isSearchPending = searchQuery !== debouncedSearchQuery;

  const handleUpdateLoisir = (updatedLoisir: Loisir) => {
    // Cette fonction pourrait être étendue pour mettre à jour les données localement
    // Pour l'instant, on peut simplement faire un reset pour recharger les données
    // console.log("Loisir mis à jour:", updatedLoisir);
    // Optionnel: reset() pour recharger toutes les données
  };

  if (loading) {
    return <LoisirsLoader />;
  }

  if (error && !hasResults) {
    toast({
      title: "Erreur",
      description: error,
      variant: "destructive",
    });
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <LoisirsHeader />
      
      <LoisirsSearchBar 
        value={searchQuery}
        onSearch={setSearchQuery}
        placeholder="Rechercher par titre, description ou lieu de l'activité..."
      />

      {isSearching && (
        <div className="mb-6 text-center">
          {isSearchPending ? (
            <p className="text-gray-500 italic">Recherche en cours...</p>
          ) : totalCount > 0 ? (
            <p className="text-gray-600">
              {totalCount} activité{totalCount !== 1 ? 's' : ''} trouvée{totalCount !== 1 ? 's' : ''}
              {` pour "${searchQuery}"`}
            </p>
          ) : null}
        </div>
      )}

      {hasResults ? (
        <LoisirsGridInfinite 
          loisirs={loisirs} 
          isLoadingMore={isLoadingMore}
          hasMore={hasMore}
          error={error}
          onUpdateLoisir={handleUpdateLoisir} 
        />
      ) : (
        <LoisirsEmptyState 
          isSearching={isSearching} 
          searchQuery={searchQuery}
        />
      )}
    </div>
  );
};

export default LoisirsActivity;
