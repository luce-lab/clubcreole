
import { concerts } from "@/components/concert/ConcertTypes";
import { useConcertsSearch } from "@/hooks/useConcertsSearch";
import ConcertPageHeader from "@/components/concert/ConcertPageHeader";
import ConcertList from "@/components/concert/ConcertList";
import ConcertInfoCard from "@/components/concert/ConcertInfoCard";
import ConcertsSearchBar from "@/components/concert/ConcertsSearchBar";
import ConcertsEmptyState from "@/components/concert/ConcertsEmptyState";

const ConcertActivity = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    filteredConcerts, 
    hasResults, 
    totalResults, 
    isSearching 
  } = useConcertsSearch(concerts);

  return (
    <div className="container mx-auto px-4 py-8">
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
