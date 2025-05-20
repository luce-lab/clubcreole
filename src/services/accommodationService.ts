import { supabase } from "@/integrations/supabase/client";
import { Accommodation, Amenity } from "@/components/accommodation/AccommodationTypes";

// Définir un type pour les données brutes d'aménités
type RawAmenity = {
  name: string;
  available: boolean;
};

export async function fetchAccommodations(): Promise<Accommodation[]> {
  const { data, error } = await supabase
    .from("accommodations")
    .select("*");
  
  if (error) throw error;

  // Transform the data with proper typing
  const formattedData = data.map(item => {
    // Convert amenities with explicit type assertion
    const amenitiesArray = item.amenities as RawAmenity[];
    const typedAmenities: Amenity[] = amenitiesArray.map((amenity: RawAmenity) => ({
      name: amenity.name || "",
      available: amenity.available || false
    }));
    
    return {
      ...item,
      gallery_images: item.gallery_images as string[],
      features: item.features as string[],
      amenities: typedAmenities,
      rules: item.rules as string[]
    };
  });
  
  return formattedData;
}
