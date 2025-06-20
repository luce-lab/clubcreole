
import { useEffect, useState } from "react";
import { concerts } from "@/components/concert/ConcertTypes";
import { useConcertsSearch } from "@/hooks/useConcertsSearch";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ConcertPageHeader from "@/components/concert/ConcertPageHeader";
import ConcertList from "@/components/concert/ConcertList";
import ConcertInfoCard from "@/components/concert/ConcertInfoCard";
import ConcertsSearchBar from "@/components/concert/ConcertsSearchBar";
import ConcertsEmptyState from "@/components/concert/ConcertsEmptyState";
import { getConcerts } from "@/components/concert/ConcertTypes";

const ConcertActivity = () => {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getConcerts().then(data => {
      setConcerts(data);
      setLoading(false);
    });
  }, []);

  const { 
    searchQuery, 
    setSearchQuery, 
    filteredConcerts, 
    hasResults, 
    totalResults, 
    isSearching 
  } = useConcertsSearch(concerts);

  if (loading) {
    return <div className="text-center py-10">Chargement des concerts...</div>;
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

      <ConcertPageHeader 
        title="Concerts & Événements Musicaux"
        description="Découvrez les concerts partenaires du Club Créole et profitez d'offres exclusives"
      />

      <ConcertsSearchBar 
        onSearch={setSearchQuery}
        placeholder="Rechercher par nom, artiste, genre, lieu, offre..."
      />

      {isSearching && (
        <div className="mb-6 text-center">
          <p className="text-gray-600">
            {totalResults} concert{totalResults !== 1 ? 's' : ''} trouvé{totalResults !== 1 ? 's' : ''}
            {totalResults > 0 && ` pour "${searchQuery}"`}
          </p>
        </div>
      )}

      {hasResults ? (
        <>
          <ConcertList concerts={filteredConcerts} />
          
          <ConcertInfoCard 
            title="Comment profiter des avantages?"
            content="En tant que membre du Club Créole, présentez simplement votre carte de membre ou application mobile
            lors de l'achat de vos billets pour bénéficier des offres exclusives sur les concerts et événements partenaires."
            buttonText="Devenir membre"
          />
        </>
      ) : (
        <ConcertsEmptyState 
          isSearching={isSearching} 
          searchQuery={searchQuery}
        />
      )}
    </div>
  );
};

export default ConcertActivity;
