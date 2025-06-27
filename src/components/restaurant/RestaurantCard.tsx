
import { Coffee, MapPin, Pizza, Salad, Star, Tag, Wine } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import LazyImage from "@/components/ui/LazyImage";
import { Restaurant } from "./types";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  
  // Mapping des icônes en fonction du type stocké dans la base de données
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Salad": return <Salad className="w-4 h-4 mr-1" />;
      case "Wine": return <Wine className="w-4 h-4 mr-1" />;
      case "Pizza": return <Pizza className="w-4 h-4 mr-1" />;
      case "Coffee": return <Coffee className="w-4 h-4 mr-1" />;
      default: return <Salad className="w-4 h-4 mr-1" />;
    }
  };

  const handleViewDetails = () => {
    navigate(`/restauration/${restaurant.id}`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <LazyImage 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <Badge className="absolute top-3 right-3 bg-creole-green text-white">
          {getIconComponent(restaurant.icon)}
          {restaurant.type}
        </Badge>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">{restaurant.name}</CardTitle>
          <div className="flex items-center text-yellow-500">
            <Star className="fill-yellow-500 h-5 w-5" />
            <span className="ml-1 text-gray-700">{restaurant.rating}</span>
          </div>
        </div>
        <CardDescription className="flex items-center text-sm text-gray-500">
          <MapPin className="h-4 w-4 mr-1" /> {restaurant.location}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {restaurant.description}
        </p>
        <div className="flex items-center text-creole-green font-medium">
          <Tag className="h-4 w-4 mr-2" />
          <span className="text-sm line-clamp-1">{restaurant.offer}</span>
        </div>
      </CardContent>
      
      <CardFooter>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="w-full bg-creole-green hover:bg-creole-green/90"
              onClick={handleViewDetails}
            >
              Voir les détails
            </Button>
          </DialogTrigger>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default RestaurantCard;
