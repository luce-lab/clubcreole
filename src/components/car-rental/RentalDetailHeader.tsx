
import { ArrowLeft, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { CarRental } from "./CarRentalTypes";

interface RentalDetailHeaderProps {
  rental: CarRental;
}

const RentalDetailHeader = ({ rental }: RentalDetailHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-creole-blue">{rental.name}</h1>
          <div className="flex items-center text-gray-600 mt-2">
            <MapPin className="h-5 w-5 mr-2" /> {rental.location}
            <span className="mx-2">•</span>
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
              <span>{rental.rating}/5</span>
            </div>
          </div>
        </div>
        <Badge className="text-sm py-1 px-3 bg-creole-green text-white">
          <rental.icon className="h-4 w-4 mr-1" /> {rental.type}
        </Badge>
      </div>
    </>
  );
};

export default RentalDetailHeader;
