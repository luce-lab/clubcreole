
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
  galleryImages: string[];
  features: string[];
  description: string;
  rooms: number;
  bathrooms: number;
  maxGuests: number;
  amenities: Amenity[];
  rules: string[];
}
