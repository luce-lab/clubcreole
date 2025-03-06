
import { useState } from "react";
import { ArrowLeft, MapPin, Tag, Star, Car, Route, Shield, Fuel } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface CarRental {
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

const carRentals: CarRental[] = [
  {
    id: 1,
    name: "Caribbean Cars",
    type: "Véhicules économiques",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    location: "Fort-de-France",
    description: "Une large gamme de véhicules économiques et compacts, parfaits pour explorer l'île. Service client réactif et tarifs compétitifs.",
    rating: 4.6,
    offer: "15% de réduction sur toutes les locations de plus de 3 jours pour les membres du Club Créole",
    icon: Car
  },
  {
    id: 2,
    name: "Prestige Auto",
    type: "Véhicules de luxe",
    image: "https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    location: "Les Trois-Îlets",
    description: "Louez des voitures de luxe et profitez d'un service premium. Notre flotte comprend des SUV haut de gamme, des cabriolets et des berlines de luxe.",
    rating: 4.8,
    offer: "Un jour de location offert pour toute réservation d'une semaine ou plus",
    icon: Shield
  },
  {
    id: 3,
    name: "Eco Drive",
    type: "Véhicules électriques",
    image: "https://images.unsplash.com/photo-1593941707882-a5bfb1050f50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    location: "Le Lamentin",
    description: "Louez des véhicules 100% électriques pour une expérience écologique. Contribuez à préserver la beauté naturelle des Antilles tout en explorant l'île.",
    rating: 4.5,
    offer: "Recharge gratuite et 10% de réduction pour les membres du Club Créole",
    icon: Fuel
  },
  {
    id: 4,
    name: "Aventure 4x4",
    type: "Véhicules tout-terrain",
    image: "https://images.unsplash.com/photo-1533743410561-5c70e1a14cc1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    location: "Sainte-Anne",
    description: "Spécialiste des 4x4 et SUV pour explorer les zones moins accessibles. Idéal pour les aventuriers souhaitant découvrir les trésors cachés de l'île.",
    rating: 4.7,
    offer: "Kit d'aventure offert (GPS, glacière, guides) pour toute location 4x4 de 3 jours ou plus",
    icon: Route
  }
];

const CarRentalActivity = () => {
  const navigate = useNavigate();
  const [selectedCarRental, setSelectedCarRental] = useState<CarRental | null>(null);

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
        <h1 className="text-3xl font-bold text-creole-blue">Location de Voitures</h1>
        <p className="text-gray-600 mt-2">
          Découvrez nos partenaires de location de voitures et profitez d'offres exclusives avec votre abonnement Club Créole
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {carRentals.map((rental) => (
          <Card key={rental.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={rental.image} 
                alt={rental.name} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <Badge className="absolute top-3 right-3 bg-creole-green text-white">
                <rental.icon className="w-4 h-4 mr-1" />
                {rental.type}
              </Badge>
            </div>
            
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">{rental.name}</CardTitle>
                <div className="flex items-center text-yellow-500">
                  <Star className="fill-yellow-500 h-5 w-5" />
                  <span className="ml-1 text-gray-700">{rental.rating}</span>
                </div>
              </div>
              <CardDescription className="flex items-center text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-1" /> {rental.location}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                {rental.description}
              </p>
              <div className="flex items-center text-creole-green font-medium">
                <Tag className="h-4 w-4 mr-2" />
                <span className="text-sm line-clamp-1">{rental.offer}</span>
              </div>
            </CardContent>
            
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    className="w-full bg-creole-green hover:bg-creole-green/90"
                    onClick={() => setSelectedCarRental(rental)}
                  >
                    Voir les détails
                  </Button>
                </DialogTrigger>
                {selectedCarRental && (
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>{selectedCarRental.name}</DialogTitle>
                      <DialogDescription className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" /> {selectedCarRental.location}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <img 
                        src={selectedCarRental.image} 
                        alt={selectedCarRental.name} 
                        className="w-full h-56 object-cover rounded-md"
                      />
                      <p className="text-gray-700">{selectedCarRental.description}</p>
                      <div className="bg-green-50 p-4 rounded-md border border-green-200">
                        <h3 className="font-semibold text-creole-green flex items-center">
                          <Tag className="h-4 w-4 mr-2" />
                          Offre spéciale Club Créole
                        </h3>
                        <p className="mt-1 text-gray-700">{selectedCarRental.offer}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="text-gray-700 mr-2">Note:</span>
                          <div className="flex items-center text-yellow-500">
                            <Star className="fill-yellow-500 h-5 w-5" />
                            <span className="ml-1 text-gray-700">{selectedCarRental.rating}/5</span>
                          </div>
                        </div>
                        <Button className="bg-creole-green hover:bg-creole-green/90">
                          Réserver maintenant
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
          lors de la réservation de votre véhicule pour bénéficier des offres exclusives.
        </p>
        <Button className="bg-creole-green hover:bg-creole-green/90">
          Devenir membre
        </Button>
      </div>
    </div>
  );
};

export default CarRentalActivity;
