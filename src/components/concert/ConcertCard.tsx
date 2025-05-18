
import { Music, MapPin, Calendar, Clock, Ticket, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Concert } from './ConcertTypes';

interface ConcertCardProps {
  concert: Concert;
}

const ConcertCard: React.FC<ConcertCardProps> = ({ concert }) => {
  const navigate = useNavigate();
  const Icon = concert.icon;
  
  const handleViewConcertDetails = (concertId: number) => {
    navigate(`/concerts/${concertId}`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
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
  );
};

export default ConcertCard;
