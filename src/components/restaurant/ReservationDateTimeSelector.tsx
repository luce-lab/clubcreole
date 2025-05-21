
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fr } from 'date-fns/locale';

interface ReservationDateTimeSelectorProps {
  date: Date | undefined;
  time: string;
  setDate: (date: Date | undefined) => void;
  setTime: (time: string) => void;
}

export const ReservationDateTimeSelector = ({
  date,
  time,
  setDate,
  setTime
}: ReservationDateTimeSelectorProps) => {
  // Générer les options d'horaires (midi et soir)
  const lunchTimeOptions = ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30"];
  const dinnerTimeOptions = ["19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"];

  return (
    <>
      {/* Date */}
      <div className="space-y-2">
        <Label htmlFor="date">Date de réservation *</Label>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          locale={fr}
          disabled={(date) => date < new Date()}
          className="border rounded-md"
          initialFocus
        />
      </div>

      {/* Heure */}
      <div className="space-y-2">
        <Label htmlFor="time">Heure de réservation *</Label>
        <Select value={time} onValueChange={setTime}>
          <SelectTrigger id="time" className="w-full">
            <SelectValue placeholder="Sélectionner une heure" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="" disabled>Sélectionner une heure</SelectItem>
            
            <SelectItem value="lunch-header" disabled className="font-medium">
              Déjeuner
            </SelectItem>
            {lunchTimeOptions.map(time => (
              <SelectItem key={`lunch-${time}`} value={time}>
                {time}
              </SelectItem>
            ))}
            
            <SelectItem value="dinner-header" disabled className="font-medium">
              Dîner
            </SelectItem>
            {dinnerTimeOptions.map(time => (
              <SelectItem key={`dinner-${time}`} value={time}>
                {time}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
