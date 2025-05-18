
import { Card, CardContent } from "@/components/ui/card";
import { Martini } from "lucide-react";
import { NightEvent } from "./NightlifeTypes";

interface EventFeaturesProps {
  event: NightEvent;
}

const EventFeatures = ({ event }: EventFeaturesProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-lg font-bold text-purple-600 mb-4">Caractéristiques de l'événement</h2>
        <div className="grid grid-cols-2 gap-3">
          {event.features.map((feature: string, index: number) => (
            <div key={index} className="flex items-center">
              <div className="bg-purple-100 p-2 rounded-full mr-3">
                <Martini className="h-4 w-4 text-purple-600" />
              </div>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventFeatures;
