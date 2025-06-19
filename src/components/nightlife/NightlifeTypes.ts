
import { supabase } from "@/integrations/supabase/client";

export interface NightEvent {
  id: number;
  name: string;
  type: string;
  venue: string;
  image: string;
  description: string;
  date: string;
  time: string;
  price: number;
  offer: string;
  rating: number;
  features: string[];
}

// Fetch nightlife events from Supabase
export const getNightlifeEvents = async (): Promise<NightEvent[]> => {
  const { data, error } = await supabase
    .from('nightlife_events')
    .select('*')
    .order('rating', { ascending: false });

  if (error) {
    console.error('Error fetching nightlife events:', error);
    return [];
  }

  return (data || []).map(event => ({
    id: event.id,
    name: event.name,
    type: event.type,
    venue: event.venue,
    image: event.image,
    description: event.description,
    date: event.date,
    time: event.time,
    price: event.price,
    offer: event.offer,
    rating: event.rating,
    features: Array.isArray(event.features) 
      ? event.features.filter((item): item is string => typeof item === 'string')
      : []
  }));
};

// Initialize with empty array, will be populated after fetch
export let nightEvents: NightEvent[] = [];

// Load events on init
getNightlifeEvents().then(data => {
  nightEvents = data;
});
