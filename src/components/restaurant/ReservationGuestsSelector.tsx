
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

interface ReservationGuestsSelectorProps {
  guests: string;
  setGuests: (guests: string) => void;
}

export const ReservationGuestsSelector = ({
  guests,
  setGuests
}: ReservationGuestsSelectorProps) => {
  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-xl mb-4">Nombre de personnes</h3>
      
      <div className="grid grid-cols-4 gap-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
          <Button
            key={num}
            type="button"
            variant={guests === num.toString() ? "default" : "outline"}
            className={cn(
              "h-14", 
              guests === num.toString() 
                ? "bg-emerald-700 hover:bg-emerald-800" 
                : "bg-white hover:bg-gray-100"
            )}
            onClick={() => setGuests(num.toString())}
          >
            {num}
          </Button>
        ))}
      </div>
      
      <Button
        type="button"
        variant="outline"
        className="text-emerald-700 w-full border-emerald-200 bg-emerald-50"
      >
        Plus de choix
      </Button>
      
      <p className="text-sm text-gray-500">
        Les offres peuvent varier durant le processus de réservation en fonction de l'heure, de la date et du nombre de personnes.
      </p>
      
      <div className="flex items-center gap-2 border-t pt-4 mt-4">
        <User className="h-5 w-5 text-gray-500" />
        <p className="text-sm text-gray-600">
          Pas la disponibilité souhaitée ?
        </p>
      </div>
    </div>
  );
};
