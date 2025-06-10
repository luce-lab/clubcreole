export interface Loisir {
  id: number;
  title: string;
  description: string;
  location: string;
  start_date: string;
  end_date: string;
  max_participants: number;
  current_participants: number;
  image: string;
  gallery_images?: string[];
}

export interface Inscription {
  id: number;
  name: string;
  email: string;
  phone: string;
  loisir_id: number;
  inscription_date: string;
  confirmation_sent: boolean;
}

// Nouveaux types pour les activités de loisirs
export interface LeisureActivity {
  id: number;
  name: string;
  category: string;
  description: string;
  price_per_person: number;
  duration_hours: number;
  min_level: string;
  max_participants: number;
  equipment_provided: boolean;
  professional_guide: boolean;
  icon_name: string;
  created_at: string;
  updated_at: string;
}

export interface ActivityImage {
  id: number;
  activity_id: number;
  url: string;
  alt_text: string;
  title: string;
  sort_order: number;
  created_at: string;
}

export interface ActivityTimeSlot {
  id: number;
  activity_id: number;
  time_slot: string;
  is_active: boolean;
  created_at: string;
}

export interface ActivityLevel {
  id: number;
  activity_id: number;
  level_name: string;
  level_description: string;
  created_at: string;
}

export interface ActivityInclusion {
  id: number;
  activity_id: number;
  inclusion_text: string;
  created_at: string;
}

export interface ActivityReservation {
  id: number;
  activity_id: number;
  user_id: string;
  reservation_date: string;
  time_slot: string;
  number_of_participants: number;
  total_price: number;
  participant_names: string[];
  participant_levels: string[];
  contact_email: string;
  contact_phone: string;
  special_requests?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

// Type composé avec toutes les informations d'une activité
export interface ActivityWithDetails {
  activity: LeisureActivity;
  images: ActivityImage[];
  time_slots: ActivityTimeSlot[];
  levels: ActivityLevel[];
  inclusions: ActivityInclusion[];
}

