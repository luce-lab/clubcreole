import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Footer } from "@/components/Footer";
import { TravelDetailHeader } from "@/components/travel/TravelDetailHeader";
import { TravelDetailInfo } from "@/components/travel/TravelDetailInfo";
import { TravelReservationForm } from "@/components/travel/TravelReservationForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

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
  partners?: {
    business_name: string;
    phone: string | null;
    website: string | null;
  } | null;
}

const TravelDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: travelOffer, isLoading, error } = useQuery({
    queryKey: ['travel-offer', id],
    queryFn: async () => {
      console.log(`Récupération de l'offre de voyage ${id}...`);
      const { data, error } = await supabase
        .from('travel_offers')
        .select(`
          *,
          partners (
            business_name,
            phone,
            website
          )
        `)
        .eq('id', parseInt(id || '0'))
        .eq('is_active', true)
        .single();

      if (error) {
        console.error('Erreur lors de la récupération de l\'offre de voyage:', error);
        throw error;
      }

      console.log('Offre de voyage récupérée:', data);
      
      // Transform the data to match our interface
      const transformedData: TravelOffer = {
        ...data,
        partners: Array.isArray(data.partners) && data.partners.length > 0 ? data.partners[0] : null,
        gallery_images: Array.isArray(data.gallery_images) ? data.gallery_images as string[] : [],
        inclusions: Array.isArray(data.inclusions) ? data.inclusions as string[] : [],
        exclusions: Array.isArray(data.exclusions) ? data.exclusions as string[] : []
      };
      
      return transformedData;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement de l'offre de voyage...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !travelOffer) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 text-lg mb-4">Offre de voyage introuvable</p>
            <Button onClick={() => navigate('/voyages')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux offres
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l'accueil
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <TravelDetailHeader offer={travelOffer} />
              <TravelDetailInfo offer={travelOffer} />
            </div>
            
            <div className="lg:col-span-1">
              <TravelReservationForm offer={travelOffer} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TravelDetail;
