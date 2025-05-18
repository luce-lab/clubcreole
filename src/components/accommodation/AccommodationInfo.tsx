
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Wifi, Bath } from "lucide-react";

interface AccommodationInfoProps {
  description: string;
  maxGuests: number;
  rooms: number;
  bathrooms: number;
}

export const AccommodationInfo = ({ 
  description, 
  maxGuests, 
  rooms, 
  bathrooms 
}: AccommodationInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>À propos de cet hébergement</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-700">{description}</p>
        
        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
            <Users className="h-6 w-6 text-creole-green mb-2" />
            <div className="text-sm text-center">
              <span className="block font-medium">{maxGuests}</span>
              <span className="text-gray-500">voyageurs</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
            <Wifi className="h-6 w-6 text-creole-green mb-2" />
            <div className="text-sm text-center">
              <span className="block font-medium">{rooms}</span>
              <span className="text-gray-500">chambres</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
            <Bath className="h-6 w-6 text-creole-green mb-2" />
            <div className="text-sm text-center">
              <span className="block font-medium">{bathrooms}</span>
              <span className="text-gray-500">salles de bain</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
