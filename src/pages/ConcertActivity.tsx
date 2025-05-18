import { useState } from "react";
import { ArrowLeft, MapPin, Calendar, Clock, Music, Users, Ticket, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface Concert {
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

const concerts: Concert[] = [
  {
    id: 1,
    name: "Festival Zouk & Love",
    artist: "Kassav' & Invités",
    genre: "Zouk",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    location: "Stade de Dillon, Fort-de-France",
    description: "Le légendaire groupe Kassav' revient pour une soirée exceptionnelle dédiée au zouk. Avec des invités surprise et une ambiance garantie, ce concert s'annonce comme l'événement musical de l'année en Martinique.",
    date: "15 juillet 2024",
    time: "20:00",
    price: 45,
    offer: "Réduction de 20% sur le tarif normal pour les membres du Club Créole",
    rating: 4.9,
    icon: Music
  },
  {
    id: 2,
    name: "Nuit du Reggae",
    artist: "Alpha Blondy & The Solar System",
    genre: "Reggae",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    location: "Plage de Grande Anse, Guadeloupe",
    description: "Alpha Blondy, l'une des figures majeures du reggae africain, se produira pour un concert exceptionnel au coucher du soleil sur la magnifique plage de Grande Anse. Vibrations positives garanties!",
    date: "23 juillet 2024",
    time: "19:30",
    price: 38,
    offer: "Un cocktail offert sur présentation de la carte Club Créole",
    rating: 4.7,
    icon: Music
  },
  {
    id: 3,
    name: "Soirée Biguine Jazz",
    artist: "Martinique Jazz Orchestra",
    genre: "Jazz & Biguine",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    location: "Théâtre de Pointe-à-Pitre",
    description: "Une soirée unique mêlant les rythmes traditionnels de la biguine aux harmonies sophistiquées du jazz. Le Martinique Jazz Orchestra vous propose un voyage musical à travers l'histoire des Antilles.",
    date: "5 août 2024",
    time: "20:30",
    price: 32,
    offer: "Places en catégorie supérieure au tarif standard pour les membres du Club Créole",
    rating: 4.8,
    icon: Music
  },
  {
    id: 4,
    name: "Carnaval Électronique",
    artist: "DJ Snake & artistes locaux",
    genre: "Électro / Dance",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    location: "Plage des Salines, Martinique",
    description: "Le célèbre DJ Snake vient mixer sur la plage des Salines pour une nuit électro mémorable. En première partie, découvrez les meilleurs talents locaux de la scène électronique antillaise.",
    date: "12 août 2024",
    time: "22:00",
    price: 55,
    offer: "Accès à l'espace VIP avec une consommation offerte pour les membres du Club Créole",
    rating: 4.6,
    icon: Music
  }
];

const ConcertActivity = () => {
  const navigate = useNavigate();
  const [selectedConcert, setSelectedConcert] = useState<Concert | null>(null);

  const handleViewConcertDetails = (concert: Concert) => {
    navigate(`/concerts/${concert.id}`);
  };

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
        <h1 className="text-3xl font-bold text-creole-blue">Concerts & Événements Musicaux</h1>
        <p className="text-gray-600 mt-2">
          Découvrez les concerts partenaires du Club Créole et profitez d'offres exclusives
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {concerts.map((concert) => (
          <Card key={concert.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={concert.image} 
                alt={concert.name} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <Badge className="absolute top-3 right-3 bg-purple-600 text-white">
                <concert.icon className="w-4 h-4 mr-1" />
                {concert.genre}
              </Badge>
            </div>
            
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">{concert.name}</CardTitle>
                <div className="flex items-center text-yellow-500">
                  <Star className="fill-yellow-500 h-5 w-5" />
                  <span className="ml-1 text-gray-700">{concert.rating}</span>
                </div>
              </div>
              <CardDescription className="font-medium text-purple-700">{concert.artist}</CardDescription>
              <CardDescription className="flex items-center text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-1" /> {concert.location}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="flex items-center space-x-4 mb-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{concert.date}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{concert.time}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                {concert.description}
              </p>
              <div className="flex items-center text-purple-600 font-medium">
                <Ticket className="h-4 w-4 mr-2" />
                <span className="text-sm line-clamp-1">{concert.offer}</span>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700"
                onClick={() => handleViewConcertDetails(concert)}
              >
                Voir les détails
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-bold text-creole-blue mb-2">Comment profiter des avantages?</h2>
        <p className="text-gray-700 mb-4">
          En tant que membre du Club Créole, présentez simplement votre carte de membre ou application mobile
          lors de l'achat de vos billets pour bénéficier des offres exclusives sur les concerts et événements partenaires.
        </p>
        <Button className="bg-purple-600 hover:bg-purple-700">
          Devenir membre
        </Button>
      </div>
    </div>
  );
};

export default ConcertActivity;
