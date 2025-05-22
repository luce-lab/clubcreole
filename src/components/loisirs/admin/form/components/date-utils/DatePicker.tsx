
import { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { parseDateString } from "./parseDateString";

interface DatePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  minDate?: Date;
  id?: string;
}

export const DatePicker = ({
  label,
  value,
  onChange,
  minDate,
  id,
}: DatePickerProps) => {
  const [dateObj, setDateObj] = useState<Date | undefined>(undefined);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  // Parse the date string when the value changes
  useEffect(() => {
    const result = parseDateString(value);
    setDateObj(result.date);
    setHasError(!result.isValid && value !== "");
    setErrorMessage(result.errorMessage);
  }, [value]);

  // Handle date selection from the calendar
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setDateObj(date);
      // Format as ISO string (YYYY-MM-DD)
      const formattedDate = format(date, 'yyyy-MM-dd');
      console.log(`New ${label} selected:`, formattedDate);
      onChange(formattedDate);
      setHasError(false);
      setErrorMessage(undefined);
    }
  };

  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm font-medium flex items-center">
        {label}
        {hasError && errorMessage && (
          <span className="ml-2 text-xs text-red-500 flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" /> {errorMessage}
          </span>
        )}
      </label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !dateObj && "text-muted-foreground",
              hasError && "border-red-500"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateObj ? (
              format(dateObj, "dd MMMM yyyy", { locale: fr })
            ) : (
              <span>{hasError ? "Date invalide - Sélectionner" : "Sélectionner une date"}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={dateObj}
            onSelect={handleDateSelect}
            initialFocus
            disabled={minDate ? (date) => date < minDate : undefined}
            locale={fr}
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>

      {/* Hidden input for form compatibility */}
      <input 
        id={`${id}-hidden`} 
        type="hidden" 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
      />
    </div>
  );
};
