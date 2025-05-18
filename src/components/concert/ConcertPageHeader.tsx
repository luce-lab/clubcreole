
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ConcertPageHeaderProps {
  title: string;
  description: string;
}

const ConcertPageHeader: React.FC<ConcertPageHeaderProps> = ({ title, description }) => {
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
        <h1 className="text-3xl font-bold text-creole-blue">{title}</h1>
        <p className="text-gray-600 mt-2">
          {description}
        </p>
      </div>
    </>
  );
};

export default ConcertPageHeader;
