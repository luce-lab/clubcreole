
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VoyanceErrorProps {
  error: Error;
}

const VoyanceError = ({ error }: VoyanceErrorProps) => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="text-center py-12">
      <div className="flex justify-center mb-4">
        <div className="bg-red-100 p-6 rounded-full">
          <AlertCircle className="h-12 w-12 text-red-500" />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        Erreur de chargement
      </h3>
      <p className="text-gray-500 mb-4">
        {error.message || "Impossible de charger les médiums"}
      </p>
      <Button onClick={handleRetry} variant="outline">
        Réessayer
      </Button>
    </div>
  );
};

export default VoyanceError;
