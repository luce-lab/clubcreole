
import { Json } from "@/integrations/supabase/types";

export interface Restaurant {
  id: number;
  name: string;
  type: string;
  image: string;
  location: string;
  description: string;
  rating: number;
  offer: string;
  icon: string;
  gallery_images?: Json | null;
}

// Helper function to safely convert gallery_images to string array
export const getGalleryImages = (gallery_images: Json | null | undefined): string[] => {
  if (!gallery_images) return [];
  
  if (Array.isArray(gallery_images)) {
    return gallery_images.filter((img): img is string => typeof img === 'string');
  }
  
  return [];
};
