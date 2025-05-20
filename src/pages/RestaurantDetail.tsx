import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Calendar } from "lucide-react";
import { Restaurant } from "@/components/restaurant/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RestaurantReservationForm } from "@/components/restaurant/RestaurantReservationForm";
import { Skeleton } from "@/components/ui/skeleton";
import RestaurantHeader from "@/components/restaurant/RestaurantHeader";

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
          throw error;
        }

        setRestaurant(data);
      } catch (err) {
        console.error('Erreur lors du chargement du restaurant:', err);
        setError("Impossible de charger les détails du restaurant. Veuillez réessayer plus tard.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <RestaurantHeader />
        <div className="max-w-5xl mx-auto mt-8">
          <Skeleton className="h-8 w-1/3 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <Skeleton className="h-96 w-full rounded-lg" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <Skeleton className="h-96 w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="container mx-auto px-4 py-8">
        <RestaurantHeader />
        <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700 max-w-5xl mx-auto mt-8">
          {error || "Restaurant non trouvé"}
        </div>
      </div>
    );
  }

  // Photos exemplaires du restaurant
  const photos = [
    restaurant.image,
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1592861956120-e524fc739696?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <RestaurantHeader />
      
      <div className="max-w-5xl mx-auto mt-8">
        {/* En-tête du restaurant */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">{restaurant.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="bg-white">
                {restaurant.type}
              </Badge>
              <div className="flex items-center">
                <span className="text-yellow-500 mr-1">★</span>
                <span>{restaurant.rating}</span>
              </div>
              <span className="text-gray-500">·</span>
              <span className="text-gray-500">{restaurant.location}</span>
            </div>
          </div>
          <Button 
            className="bg-creole-green hover:bg-creole-green/90"
            onClick={() => setShowReservationForm(true)}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Réserver une table
          </Button>
        </div>

        {/* Grille principale */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Colonne principale - Photos et informations */}
          <div className="md:col-span-2 space-y-8">
            {/* Galerie de photos */}
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <img 
                  src={photos[0]} 
                  alt={restaurant.name} 
                  className="w-full h-80 object-cover rounded-lg"
                />
              </div>
              {photos.slice(1).map((photo, index) => (
                <div key={index} className="col-span-1">
                  <img 
                    src={photo} 
                    alt={`${restaurant.name} - Photo ${index + 2}`} 
                    className="w-full h-40 object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>

            {/* Onglets d'information */}
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="about">À propos</TabsTrigger>
                <TabsTrigger value="menu">Menu</TabsTrigger>
                <TabsTrigger value="reviews">Avis</TabsTrigger>
              </TabsList>
              <TabsContent value="about" className="space-y-4 mt-4">
                <h2 className="text-xl font-semibold">Description</h2>
                <p className="text-gray-700">{restaurant.description}</p>
                
                <Separator className="my-4" />
                
                <h2 className="text-xl font-semibold">Informations</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium">Type de cuisine</h3>
                    <p className="text-gray-700">{restaurant.type}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Prix moyen</h3>
                    <p className="text-gray-700">25€ - 45€ par personne</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Adresse</h3>
                    <p className="text-gray-700">{restaurant.location}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Horaires</h3>
                    <p className="text-gray-700">Lun-Dim: 12h00-15h00, 19h00-23h00</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="menu" className="space-y-4 mt-4">
                <h2 className="text-xl font-semibold">Notre carte</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-lg border-b pb-1">Entrées</h3>
                    <ul className="mt-2 space-y-2">
                      <li className="flex justify-between">
                        <span>Salade César</span>
                        <span>12€</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Carpaccio de bœuf</span>
                        <span>14€</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Soupe du jour</span>
                        <span>9€</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg border-b pb-1">Plats principaux</h3>
                    <ul className="mt-2 space-y-2">
                      <li className="flex justify-between">
                        <span>Filet de bœuf, sauce au poivre</span>
                        <span>28€</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Risotto aux champignons</span>
                        <span>21€</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Poisson du jour</span>
                        <span>24€</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg border-b pb-1">Desserts</h3>
                    <ul className="mt-2 space-y-2">
                      <li className="flex justify-between">
                        <span>Tiramisu maison</span>
                        <span>9€</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Crème brûlée</span>
                        <span>8€</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Mousse au chocolat</span>
                        <span>7€</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="space-y-4 mt-4">
                <h2 className="text-xl font-semibold">Avis des clients</h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-full bg-creole-green/20 flex items-center justify-center">
                          <span className="font-semibold">ML</span>
                        </div>
                        <span className="font-medium">Marie L.</span>
                      </div>
                      <div className="flex text-yellow-500">
                        <span>★★★★★</span>
                      </div>
                    </div>
                    <p className="mt-2 text-gray-700">
                      Excellente cuisine et service impeccable! Les plats sont savoureux et la présentation est soignée.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-full bg-creole-green/20 flex items-center justify-center">
                          <span className="font-semibold">PT</span>
                        </div>
                        <span className="font-medium">Pierre T.</span>
                      </div>
                      <div className="flex text-yellow-500">
                        <span>★★★★☆</span>
                      </div>
                    </div>
                    <p className="mt-2 text-gray-700">
                      Très bon restaurant avec une ambiance chaleureuse. Le service était un peu lent mais la qualité de la nourriture compense largement.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-full bg-creole-green/20 flex items-center justify-center">
                          <span className="font-semibold">SB</span>
                        </div>
                        <span className="font-medium">Sophie B.</span>
                      </div>
                      <div className="flex text-yellow-500">
                        <span>★★★★★</span>
                      </div>
                    </div>
                    <p className="mt-2 text-gray-700">
                      Une découverte gourmande! Les saveurs sont authentiques et les produits de qualité. Je reviendrai.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Colonne latérale - Formulaire de réservation */}
          <div className="md:col-span-1">
            <div className="sticky top-8">
              <RestaurantReservationForm 
                restaurantId={restaurant.id} 
                restaurantName={restaurant.name}
                showForm={showReservationForm}
                onClose={() => setShowReservationForm(false)}
              />
              
              {/* Offre Club Créole */}
              <div className="mt-6 bg-green-50 p-4 rounded-lg border border-green-100">
                <h3 className="font-semibold text-creole-green">Offre Club Créole</h3>
                <p className="mt-2 text-sm">{restaurant.offer}</p>
              </div>
              
              {/* Informations pratiques */}
              <div className="mt-6">
                <h3 className="font-semibold">Informations pratiques</h3>
                <ul className="mt-2 space-y-2 text-sm text-gray-700">
                  <li>Accepte les réservations</li>
                  <li>Terrasse disponible</li>
                  <li>Accessible aux personnes à mobilité réduite</li>
                  <li>Paiement par carte accepté</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
