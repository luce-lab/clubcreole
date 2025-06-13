
import { Search } from "lucide-react";

interface LoisirsEmptyStateProps {
  isSearching: boolean;
  searchQuery: string;
}

const LoisirsEmptyState = ({ isSearching, searchQuery }: LoisirsEmptyStateProps) => {
  if (isSearching) {
    return (
      <div className="text-center py-12">
        <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          Aucune activité trouvée
        </h3>
        <p className="text-gray-500">
          Aucune activité ne correspond à votre recherche "{searchQuery}".
        </p>
        <p className="text-gray-500 mt-2">
          Essayez avec d'autres mots-clés ou parcourez toutes nos activités.
        </p>
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <h3 className="text-xl font-semibold text-gray-600 mb-2">
        Aucune activité disponible
      </h3>
      <p className="text-gray-500">
        Aucune activité de loisirs n'est actuellement disponible.
      </p>
    </div>
  );
};

export default LoisirsEmptyState;
