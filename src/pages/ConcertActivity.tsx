
import { useState } from "react";
import { ArrowLeft, MapPin, Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { concerts } from "@/components/concert/ConcertTypes";
import { Music, Ticket, Star } from "lucide-react";

const ConcertActivity = () => {
  const navigate = useNavigate();
  
  const handleViewConcertDetails = (concertId: number) => {
    navigate(`/concerts/${concertId}`);
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
                <Music className="w-4 h-4 mr-1" />
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
                onClick={() => handleViewConcertDetails(concert.id)}
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
