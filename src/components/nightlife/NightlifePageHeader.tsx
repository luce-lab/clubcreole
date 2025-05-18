
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NightlifePageHeader = () => {
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
        <h1 className="text-3xl font-bold text-[#9b87f5]">Soirées & Vie Nocturne</h1>
        <p className="text-gray-600 mt-2">
          Découvrez les meilleures soirées et établissements nocturnes partenaires du Club Créole
        </p>
      </div>
    </>
  );
};

export default NightlifePageHeader;
