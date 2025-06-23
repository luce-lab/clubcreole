
export interface Promotion {
  id: number;
  title: string;
  description: string;
  image: string;
  badge?: string;
  cta_text: string;
  cta_url: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
