
import { Search } from "lucide-react";

interface ConcertsEmptyStateProps {
  isSearching: boolean;
  searchQuery: string;
}

const ConcertsEmptyState = ({ isSearching, searchQuery }: ConcertsEmptyStateProps) => {
  if (isSearching) {
    return (
      <div className="text-center py-12">
        <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          Aucun concert trouvé
        </h3>
        <p className="text-gray-500">
          Aucun concert ne correspond à votre recherche "{searchQuery}".
        </p>
        <p className="text-gray-500 mt-2">
          Essayez avec d'autres mots-clés ou parcourez tous nos concerts partenaires.
        </p>
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <h3 className="text-xl font-semibold text-gray-600 mb-2">
        Aucun concert disponible
      </h3>
      <p className="text-gray-500">
        Aucun concert partenaire n'est actuellement disponible.
      </p>
    </div>
  );
};

export default ConcertsEmptyState;
