
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CarRentalHeader = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>

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
