
import { useState } from "react";
import { ArrowLeft, Clock, MapPin, Martini, Music, Users, Calendar, Star } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface NightEvent {
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

export const nightEvents: NightEvent[] = [
  {
    id: 1,
    name: "Soirée Zouk & Kompa",
    type: "Club",
    venue: "Le Piment Rouge, Fort-de-France",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Une soirée endiablée au son du zouk et du kompa avec les meilleurs DJ de l'île. Ambiance garantie jusqu'au petit matin dans le club le plus branché de Fort-de-France.",
    date: "Tous les vendredis",
    time: "23:00 - 05:00",
    price: 20,
    offer: "Entrée gratuite avant minuit pour les membres du Club Créole",
    rating: 4.8,
    features: ["DJ Live", "Piste de danse", "Cocktails spéciaux", "Aire VIP"]
  },
  {
    id: 2,
    name: "Beach Party Sunset",
    type: "Plage",
    venue: "Plage de Grande Anse, Guadeloupe",
    image: "https://images.unsplash.com/photo-1533219057257-4bb9ed5d2cc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Dansez pieds nus sur le sable au coucher du soleil. Cocktails tropicaux, musique house et ambiance décontractée face à l'océan. L'événement incontournable de l'été en Guadeloupe.",
    date: "Samedis et dimanches",
    time: "17:00 - 01:00",
    price: 15,
    offer: "Un cocktail offert sur présentation de la carte Club Créole",
    rating: 4.9,
    features: ["Coucher de soleil", "Bar sur la plage", "Feux d'artifice", "Animations"]
  },
  {
    id: 3,
    name: "Casino Royal Night",
    type: "Casino",
    venue: "Casino des Trois-Îlets, Martinique",
    image: "https://images.unsplash.com/photo-1596548438137-d51ea5c83ca5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Une soirée glamour au casino avec jeux de table, machines à sous et spectacle de cabaret. Tenue élégante exigée pour cette expérience luxueuse dans l'un des plus beaux casinos des Antilles.",
    date: "Tous les samedis",
    time: "20:00 - 04:00",
    price: 30,
    offer: "Jetons de jeu d'une valeur de 20€ offerts aux membres du Club Créole",
    rating: 4.7,
    features: ["Tables de jeux", "Spectacle cabaret", "Dîner gastronomique", "Service voiturier"]
  },
  {
    id: 4,
    name: "Soirée Karaoké Antillais",
    type: "Bar",
    venue: "Le Ti' Punch, Pointe-à-Pitre",
    image: "https://images.unsplash.com/photo-1574007557239-acf6863bc375?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Ambiance conviviale et décontractée pour cette soirée karaoké où vous pourrez chanter les plus grands tubes antillais et internationaux. Cocktails et spécialités locales à déguster entre amis.",
    date: "Mercredis et jeudis",
    time: "20:00 - 01:00",
    price: 10,
    offer: "2 cocktails pour le prix d'un sur présentation de la carte Club Créole",
    rating: 4.5,
    features: ["Plus de 5000 chansons", "Animateur professionnel", "Petite restauration", "Terrasse"]
  }
];

const NightlifeActivity = () => {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState<NightEvent | null>(null);

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
        <h1 className="text-3xl font-bold text-[#9b87f5]">Soirées & Vie Nocturne</h1>
        <p className="text-gray-600 mt-2">
          Découvrez les meilleures soirées et établissements nocturnes partenaires du Club Créole
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {nightEvents.map((event) => (
          <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={event.image} 
                alt={event.name} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <Badge className="absolute top-3 right-3 bg-[#6E59A5] text-white">
                <Martini className="w-4 h-4 mr-1" />
                {event.type}
              </Badge>
            </div>
            
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">{event.name}</CardTitle>
                <div className="flex items-center text-yellow-500">
                  <Star className="fill-yellow-500 h-5 w-5" />
                  <span className="ml-1 text-gray-700">{event.rating}</span>
                </div>
              </div>
              <CardDescription className="flex items-center text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-1" /> {event.venue}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="flex items-center space-x-4 mb-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{event.time}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                {event.description}
              </p>
              <div className="flex items-center text-[#8B5CF6] font-medium">
                <Martini className="h-4 w-4 mr-2" />
                <span className="text-sm line-clamp-1">{event.offer}</span>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                className="w-full bg-[#7E69AB] hover:bg-[#6E59A5]"
                onClick={() => navigate(`/soiree/${event.id}`)}
              >
                Voir les détails
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-bold text-[#9b87f5] mb-2">Comment profiter des avantages?</h2>
        <p className="text-gray-700 mb-4">
          En tant que membre du Club Créole, présentez simplement votre carte de membre ou application mobile
          lors de votre arrivée dans les établissements partenaires pour bénéficier des offres exclusives sur les soirées et événements.
        </p>
        <Button className="bg-[#7E69AB] hover:bg-[#6E59A5]">
          Devenir membre
        </Button>
      </div>
    </div>
  );
};

export default NightlifeActivity;
