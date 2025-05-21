
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ReservationGuestsSelectorProps {
  guests: string;
  setGuests: (guests: string) => void;
}

export const ReservationGuestsSelector = ({
  guests,
  setGuests
}: ReservationGuestsSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="guests">Nombre de personnes *</Label>
      <Select value={guests} onValueChange={setGuests}>
        <SelectTrigger id="guests">
          <SelectValue placeholder="Nombre de personnes" />
        </SelectTrigger>
        <SelectContent>
          {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
            <SelectItem key={num} value={num.toString()}>
              {num} personne{num > 1 ? "s" : ""}
            </SelectItem>
          ))}
          <SelectItem value="9+">Plus de 8 personnes</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
