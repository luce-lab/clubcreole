
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Restaurant, getGalleryImages } from "@/components/restaurant/types";
import { RestaurantReservationForm } from "@/components/restaurant/RestaurantReservationForm";
import BackButton from "@/components/common/BackButton";
import RestaurantDetailHeader from "@/components/restaurant/RestaurantDetailHeader";
import RestaurantGallery from "@/components/restaurant/RestaurantGallery";
import RestaurantTabs from "@/components/restaurant/RestaurantTabs";
import RestaurantSidebar from "@/components/restaurant/RestaurantSidebar";
import RestaurantDetailSkeleton from "@/components/restaurant/RestaurantDetailSkeleton";
import RestaurantDetailError from "@/components/restaurant/RestaurantDetailError";

const RestaurantDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showReservationForm, setShowReservationForm] = useState(false);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        if (!id) {
          throw new Error("Restaurant ID is missing");
        }

        // Convert string ID to number before using it in the query
        const numericId = parseInt(id, 10);
        
        // Check if conversion resulted in a valid number
        if (isNaN(numericId)) {
          throw new Error("Invalid restaurant ID");
        }

        const { data, error } = await supabase
          .from('restaurants')
          .select('*')
          .eq('id', numericId)
          .single();

        if (error) {
          console.error('Database error:', error);
          throw error;
        }

        if (!data) {
          throw new Error("Restaurant not found");
        }

        setRestaurant(data);
      } catch (err) {
        console.error('Error loading restaurant:', err);
        setError(err instanceof Error ? err.message : "Impossible de charger les détails du restaurant. Veuillez réessayer plus tard.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

  if (loading) {
    return <RestaurantDetailSkeleton />;
  }

  if (error || !restaurant) {
    return <RestaurantDetailError error={error || "Restaurant non trouvé"} />;
  }

  // Combine main image with gallery images using helper function
  const galleryImagesArray = getGalleryImages(restaurant.gallery_images);
  const galleryPhotos = [
    restaurant.image,
    ...galleryImagesArray
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton backTo="/restauration" />
      
      <div className="max-w-5xl mx-auto mt-8">
        <RestaurantDetailHeader
          name={restaurant.name}
          type={restaurant.type}
          rating={restaurant.rating}
          location={restaurant.location}
          onShowReservationForm={() => setShowReservationForm(true)}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <RestaurantGallery 
              mainImage={galleryPhotos[0]} 
              photos={galleryPhotos.slice(1)}
              restaurantName={restaurant.name}
            />

            <RestaurantTabs 
              description={restaurant.description}
              type={restaurant.type}
              location={restaurant.location}
            />
          </div>

          <div className="md:col-span-1">
            <div className="sticky top-8">
              <RestaurantReservationForm 
                restaurantId={restaurant.id} 
                restaurantName={restaurant.name}
                restaurantLocation={restaurant.location}
                showForm={showReservationForm}
                onClose={() => setShowReservationForm(!showReservationForm)}
              />
              
              <div className="mt-6">
                <RestaurantSidebar offer={restaurant.offer} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
