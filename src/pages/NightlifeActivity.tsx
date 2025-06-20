
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import NightlifePageHeader from "@/components/nightlife/NightlifePageHeader";
import NightlifeEventsList from "@/components/nightlife/NightlifeEventsList";
import NightlifeInfoCard from "@/components/nightlife/NightlifeInfoCard";

const NightlifeActivity = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
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
      
      <NightlifePageHeader />
      <NightlifeEventsList />
      <NightlifeInfoCard />
    </div>
  );
};

export default NightlifeActivity;
