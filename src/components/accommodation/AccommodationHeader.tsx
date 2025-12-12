
import { Star, MapPin, CheckCircle } from "lucide-react";
import BackButton from "@/components/common/BackButton";
import { Badge } from "@/components/ui/badge";
import { PartnerInfo } from "@/components/accommodation/AccommodationTypes";

interface AccommodationHeaderProps {
  name: string;
  location: string;
  rating: number;
  partner?: PartnerInfo | null;
}

export const AccommodationHeader = ({ name, location, rating, partner }: AccommodationHeaderProps) => {
  return (
    <>
      <BackButton backTo="/hebergements" />

      <div className="mb-6">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-3xl font-bold text-creole-blue">{name}</h1>
          {partner && partner.status === 'approuve' && (
            <Badge className="bg-creole-green text-white font-semibold flex items-center gap-1 h-fit">
              <CheckCircle className="h-4 w-4" />
              Partenaire Vérifié
            </Badge>
          )}
        </div>
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
