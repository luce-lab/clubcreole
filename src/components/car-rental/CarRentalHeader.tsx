
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CarRentalHeader = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à l'accueil
        </Button>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-creole-blue">Location de Voitures</h1>
        <p className="text-gray-600 mt-2">
          Découvrez nos partenaires de location de voitures et profitez d'offres exclusives avec votre abonnement Club Créole
        </p>
      </div>
    </>
  );
};

export default CarRentalHeader;
