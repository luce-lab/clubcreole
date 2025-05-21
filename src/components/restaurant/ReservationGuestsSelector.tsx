
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ReservationGuestsSelectorProps {
  guests: string;
  setGuests: (guests: string) => void;
}

export const ReservationGuestsSelector = ({
  guests,
  setGuests
}: ReservationGuestsSelectorProps) => {
  return (
    <div className="space-y-3">
      <Label htmlFor="guests">Combien de personnes ?</Label>
      <div className="grid grid-cols-4 gap-2 md:grid-cols-8">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
          <Button
            key={num}
            type="button"
            variant={guests === num.toString() ? "default" : "outline"}
            className={cn(
              "h-12 w-12", 
              guests === num.toString() 
                ? "bg-emerald-700 hover:bg-emerald-800" 
                : "bg-white hover:bg-gray-100"
            )}
            onClick={() => setGuests(num.toString())}
          >
            {num}
          </Button>
        ))}
        <Button
          type="button"
          variant={guests === "9+" ? "default" : "outline"}
          className={cn(
            "h-12", 
            guests === "9+" 
              ? "bg-emerald-700 hover:bg-emerald-800" 
              : "bg-white hover:bg-gray-100"
          )}
          onClick={() => setGuests("9+")}
        >
          9+
        </Button>
      </div>
    </div>
  );
};
