
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock, Euro } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TravelOffer {
  id: number;
  title: string;
  description: string;
  destination: string;
  duration_days: number;
  price: number;
  departure_location: string;
  departure_date: string | null;
  return_date: string | null;
  image: string | null;
  gallery_images: string[];
  inclusions: string[];
  exclusions: string[];
  max_participants: number | null;
  current_participants: number | null;
  is_active: boolean | null;
  created_at: string | null;
  updated_at: string | null;
}

interface TravelOfferCardProps {
  offer: TravelOffer;
}

export const TravelOfferCard = ({ offer }: TravelOfferCardProps) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Date à définir";
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  const availableSpots = (offer.max_participants || 20) - (offer.current_participants || 0);

  return (
    <Card className="h-full bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      {offer.image && (
        <div className="w-full h-48 overflow-hidden rounded-t-lg relative group">
          <img 
            src={offer.image} 
            alt={offer.title} 
            className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-105"
          />
          <div className="absolute top-4 right-4">
            <Badge className="bg-blue-600 text-white">
              {offer.duration_days} jours
            </Badge>
          </div>
        </div>
      )}
      
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl font-semibold text-gray-800 line-clamp-2">
            {offer.title}
          </CardTitle>
          <div className="flex items-center ml-2">
            <Euro className="h-4 w-4 text-green-600" />
            <span className="text-2xl font-bold text-green-600">{offer.price}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{offer.destination}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{offer.duration_days}j</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <CardDescription className="text-gray-600 line-clamp-3">
          {offer.description}
        </CardDescription>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-600" />
            <span>Départ: {formatDate(offer.departure_date)}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-600" />
            <span>De: {offer.departure_location}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-600" />
            <span>{availableSpots} places disponibles</span>
          </div>
        </div>
        
        {offer.inclusions && offer.inclusions.length > 0 && (
          <div className="pt-2">
            <p className="text-sm font-medium text-gray-700 mb-1">Inclus:</p>
            <div className="flex flex-wrap gap-1">
              {offer.inclusions.slice(0, 3).map((inclusion, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {inclusion}
                </Badge>
              ))}
              {offer.inclusions.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{offer.inclusions.length - 3} autres
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <Button 
          variant="outline" 
          className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white w-full mt-2"
          onClick={() => navigate(`/voyages/${offer.id}`)}
        >
          Voir les détails
        </Button>
      </CardFooter>
    </Card>
  );
};
