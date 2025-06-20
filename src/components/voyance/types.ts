
export interface VoyanceMedium {
  id: number;
  name: string;
  specialties: string[];
  description: string;
  image: string;
  experience_years: number;
  rating: number;
  price_per_session: number;
  availability_schedule: any;
  contact_phone?: string;
  contact_email?: string;
  contact_whatsapp?: string;
  languages: string[];
  consultation_types: string[];
  location?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface VoyanceReview {
  id: number;
  medium_id: number;
  client_name: string;
  rating: number;
  comment: string;
  consultation_date: string;
  created_at: string;
}

export interface VoyanceConsultation {
  id: string;
  medium_id: number;
  client_name: string;
  client_email: string;
  client_phone: string;
  preferred_date: string;
  preferred_time: string;
  consultation_type: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  created_at: string;
  updated_at: string;
}
