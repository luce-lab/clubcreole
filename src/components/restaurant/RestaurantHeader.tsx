
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const RestaurantHeader = () => {
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
      
      <h1 className="text-3xl md:text-4xl font-bold text-center text-creole-blue mb-8">
        Nos restaurants
      </h1>
      
      <p className="text-lg text-center mb-12 max-w-3xl mx-auto">
        Découvrez notre sélection de restaurants authentiques aux Antilles.
        Réservez une table et savourez les saveurs créoles dans une ambiance chaleureuse.
      </p>
    </>
  );
};

export default RestaurantHeader;
