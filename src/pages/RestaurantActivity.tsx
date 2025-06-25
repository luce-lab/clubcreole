
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Restaurant } from "@/components/restaurant/types";
import RestaurantHeader from "@/components/restaurant/RestaurantHeader";
import RestaurantGrid from "@/components/restaurant/RestaurantGrid";
import RestaurantLoader from "@/components/restaurant/RestaurantLoader";
import RestaurantInfo from "@/components/restaurant/RestaurantInfo";
import RestaurantsSearchBar from "@/components/restaurant/RestaurantsSearchBar";
import RestaurantsEmptyState from "@/components/restaurant/RestaurantsEmptyState";
import { useRestaurantsSearch } from "@/hooks/useRestaurantsSearch";

const RestaurantActivity = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { 
    searchQuery, 
    setSearchQuery, 
    filteredRestaurants, 
    hasResults, 
    totalResults, 
    isSearching 
  } = useRestaurantsSearch(restaurants);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const { data, error } = await supabase
          .from('restaurants')
          .select('*')
          .order('poids', { ascending: false })
          .order('rating', { ascending: false })
          .order('created_at', { ascending: false })
          .order('updated_at', { ascending: false });

        if (error) {
          throw error;
        }

        if (data) {
          setRestaurants(data);
        }
      } catch (err) {
        console.error('Erreur lors du chargement des restaurants:', err);
        setError("Impossible de charger les restaurants. Veuillez réessayer plus tard.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) {
    return <RestaurantLoader />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <RestaurantHeader />
        <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <RestaurantHeader />
      
      <RestaurantsSearchBar 
        onSearch={setSearchQuery}
        placeholder="Rechercher par nom, type, lieu, offre..."
      />

      {isSearching && (
        <div className="mb-6 text-center">
          <p className="text-gray-600">
            {totalResults} restaurant{totalResults !== 1 ? 's' : ''} trouvé{totalResults !== 1 ? 's' : ''}
            {totalResults > 0 && ` pour "${searchQuery}"`}
          </p>
        </div>
      )}

      {hasResults ? (
        <>
          <RestaurantGrid restaurants={filteredRestaurants} />
          <RestaurantInfo />
        </>
      ) : (
        <RestaurantsEmptyState 
          isSearching={isSearching} 
          searchQuery={searchQuery}
        />
      )}
    </div>
  );
};

export default RestaurantActivity;
