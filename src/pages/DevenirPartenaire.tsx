import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PartnerHero } from "@/components/partner/PartnerHero";
import { PartnerAdvantages } from "@/components/partner/PartnerAdvantages";
import { PartnerApplicationForm } from "@/components/partner/PartnerApplicationForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DevenirPartenaire = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
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
      <main className="flex-1">
        <PartnerHero />
        <PartnerAdvantages />
        <PartnerApplicationForm />
      </main>
      
      <Footer />
    </div>
  );
};

export default DevenirPartenaire;
