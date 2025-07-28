
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TravelOfferCard } from "./TravelOfferCard";
import { TravelOffersLoading } from "./TravelOffersLoading";
import { TravelOffersError } from "./TravelOffersError";
import { TravelOffersEmpty } from "./TravelOffersEmpty";

interface TravelOffer {
  id: number;
  title: string;
  description: string;
  destination: string;
  duration_days: number;
  price: number;
  departure_location: string;
  departure_date: string | null;
  return_date: string | null;
  image: string | null;
  gallery_images: string[];
  inclusions: string[];
  exclusions: string[];
  max_participants: number | null;
  current_participants: number | null;
  is_active: boolean | null;
  created_at: string | null;
  updated_at: string | null;
}

export const TravelOffersList = () => {
  const { data: travelOffers, isLoading, error } = useQuery({
    queryKey: ['travel-offers'],
    queryFn: async () => {
      // console.log('Récupération des offres de voyage...');
      const { data, error } = await supabase
        .from('travel_offers')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erreur lors de la récupération des offres de voyage:', error);
        throw error;
      }

      // console.log(`${data?.length || 0} offres de voyage récupérées`);
      return data as TravelOffer[];
    },
  });

  if (isLoading) {
    return <TravelOffersLoading />;
  }

  if (error) {
    return <TravelOffersError />;
  }

  if (!travelOffers || travelOffers.length === 0) {
    return <TravelOffersEmpty />;
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Nos Offres de Voyage
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {travelOffers.map((offer) => (
            <TravelOfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </div>
    </section>
  );
};
