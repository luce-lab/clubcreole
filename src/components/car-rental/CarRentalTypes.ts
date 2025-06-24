
import { LucideIcon } from "lucide-react";

// Types de base depuis Supabase
export interface CarRentalCompany {
  id: string;
  name: string;
  type: string;
  image: string;
  gallery_images?: string[];
  location: string;
  description: string;
  rating: number;
  offer: string;
  icon_name: string;
  created_at: string;
  updated_at: string;
}

export interface CarModel {
  id: number;
  company_id: string;
  name: string;
  image: string;
  price_per_day: number;
  category: string;
  seats: number;
  transmission: string;
  air_con: boolean;
  created_at: string;
  updated_at: string;
}

// Interface pour les modèles de voitures avec propriétés mappées pour l'affichage
export interface CarModelForDisplay {
  id: number;
  company_id: string;
  name: string;
  image: string;
  pricePerDay: number; // Mappé depuis price_per_day
  category: string;
  seats: number;
  transmission: string;
  airCon: boolean; // Mappé depuis air_con
  created_at: string;
  updated_at: string;
}

export interface CarRentalFeature {
  id: number;
  company_id: string;
  feature: string;
  created_at: string;
}

export interface CarClientReview {
  id: number;
  name: string;
  location: string;
  avatar: string;
  comment: string;
  rating: number;
  review_date: string;
  rental_company_name: string;
  created_at: string;
  updated_at: string;
}

// Types combinés pour l'affichage (avec les icônes Lucide)
export interface CarRental {
  id: string;
  name: string;
  type: string;
  image: string;
  gallery_images?: string[]; // Tableau optionnel d'URLs d'images supplémentaires
  location: string;
  description: string;
  rating: number;
  offer: string;
  icon: LucideIcon;
  features?: string[];
  models?: CarModelForDisplay[]; // Utilise l'interface avec propriétés mappées
}

// Type pour les avis avec données formatées
export interface ClientReview {
  id: number;
  name: string;
  location: string;
  avatar: string;
  comment: string;
  rating: number;
  date: string; // Formaté pour l'affichage
  rentalCompany: string;
}
