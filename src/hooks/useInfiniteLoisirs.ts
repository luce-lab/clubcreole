import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchLoisirsPaginated, LoisirPaginationResult } from '@/services/loisirs/loisirCrud';
import { Loisir } from '@/components/loisirs/types';
import { useDebounce } from './useDebounce';

interface UseInfiniteLoisirsProps {
  initialLimit?: number;
  threshold?: number;
  searchQuery?: string;
}

interface UseInfiniteLoisirsReturn {
  loisirs: Loisir[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  totalCount: number;
  loadMore: () => void;
  reset: () => void;
  isLoadingMore: boolean;
}

export const useInfiniteLoisirs = ({
  initialLimit = 12,
  threshold = 200,
  searchQuery = ''
}: UseInfiniteLoisirsProps = {}): UseInfiniteLoisirsReturn => {
  const [loisirs, setLoisirs] = useState<Loisir[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [offset, setOffset] = useState(0);
  
  const loadingRef = useRef(false);
  
  // Debouncer la recherche avec un délai de 500ms
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const searchQueryRef = useRef(debouncedSearchQuery);

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

      const result: LoisirPaginationResult = await fetchLoisirsPaginated(
        currentOffset,
        initialLimit,
        searchQueryRef.current
      );

      if (isReset) {
        setLoisirs(result.loisirs);
      } else {
        setLoisirs(prev => {
          // Éviter les doublons en filtrant les loisirs déjà présents
          const existingIds = new Set(prev.map(l => l.id));
          const newLoisirs = result.loisirs.filter(l => !existingIds.has(l.id));
          return [...prev, ...newLoisirs];
        });
      }

      setHasMore(result.hasMore);
      setTotalCount(result.totalCount);
      setOffset(result.nextOffset);
      
    } catch (err) {
      console.error('Erreur lors du chargement des loisirs:', err);
      setError('Impossible de charger les activités de loisirs. Veuillez réessayer.');
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
    setLoisirs([]);
    setOffset(0);
    setHasMore(true);
    setError(null);
    loadData(0, true);
  }, [loadData]);

  // Effet pour la recherche (utilise la valeur debouncée)
  useEffect(() => {
    searchQueryRef.current = debouncedSearchQuery;
    reset();
  }, [debouncedSearchQuery, reset]);

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
    loisirs,
    loading,
    error,
    hasMore,
    totalCount,
    loadMore,
    reset,
    isLoadingMore
  };
};