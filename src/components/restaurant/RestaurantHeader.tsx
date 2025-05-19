
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const RestaurantHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="mb-8">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>

      <h1 className="text-3xl font-bold text-creole-blue">Nos Restaurants Partenaires</h1>
      <p className="text-gray-600 mt-2">
        Découvrez les restaurants partenaires du Club Créole et profitez d'offres exclusives
      </p>
    </div>
  );
};

export default RestaurantHeader;
