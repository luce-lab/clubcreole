
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Tag, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Offer {
  id: string;
  title: string;
  description: string;
  price: number | null;
  discount_percentage: number | null;
  start_date: string | null;
  end_date: string | null;
  is_active: boolean;
  partners?: {
    business_name: string;
    business_type: string;
    address: string | null;
  };
}

interface OfferCardProps {
  offer: Offer;
}

const OfferCard = ({ offer }: OfferCardProps) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short'
    });
  };

  const isExpiringSoon = () => {
    if (!offer.end_date) return false;
    const endDate = new Date(offer.end_date);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  };

  const handleViewDetails = () => {
    navigate(`/offers/${offer.id}`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
      {offer.discount_percentage && (
        <Badge className="absolute top-3 right-3 bg-red-500 text-white z-10">
          -{offer.discount_percentage}%
        </Badge>
      )}
      
      {isExpiringSoon() && (
        <Badge className="absolute top-3 left-3 bg-orange-500 text-white z-10">
          <Clock className="w-3 h-3 mr-1" />
          Expire bientôt
        </Badge>
      )}
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl line-clamp-2">{offer.title}</CardTitle>
        </div>
        {offer.partners && (
          <CardDescription className="flex items-center gap-2">
            <span className="font-medium">{offer.partners.business_name}</span>
            <Badge variant="outline" className="text-xs">
              {offer.partners.business_type}
            </Badge>
          </CardDescription>
        )}
      </CardHeader>
      
      <CardContent className="space-y-3">
        <p className="text-sm text-gray-600 line-clamp-3">
          {offer.description}
        </p>
        
        <div className="flex flex-wrap gap-2 text-xs text-gray-500">
          {offer.partners?.address && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span className="line-clamp-1">{offer.partners.address}</span>
            </div>
          )}
          
          {(offer.start_date || offer.end_date) && (
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {offer.start_date && offer.end_date ? (
                <span>
                  {formatDate(offer.start_date)} - {formatDate(offer.end_date)}
                </span>
              ) : offer.end_date ? (
                <span>Jusqu'au {formatDate(offer.end_date)}</span>
              ) : (
                <span>À partir du {formatDate(offer.start_date)}</span>
              )}
            </div>
          )}
        </div>

        {offer.price && (
          <div className="flex items-center text-creole-green font-medium">
            <Tag className="h-4 w-4 mr-2" />
            <span className="text-lg">{offer.price}€</span>
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full bg-creole-green hover:bg-creole-green/90"
          onClick={handleViewDetails}
        >
          Voir les détails
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OfferCard;
