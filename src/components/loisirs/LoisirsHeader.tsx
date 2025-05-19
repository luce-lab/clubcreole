
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LoisirsHeader = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button 
        onClick={() => navigate(-1)} 
        variant="ghost" 
        className="mb-6 group flex items-center gap-1 hover:gap-2 transition-all"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Retour</span>
      </Button>
      
      <h1 className="text-3xl md:text-4xl font-bold text-center text-creole-blue mb-8">
        Nos Activités de Loisirs
      </h1>
      
      <p className="text-lg text-center mb-12 max-w-3xl mx-auto">
        Découvrez notre sélection d'activités de loisirs authentiques aux Antilles.
        Inscrivez-vous et immergez-vous dans la culture créole à travers des expériences uniques.
      </p>
    </>
  );
};

export default LoisirsHeader;
