
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoisirsDetailHeader from "./LoisirsDetailHeader";

interface LoisirsDetailErrorProps {
  error: string;
}

const LoisirsDetailError = ({ error }: LoisirsDetailErrorProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <LoisirsDetailHeader />
      
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="h-6 w-6 text-red-600" />
          <h2 className="text-lg font-semibold text-red-800">Erreur</h2>
        </div>
        <p className="mb-4 text-red-700">{error || "Une erreur s'est produite lors du chargement de l'activité. Veuillez réessayer plus tard."}</p>
        <Button onClick={() => navigate('/loisirs')}>
          Retour à la liste des activités
        </Button>
      </div>
    </div>
  );
};

export default LoisirsDetailError;
