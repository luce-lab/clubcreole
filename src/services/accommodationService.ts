
import { supabase } from "@/integrations/supabase/client";
import { Accommodation, Amenity } from "@/components/accommodation/AccommodationTypes";

// Définir un type pour les données brutes d'aménités
type RawAmenity = {
  name: string;
  available: boolean;
};

// Données d'exemple avec réduction pour La Colline Verte
const mockAccommodationsWithDiscounts: Accommodation[] = [
  {
    id: 1,
    name: "La Colline Verte",
    type: "Hôtel",
    location: "Pointe-à-Pitre, Guadeloupe",
    price: 85,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    features: ["WiFi gratuit", "Piscine", "Restaurant", "Spa"],
    description: "Un hôtel de charme situé au cœur de la Guadeloupe, offrant une vue imprenable sur la mer des Caraïbes. Profitez de nos chambres confortables et de nos services de qualité.",
    rooms: 2,
    bathrooms: 1,
    max_guests: 4,
    amenities: [
      { name: "WiFi", available: true },
      { name: "Climatisation", available: true },
      { name: "Piscine", available: true },
      { name: "Restaurant", available: true }
    ],
    rules: ["Check-in à partir de 15h", "Check-out avant 11h", "Animaux non autorisés"],
    discount: 50
  }
];

export async function fetchAccommodations(): Promise<Accommodation[]> {
  try {
    const { data, error } = await supabase
      .from("accommodations")
      .select("*");
    
    if (error) throw error;

    // Si nous avons des données de la base, les transformer
    if (data && data.length > 0) {
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
          rules: item.rules as string[],
          discount: item.discount || undefined
        };
      });
      
      return formattedData;
    }
    
    // Sinon, retourner les données d'exemple avec réductions
    return mockAccommodationsWithDiscounts;
  } catch (error) {
    console.error("Erreur lors de la récupération des hébergements:", error);
    // En cas d'erreur, retourner les données d'exemple
    return mockAccommodationsWithDiscounts;
  }
}

export async function createAccommodation(accommodationData: Omit<Accommodation, 'id'>): Promise<Accommodation> {
  console.log("Tentative de création d'hébergement:", accommodationData);
  
  // Convert the accommodation data to match database schema with proper Json types
  const dbData = {
    name: accommodationData.name,
    type: accommodationData.type,
    location: accommodationData.location,
    description: accommodationData.description,
    price: accommodationData.price,
    rating: accommodationData.rating,
    image: accommodationData.image,
    max_guests: accommodationData.max_guests,
    rooms: accommodationData.rooms,
    bathrooms: accommodationData.bathrooms,
    gallery_images: accommodationData.gallery_images || [] as any,
    features: accommodationData.features || [] as any,
    amenities: accommodationData.amenities || [] as any,
    rules: accommodationData.rules || [] as any,
    discount: accommodationData.discount || null
  };

  console.log("Données envoyées à la base:", dbData);

  const { data, error } = await supabase
    .from("accommodations")
    .insert(dbData)
    .select("*");
  
  console.log("Réponse de Supabase:", { data, error });
  
  if (error) {
    console.error("Erreur lors de l'insertion:", error);
    throw error;
  }

  if (!data || data.length === 0) {
    throw new Error("Aucune donnée retournée après l'insertion");
  }

  const insertedData = data[0];

  // Transform the data with proper typing
  const amenitiesArray = insertedData.amenities as RawAmenity[];
  const typedAmenities: Amenity[] = amenitiesArray.map((amenity: RawAmenity) => ({
    name: amenity.name || "",
    available: amenity.available || false
  }));
  
  return {
    ...insertedData,
    gallery_images: insertedData.gallery_images as string[],
    features: insertedData.features as string[],
    amenities: typedAmenities,
    rules: insertedData.rules as string[],
    discount: insertedData.discount || undefined
  };
}

export async function updateAccommodation(id: number, accommodationData: Partial<Accommodation>): Promise<Accommodation> {
  console.log("Tentative de mise à jour d'hébergement:", { id, data: accommodationData });
  
  // Convert the accommodation data to match database schema with proper Json types
  const dbData: any = {};
  
  if (accommodationData.name !== undefined) dbData.name = accommodationData.name;
  if (accommodationData.type !== undefined) dbData.type = accommodationData.type;
  if (accommodationData.location !== undefined) dbData.location = accommodationData.location;
  if (accommodationData.description !== undefined) dbData.description = accommodationData.description;
  if (accommodationData.price !== undefined) dbData.price = accommodationData.price;
  if (accommodationData.rating !== undefined) dbData.rating = accommodationData.rating;
  if (accommodationData.image !== undefined) dbData.image = accommodationData.image;
  if (accommodationData.max_guests !== undefined) dbData.max_guests = accommodationData.max_guests;
  if (accommodationData.rooms !== undefined) dbData.rooms = accommodationData.rooms;
  if (accommodationData.bathrooms !== undefined) dbData.bathrooms = accommodationData.bathrooms;
  if (accommodationData.gallery_images !== undefined) dbData.gallery_images = accommodationData.gallery_images as any;
  if (accommodationData.features !== undefined) dbData.features = accommodationData.features as any;
  if (accommodationData.amenities !== undefined) dbData.amenities = accommodationData.amenities as any;
  if (accommodationData.rules !== undefined) dbData.rules = accommodationData.rules as any;
  // Correction pour le champ discount
  if (accommodationData.discount !== undefined) {
    dbData.discount = accommodationData.discount === undefined || accommodationData.discount === null ? null : accommodationData.discount;
  }

  console.log("Données de mise à jour envoyées:", dbData);

  // Effectuer la mise à jour
  const { error: updateError } = await supabase
    .from("accommodations")
    .update(dbData)
    .eq("id", id);
  
  if (updateError) {
    console.error("Erreur lors de la mise à jour:", updateError);
    throw updateError;
  }

  // Récupérer l'hébergement mis à jour dans une requête séparée
  const { data: updatedData, error: fetchError } = await supabase
    .from("accommodations")
    .select("*")
    .eq("id", id)
    .single();
  
  console.log("Données récupérées après mise à jour:", { updatedData, fetchError });
  
  if (fetchError) {
    console.error("Erreur lors de la récupération après mise à jour:", fetchError);
    throw fetchError;
  }

  if (!updatedData) {
    throw new Error("Aucune donnée retournée après la mise à jour");
  }

  // Transform the data with proper typing
  const amenitiesArray = updatedData.amenities as RawAmenity[];
  const typedAmenities: Amenity[] = amenitiesArray.map((amenity: RawAmenity) => ({
    name: amenity.name || "",
    available: amenity.available || false
  }));
  
  return {
    ...updatedData,
    gallery_images: updatedData.gallery_images as string[],
    features: updatedData.features as string[],
    amenities: typedAmenities,
    rules: updatedData.rules as string[],
    discount: updatedData.discount || undefined
  };
}

export async function deleteAccommodation(id: number): Promise<void> {
  console.log("Tentative de suppression d'hébergement:", id);
  
  const { error } = await supabase
    .from("accommodations")
    .delete()
    .eq("id", id);
  
  if (error) {
    console.error("Erreur lors de la suppression:", error);
    throw error;
  }
  
  console.log("Hébergement supprimé avec succès");
}
