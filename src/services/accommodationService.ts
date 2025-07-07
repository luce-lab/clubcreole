import { supabase } from "@/integrations/supabase/client";
import { Accommodation, Amenity } from "@/components/accommodation/AccommodationTypes";

// Définir un type pour les données brutes d'aménités
type RawAmenity = {
  name: string;
  available: boolean;
};

type RawAmenitiesInput = RawAmenity[] | { [key: string]: boolean } | null | undefined;

// Fonction utilitaire pour transformer et valider les amenities
const transformAmenities = (rawAmenities: RawAmenitiesInput): Amenity[] => {
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
    discount: 50,
    weight: 5
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
        
        const amenitiesRaw = typeof item.amenities === "string"
          ? JSON.parse(item.amenities)
          : item.amenities;
        const typedAmenities = transformAmenities(amenitiesRaw);
        console.log("Amenities transformées:", typedAmenities);
        
        return {
          ...item,
          gallery_images: item.gallery_images as string[],
          features: item.features as string[],
          amenities: typedAmenities,
          rules: item.rules as string[],
          discount: item.discount || undefined,
          weight: item.weight || 1
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

export async function fetchAccommodationsWeightedRandom(): Promise<Accommodation[]> {
  try {
    // Récupérer les hébergements avec tri pondéré aléatoire en SQL
    const { data, error } = await supabase
      .from("accommodations")
      .select("*")
      // Utilise une fonction PostgreSQL pour le tri pondéré aléatoire
      // Plus le weight est élevé, plus l'hébergement a de chances d'apparaître en premier
      .order('weight', { ascending: false })
      .order('random()', { ascending: true });
    
    if (error) throw error;

    // Si nous avons des données de la base, les transformer et appliquer un tri pondéré côté client
    if (data && data.length > 0) {
      const formattedData = data.map(item => {
        const amenitiesRaw = typeof item.amenities === "string"
          ? JSON.parse(item.amenities)
          : item.amenities;
        const typedAmenities = transformAmenities(amenitiesRaw);
        
        return {
          ...item,
          gallery_images: item.gallery_images as string[],
          features: item.features as string[],
          amenities: typedAmenities,
          rules: item.rules as string[],
          discount: item.discount || undefined,
          weight: item.weight || 1
        };
      });
      
      // Appliquer un tri pondéré aléatoire côté client pour plus de contrôle
      return weightedRandomSort(formattedData);
    }
    
    // Sinon, retourner les données d'exemple
    return mockAccommodationsWithDiscounts;
  } catch (error) {
    console.error("Erreur lors de la récupération des hébergements avec tri pondéré:", error);
    // En cas d'erreur, utiliser la fonction normale
    return fetchAccommodations();
  }
}

// Fonction utilitaire pour le tri pondéré aléatoire côté client
function weightedRandomSort(accommodations: Accommodation[]): Accommodation[] {
  // Créer une liste pondérée où chaque hébergement apparaît selon son poids
  const weightedList: Accommodation[] = [];
  
  accommodations.forEach(accommodation => {
    const weight = accommodation.weight || 1;
    // Ajouter l'hébergement plusieurs fois selon son poids
    for (let i = 0; i < weight; i++) {
      weightedList.push(accommodation);
    }
  });
  
  // Mélanger la liste pondérée
  for (let i = weightedList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [weightedList[i], weightedList[j]] = [weightedList[j], weightedList[i]];
  }
  
  // Retourner une liste unique (sans doublons) dans l'ordre mélangé
  const uniqueAccommodations: Accommodation[] = [];
  const seenIds = new Set<number>();
  
  weightedList.forEach(accommodation => {
    if (!seenIds.has(accommodation.id)) {
      uniqueAccommodations.push(accommodation);
      seenIds.add(accommodation.id);
    }
  });
  
  return uniqueAccommodations;
}

export interface AccommodationPaginationResult {
  accommodations: Accommodation[];
  totalCount: number;
  hasMore: boolean;
  nextOffset: number;
}

export const fetchAccommodationsPaginated = async (
  offset: number = 0,
  limit: number = 12,
  searchQuery?: string,
  priceFilter?: string
): Promise<AccommodationPaginationResult> => {
  try {
    // D'abord essayer de récupérer depuis la base de données
    let query = supabase
      .from('accommodations')
      .select('*', { count: 'exact' });

    // Appliquer la recherche si présente
    if (searchQuery && searchQuery.trim() !== '') {
      const searchTerm = `%${searchQuery.trim()}%`;
      query = query.or(`name.ilike.${searchTerm},type.ilike.${searchTerm},location.ilike.${searchTerm}`);
    }

    // Appliquer le filtre de prix si présent
    if (priceFilter) {
      switch (priceFilter) {
        case 'low':
          query = query.lt('price', 80);
          break;
        case 'medium':
          query = query.gte('price', 80).lt('price', 100);
          break;
        case 'high':
          query = query.gte('price', 100);
          break;
      }
    }

    // Appliquer le tri pondéré et la pagination
    const { data, error, count } = await query
      .order('weight', { ascending: false })
      .order('rating', { ascending: false })
      .order('id', { ascending: false })
      .range(offset, offset + limit - 1);

    // Si la requête réussit et qu'on a des données
    if (!error && data && data.length > 0) {
      // Transformer les données
      const formattedData = data.map(item => {
        const amenitiesRaw = typeof item.amenities === "string"
          ? JSON.parse(item.amenities)
          : item.amenities;
        const typedAmenities = transformAmenities(amenitiesRaw);
        
        return {
          ...item,
          gallery_images: item.gallery_images as string[],
          features: item.features as string[],
          amenities: typedAmenities,
          rules: item.rules as string[],
          discount: item.discount || undefined,
          weight: item.weight || 1
        };
      });

      const totalCount = count || 0;
      const hasMore = offset + limit < totalCount;
      const nextOffset = offset + limit;

      return {
        accommodations: formattedData,
        totalCount,
        hasMore,
        nextOffset
      };
    }

    // Si pas de données en base ou erreur, utiliser les données mock
    console.log('Utilisation des données mock pour les hébergements');
    
    // Créer plus de données mock pour tester la pagination
    const mockData = [
      ...mockAccommodationsWithDiscounts,
      {
        id: 2,
        name: "Villa Sunset",
        type: "Villa",
        location: "Sainte-Anne, Guadeloupe",
        price: 120,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        gallery_images: [
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        ],
        features: ["Vue mer", "Piscine privée", "Jardin tropical", "Climatisation"],
        description: "Villa luxueuse avec vue panoramique sur la mer des Caraïbes. Parfaite pour des vacances de rêve en famille ou entre amis.",
        rooms: 3,
        bathrooms: 2,
        max_guests: 6,
        amenities: [
          { name: "WiFi gratuit", available: true },
          { name: "Piscine privée", available: true },
          { name: "Parking gratuit", available: true },
          { name: "Climatisation", available: true }
        ],
        rules: ["Check-in à partir de 16h", "Check-out avant 10h", "Animaux acceptés"],
        weight: 3
      },
      {
        id: 3,
        name: "Bungalow Paradis",
        type: "Bungalow",
        location: "Le Gosier, Guadeloupe",
        price: 95,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        gallery_images: [
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        ],
        features: ["Proche plage", "Terrasse", "Kitchenette"],
        description: "Bungalow confortable à quelques minutes de la plage. Idéal pour un séjour authentique.",
        rooms: 1,
        bathrooms: 1,
        max_guests: 2,
        amenities: [
          { name: "WiFi gratuit", available: true },
          { name: "Kitchenette", available: true },
          { name: "Terrasse", available: true }
        ],
        rules: ["Check-in à partir de 15h", "Check-out avant 11h"],
        weight: 2
      }
    ];

    // Appliquer la recherche sur les données mock
    let filteredData = mockData;
    if (searchQuery && searchQuery.trim() !== '') {
      const searchLower = searchQuery.toLowerCase();
      filteredData = mockData.filter(item => 
        item.name.toLowerCase().includes(searchLower) ||
        item.location.toLowerCase().includes(searchLower) ||
        item.type.toLowerCase().includes(searchLower)
      );
    }

    // Appliquer le filtre de prix sur les données mock
    if (priceFilter) {
      filteredData = filteredData.filter(accommodation => {
        const price = accommodation.price;
        switch (priceFilter) {
          case 'low':
            return price < 80;
          case 'medium':
            return price >= 80 && price < 100;
          case 'high':
            return price >= 100;
          default:
            return true;
        }
      });
    }

    // Appliquer la pagination
    const paginatedData = filteredData.slice(offset, offset + limit);
    const totalCount = filteredData.length;
    const hasMore = offset + limit < totalCount;
    const nextOffset = offset + limit;

    return {
      accommodations: paginatedData,
      totalCount,
      hasMore,
      nextOffset
    };
  } catch (err) {
    console.error('Erreur lors du chargement paginé des hébergements:', err);
    throw err;
  }
};

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
    gallery_images: accommodationData.gallery_images || [],
    features: accommodationData.features || [],
    amenities: accommodationData.amenities || [],
    rules: accommodationData.rules || [],
    discount: accommodationData.discount || null,
    weight: accommodationData.weight || 1
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
  const amenitiesRaw = typeof insertedData.amenities === "string"
    ? JSON.parse(insertedData.amenities)
    : insertedData.amenities;
  const typedAmenities = transformAmenities(amenitiesRaw);
  
  return {
    ...insertedData,
    gallery_images: insertedData.gallery_images as string[],
    features: insertedData.features as string[],
    amenities: typedAmenities,
    rules: insertedData.rules as string[],
    discount: insertedData.discount || undefined,
    weight: insertedData.weight || 1
  };
}

export async function updateAccommodation(id: number, accommodationData: Partial<Accommodation>): Promise<Accommodation> {
  console.log("=== DÉBUT MISE À JOUR ===");
  console.log("ID à mettre à jour:", id);
  console.log("Données reçues:", accommodationData);
  
  // Convert the accommodation data to match database schema with proper Json types
  const dbData: Partial<Accommodation> = { ...accommodationData };
  
  // Gestion spéciale pour discount : null si undefined ou vide, sinon la valeur
  if (accommodationData.discount !== undefined) {
    dbData.discount = (accommodationData.discount === null || accommodationData.discount === '') ? null : Number(accommodationData.discount);
  }

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
  const amenitiesRaw = typeof updatedData.amenities === "string"
    ? JSON.parse(updatedData.amenities)
    : updatedData.amenities;
  const typedAmenities = transformAmenities(amenitiesRaw);
  
  const result = {
    ...updatedData,
    gallery_images: updatedData.gallery_images as string[],
    features: updatedData.features as string[],
    amenities: typedAmenities,
    rules: updatedData.rules as string[],
    discount: updatedData.discount || undefined,
    weight: updatedData.weight || 1
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
