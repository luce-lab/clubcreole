
import { Bed } from "lucide-react";

export const AccommodationEmptyState = () => {
  return (
    <div className="text-center py-12">
      <Bed className="h-16 w-16 mx-auto text-gray-300 mb-4" />
      <h3 className="text-xl font-bold text-gray-700">Aucun hébergement trouvé</h3>
      <p className="text-gray-500 mt-2">Essayez de modifier vos critères de recherche</p>
    </div>
  );
};
