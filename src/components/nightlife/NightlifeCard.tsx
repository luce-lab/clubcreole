
import { Calendar, Clock, MapPin, Martini, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NightEvent } from "./NightlifeTypes";

interface NightlifeCardProps {
  event: NightEvent;
}

const NightlifeCard = ({ event }: NightlifeCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
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
  );
};

export default NightlifeCard;
