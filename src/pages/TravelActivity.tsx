
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TravelHeader } from "@/components/travel/TravelHeader";
import { TravelOffersList } from "@/components/travel/TravelOffersList";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TravelActivity = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l'accueil
          </Button>
        </div>
        <TravelHeader />
        <TravelOffersList />
      </main>
      <Footer />
    </div>
  );
};

export default TravelActivity;
