
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AccommodationSearch } from "@/components/accommodation/AccommodationSearch";
import { AccommodationGrid } from "@/components/accommodation/AccommodationGrid";
import { AccommodationAdvantages } from "@/components/accommodation/AccommodationAdvantages";
import { MembershipCard } from "@/components/accommodation/MembershipCard";
import { AccommodationLoading } from "@/components/accommodation/AccommodationLoading";
import { AccommodationError } from "@/components/accommodation/AccommodationError";
import { AccommodationEmptyState } from "@/components/accommodation/AccommodationEmptyState";
import { Accommodation } from "@/components/accommodation/AccommodationTypes";
import { fetchAccommodationsWeightedRandom } from "@/services/accommodationService";

const AccommodationActivity = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState<string>("");
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAccommodations = async () => {
      try {
        setLoading(true);
        const data = await fetchAccommodationsWeightedRandom();
        setAccommodations(data);
      } catch (err) {
        console.error("Erreur lors de la récupération des hébergements:", err);
        setError("Impossible de charger les hébergements. Veuillez réessayer plus tard.");
      } finally {
        setLoading(false);
      }
    };

    loadAccommodations();
  }, []);

  const filteredAccommodations = accommodations.filter(accommodation => {
    const matchesSearch = accommodation.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        accommodation.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        accommodation.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPrice = priceFilter === "" || 
                        (priceFilter === "low" && accommodation.price < 80) ||
                        (priceFilter === "medium" && accommodation.price >= 80 && accommodation.price < 100) ||
                        (priceFilter === "high" && accommodation.price >= 100);
    
    return matchesSearch && matchesPrice;
  });

  if (loading) {
    return <AccommodationLoading />;
  }

  if (error) {
    return <AccommodationError error={error} />;
  }

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

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-creole-blue">Hébergements en Guadeloupe</h1>
        <p className="text-gray-600 mt-2">
          Découvrez notre sélection d'hébergements pour un séjour inoubliable. Villas, hôtels, bungalows et plus encore!
        </p>
      </div>

      <AccommodationSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
      />

      {filteredAccommodations.length > 0 ? (
        <AccommodationGrid accommodations={filteredAccommodations} />
      ) : (
        <AccommodationEmptyState />
      )}

      <MembershipCard />

      <AccommodationAdvantages />
    </div>
  );
};

export default AccommodationActivity;
