
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
      <h3 className="font-semibold text-xl mb-2">Réservez une table</h3>
      <p className="text-gray-500 text-sm mb-5">Gratuitement</p>
      <Button 
        className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-medium"
        onClick={onShowFullForm}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        Réserver maintenant
      </Button>
    </div>
  );
};
