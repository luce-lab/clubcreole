
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NightlifePageHeader = () => {
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
        <h1 className="text-3xl font-bold text-[#9b87f5]">Soirées & Vie Nocturne</h1>
        <p className="text-gray-600 mt-2">
          Découvrez les meilleures soirées et établissements nocturnes partenaires du Club Créole
        </p>
      </div>
    </>
  );
};

export default NightlifePageHeader;
