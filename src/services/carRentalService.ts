import { supabase } from "@/integrations/supabase/client";
import { Car, Route, Shield, Fuel } from "lucide-react";
import type { 
  CarRental, 
  ClientReview,
  CarModelForDisplay 
} from '@/components/car-rental/CarRentalTypes';
import type { Tables } from '@/integrations/supabase/types';

// Types depuis la base de données Supabase
type CarRentalCompanyDB = Tables<'car_rental_companies'>;
type CarModelDB = Tables<'car_models'>;
type CarRentalFeatureDB = Tables<'car_rental_features'>;
type CarClientReviewDB = Tables<'car_client_reviews'>;

export interface CarRentalReservation {
  id: string;
  rental_company_name: string;
  selected_model: string;
  start_date: string;
  end_date: string;
  driver_name: string;
  driver_email: string;
  driver_phone: string;
  status: string;
  notes?: string;
  partner_id?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCarRentalReservationData {
  rental_company_name: string;
  selected_model: string;
  start_date: string;
  end_date: string;
  driver_name: string;
  driver_email: string;
  driver_phone: string;
  notes?: string;
}

export async function createCarRentalReservation(
  reservationData: CreateCarRentalReservationData
): Promise<CarRentalReservation> {
  console.log("Création d'une réservation de location de voiture:", reservationData);

  // Récupérer l'ID du partenaire propriétaire de l'entreprise
  const { data: companyData, error: companyError } = await supabase
    .from("car_rental_companies")
    .select("partner_id")
    .eq("name", reservationData.rental_company_name)
    .single();

  if (companyError) {
    console.error("Erreur lors de la récupération de l'entreprise:", companyError);
  }

  const dataToInsert = {
    ...reservationData,
    partner_id: companyData?.partner_id || null
  };

  const { data, error } = await supabase
    .from("car_rental_reservations")
    .insert(dataToInsert)
    .select("*")
    .single();

  if (error) {
    console.error("Erreur lors de la création de la réservation:", error);
    throw error;
  }

  console.log("Réservation créée avec succès:", data);
  return data;
}

export async function fetchCarRentalReservations(): Promise<CarRentalReservation[]> {
  const { data, error } = await supabase
    .from("car_rental_reservations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erreur lors de la récupération des réservations:", error);
    throw error;
  }

  return data || [];
}

export async function updateCarRentalReservationStatus(
  id: string,
  status: string
): Promise<void> {
  const { error } = await supabase
    .from("car_rental_reservations")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("Erreur lors de la mise à jour du statut:", error);
    throw error;
  }
}

export async function deleteCarRentalReservation(id: string): Promise<void> {
  const { error } = await supabase
    .from("car_rental_reservations")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Erreur lors de la suppression de la réservation:", error);
    throw error;
  }
}

// Mapping des icônes
const iconMap = {
  'Car': Car,
  'Shield': Shield,
  'Fuel': Fuel,
  'Route': Route,
};

/**
 * Récupère toutes les entreprises de location avec leurs modèles et fonctionnalités
 */
export const getCarRentals = async (): Promise<CarRental[]> => {
  try {
    // Récupération des entreprises
    const { data: companies, error: companiesError } = await supabase
      .from('car_rental_companies')
      .select('*')
      .order('id');

    if (companiesError) {
      throw companiesError;
    }

    if (!companies) {
      return [];
    }

    // Récupération des modèles pour toutes les entreprises (seulement les actifs pour le public)
    const { data: models, error: modelsError } = await supabase
      .from('car_models')
      .select('*')
      .eq('is_active', true)
      .order('company_id, id');

    if (modelsError) {
      throw modelsError;
    }

    // Récupération des fonctionnalités pour toutes les entreprises
    const { data: features, error: featuresError } = await supabase
      .from('car_rental_features')
      .select('*')
      .order('company_id, id');

    if (featuresError) {
      throw featuresError;
    }

    // Transformation des données pour l'affichage
    const carRentals: CarRental[] = companies.map((company: CarRentalCompanyDB) => {
      const companyModels = (models || []).filter((model: CarModelDB) => model.company_id === company.id);
      const companyFeatures = (features || []).filter((feature: CarRentalFeatureDB) => feature.company_id === company.id);

      return {
        id: company.id,
        name: company.name,
        type: company.type,
        image: company.image,
        location: company.location,
        description: company.description,
        rating: company.rating,
        offer: company.offer,
        icon: iconMap[company.icon_name as keyof typeof iconMap] || Car,
        features: companyFeatures.map(f => f.feature),
        models: companyModels.map((model: CarModelDB): CarModelForDisplay => ({
          id: model.id,
          company_id: model.company_id,
          name: model.name,
          image: model.image,
          pricePerDay: model.price_per_day, // Mappage correct
          category: model.category,
          seats: model.seats,
          transmission: model.transmission,
          airCon: model.air_con, // Mappage correct
          created_at: model.created_at,
          updated_at: model.updated_at
        }))
      };
    });

    return carRentals;
  } catch (error) {
    console.error('Erreur lors de la récupération des locations de voitures:', error);
    throw error;
  }
};

/**
 * Récupère tous les avis clients
 */
export const getClientReviews = async (): Promise<ClientReview[]> => {
  try {
    const { data, error } = await supabase
      .from('car_client_reviews')
      .select('*')
      .order('id');

    if (error) {
      throw error;
    }

    if (!data) {
      return [];
    }

    // Transformation des données pour l'affichage
    const reviews: ClientReview[] = data.map((review: CarClientReviewDB) => ({
      id: review.id,
      name: review.name,
      location: review.location,
      avatar: review.avatar,
      comment: review.comment,
      rating: review.rating,
      date: new Date(review.review_date).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      rentalCompany: review.rental_company_name
    }));

    return reviews;
  } catch (error) {
    console.error('Erreur lors de la récupération des avis clients:', error);
    throw error;
  }
};

/**
 * Récupère une entreprise de location spécifique avec ses détails
 */
export const getCarRentalById = async (id: number): Promise<CarRental | null> => {
  try {
    const carRentals = await getCarRentals();
    return carRentals.find(rental => rental.id === id) || null;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'entreprise de location:', error);
    throw error;
  }
};

/**
 * Récupère les avis pour une entreprise spécifique
 */
export const getReviewsByCompany = async (companyName: string): Promise<ClientReview[]> => {
  try {
    const { data, error } = await supabase
      .from('car_client_reviews')
      .select('*')
      .eq('rental_company_name', companyName)
      .order('id');

    if (error) {
      throw error;
    }

    if (!data) {
      return [];
    }

    const reviews: ClientReview[] = data.map((review: CarClientReviewDB) => ({
      id: review.id,
      name: review.name,
      location: review.location,
      avatar: review.avatar,
      comment: review.comment,
      rating: review.rating,
      date: new Date(review.review_date).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      rentalCompany: review.rental_company_name
    }));

    return reviews;
  } catch (error) {
    console.error('Erreur lors de la récupération des avis:', error);
    throw error;
  }
};
