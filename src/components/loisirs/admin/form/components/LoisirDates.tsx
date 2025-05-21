
import { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, AlertCircle } from "lucide-react";
import { format, parseISO, isValid } from "date-fns";
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
  const [startDateError, setStartDateError] = useState<boolean>(false);
  const [endDateError, setEndDateError] = useState<boolean>(false);

  // Convertir les chaînes de caractères en objets Date
  useEffect(() => {
    try {
      if (startDate) {
        // Essayer d'abord comme date ISO
        let date = parseISO(startDate);
        
        // Vérifier si la date est valide
        if (!isValid(date)) {
          // Essayer le format DD/MM/YYYY
          if (startDate.includes('/')) {
            const [day, month, year] = startDate.split('/');
            date = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
          }
        }
        
        if (isValid(date)) {
          setStartDateObj(date);
          setStartDateError(false);
        } else {
          setStartDateError(true);
        }
      }
      
      if (endDate) {
        // Essayer d'abord comme date ISO
        let date = parseISO(endDate);
        
        // Vérifier si la date est valide
        if (!isValid(date)) {
          // Essayer le format DD/MM/YYYY
          if (endDate.includes('/')) {
            const [day, month, year] = endDate.split('/');
            date = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
          }
        }
        
        if (isValid(date)) {
          setEndDateObj(date);
          setEndDateError(false);
        } else {
          setEndDateError(true);
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
      setStartDateError(false);
    }
  };

  const handleEndDateSelect = (date: Date | undefined) => {
    if (date) {
      setEndDateObj(date);
      const formattedDate = format(date, 'yyyy-MM-dd');
      onEndDateChange(formattedDate);
      setEndDateError(false);
    }
  };

  return (
    <>
      <div className="grid gap-2">
        <label htmlFor="startDate" className="text-sm font-medium flex items-center">
          Date de début
          {startDateError && (
            <span className="ml-2 text-xs text-red-500 flex items-center">
              <AlertCircle className="h-3 w-3 mr-1" /> Format de date invalide
            </span>
          )}
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="edit-startDate"
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !startDateObj && "text-muted-foreground",
                startDateError && "border-red-500"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDateObj ? (
                format(startDateObj, "dd MMMM yyyy", { locale: fr })
              ) : (
                <span>{startDateError ? "Date invalide - Sélectionner" : "Sélectionner une date"}</span>
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
        <label htmlFor="endDate" className="text-sm font-medium flex items-center">
          Date de fin
          {endDateError && (
            <span className="ml-2 text-xs text-red-500 flex items-center">
              <AlertCircle className="h-3 w-3 mr-1" /> Format de date invalide
            </span>
          )}
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="edit-endDate"
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !endDateObj && "text-muted-foreground",
                endDateError && "border-red-500"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {endDateObj ? (
                format(endDateObj, "dd MMMM yyyy", { locale: fr })
              ) : (
                <span>{endDateError ? "Date invalide - Sélectionner" : "Sélectionner une date"}</span>
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
              disabled={(date) => startDateObj ? date < startDateObj : false}
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
