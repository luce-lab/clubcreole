
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface LoisirsDetailHeaderProps {
  title?: string;
}

const LoisirsDetailHeader = ({ title }: LoisirsDetailHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="mb-6">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate('/loisirs')}
        className="mb-2"
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <h1 className="text-3xl font-bold text-creole-blue">
        {title || "Détails de l'activité"}
      </h1>
      <div className="h-1 w-20 bg-creole-green mt-2"></div>
    </div>
  );
};

export default LoisirsDetailHeader;
