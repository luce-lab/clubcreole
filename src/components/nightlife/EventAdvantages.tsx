
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";
import { NightEvent } from "./NightlifeTypes";

interface EventAdvantagesProps {
  event: NightEvent;
}

const EventAdvantages = ({ event }: EventAdvantagesProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center text-purple-600 mb-4">
          <Users className="h-5 w-5 mr-2" />
          <h2 className="text-lg font-bold">Avantage Club Créole</h2>
        </div>
        <p className="mb-4">{event.offer}</p>
        <p className="text-sm text-gray-600">
          Profitez de réductions spéciales et d'avantages exclusifs en présentant votre carte de membre du Club Créole.
        </p>
      </CardContent>
    </Card>
  );
};

export default EventAdvantages;
