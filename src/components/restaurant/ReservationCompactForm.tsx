
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";

interface ReservationCompactFormProps {
  onShowFullForm: () => void;
}

export const ReservationCompactForm = ({
  onShowFullForm
}: ReservationCompactFormProps) => {
  return (
    <div className="bg-white border rounded-lg p-6 shadow-sm">
      <h3 className="font-semibold text-lg mb-4">Réservez une table</h3>
      <p className="text-gray-700 mb-4">
        Réservez votre table et profitez d'une expérience gastronomique exceptionnelle.
      </p>
      <Button 
        className="w-full bg-creole-green hover:bg-creole-green/90"
        onClick={onShowFullForm}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        Réserver maintenant
      </Button>
    </div>
  );
};
