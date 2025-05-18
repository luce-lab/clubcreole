
import { LucideIcon } from "lucide-react";

export interface CarRental {
  id: number;
  name: string;
  type: string;
  image: string;
  location: string;
  description: string;
  rating: number;
  offer: string;
  icon: LucideIcon;
  features?: string[];
  models?: CarModel[];
}

export interface CarModel {
  name: string;
  image: string;
  pricePerDay: number;
  category: string;
  seats: number;
  transmission: string;
  airCon: boolean;
}

export interface ClientReview {
  id: number;
  name: string;
  location: string;
  avatar: string;
  comment: string;
  rating: number;
  date: string;
  rentalCompany: string;
}
