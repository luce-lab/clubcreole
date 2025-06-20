
import { Calendar, MapPin, Clock, Users, Building } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
  max_participants: number | null;
  current_participants: number | null;
  partners?: {
    business_name: string;
    phone: string | null;
    website: string | null;
  };
}

interface TravelDetailHeaderProps {
  offer: TravelOffer;
}

export const TravelDetailHeader = ({ offer }: TravelDetailHeaderProps) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Date à définir";
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const availableSpots = (offer.max_participants || 20) - (offer.current_participants || 0);

  return (
    <div className="space-y-6">
      {offer.image && (
        <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden relative">
          <img 
            src={offer.image} 
            alt={offer.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4">
            <Badge className="bg-blue-600 text-white text-lg px-3 py-1">
              {offer.duration_days} jours
            </Badge>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {offer.title}
            </h1>
            
            {offer.partners && (
              <div className="flex items-center gap-2 text-blue-600 mb-3">
                <Building className="h-4 w-4" />
                <span className="font-medium">{offer.partners.business_name}</span>
              </div>
            )}
          </div>
          
          <div className="text-right">
            <div className="text-3xl font-bold text-green-600">
              {offer.price}€
            </div>
            <div className="text-sm text-gray-500">par personne</div>
          </div>
        </div>
        
        <p className="text-lg text-gray-700 leading-relaxed">
          {offer.description}
        </p>
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-600" />
            <span><strong>Destination:</strong> {offer.destination}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-600" />
            <span><strong>Départ:</strong> {offer.departure_location}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-600" />
            <span><strong>Durée:</strong> {offer.duration_days} jours</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-600" />
            <span><strong>Places disponibles:</strong> {availableSpots}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-blue-50 rounded-lg">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-900">Date de départ</span>
            </div>
            <p className="text-blue-800">{formatDate(offer.departure_date)}</p>
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-900">Date de retour</span>
            </div>
            <p className="text-blue-800">{formatDate(offer.return_date)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
