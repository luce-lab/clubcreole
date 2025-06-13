
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import LoisirsHeader from "@/components/loisirs/LoisirsHeader";
import LoisirsLoader from "@/components/loisirs/LoisirsLoader";
import LoisirsGrid from "@/components/loisirs/LoisirsGrid";
import LoisirsSearchBar from "@/components/loisirs/LoisirsSearchBar";
import LoisirsEmptyState from "@/components/loisirs/LoisirsEmptyState";
import { useLoisirsSearch } from "@/hooks/useLoisirsSearch";
import { Loisir } from "@/components/loisirs/types";

const LoisirsActivity = () => {
  const [loisirs, setLoisirs] = useState<Loisir[]>([]);
  const [loading, setLoading] = useState(true);

  const { 
    searchQuery, 
    setSearchQuery, 
    filteredLoisirs, 
    hasResults, 
    totalResults, 
    isSearching 
  } = useLoisirsSearch(loisirs);

  // Charger les données depuis Supabase
  useEffect(() => {
    const fetchLoisirs = async () => {
      try {
        const { data, error } = await supabase
          .from('loisirs')
          .select('*')
          .order('start_date', { ascending: true });
        
        if (error) {
          throw error;
        }
        
        if (data) {
          // Conversion du champ gallery_images pour chaque loisir
          const formattedLoisirs = data.map(loisir => ({
            ...loisir,
            gallery_images: Array.isArray(loisir.gallery_images) 
              ? loisir.gallery_images 
              : []
          })) as Loisir[];
          
          setLoisirs(formattedLoisirs);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des loisirs:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les activités de loisirs.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLoisirs();
  }, []);

  const handleUpdateLoisir = (updatedLoisir: Loisir) => {
    setLoisirs(loisirs.map(loisir => 
      loisir.id === updatedLoisir.id ? updatedLoisir : loisir
    ));
  };

  if (loading) {
    return <LoisirsLoader />;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <LoisirsHeader />
      
      <LoisirsSearchBar 
        onSearch={setSearchQuery}
        placeholder="Rechercher par titre, description ou lieu..."
      />

      {isSearching && (
        <div className="mb-6 text-center">
          <p className="text-gray-600">
            {totalResults} activité{totalResults !== 1 ? 's' : ''} trouvée{totalResults !== 1 ? 's' : ''}
            {totalResults > 0 && ` pour "${searchQuery}"`}
          </p>
        </div>
      )}

      {hasResults ? (
        <LoisirsGrid 
          loisirs={filteredLoisirs} 
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
