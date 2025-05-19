
import { Star, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accommodation } from "@/components/accommodation/AccommodationTypes";
import { FeatureIcon } from "@/components/accommodation/FeatureIcon";

interface AccommodationCardProps {
  accommodation: Accommodation;
}

export const AccommodationCard = ({ accommodation }: AccommodationCardProps) => {
  const navigate = useNavigate();
  
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow">
      <div className="h-48 bg-gray-200 relative cursor-pointer" onClick={() => navigate(`/hebergements/${accommodation.id}`)}>
        <img 
          src={accommodation.image} 
          alt={accommodation.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-sm font-bold flex items-center">
          <Star className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" />
          {accommodation.rating}
        </div>
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle 
              className="text-xl cursor-pointer hover:text-creole-green" 
              onClick={() => navigate(`/hebergements/${accommodation.id}`)}
            >
              {accommodation.name}
            </CardTitle>
            <CardDescription className="flex items-center mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {accommodation.location}
            </CardDescription>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-creole-green">{accommodation.price}€</span>
            <p className="text-sm text-gray-500">par nuit</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{accommodation.description.substring(0, 100)}...</p>
        <div className="flex flex-wrap gap-2">
          {accommodation.features.slice(0, 4).map((feature, index) => (
            <span 
              key={index}
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs flex items-center"
            >
              <FeatureIcon feature={feature} />
              <span className="ml-1">{feature}</span>
            </span>
          ))}
          {accommodation.features.length > 4 && (
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
              +{accommodation.features.length - 4}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-creole-green hover:bg-creole-green/90"
          onClick={() => navigate(`/hebergements/${accommodation.id}`)}
        >
          Voir les détails
        </Button>
      </CardFooter>
    </Card>
  );
};
