
import { Eye } from "lucide-react";

const VoyanceEmptyState = () => {
  return (
    <div className="text-center py-12">
      <div className="flex justify-center mb-4">
        <div className="bg-gray-100 p-6 rounded-full">
          <Eye className="h-12 w-12 text-gray-400" />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        Aucun médium disponible
      </h3>
      <p className="text-gray-500">
        Nous travaillons à ajouter de nouveaux médiums à notre plateforme.
      </p>
    </div>
  );
};

export default VoyanceEmptyState;
