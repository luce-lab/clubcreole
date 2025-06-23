
import { supabase } from "@/integrations/supabase/client";
import { Accommodation, Amenity } from "@/components/accommodation/AccommodationTypes";

// Définir un type pour les données brutes d'aménités
type RawAmenity = {
  name: string;
  available: boolean;
};

// Fonction utilitaire pour transformer et valider les amenities
const transformAmenities = (rawAmenities: any): Amenity[] => {
  console.log("Transformation des amenities:", rawAmenities);
  
  if (!rawAmenities) {
    console.log("Aucune amenity fournie");
    return [];
  }

  // Si c'est déjà un array
  if (Array.isArray(rawAmenities)) {
    return rawAmenities
      .filter(amenity => amenity && typeof amenity === 'object')
      .map((amenity: RawAmenity) => ({
        name: amenity.name || "",
        available: amenity.available === true
      }))
      .filter(amenity => amenity.name.trim() !== "");
  }

  // Si c'est un objet, essayer de le convertir
  if (typeof rawAmenities === 'object') {
    try {
      return Object.entries(rawAmenities).map(([key, value]) => ({
        name: key,
        available: Boolean(value)
      }));
    } catch (error) {
      console.error("Erreur lors de la transformation des amenities:", error);
      return [];
    }
  }

  console.log("Format d'amenities non reconnu:", typeof rawAmenities);
  return [];
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
      { name: "WiFi gratuit", available: true },
      { name: "Barbecue", available: true },
      { name: "Service de ménage", available: false },
      { name: "Parking gratuit", available: true },
      { name: "Jardin tropical", available: true },
      { name: "Hamac", available: true },
      { name: "Animaux acceptés", available: true },
      { name: "Climatisation", available: false }
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
        console.log("Données brutes de l'hébergement:", item.id, item.amenities);
        
        const typedAmenities = transformAmenities(item.amenities);
        console.log("Amenities transformées:", typedAmenities);
        
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
  const typedAmenities = transformAmenities(insertedData.amenities);
  
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
  console.log("=== DÉBUT MISE À JOUR ===");
  console.log("ID à mettre à jour:", id);
  console.log("Données reçues:", accommodationData);
  
  // Convert the accommodation data to match database schema with proper Json types
  const dbData: any = {};
  
  // Traitement simple et direct de tous les champs
  Object.keys(accommodationData).forEach(key => {
    const value = accommodationData[key as keyof Accommodation];
    
    if (key === 'discount') {
      // Gestion spéciale pour discount : null si undefined ou vide, sinon la valeur
      dbData.discount = (value === undefined || value === null || value === '') ? null : Number(value);
      console.log(`Champ discount: ${value} -> ${dbData.discount}`);
    } else if (key === 'gallery_images' || key === 'features' || key === 'amenities' || key === 'rules') {
      // Champs JSON
      dbData[key] = value as any;
      console.log(`Champ JSON ${key}:`, value);
    } else if (value !== undefined) {
      // Autres champs standards
      dbData[key] = value;
      console.log(`Champ ${key}:`, value);
    }
  });

  console.log("Données finales à envoyer:", dbData);

  // Effectuer la mise à jour
  const { error: updateError } = await supabase
    .from("accommodations")
    .update(dbData)
    .eq("id", id);
  
  if (updateError) {
    console.error("❌ Erreur lors de la mise à jour:", updateError);
    throw updateError;
  }

  console.log("✅ Mise à jour réussie, récupération des données...");

  // Récupérer l'hébergement mis à jour dans une requête séparée
  const { data: updatedData, error: fetchError } = await supabase
    .from("accommodations")
    .select("*")
    .eq("id", id)
    .single();
  
  console.log("Données récupérées après mise à jour:", updatedData);
  
  if (fetchError) {
    console.error("❌ Erreur lors de la récupération après mise à jour:", fetchError);
    throw fetchError;
  }

  if (!updatedData) {
    throw new Error("Aucune donnée retournée après la mise à jour");
  }

  // Transform the data with proper typing
  const typedAmenities = transformAmenities(updatedData.amenities);
  
  const result = {
    ...updatedData,
    gallery_images: updatedData.gallery_images as string[],
    features: updatedData.features as string[],
    amenities: typedAmenities,
    rules: updatedData.rules as string[],
    discount: updatedData.discount || undefined
  };

  console.log("=== RÉSULTAT FINAL ===", result);
  return result;
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
