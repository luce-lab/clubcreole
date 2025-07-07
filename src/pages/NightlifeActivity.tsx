
import { useState, useEffect } from "react";
import NightlifePageHeader from "@/components/nightlife/NightlifePageHeader";
import NightlifeEventsList from "@/components/nightlife/NightlifeEventsList";
import NightlifeInfoCard from "@/components/nightlife/NightlifeInfoCard";
import { NightlifeSearchBar } from "@/components/nightlife/NightlifeSearchBar";
import { getNightlifeEvents, NightEvent } from "@/components/nightlife/NightlifeTypes";
import { useNightlifeSearch } from "@/hooks/useNightlifeSearch";

const NightlifeActivity = () => {
  const [events, setEvents] = useState<NightEvent[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { 
    searchQuery, 
    setSearchQuery, 
    filteredNightEvents, 
    hasResults, 
    totalResults,
    isSearching 
  } = useNightlifeSearch(events);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getNightlifeEvents();
        setEvents(eventsData);
      } catch (error) {
        console.error('Error loading nightlife events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <NightlifePageHeader />
      
      {/* Barre de recherche centrée */}
      <div className="flex flex-col items-center mb-8 gap-4">
        <NightlifeSearchBar 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        {isSearching && (
          <div className="text-sm text-gray-600">
            {totalResults} résultat{totalResults > 1 ? 's' : ''} pour "{searchQuery}"
          </div>
        )}
      </div>
      
      {/* Affichage des résultats */}
      {isSearching && !hasResults && !loading ? (
        <div className="text-center py-12 mb-10">
          <p className="text-gray-500 text-lg">
            Aucune soirée trouvée pour "{searchQuery}"
          </p>
          <p className="text-gray-400 mt-2">
            Essayez avec d'autres mots-clés ou supprimez les filtres
          </p>
        </div>
      ) : (
        <NightlifeEventsList 
          events={filteredNightEvents} 
          loading={loading}
        />
      )}
      
      <NightlifeInfoCard />
    </div>
  );
};

export default NightlifeActivity;
