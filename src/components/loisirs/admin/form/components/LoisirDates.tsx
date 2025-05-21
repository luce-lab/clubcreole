
import { useState, useEffect } from "react";
import { FormField } from "../FormField";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface LoisirDatesProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
}

export const LoisirDates = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: LoisirDatesProps) => {
  const [startDateObj, setStartDateObj] = useState<Date | undefined>(undefined);
  const [endDateObj, setEndDateObj] = useState<Date | undefined>(undefined);

  // Convertir les chaînes de caractères en objets Date
  useEffect(() => {
    try {
      if (startDate) {
        const date = parseISO(startDate);
        if (!isNaN(date.getTime())) {
          setStartDateObj(date);
        }
      }
      
      if (endDate) {
        const date = parseISO(endDate);
        if (!isNaN(date.getTime())) {
          setEndDateObj(date);
        }
      }
    } catch (error) {
      console.error("Erreur lors de la conversion des dates:", error);
    }
  }, [startDate, endDate]);

  // Mettre à jour les dates lorsque l'utilisateur sélectionne une date
  const handleStartDateSelect = (date: Date | undefined) => {
    if (date) {
      setStartDateObj(date);
      const formattedDate = format(date, 'yyyy-MM-dd');
      onStartDateChange(formattedDate);
    }
  };

  const handleEndDateSelect = (date: Date | undefined) => {
    if (date) {
      setEndDateObj(date);
      const formattedDate = format(date, 'yyyy-MM-dd');
      onEndDateChange(formattedDate);
    }
  };

  return (
    <>
      <div className="grid gap-2">
        <label htmlFor="startDate" className="text-sm font-medium">
          Date de début
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="edit-startDate"
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !startDateObj && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDateObj ? (
                format(startDateObj, "dd MMMM yyyy", { locale: fr })
              ) : (
                <span>Sélectionner une date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={startDateObj}
              onSelect={handleStartDateSelect}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid gap-2">
        <label htmlFor="endDate" className="text-sm font-medium">
          Date de fin
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="edit-endDate"
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !endDateObj && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {endDateObj ? (
                format(endDateObj, "dd MMMM yyyy", { locale: fr })
              ) : (
                <span>Sélectionner une date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={endDateObj}
              onSelect={handleEndDateSelect}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
              disabled={(date) => date < startDateObj!}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Conserver les champs input d'origine mais en hidden pour compatibilité */}
      <input 
        id="edit-startDate-hidden" 
        type="hidden" 
        value={startDate} 
        onChange={(e) => onStartDateChange(e.target.value)} 
      />
      
      <input 
        id="edit-endDate-hidden" 
        type="hidden" 
        value={endDate} 
        onChange={(e) => onEndDateChange(e.target.value)} 
      />
    </>
  );
};
