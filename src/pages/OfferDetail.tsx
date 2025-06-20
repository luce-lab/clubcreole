
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const OfferDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement de l'offre...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/offers')}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux offres
          </Button>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Détails de l'offre #{id}
            </h1>
            <p className="text-gray-600 mb-8">
              Cette page affiche les détails de l'offre sélectionnée.
            </p>
            
            <div className="space-y-6">
              <div className="border rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-3">Informations de l'offre</h2>
                <p className="text-gray-600">
                  Les détails complets de l'offre seront affichés ici une fois connectés à la base de données.
                </p>
              </div>
              
              <div className="border rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-3">Conditions</h2>
                <p className="text-gray-600">
                  Les conditions et modalités de l'offre seront listées ici.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OfferDetail;
