
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  backTo: string;
  className?: string;
}

const BackButton = ({ backTo, className = "mb-4" }: BackButtonProps) => {
  const navigate = useNavigate();
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => navigate(backTo)}
      className={className}
    >
      <ArrowLeft className="h-6 w-6" />
    </Button>
  );
};

export default BackButton;
