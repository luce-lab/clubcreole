
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface RestaurantDetailHeaderProps {
  name: string;
  type: string;
  rating: number;
  location: string;
  onShowReservationForm: () => void;
}

const RestaurantDetailHeader = ({
  name,
  type,
  rating,
  location,
  onShowReservationForm
}: RestaurantDetailHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h1 className="text-3xl font-bold">{name}</h1>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="outline" className="bg-white">
            {type}
          </Badge>
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">★</span>
            <span>{rating}</span>
          </div>
          <span className="text-gray-500">·</span>
          <span className="text-gray-500">{location}</span>
        </div>
      </div>
      <Button 
        className="bg-creole-green hover:bg-creole-green/90"
        onClick={onShowReservationForm}
      >
        <Calendar className="mr-2 h-4 w-4" />
        Réserver une table
      </Button>
    </div>
  );
};

export default RestaurantDetailHeader;
