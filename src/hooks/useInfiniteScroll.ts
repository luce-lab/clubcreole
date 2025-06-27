import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchRestaurantsPaginated, RestaurantPaginationResult } from '@/services/restaurantService';
import { Restaurant } from '@/components/restaurant/types';

interface UseInfiniteScrollProps {
  initialLimit?: number;
  threshold?: number;
  searchQuery?: string;
}

interface UseInfiniteScrollReturn {
  restaurants: Restaurant[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  totalCount: number;
  loadMore: () => void;
  reset: () => void;
  isLoadingMore: boolean;
}

export const useInfiniteScroll = ({
  initialLimit = 12,
  threshold = 200,
  searchQuery = ''
}: UseInfiniteScrollProps = {}): UseInfiniteScrollReturn => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [offset, setOffset] = useState(0);
  
  const loadingRef = useRef(false);
  const searchQueryRef = useRef(searchQuery);

  // Fonction pour charger les données
  const loadData = useCallback(async (currentOffset: number, isReset = false) => {
    if (loadingRef.current) return;
    
    loadingRef.current = true;
    
    try {
      if (isReset) {
        setLoading(true);
        setError(null);
      } else {
        setIsLoadingMore(true);
      }

      const result: RestaurantPaginationResult = await fetchRestaurantsPaginated(
        currentOffset,
        initialLimit,
        searchQueryRef.current
      );

      if (isReset) {
        setRestaurants(result.restaurants);
      } else {
        setRestaurants(prev => {
          // Éviter les doublons en filtrant les restaurants déjà présents
          const existingIds = new Set(prev.map(r => r.id));
          const newRestaurants = result.restaurants.filter(r => !existingIds.has(r.id));
          return [...prev, ...newRestaurants];
        });
      }

      setHasMore(result.hasMore);
      setTotalCount(result.totalCount);
      setOffset(result.nextOffset);
      
    } catch (err) {
      console.error('Erreur lors du chargement des restaurants:', err);
      setError('Impossible de charger les restaurants. Veuillez réessayer.');
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
      loadingRef.current = false;
    }
  }, [initialLimit]);

  // Fonction pour charger plus de données
  const loadMore = useCallback(() => {
    if (!hasMore || loadingRef.current) return;
    loadData(offset, false);
  }, [hasMore, offset, loadData]);

  // Fonction pour réinitialiser les données
  const reset = useCallback(() => {
    setRestaurants([]);
    setOffset(0);
    setHasMore(true);
    setError(null);
    loadData(0, true);
  }, [loadData]);

  // Effet pour la recherche
  useEffect(() => {
    searchQueryRef.current = searchQuery;
    reset();
  }, [searchQuery, reset]);

  // Effet pour le scroll infini
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - threshold
      ) {
        loadMore();
      }
    };

    // Ajouter l'écouteur de scroll avec throttling
    let throttleTimer: NodeJS.Timeout | null = null;
    const throttledScrollHandler = () => {
      if (throttleTimer === null) {
        throttleTimer = setTimeout(() => {
          handleScroll();
          throttleTimer = null;
        }, 100);
      }
    };

    window.addEventListener('scroll', throttledScrollHandler);
    
    return () => {
      window.removeEventListener('scroll', throttledScrollHandler);
      if (throttleTimer) {
        clearTimeout(throttleTimer);
      }
    };
  }, [loadMore, threshold]);

  // Chargement initial
  useEffect(() => {
    loadData(0, true);
  }, [loadData]);

  return {
    restaurants,
    loading,
    error,
    hasMore,
    totalCount,
    loadMore,
    reset,
    isLoadingMore
  };
};