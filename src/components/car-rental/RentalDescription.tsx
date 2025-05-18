
import { Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CarRental } from "./CarRentalTypes";

interface RentalDescriptionProps {
  rental: CarRental;
}

const RentalDescription = ({ rental }: RentalDescriptionProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-xl font-bold mb-4">À propos de {rental.name}</h2>
        <p className="text-gray-700 mb-6">{rental.description}</p>
        
        <h3 className="text-lg font-semibold mb-3">Caractéristiques</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {rental.features?.map((feature, index) => (
            <div key={index} className="flex items-center">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <rental.icon className="h-4 w-4 text-creole-green" />
              </div>
              <span>{feature}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-center text-amber-800 mb-2">
            <Tag className="h-5 w-5 mr-2" />
            <h3 className="font-semibold">Offre spéciale Club Créole</h3>
          </div>
          <p className="text-amber-700">{rental.offer}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RentalDescription;
