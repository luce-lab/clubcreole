
import { Music } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export interface Concert {
  id: number;
  name: string;
  artist: string;
  genre: string;
  image: string;
  location: string;
  description: string;
  date: string;
  time: string;
  price: number;
  offer: string;
  rating: number;
  icon: React.ElementType;
}

// Fetch concerts from Supabase
export const getConcerts = async (): Promise<Concert[]> => {
  const { data, error } = await supabase
    .from('concerts')
    .select('*')
    .order('date', { ascending: true });

  if (error) {
    console.error('Error fetching concerts:', error);
    return [];
  }

  return data.map(concert => ({
    ...concert,
    icon: Music // Add icon since it's not stored in DB
  }));
};

// Initialize with empty array, will be populated after fetch
export let concerts: Concert[] = [];

// Load concerts on init
getConcerts().then(data => {
  concerts = data;
});
