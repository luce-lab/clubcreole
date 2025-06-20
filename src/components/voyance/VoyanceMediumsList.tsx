
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { VoyanceMediumCard } from "./VoyanceMediumCard";
import { VoyanceEmptyState } from "./VoyanceEmptyState";
import { VoyanceLoader } from "./VoyanceLoader";
import { VoyanceError } from "./VoyanceError";
import type { VoyanceMedium } from "./types";

interface VoyanceMediumsListProps {
  searchTerm: string;
}

const VoyanceMediumsList = ({ searchTerm }: VoyanceMediumsListProps) => {
  const { data: mediums, isLoading, error } = useQuery({
    queryKey: ['voyance-mediums'],
    queryFn: async () => {
      console.log('Récupération des médiums...');
      const { data, error } = await supabase
        .from('voyance_mediums')
        .select('*')
        .eq('is_active', true)
        .order('rating', { ascending: false });

      if (error) {
        console.error('Erreur lors de la récupération des médiums:', error);
        throw error;
      }

      console.log(`${data?.length || 0} médiums récupérés`);
      return data as VoyanceMedium[];
    },
  });

  // Filtrer les médiums selon le terme de recherche
  const filteredMediums = mediums?.filter(medium => 
    medium.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medium.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchTerm.toLowerCase())
    ) ||
    medium.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (isLoading) return <VoyanceLoader />;
  if (error) return <VoyanceError error={error} />;
  if (!mediums || mediums.length === 0) return <VoyanceEmptyState />;

  if (searchTerm && filteredMediums.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          Aucun médium trouvé pour "{searchTerm}"
        </p>
        <p className="text-gray-400 mt-2">
          Essayez avec d'autres mots-clés ou supprimez les filtres
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredMediums.map((medium) => (
        <VoyanceMediumCard key={medium.id} medium={medium} />
      ))}
    </div>
  );
};

export default VoyanceMediumsList;
