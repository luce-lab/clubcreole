
import { supabase } from "@/integrations/supabase/client";
import { 
  CarRental, 
  ClientReview, 
  CarRentalCompany, 
  CarModel, 
  CarModelForDisplay 
} from "@/components/car-rental/CarRentalTypes";
import * as LucideIcons from "lucide-react";

// Fonction utilitaire pour mapper les icônes
const getIconFromName = (iconName: string) => {
  const iconMap: Record<string, any> = {
    'car': LucideIcons.Car,
    'truck': LucideIcons.Truck,
    'zap': LucideIcons.Zap,
    'shield': LucideIcons.Shield,
    'star': LucideIcons.Star,
    'heart': LucideIcons.Heart,
    'award': LucideIcons.Award,
    'users': LucideIcons.Users,
    'map-pin': LucideIcons.MapPin,
    'phone': LucideIcons.Phone,
    'mail': LucideIcons.Mail,
    'globe': LucideIcons.Globe,
    'calendar': LucideIcons.Calendar,
    'clock': LucideIcons.Clock,
    'check': LucideIcons.Check,
    'x': LucideIcons.X,
  };
  
  return iconMap[iconName.toLowerCase()] || LucideIcons.Car;
};

// Helper function to safely convert JSON to string array
const jsonToStringArray = (jsonData: any): string[] => {
  if (!jsonData) return [];
  if (Array.isArray(jsonData)) {
    return jsonData.filter(item => typeof item === 'string');
  }
  return [];
};

// Données d'exemple pour les entreprises de location de voitures
const mockCarRentals: CarRental[] = [
  {
    id: "1",
    name: "Rent-A-Car Antilles",
    type: "Location premium",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Pointe-à-Pitre, Guadeloupe",
    description: "Leader de la location de voitures aux Antilles avec plus de 20 ans d'expérience. Flotte moderne et service de qualité.",
    rating: 4.8,
    offer: "Réduction de 25% pour les membres Club Créole",
    icon: LucideIcons.Car,
    features: ["Véhicules récents", "Assurance incluse", "GPS gratuit", "Service 24h/24"],
    models: [
      {
        id: 1,
        company_id: "1",
        name: "Peugeot 208",
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        pricePerDay: 35,
        category: "Économique",
        seats: 5,
        transmission: "Manuelle",
        airCon: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 2,
        company_id: "1",
        name: "Renault Clio",
        image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        pricePerDay: 32,
        category: "Économique",
        seats: 5,
        transmission: "Automatique",
        airCon: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
  },
  {
    id: "2",
    name: "Tropical Cars",
    type: "Location familiale",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Fort-de-France, Martinique",
    description: "Spécialiste des véhicules familiaux et utilitaires. Parfait pour explorer les îles en famille ou entre amis.",
    rating: 4.5,
    offer: "Forfait famille : 4ème jour gratuit",
    icon: LucideIcons.Users,
    features: ["Sièges enfants gratuits", "Véhicules spacieux", "Livraison gratuite", "Tarifs préférentiels"],
    models: [
      {
        id: 3,
        company_id: "2",
        name: "Citroën C4 Picasso",
        image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        pricePerDay: 45,
        category: "Familiale",
        seats: 7,
        transmission: "Automatique",
        airCon: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
  },
  {
    id: "3",
    name: "Luxury Drive Caraïbes",
    type: "Location de luxe",
    image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Saint-Martin",
    description: "Voitures de prestige et véhicules haut de gamme pour une expérience de conduite exceptionnelle.",
    rating: 4.9,
    offer: "Surclassement gratuit selon disponibilités",
    icon: LucideIcons.Award,
    features: ["Véhicules premium", "Conciergerie", "Chauffeur disponible", "Service VIP"],
    models: [
      {
        id: 4,
        company_id: "3",
        name: "BMW Série 3",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        pricePerDay: 85,
        category: "Luxe",
        seats: 5,
        transmission: "Automatique",
        airCon: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
  }
];

// Données d'exemple pour les avis clients
const mockReviews: ClientReview[] = [
  {
    id: 1,
    name: "Marie-Claire Dubois",
    location: "Martinique",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b566?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    comment: "Service excellent, véhicule impeccable et tarifs très compétitifs. Je recommande vivement Rent-A-Car Antilles !",
    rating: 5,
    date: "15 mars 2024",
    rentalCompany: "Rent-A-Car Antilles"
  },
  {
    id: 2,
    name: "Jean-Luc Martin",
    location: "Guadeloupe",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    comment: "Parfait pour les vacances en famille. Véhicule spacieux et personnel très professionnel.",
    rating: 4,
    date: "8 février 2024",
    rentalCompany: "Tropical Cars"
  },
  {
    id: 3,
    name: "Sophie Leroy",
    location: "Saint-Martin",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    comment: "Une expérience de luxe extraordinaire ! La BMW était en parfait état et le service irréprochable.",
    rating: 5,
    date: "22 janvier 2024",
    rentalCompany: "Luxury Drive Caraïbes"
  }
];

/**
 * Récupère toutes les entreprises de location de voitures depuis la table partners
 */
export async function getCarRentals(): Promise<CarRental[]> {
  try {
    console.log("Récupération des entreprises de location depuis la table partners...");
    
    const { data: partners, error } = await supabase
      .from("partners")
      .select("*")
      .eq("business_type", "car_rental");

    if (error) {
      console.error("Erreur lors de la récupération depuis partners:", error);
      // Retourner les données d'exemple si erreur
      return mockCarRentals;
    }

    console.log("Partners récupérés:", partners);

    if (!partners || partners.length === 0) {
      console.log("Aucun partenaire de location de voitures trouvé, utilisation des données d'exemple");
      return mockCarRentals;
    }

    // Transformer les données partners en format CarRental
    const carRentals: CarRental[] = partners.map(partner => ({
      id: partner.id.toString(), // Convert number to string
      name: partner.business_name,
      type: partner.business_type || "Location de voitures",
      image: partner.image || "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      gallery_images: jsonToStringArray(partner.gallery_images),
      location: partner.location || partner.address || "Antilles",
      description: partner.description || "Service de location de voitures professionnel",
      rating: partner.rating || 4.5,
      offer: partner.offer || "Offres spéciales disponibles",
      icon: getIconFromName(partner.icon_name || "car"),
      features: [],
      models: []
    }));

    console.log("CarRentals transformés:", carRentals);
    return carRentals;

  } catch (error) {
    console.error("Erreur lors de la récupération des entreprises de location:", error);
    // Retourner les données d'exemple en cas d'erreur
    return mockCarRentals;
  }
}

/**
 * Récupère une entreprise de location spécifique par son ID
 */
export async function getCarRentalById(id: string): Promise<CarRental | null> {
  try {
    const { data: partner, error } = await supabase
      .from("partners")
      .select("*")
      .eq("id", parseInt(id)) // Convert string to number for query
      .single();

    if (error) {
      console.error("Erreur lors de la récupération du partenaire:", error);
      // Chercher dans les données d'exemple
      return mockCarRentals.find(rental => rental.id === id) || null;
    }

    if (!partner) {
      return mockCarRentals.find(rental => rental.id === id) || null;
    }

    // Transformer en format CarRental
    const carRental: CarRental = {
      id: partner.id.toString(), // Convert number to string
      name: partner.business_name,
      type: partner.business_type || "Location de voitures",
      image: partner.image || "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      gallery_images: jsonToStringArray(partner.gallery_images),
      location: partner.location || partner.address || "Antilles",
      description: partner.description || "Service de location de voitures professionnel",
      rating: partner.rating || 4.5,
      offer: partner.offer || "Offres spéciales disponibles",
      icon: getIconFromName(partner.icon_name || "car"),
      features: [],
      models: mockCarRentals.find(mock => mock.id === id)?.models || []
    };

    return carRental;

  } catch (error) {
    console.error("Erreur lors de la récupération de l'entreprise:", error);
    return mockCarRentals.find(rental => rental.id === id) || null;
  }
}

/**
 * Récupère tous les avis clients
 */
export async function getClientReviews(): Promise<ClientReview[]> {
  try {
    const { data: reviews, error } = await supabase
      .from("car_client_reviews")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erreur lors de la récupération des avis:", error);
      return mockReviews;
    }

    if (!reviews || reviews.length === 0) {
      return mockReviews;
    }

    // Transformer les données
    const formattedReviews: ClientReview[] = reviews.map(review => ({
      id: review.id,
      name: review.name,
      location: review.location,
      avatar: review.avatar,
      comment: review.comment,
      rating: review.rating,
      date: new Date(review.review_date).toLocaleDateString('fr-FR'),
      rentalCompany: review.rental_company_name
    }));

    return formattedReviews;

  } catch (error) {
    console.error("Erreur lors de la récupération des avis:", error);
    return mockReviews;
  }
}

/**
 * Récupère les avis pour une entreprise spécifique
 */
export async function getReviewsByCompany(companyName: string): Promise<ClientReview[]> {
  try {
    const { data: reviews, error } = await supabase
      .from("car_client_reviews")
      .select("*")
      .eq("rental_company_name", companyName)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erreur lors de la récupération des avis de l'entreprise:", error);
      return mockReviews.filter(review => review.rentalCompany === companyName);
    }

    if (!reviews || reviews.length === 0) {
      return mockReviews.filter(review => review.rentalCompany === companyName);
    }

    // Transformer les données
    const formattedReviews: ClientReview[] = reviews.map(review => ({
      id: review.id,
      name: review.name,
      location: review.location,
      avatar: review.avatar,
      comment: review.comment,
      rating: review.rating,
      date: new Date(review.review_date).toLocaleDateString('fr-FR'),
      rentalCompany: review.rental_company_name
    }));

    return formattedReviews;

  } catch (error) {
    console.error("Erreur lors de la récupération des avis de l'entreprise:", error);
    return mockReviews.filter(review => review.rentalCompany === companyName);
  }
}

// Interface pour les réservations de location de voitures
export interface CarRentalReservation {
  id: string;
  rental_company_name: string;
  driver_name: string;
  driver_email: string;
  driver_phone: string;
  selected_model: string;
  start_date: string;
  end_date: string;
  status: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

// Fonctions pour la gestion des réservations (utilisées par l'admin)
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

export async function updateCarRentalReservationStatus(id: string, status: string): Promise<void> {
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

export async function createCarRentalReservation(reservation: Omit<CarRentalReservation, 'id' | 'created_at' | 'updated_at'>): Promise<CarRentalReservation> {
  const { data, error } = await supabase
    .from("car_rental_reservations")
    .insert([reservation])
    .select()
    .single();

  if (error) {
    console.error("Erreur lors de la création de la réservation:", error);
    throw error;
  }

  return data;
}
