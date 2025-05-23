
import { Button } from "@/components/ui/button";
import { Building, Plus } from "lucide-react";

interface AccommodationsManagementHeaderProps {
  onCreateClick: () => void;
}

export const AccommodationsManagementHeader = ({ onCreateClick }: AccommodationsManagementHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
      <div className="flex items-center gap-3">
        <div className="bg-blue-600 rounded-full p-2">
          <Building className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-blue-800">Gestion des Hébergements</h1>
          <p className="text-blue-600">Créez et gérez tous les hébergements disponibles</p>
        </div>
      </div>
      
      <Button 
        onClick={onCreateClick}
        className="bg-blue-600 hover:bg-blue-700 text-white shadow-md"
        size="lg"
      >
        <Plus className="mr-2 h-5 w-5" />
        Ajouter un hébergement
      </Button>
    </div>
  );
};
