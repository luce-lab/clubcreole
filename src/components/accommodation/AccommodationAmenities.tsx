
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";

interface Amenity {
  name: string;
  available: boolean;
}

interface AccommodationAmenitiesProps {
  amenities: Amenity[];
}

export const AccommodationAmenities = ({ amenities }: AccommodationAmenitiesProps) => {
  // Filtrer et valider les amenities pour s'assurer qu'elles sont correctement structurées
  const validAmenities = amenities?.filter(amenity => 
    amenity && 
    typeof amenity === 'object' && 
    amenity.name && 
    typeof amenity.name === 'string' &&
    typeof amenity.available === 'boolean'
  ) || [];

  // Si aucun équipement valide, ne pas afficher la section
  if (validAmenities.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Équipements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {validAmenities.map((amenity, index) => (
            <div key={index} className="flex items-center">
              {amenity.available ? (
                <Check className="h-5 w-5 text-creole-green mr-2" />
              ) : (
                <X className="h-5 w-5 text-gray-400 mr-2" />
              )}
              <span className={amenity.available ? "" : "text-gray-400 line-through"}>
                {amenity.name}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
