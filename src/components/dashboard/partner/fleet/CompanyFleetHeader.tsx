
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

interface CompanyFleetHeaderProps {
  companyName: string;
  onBack: () => void;
}

export const CompanyFleetHeader = ({ companyName, onBack }: CompanyFleetHeaderProps) => {
  return (
    <div className="flex items-center space-x-4">
      <Button variant="outline" size="sm" onClick={onBack}>
        <ArrowLeft className="h-4 w-4 mr-1" />
        Retour
      </Button>
      <div>
        <CardTitle className="text-xl">Gestion - {companyName}</CardTitle>
        <p className="text-sm text-gray-600">
          Gérez les gestionnaires et la flotte de véhicules
        </p>
      </div>
    </div>
  );
};
