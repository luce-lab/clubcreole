
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Clock, 
  Music, 
  Users, 
  Ticket, 
  Star,
  Share
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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

// Example data - this would typically come from an API
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

const ConcertDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [concert, setConcert] = useState<Concert | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [ticketCount, setTicketCount] = useState(1);
  const [isReservationDialogOpen, setIsReservationDialogOpen] = useState(false);

  useEffect(() => {
    // Find the concert with the matching id
    const foundConcert = concerts.find(c => c.id === parseInt(id || "0"));
    if (foundConcert) {
      setConcert(foundConcert);
      
      // Parse date string (assuming format "DD month YYYY")
      const [day, month, year] = foundConcert.date.split(" ");
      const monthMap: Record<string, number> = {
        "janvier": 0, "février": 1, "mars": 2, "avril": 3, "mai": 4, "juin": 5,
        "juillet": 6, "août": 7, "septembre": 8, "octobre": 9, "novembre": 10, "décembre": 11
      };
      
      const monthNumber = monthMap[month.toLowerCase()];
      if (monthNumber !== undefined) {
        const concertDate = new Date(parseInt(year), monthNumber, parseInt(day));
        setSelectedDate(concertDate);
      }
    } else {
      navigate("/concerts");
    }
  }, [id, navigate]);

  const handleBooking = () => {
    if (!selectedDate) {
      toast({
        title: "Sélectionnez une date",
        description: "Veuillez choisir une date pour continuer",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Réservation confirmée !",
      description: `Vous avez réservé ${ticketCount} place${ticketCount > 1 ? 's' : ''} pour ${concert?.name}`,
    });
    
    setIsReservationDialogOpen(false);
  };

  const handleShare = () => {
    if (navigator.share && concert) {
      navigator.share({
        title: concert.name,
        text: `Découvrez ${concert.name} par ${concert.artist}`,
        url: window.location.href
      }).catch(() => {
        toast({
          description: "Lien copié dans le presse-papier",
        });
        navigator.clipboard.writeText(window.location.href);
      });
    } else {
      toast({
        description: "Lien copié dans le presse-papier",
      });
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (!concert) {
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center">
        <p>Chargement du concert...</p>
      </div>
    );
  }

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

      <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
        <img 
          src={concert.image} 
          alt={concert.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
          <Badge className="self-start mb-2 bg-purple-600 text-white">
            <concert.icon className="w-4 h-4 mr-1" />
            {concert.genre}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">{concert.name}</h1>
          <p className="text-xl text-white/90">{concert.artist}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-purple-600">À propos de l'événement</h2>
                <Button variant="outline" size="icon" onClick={handleShare}>
                  <Share className="h-5 w-5" />
                </Button>
              </div>
              
              <p className="text-gray-700 mb-6">{concert.description}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{concert.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Clock className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Horaire</p>
                    <p className="font-medium">{concert.time}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <MapPin className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Lieu</p>
                    <p className="font-medium">{concert.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Ticket className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Prix</p>
                    <p className="font-medium">{concert.price}€ par personne</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">Avantage Club Créole</h2>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 flex items-start space-x-4">
                <Users className="h-6 w-6 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-800 mb-1">Offre spéciale membres</p>
                  <p className="text-gray-700">{concert.offer}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-gray-50 rounded-lg p-6 mt-8">
            <h2 className="text-xl font-bold text-purple-600 mb-4">Informations complémentaires</h2>
            <ul className="space-y-3">
              <li className="flex space-x-2">
                <span className="text-purple-600">•</span>
                <span>Ouverture des portes 1h avant le début du concert</span>
              </li>
              <li className="flex space-x-2">
                <span className="text-purple-600">•</span>
                <span>Pièce d'identité obligatoire pour accéder à l'événement</span>
              </li>
              <li className="flex space-x-2">
                <span className="text-purple-600">•</span>
                <span>Service de navette disponible depuis le centre-ville</span>
              </li>
              <li className="flex space-x-2">
                <span className="text-purple-600">•</span>
                <span>Pas de remboursement possible sauf annulation de l'événement</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div>
          <Card className="sticky top-4">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Réserver</h2>
                <div className="flex items-center">
                  <Star className="fill-yellow-500 h-5 w-5" />
                  <span className="ml-1 font-semibold">{concert.rating}</span>
                </div>
              </div>
              
              <Dialog open={isReservationDialogOpen} onOpenChange={setIsReservationDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 mb-4">
                    Réserver maintenant
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Réservation - {concert.name}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Date</h3>
                      <CalendarComponent
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border w-full"
                        disabled={(date) => {
                          const now = new Date();
                          now.setHours(0, 0, 0, 0);
                          return date < now;
                        }}
                      />
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">Nombre de places</h3>
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={ticketCount <= 1}
                          onClick={() => setTicketCount(prev => Math.max(1, prev - 1))}
                        >
                          -
                        </Button>
                        <span className="flex-1 text-center">{ticketCount}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={ticketCount >= 10}
                          onClick={() => setTicketCount(prev => Math.min(10, prev + 1))}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Prix unitaire</span>
                        <span>{concert.price}€</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Nombre de places</span>
                        <span>{ticketCount}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>{concert.price * ticketCount}€</span>
                      </div>
                      
                      <Button 
                        className="w-full mt-4 bg-purple-600 hover:bg-purple-700" 
                        onClick={handleBooking}
                      >
                        Confirmer la réservation
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <div className="p-4 bg-purple-50 rounded-lg border border-purple-100 mb-4">
                <p className="text-purple-700 text-sm font-medium">Avantage Club Créole</p>
                <p className="text-gray-700 text-sm">{concert.offer}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <Music className="h-5 w-5 text-gray-500 mr-3" />
                  <span className="text-gray-700">{concert.genre}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-500 mr-3" />
                  <span className="text-gray-700">{concert.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-500 mr-3" />
                  <span className="text-gray-700">{concert.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-500 mr-3" />
                  <span className="text-gray-700">{concert.time}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConcertDetail;
