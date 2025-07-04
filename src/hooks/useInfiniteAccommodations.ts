import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchAccommodationsPaginated, AccommodationPaginationResult } from '@/services/accommodationService';
import { Accommodation } from '@/components/accommodation/AccommodationTypes';
import { useDebounce } from './useDebounce';

interface UseInfiniteAccommodationsProps {
  initialLimit?: number;
  threshold?: number;
  searchQuery?: string;
  priceFilter?: string;
}

interface UseInfiniteAccommodationsReturn {
  accommodations: Accommodation[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  totalCount: number;
  loadMore: () => void;
  reset: () => void;
  isLoadingMore: boolean;
}

export const useInfiniteAccommodations = ({
  initialLimit = 12,
  threshold = 200,
  searchQuery = '',
  priceFilter = ''
}: UseInfiniteAccommodationsProps = {}): UseInfiniteAccommodationsReturn => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [offset, setOffset] = useState(0);
  
  const loadingRef = useRef(false);
  
  // Utiliser le debounce pour la recherche (300ms de délai)
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const debouncedPriceFilter = useDebounce(priceFilter, 300);

  // Fonction pour charger les données
  const loadData = useCallback(async (currentOffset: number, isReset = false, searchQuery?: string, priceFilter?: string) => {
    if (loadingRef.current) return;
    
    loadingRef.current = true;
    
    try {
      if (isReset) {
        setLoading(true);
        setError(null);
      } else {
        setIsLoadingMore(true);
      }

      const result: AccommodationPaginationResult = await fetchAccommodationsPaginated(
        currentOffset,
        initialLimit,
        searchQuery ?? debouncedSearchQuery,
        priceFilter ?? debouncedPriceFilter
      );

      if (isReset) {
        setAccommodations(result.accommodations);
      } else {
        setAccommodations(prev => {
          // Éviter les doublons en filtrant les hébergements déjà présents
          const existingIds = new Set(prev.map(a => a.id));
          const newAccommodations = result.accommodations.filter(a => !existingIds.has(a.id));
          return [...prev, ...newAccommodations];
        });
      }

      setHasMore(result.hasMore);
      setTotalCount(result.totalCount);
      setOffset(result.nextOffset);
      
    } catch (err) {
      console.error('Erreur lors du chargement des hébergements:', err);
      setError('Impossible de charger les hébergements. Veuillez réessayer.');
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
      loadingRef.current = false;
    }
  }, [initialLimit, debouncedSearchQuery, debouncedPriceFilter]);

  // Fonction pour charger plus de données
  const loadMore = useCallback(() => {
    if (!hasMore || loadingRef.current) return;
    loadData(offset, false);
  }, [hasMore, offset, loadData]);

  // Fonction pour réinitialiser les données
  const reset = useCallback(() => {
    setAccommodations([]);
    setOffset(0);
    setHasMore(true);
    setError(null);
    loadData(0, true);
  }, [loadData]);

  // Effet pour la recherche et les filtres (utilise les valeurs debouncées)
  useEffect(() => {
    // Reset et rechargement avec les nouvelles valeurs debouncées
    setAccommodations([]);
    setOffset(0);
    setHasMore(true);
    setError(null);
    loadData(0, true);
  }, [debouncedSearchQuery, debouncedPriceFilter, loadData]);

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
    accommodations,
    loading,
    error,
    hasMore,
    totalCount,
    loadMore,
    reset,
    isLoadingMore
  };
};