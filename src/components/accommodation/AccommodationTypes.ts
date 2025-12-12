
export interface Amenity {
  name: string;
  available: boolean;
}

/**
 * Information about a partner business
 * Linked from the partners table
 */
export interface PartnerInfo {
  id: number;
  business_name: string;
  business_type: string;
  status: string;
}

export interface Accommodation {
  id: number;
  name: string;
  type: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  gallery_images: string[];
  features: string[];
  description: string;
  rooms: number;
  bathrooms: number;
  max_guests: number;
  amenities: Amenity[];
  rules: string[];
  discount?: number; // Propriété optionnelle pour la réduction en pourcentage
  weight?: number; // Poids pour le tri pondéré (plus élevé = priorité plus haute)
  partner_id?: number | null; // Référence vers le partenaire associé
  partner?: PartnerInfo | null; // Informations du partenaire si lié
}
