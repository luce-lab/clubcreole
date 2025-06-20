
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import VoyanceHeader from "@/components/voyance/VoyanceHeader";
import VoyanceMediumsList from "@/components/voyance/VoyanceMediumsList";
import VoyanceSearchBar from "@/components/voyance/VoyanceSearchBar";

const VoyanceActivity = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
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
        <VoyanceHeader />
        <VoyanceSearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <VoyanceMediumsList searchTerm={searchTerm} />
      </main>
      <Footer />
    </div>
  );
};

export default VoyanceActivity;
