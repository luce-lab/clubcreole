
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fr } from 'date-fns/locale';
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

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
    <div className="space-y-6">
      {/* Étapes de réservation */}
      <div className="bg-emerald-50 rounded-lg flex items-center p-1">
        <Button 
          className="rounded-full bg-emerald-700 text-white flex-grow-0 px-6 flex gap-2 mr-2"
          variant="default"
        >
          <CalendarIcon className="h-4 w-4" /> Date
        </Button>
        <div className="flex items-center gap-1 text-gray-400 flex-grow justify-between px-2">
          <Clock className="h-4 w-4" />
          <span className="mx-2">⟩</span>
          <span className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </span>
          <span className="mx-2">⟩</span>
          <span className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </span>
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold text-xl mb-6 text-center">
          {date ? format(date, 'MMMM yyyy', { locale: fr }) : "Sélectionnez une date"}
        </h3>
        
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          locale={fr}
          disabled={(date) => date < new Date()}
          className="border rounded-md p-0"
          initialFocus
          classNames={{
            day_today: "bg-emerald-50 text-emerald-900",
            day_selected: "bg-emerald-700 text-primary-foreground",
            day_range_middle: "bg-emerald-100",
          }}
        />
        
        <p className="text-xs text-gray-500 mt-4">
          Les offres peuvent varier durant le processus de réservation en fonction de l'heure, de la date et du nombre de personnes.
        </p>
      </div>

      {date && (
        <div className="space-y-3">
          <Label htmlFor="time" className="text-sm font-medium">Heure de réservation *</Label>
          <Select value={time} onValueChange={setTime}>
            <SelectTrigger id="time" className="w-full">
              <SelectValue placeholder="Sélectionner une heure" />
            </SelectTrigger>
            <SelectContent>
              {/* L'élément sélectionné pour le placeholder - utilise une valeur valide mais non sélectionnable */}
              <SelectItem value="placeholder" disabled className="font-medium">
                Sélectionner une heure
              </SelectItem>
              
              {/* En-tête pour le déjeuner - utilise une valeur unique non vide */}
              <SelectItem value="lunch-header" disabled className="font-medium">
                Déjeuner
              </SelectItem>
              {lunchTimeOptions.map(time => (
                <SelectItem key={`lunch-${time}`} value={time}>
                  {time}
                </SelectItem>
              ))}
              
              {/* En-tête pour le dîner - utilise une valeur unique non vide */}
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
      )}

      <div className="flex items-center gap-2 border-t pt-4 mt-4">
        <svg className="h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <p className="text-sm text-gray-600">
          Vous ne trouvez pas votre date ?
        </p>
      </div>
    </div>
  );
};
