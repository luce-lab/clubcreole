
export interface Amenity {
  name: string;
  available: boolean;
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
}
