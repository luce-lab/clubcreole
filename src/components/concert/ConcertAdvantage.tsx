
import { Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Concert } from './ConcertTypes';

interface ConcertAdvantageProps {
  concert: Concert;
}

const ConcertAdvantage: React.FC<ConcertAdvantageProps> = ({ concert }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold text-purple-600 mb-4">Avantage Club Créole</h2>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 flex items-start space-x-4">
          <Users className="h-6 w-6 text-purple-600 mt-1 flex-shrink-0" />
          <div>
            <p className="font-semibold text-gray-800 mb-1">Offre spéciale membres</p>
            <p className="text-gray-700">{concert.offer}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConcertAdvantage;
