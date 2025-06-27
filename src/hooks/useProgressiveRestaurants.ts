
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Restaurant } from "@/components/restaurant/types";

const RESTAURANTS_PER_PAGE = 6;

export const useProgressiveRestaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const fetchRestaurants = useCallback(async (pageNumber: number, reset = false) => {
    try {
      if (pageNumber === 0) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const from = pageNumber * RESTAURANTS_PER_PAGE;
      const to = from + RESTAURANTS_PER_PAGE - 1;

      const { data, error, count } = await supabase
        .from('restaurants')
        .select('*', { count: 'exact' })
        .order('poids', { ascending: false })
        .order('rating', { ascending: false })
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) {
        throw error;
      }

      if (data) {
        if (reset || pageNumber === 0) {
          setRestaurants(data);
        } else {
          setRestaurants(prev => [...prev, ...data]);
        }

        // Vérifier s'il y a plus de données
        const totalLoaded = (pageNumber + 1) * RESTAURANTS_PER_PAGE;
        setHasMore(count ? totalLoaded < count : data.length === RESTAURANTS_PER_PAGE);
      }
    } catch (err) {
      console.error('Erreur lors du chargement des restaurants:', err);
      setError("Impossible de charger les restaurants. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  const loadMore = useCallback(() => {
    if (!loadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchRestaurants(nextPage);
    }
  }, [page, loadingMore, hasMore, fetchRestaurants]);

  const refresh = useCallback(() => {
    setPage(0);
    setError(null);
    setHasMore(true);
    fetchRestaurants(0, true);
  }, [fetchRestaurants]);

  useEffect(() => {
    fetchRestaurants(0);
  }, [fetchRestaurants]);

  return {
    restaurants,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
    refresh
  };
};
