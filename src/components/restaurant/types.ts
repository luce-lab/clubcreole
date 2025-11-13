
import { Json } from "@/integrations/supabase/types";

export interface OpeningHours {
  monday: string | null;
  tuesday: string | null;
  wednesday: string | null;
  thursday: string | null;
  friday: string | null;
  saturday: string | null;
  sunday: string | null;
}

export interface Restaurant {
  id: number;
  name: string;
  type: string;
  image: string;
  location: string;
  description: string;
  rating: number;
  offer: string | null;
  icon: string;
  gallery_images?: Json | null;
  opening_hours?: Json | null;
  price_range?: string;
  specialties?: Json | null;
  poids?: number;
  is_partner?: boolean;
  created_at?: string;
  updated_at?: string;
}

// Helper function to safely convert gallery_images to string array
export const getGalleryImages = (gallery_images: Json | null | undefined): string[] => {
  if (!gallery_images) return [];

  if (Array.isArray(gallery_images)) {
    return gallery_images.filter((img): img is string => typeof img === 'string');
  }

  return [];
};

// Helper function to safely convert specialties to string array
export const getSpecialties = (specialties: Json | null | undefined): string[] => {
  if (!specialties) return [];

  if (Array.isArray(specialties)) {
    return specialties.filter((item): item is string => typeof item === 'string');
  }

  return [];
};

// Helper function to safely convert opening_hours to OpeningHours object
export const getOpeningHours = (opening_hours: Json | null | undefined): OpeningHours => {
  const defaultHours: OpeningHours = {
    monday: null,
    tuesday: null,
    wednesday: null,
    thursday: null,
    friday: null,
    saturday: null,
    sunday: null
  };

  if (!opening_hours || typeof opening_hours !== 'object') return defaultHours;

  return { ...defaultHours, ...opening_hours as Partial<OpeningHours> };
};
