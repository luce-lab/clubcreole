
import { supabase } from '@/integrations/supabase/client';
import type { 
  CarRentalCompany, 
  CarModel, 
  CarRentalFeature, 
  CarClientReview,
  CarRental, 
  ClientReview,
  CarModelForDisplay 
} from '@/components/car-rental/CarRentalTypes';
import { 
  Car, 
  Truck, 
  Zap, 
  Users,
  type LucideIcon
} from 'lucide-react';

// Car rental reservation types
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
}

// Mapping des noms d'icônes vers les composants Lucide
const iconMap: Record<string, LucideIcon> = {
  'car': Car,
  'truck': Truck,
  'zap': Zap,
  'users': Users,
  'Car': Car,
  'Truck': Truck,
  'Zap': Zap,
  'Users': Users
};

/**
 * Récupère toutes les entreprises de location de voitures avec leurs modèles et caractéristiques
 */
export const getCarRentals = async (): Promise<CarRental[]> => {
  try {
    console.log('Début de la récupération des locations de voitures...');
    
    // Récupérer les entreprises
    const { data: companies, error: companiesError } = await supabase
      .from('car_rental_companies')
      .select('*')
      .order('rating', { ascending: false });

    if (companiesError) {
      console.error('Erreur lors de la récupération des entreprises:', companiesError);
      throw companiesError;
    }

    if (!companies || companies.length === 0) {
      console.log('Aucune entreprise trouvée');
      return [];
    }

    console.log(`${companies.length} entreprises récupérées`);

    // Récupérer tous les modèles
    const { data: models, error: modelsError } = await supabase
      .from('car_models')
      .select('*')
      .eq('is_active', true);

    if (modelsError) {
      console.error('Erreur lors de la récupération des modèles:', modelsError);
      throw modelsError;
    }

    // Récupérer les caractéristiques (avec gestion d'erreur)
    let features: CarRentalFeature[] = [];
    try {
      const { data: featuresData, error: featuresError } = await supabase
        .from('car_rental_features')
        .select('*');

      if (featuresError) {
        console.warn('Table car_rental_features non disponible:', featuresError.message);
        // Continuer sans les caractéristiques
      } else {
        features = featuresData || [];
      }
    } catch (err) {
      console.warn('Erreur lors de la récupération des caractéristiques, continuation sans elles:', err);
    }

    console.log(`${models?.length || 0} modèles et ${features.length} caractéristiques récupérés`);

    // Traitement des données
    const carRentals: CarRental[] = companies.map((company) => {
      // Mapper les modèles pour cette entreprise
      const companyModels = models?.filter(model => model.company_id === company.id) || [];
      const mappedModels: CarModelForDisplay[] = companyModels.map(model => ({
        ...model,
        pricePerDay: model.price_per_day,
        airCon: model.air_con
      }));

      // Mapper les caractéristiques pour cette entreprise
      const companyFeatures = features
        .filter(feature => feature.company_id === company.id)
        .map(feature => feature.feature);

      // Obtenir l'icône Lucide
      const IconComponent = iconMap[company.icon_name] || Car;

      // Safely handle gallery_images as Json type
      let galleryImages: string[] = [];
      if (company.gallery_images) {
        if (Array.isArray(company.gallery_images)) {
          galleryImages = company.gallery_images as string[];
        } else if (typeof company.gallery_images === 'string') {
          try {
            const parsed = JSON.parse(company.gallery_images);
            galleryImages = Array.isArray(parsed) ? parsed : [];
          } catch {
            galleryImages = [];
          }
        }
      }

      return {
        id: company.id,
        name: company.name,
        type: company.type,
        image: company.image,
        gallery_images: galleryImages,
        location: company.location,
        description: company.description,
        rating: Number(company.rating),
        offer: company.offer,
        icon: IconComponent,
        features: companyFeatures,
        models: mappedModels
      };
    });

    console.log('Données transformées avec succès');
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
      .order('review_date', { ascending: false });

    if (error) {
      console.error('Erreur lors de la récupération des avis:', error);
      throw error;
    }

    if (!data) {
      return [];
    }

    // Transformer les données pour l'affichage
    const reviews: ClientReview[] = data.map((review: CarClientReview) => ({
      id: review.id,
      name: review.name,
      location: review.location,
      avatar: review.avatar,
      comment: review.comment,
      rating: review.rating,
      date: new Date(review.review_date).toLocaleDateString('fr-FR'),
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
    const { data: company, error: companyError } = await supabase
      .from('car_rental_companies')
      .select('*')
      .eq('id', id)
      .single<CarRentalCompany>();

    if (companyError) {
      console.error('Erreur lors de la récupération de l\'entreprise:', companyError);
      throw companyError;
    }

    if (!company) {
      console.log('Entreprise non trouvée');
      return null;
    }

    // Récupérer les modèles de cette entreprise
    const { data: models, error: modelsError } = await supabase
      .from('car_models')
      .select('*')
      .eq('company_id', id)
      .eq('is_active', true);

    if (modelsError) {
      console.error('Erreur lors de la récupération des modèles:', modelsError);
      throw modelsError;
    }

    // Récupérer les caractéristiques (avec gestion d'erreur)
    let features: string[] = [];
    try {
      const { data: featuresData, error: featuresError } = await supabase
        .from('car_rental_features')
        .select('feature')
        .eq('company_id', id);

      if (featuresError) {
        console.warn('Table car_rental_features non disponible:', featuresError.message);
      } else {
        features = featuresData?.map(f => f.feature) || [];
      }
    } catch (err) {
      console.warn('Erreur lors de la récupération des caractéristiques:', err);
    }

    // Mapper les modèles
    const mappedModels: CarModelForDisplay[] = models?.map(model => ({
      ...model,
      pricePerDay: model.price_per_day,
      airCon: model.air_con
    })) || [];

    // Obtenir l'icône Lucide
    const IconComponent = iconMap[company.icon_name] || Car;

    const carRental: CarRental = {
      id: company.id,
      name: company.name,
      type: company.type,
      image: company.image,
      gallery_images: company.gallery_images || [],
      location: company.location,
      description: company.description,
      rating: Number(company.rating),
      offer: company.offer,
      icon: IconComponent,
      features,
      models: mappedModels
    };

    console.log('Entreprise récupérée avec succès');
    return carRental;

  } catch (error) {
    console.error('Erreur lors de la récupération de l\'entreprise:', error);
    throw error;
  }
};

/**
 * Récupère les avis pour une entreprise spécifique
 */
export const getReviewsByCompany = async (companyName: string): Promise<ClientReview[]> => {
  try {
    console.log(`Récupération des avis pour ${companyName}...`);
    
    const { data, error } = await supabase
      .from('car_client_reviews')
      .select('*')
      .eq('rental_company_name', companyName)
      .order('review_date', { ascending: false });

    if (error) {
      console.error('Erreur lors de la récupération des avis:', error);
      throw error;
    }

    if (!data) {
      return [];
    }

    // Transformer les données pour l'affichage
    const reviews: ClientReview[] = data.map((review: CarClientReview) => ({
      id: review.id,
      name: review.name,
      location: review.location,
      avatar: review.avatar,
      comment: review.comment,
      rating: review.rating,
      date: new Date(review.review_date).toLocaleDateString('fr-FR'),
      rentalCompany: review.rental_company_name
    }));

    console.log(`${reviews.length} avis récupérés pour ${companyName}`);
    return reviews;

  } catch (error) {
    console.error('Erreur lors de la récupération des avis de l\'entreprise:', error);
    throw error;
  }
};

/**
 * Crée une nouvelle réservation de location de voiture
 */
export const createCarRentalReservation = async (reservationData: CreateCarRentalReservationData): Promise<CarRentalReservation> => {
  try {
    console.log('Création d\'une réservation de location:', reservationData);
    
    const { data, error } = await supabase
      .from('car_rental_reservations')
      .insert([reservationData])
      .select()
      .single();

    if (error) {
      console.error('Erreur lors de la création de la réservation:', error);
      throw error;
    }

    console.log('Réservation créée avec succès:', data);
    return data as CarRentalReservation;

  } catch (error) {
    console.error('Erreur lors de la création de la réservation:', error);
    throw error;
  }
};

/**
 * Récupère toutes les réservations de location de voitures
 */
export const fetchCarRentalReservations = async (): Promise<CarRentalReservation[]> => {
  try {
    console.log('Récupération des réservations de location...');
    
    const { data, error } = await supabase
      .from('car_rental_reservations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erreur lors de la récupération des réservations:', error);
      throw error;
    }

    console.log(`${data?.length || 0} réservations récupérées`);
    return data || [];

  } catch (error) {
    console.error('Erreur lors de la récupération des réservations:', error);
    throw error;
  }
};

/**
 * Met à jour le statut d'une réservation de location de voiture
 */
export const updateCarRentalReservationStatus = async (id: string, status: string): Promise<void> => {
  try {
    console.log(`Mise à jour du statut de la réservation ${id} vers ${status}`);
    
    const { error } = await supabase
      .from('car_rental_reservations')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
      throw error;
    }

    console.log('Statut mis à jour avec succès');

  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut:', error);
    throw error;
  }
};

/**
 * Supprime une réservation de location de voiture
 */
export const deleteCarRentalReservation = async (id: string): Promise<void> => {
  try {
    console.log(`Suppression de la réservation ${id}`);
    
    const { error } = await supabase
      .from('car_rental_reservations')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erreur lors de la suppression de la réservation:', error);
      throw error;
    }

    console.log('Réservation supprimée avec succès');

  } catch (error) {
    console.error('Erreur lors de la suppression de la réservation:', error);
    throw error;
  }
};
