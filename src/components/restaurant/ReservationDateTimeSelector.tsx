
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fr } from 'date-fns/locale';
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, User, Info } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface ReservationDateTimeSelectorProps {
  date: Date | undefined;
  time: string;
  setDate: (date: Date | undefined) => void;
  setTime: (time: string) => void;
  step: number;
}

export const ReservationDateTimeSelector = ({
  date,
  time,
  setDate,
  setTime,
  step
}: ReservationDateTimeSelectorProps) => {
  // Générer les options d'horaires (midi et soir)
  const lunchTimeOptions = ["12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30"];
  const dinnerTimeOptions = ["19:00", "19:15", "19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00", "21:15", "21:30", "21:45", "22:00", "22:15"];

  return (
    <div className="space-y-6">
      {/* Étapes de réservation */}
      <div className="bg-emerald-50 rounded-lg flex items-center p-1">
        <Button 
          className={cn(
            "rounded-full flex-grow-0 px-6 flex gap-2 mr-2",
            step === 1 ? "bg-emerald-700 text-white" : "bg-transparent text-gray-400"
          )}
          variant={step === 1 ? "default" : "ghost"}
        >
          <CalendarIcon className="h-4 w-4" /> Date
        </Button>
        <div className="flex items-center gap-1 text-gray-400 flex-grow justify-between px-2">
          <Clock className={cn("h-4 w-4", step === 2 ? "text-emerald-700" : "")} />
          <span className="mx-2">⟩</span>
          <User className={cn("h-4 w-4", step === 3 ? "text-emerald-700" : "")} />
          <span className="mx-2">⟩</span>
          <Info className="h-4 w-4" />
        </div>
      </div>

      {step === 1 && (
        <>
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

          <div className="flex items-center gap-2 border-t pt-4 mt-4">
            <CalendarIcon className="h-5 w-5 text-gray-500" />
            <p className="text-sm text-gray-600">
              Vous ne trouvez pas votre date ?
            </p>
          </div>
        </>
      )}

      {step === 2 && date && (
        <div className="space-y-3">
          <h3 className="font-semibold text-xl mb-6 text-center">Sélectionnez une heure</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Déjeuner</h4>
              <div className="grid grid-cols-4 gap-2">
                {lunchTimeOptions.map(timeOption => (
                  <Button
                    key={`lunch-${timeOption}`}
                    variant={time === timeOption ? "default" : "outline"}
                    className={cn(
                      "h-12",
                      time === timeOption 
                        ? "bg-emerald-700 hover:bg-emerald-800" 
                        : "bg-white hover:bg-gray-100"
                    )}
                    onClick={() => setTime(timeOption)}
                  >
                    {timeOption}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Dîner</h4>
              <div className="grid grid-cols-4 gap-2">
                {dinnerTimeOptions.map(timeOption => (
                  <Button
                    key={`dinner-${timeOption}`}
                    variant={time === timeOption ? "default" : "outline"}
                    className={cn(
                      "h-12",
                      time === timeOption 
                        ? "bg-emerald-700 hover:bg-emerald-800" 
                        : "bg-white hover:bg-gray-100"
                    )}
                    onClick={() => setTime(timeOption)}
                  >
                    {timeOption}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 border-t pt-4 mt-6">
            <Clock className="h-5 w-5 text-gray-500" />
            <p className="text-sm text-gray-600">
              Pas de table à l'horaire souhaité ?
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
