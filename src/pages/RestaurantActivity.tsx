
import { useState } from "react";
import { ArrowLeft, MapPin, Tag, Star, Coffee, Pizza, Salad, Wine } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface Restaurant {
  id: number;
  name: string;
  type: string;
  image: string;
  location: string;
  description: string;
  rating: number;
  offer: string;
  icon: React.ElementType;
}

const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "La Case Créole",
    type: "Cuisine traditionnelle",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    location: "Fort-de-France",
    description: "Découvrez les saveurs authentiques de la gastronomie créole dans un cadre chaleureux et convivial. Notre chef vous propose des plats traditionnels revisités avec finesse.",
    rating: 4.8,
    offer: "15% de réduction sur l'addition (hors boissons) pour les membres du Club Créole",
    icon: Salad
  },
  {
    id: 2,
    name: "L'Azur Bleu",
    type: "Restaurant de fruits de mer",
    image: "https://images.unsplash.com/photo-1564419320720-068497c4ca1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    location: "Le Diamant",
    description: "Face à la mer, dégustez les meilleurs fruits de mer et poissons fraîchement pêchés. Notre terrasse offre une vue imprenable sur l'océan.",
    rating: 4.6,
    offer: "Un cocktail offert pour tout menu découverte commandé",
    icon: Wine
  },
  {
    id: 3,
    name: "Pizzeria del Mare",
    type: "Pizzeria",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    location: "Trois-Îlets",
    description: "Nos pizzas sont préparées dans le respect de la tradition italienne, avec des produits frais et de saison. Le four à bois leur donne ce goût unique et authentique.",
    rating: 4.5,
    offer: "Une pizza achetée = une pizza offerte tous les mardis soir",
    icon: Pizza
  },
  {
    id: 4,
    name: "Le Café des Artistes",
    type: "Café-restaurant",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    location: "Schoelcher",
    description: "Un lieu où se mêlent art et gastronomie. Expositions régulières, concerts acoustiques et une carte qui change au fil des saisons pour valoriser les produits locaux.",
    rating: 4.7,
    offer: "Petit-déjeuner complet à -20% pour les membres du Club Créole (7h-10h)",
    icon: Coffee
  }
];

const RestaurantActivity = () => {
  const navigate = useNavigate();
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-creole-blue">Nos Restaurants Partenaires</h1>
        <p className="text-gray-600 mt-2">
          Découvrez les restaurants partenaires du Club Créole et profitez d'offres exclusives
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {restaurants.map((restaurant) => (
          <Card key={restaurant.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={restaurant.image} 
                alt={restaurant.name} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <Badge className="absolute top-3 right-3 bg-creole-green text-white">
                <restaurant.icon className="w-4 h-4 mr-1" />
                {restaurant.type}
              </Badge>
            </div>
            
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">{restaurant.name}</CardTitle>
                <div className="flex items-center text-yellow-500">
                  <Star className="fill-yellow-500 h-5 w-5" />
                  <span className="ml-1 text-gray-700">{restaurant.rating}</span>
                </div>
              </div>
              <CardDescription className="flex items-center text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-1" /> {restaurant.location}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                {restaurant.description}
              </p>
              <div className="flex items-center text-creole-green font-medium">
                <Tag className="h-4 w-4 mr-2" />
                <span className="text-sm line-clamp-1">{restaurant.offer}</span>
              </div>
            </CardContent>
            
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    className="w-full bg-creole-green hover:bg-creole-green/90"
                    onClick={() => setSelectedRestaurant(restaurant)}
                  >
                    Voir les détails
                  </Button>
                </DialogTrigger>
                {selectedRestaurant && (
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>{selectedRestaurant.name}</DialogTitle>
                      <DialogDescription className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" /> {selectedRestaurant.location}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <img 
                        src={selectedRestaurant.image} 
                        alt={selectedRestaurant.name} 
                        className="w-full h-56 object-cover rounded-md"
                      />
                      <p className="text-gray-700">{selectedRestaurant.description}</p>
                      <div className="bg-green-50 p-4 rounded-md border border-green-200">
                        <h3 className="font-semibold text-creole-green flex items-center">
                          <Tag className="h-4 w-4 mr-2" />
                          Offre spéciale Club Créole
                        </h3>
                        <p className="mt-1 text-gray-700">{selectedRestaurant.offer}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="text-gray-700 mr-2">Note:</span>
                          <div className="flex items-center text-yellow-500">
                            <Star className="fill-yellow-500 h-5 w-5" />
                            <span className="ml-1 text-gray-700">{selectedRestaurant.rating}/5</span>
                          </div>
                        </div>
                        <Button className="bg-creole-green hover:bg-creole-green/90">
                          Réserver une table
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                )}
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-bold text-creole-blue mb-2">Comment profiter des avantages?</h2>
        <p className="text-gray-700 mb-4">
          En tant que membre du Club Créole, présentez simplement votre carte de membre ou application mobile
          au moment de régler l'addition pour bénéficier des offres exclusives.
        </p>
        <Button className="bg-creole-green hover:bg-creole-green/90">
          Devenir membre
        </Button>
      </div>
    </div>
  );
};

export default RestaurantActivity;
