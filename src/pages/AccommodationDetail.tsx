
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { AccommodationHeader } from "@/components/accommodation/AccommodationHeader";
import { AccommodationGallery } from "@/components/accommodation/AccommodationGallery";
import { AccommodationInfo } from "@/components/accommodation/AccommodationInfo";
import { AccommodationAmenities } from "@/components/accommodation/AccommodationAmenities";
import { AccommodationRules } from "@/components/accommodation/AccommodationRules";
import { AccommodationFAQ } from "@/components/accommodation/AccommodationFAQ";
import { ReservationCard } from "@/components/accommodation/ReservationCard";
import { Accommodation, Amenity } from "@/components/accommodation/AccommodationTypes";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

// Définir un type pour les données brutes d'aménités
type RawAmenity = {
  name: string;
  available: boolean;
};

const AccommodationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [accommodation, setAccommodation] = useState<Accommodation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccommodation = async () => {
      try {
        setLoading(true);
        const accommodationId = parseInt(id || "0");
        
        const { data, error } = await supabase
          .from("accommodations")
          .select("*")
          .eq("id", accommodationId)
          .single();
        
        if (error) throw error;
        
        // Transformer les données JSON de la base avec un typage explicite
        const amenitiesArray = data.amenities as RawAmenity[];
        const typedAmenities: Amenity[] = amenitiesArray.map((amenity: RawAmenity) => ({
          name: amenity.name || "",
          available: amenity.available || false
        }));

        const formattedData = {
          ...data,
          gallery_images: data.gallery_images as string[],
          features: data.features as string[],
          amenities: typedAmenities,
          rules: data.rules as string[]
        };
        
        setAccommodation(formattedData);
      } catch (err) {
        console.error("Erreur lors de la récupération de l'hébergement:", err);
        setError("Impossible de trouver cet hébergement.");
        setTimeout(() => {
          navigate("/hebergements");
        }, 3000);
      } finally {
        setLoading(false);
      }
    };

    fetchAccommodation();
  }, [id, navigate]);

  // Si une erreur est survenue
  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-xl text-red-500 mb-4">{error}</p>
            <p className="text-gray-500">Redirection vers la liste des hébergements...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Si les données sont en cours de chargement
  if (loading || !accommodation) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center h-full">
            <Loader2 className="h-12 w-12 text-creole-blue animate-spin mb-4" />
            <p className="text-xl text-gray-500">Chargement en cours...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <AccommodationHeader 
          name={accommodation.name}
          location={accommodation.location}
          rating={accommodation.rating}
        />

        <AccommodationGallery 
          images={accommodation.gallery_images}
          name={accommodation.name}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-8">
            <AccommodationInfo 
              description={accommodation.description}
              maxGuests={accommodation.max_guests}
              rooms={accommodation.rooms}
              bathrooms={accommodation.bathrooms}
            />

            <AccommodationAmenities 
              amenities={accommodation.amenities}
            />

            <AccommodationRules 
              rules={accommodation.rules}
            />

            <AccommodationFAQ 
              amenities={accommodation.amenities}
            />
          </div>

          {/* Colonne de réservation */}
          <div className="lg:col-span-1">
            <ReservationCard 
              price={accommodation.price}
              maxGuests={accommodation.max_guests}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AccommodationDetail;
