import { Users, Wind } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CarModelForDisplay } from "./CarRentalTypes";

interface RentalModelsProps {
  models?: CarModelForDisplay[];
  selectedModel: string | null;
  setSelectedModel: (model: string) => void;
}

const RentalModels = ({ models, selectedModel, setSelectedModel }: RentalModelsProps) => {
  if (!models || models.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Aucun modèle disponible actuellement</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Modèles disponibles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {models.map((model) => (
          <Card 
            key={model.id}
            className={`cursor-pointer transition-all hover:shadow-md ${selectedModel === model.name ? 'ring-2 ring-creole-green' : ''}`}
            onClick={() => setSelectedModel(model.name)}
          >
            <div className="h-40 overflow-hidden">
              <img 
                src={model.image} 
                alt={model.name}
                className="w-full h-full object-cover" 
              />
            </div>
            <CardContent className="pt-4">
              <h3 className="font-bold">{model.name}</h3>
              <div className="flex justify-between mt-1 text-sm text-gray-600">
                <span>{model.category}</span>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{model.seats}</span>
                </div>
              </div>
              <div className="my-2 flex justify-between items-center">
                <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">{model.transmission}</Badge>
                {model.airCon && (
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                    <Wind className="h-3 w-3 mr-1" /> Clim
                  </Badge>
                )}
              </div>
              <div className="mt-2 flex justify-end items-center">
                <span className="text-lg font-semibold text-creole-green">{model.pricePerDay}€ <span className="text-sm font-normal">/jour</span></span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RentalModels;
