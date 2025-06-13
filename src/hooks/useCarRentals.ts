import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { 
  getCarRentals, 
  getClientReviews, 
  getCarRentalById, 
  getReviewsByCompany 
} from '@/services/carRentalService';
import type { CarRental, ClientReview } from '@/components/car-rental/CarRentalTypes';

/**
 * Hook pour récupérer toutes les entreprises de location de voitures
 */
export const useCarRentals = () => {
  const [carRentals, setCarRentals] = useState<CarRental[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchCarRentals = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCarRentals();
      setCarRentals(data);
    } catch (err) {
      const errorMessage = 'Erreur lors du chargement des entreprises de location';
      setError(errorMessage);
      toast({
        title: "Erreur", 
        description: errorMessage,
        variant: "destructive",
      });
      console.error('Erreur useCarRentals:', err);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchCarRentals();
  }, [fetchCarRentals]);

  return {
    carRentals,
    loading,
    error,
    refetch: fetchCarRentals
  };
};

/**
 * Hook pour récupérer tous les avis clients
 */
export const useClientReviews = () => {
  const [reviews, setReviews] = useState<ClientReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getClientReviews();
      setReviews(data);
    } catch (err) {
      const errorMessage = 'Erreur lors du chargement des avis clients';
      setError(errorMessage);
      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive",
      });
      console.error('Erreur useClientReviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return {
    reviews,
    loading,
    error,
    refetch: fetchReviews
  };
};

/**
 * Hook pour récupérer une entreprise de location spécifique
 */
export const useCarRental = (id: number | null) => {
  const [carRental, setCarRental] = useState<CarRental | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchCarRental = async (rentalId: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCarRentalById(rentalId);
      setCarRental(data);
    } catch (err) {
      const errorMessage = 'Erreur lors du chargement de l\'entreprise de location';
      setError(errorMessage);
      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive",
      });
      console.error('Erreur useCarRental:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id !== null) {
      fetchCarRental(id);
    } else {
      setCarRental(null);
      setLoading(false);
      setError(null);
    }
  }, [id]);

  return {
    carRental,
    loading,
    error,
    refetch: id !== null ? () => fetchCarRental(id) : undefined
  };
};

/**
 * Hook pour récupérer les avis d'une entreprise spécifique
 */
export const useCompanyReviews = (companyName: string | null) => {
  const [reviews, setReviews] = useState<ClientReview[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchCompanyReviews = async (company: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getReviewsByCompany(company);
      setReviews(data);
    } catch (err) {
      const errorMessage = 'Erreur lors du chargement des avis de l\'entreprise';
      setError(errorMessage);
      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive",
      });
      console.error('Erreur useCompanyReviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (companyName) {
      fetchCompanyReviews(companyName);
    } else {
      setReviews([]);
      setLoading(false);
      setError(null);
    }
  }, [companyName]);

  return {
    reviews,
    loading,
    error,
    refetch: companyName ? () => fetchCompanyReviews(companyName) : undefined
  };
}; 