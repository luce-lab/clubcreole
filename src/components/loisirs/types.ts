
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
}
