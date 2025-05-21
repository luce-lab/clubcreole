
import { Star, MapPin } from "lucide-react";
import BackButton from "@/components/common/BackButton";

interface AccommodationHeaderProps {
  name: string;
  location: string;
  rating: number;
}

export const AccommodationHeader = ({ name, location, rating }: AccommodationHeaderProps) => {
  return (
    <>
      <BackButton backTo="/hebergements" />

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-creole-blue">{name}</h1>
        <div className="flex items-center mt-2 text-gray-600">
          <MapPin className="h-5 w-5 mr-1" />
          <span>{location}</span>
          <span className="mx-2">•</span>
          <Star className="h-5 w-5 text-yellow-400 mr-1" fill="currentColor" />
          <span>{rating}</span>
        </div>
      </div>
    </>
  );
};
