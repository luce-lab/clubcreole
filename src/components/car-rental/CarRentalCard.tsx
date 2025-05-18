
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CarRental } from "./CarRentalTypes";

interface CarRentalCardProps {
  rental: CarRental;
}

const CarRentalCard = ({ rental }: CarRentalCardProps) => {
  const navigate = useNavigate();
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={rental.image} 
          alt={rental.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <Badge className="absolute top-3 right-3 bg-creole-green text-white">
          <rental.icon className="w-4 h-4 mr-1" />
          {rental.type}
        </Badge>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">{rental.name}</CardTitle>
          <div className="flex items-center text-yellow-500">
            <Star className="fill-yellow-500 h-5 w-5" />
            <span className="ml-1 text-gray-700">{rental.rating}</span>
          </div>
        </div>
        <CardDescription className="flex items-center text-sm text-gray-500">
          <MapPin className="h-4 w-4 mr-1" /> {rental.location}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {rental.description}
        </p>
        <div className="flex items-center text-creole-green font-medium">
          <Tag className="h-4 w-4 mr-2" />
          <span className="text-sm line-clamp-1">{rental.offer}</span>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full bg-creole-green hover:bg-creole-green/90"
          onClick={() => navigate(`/location/${rental.id}`)}
        >
          Voir les détails
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CarRentalCard;
