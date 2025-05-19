
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Restaurant } from "@/components/restaurant/types";
import RestaurantHeader from "@/components/restaurant/RestaurantHeader";
import RestaurantGrid from "@/components/restaurant/RestaurantGrid";
import RestaurantLoader from "@/components/restaurant/RestaurantLoader";
import RestaurantInfo from "@/components/restaurant/RestaurantInfo";

const RestaurantActivity = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const { data, error } = await supabase
          .from('restaurants')
          .select('*')
          .order('rating', { ascending: false });

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
      <RestaurantGrid restaurants={restaurants} />
      <RestaurantInfo />
    </div>
  );
};

export default RestaurantActivity;
