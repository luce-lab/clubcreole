
import { parseISO, isValid, parse } from "date-fns";
import { fr } from "date-fns/locale";

/**
 * Parse a date string into a Date object, handling different formats
 */
export const parseDateString = (dateString: string): { 
  date: Date | undefined; 
  isValid: boolean;
  errorMessage?: string;
} => {
  try {
    if (!dateString) {
      return { date: undefined, isValid: false };
    }
    
    // console.log("Parsing date string:", dateString);
    
    // Try as ISO date first
    let date = parseISO(dateString);
    
    // If not valid, try DD/MM/YYYY format
    if (!isValid(date) && dateString.includes('/')) {
      const [day, month, year] = dateString.split('/');
      date = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
    }
    
    // Try French format like "12 juillet 2025, 16:00"
    if (!isValid(date) && dateString.includes(' ')) {
      // Handle format like "12 juillet 2025" or "12 juillet 2025, 16:00"
      try {
        // Remove time part if present
        const datePart = dateString.split(',')[0];
        date = parse(datePart, 'd MMMM yyyy', new Date(), { locale: fr });
      } catch (e) {
        console.error("Failed to parse French date format:", e);
      }
    }
    
    // Check if the date is now valid
    if (isValid(date)) {
      // console.log("Date parsed successfully:", date);
      return { date, isValid: true };
    }
    
    console.warn("Invalid date string:", dateString);
    return { 
      date: undefined, 
      isValid: false,
      errorMessage: "Format de date invalide" 
    };
  } catch (error) {
    console.error("Error parsing date:", error);
    return { 
      date: undefined, 
      isValid: false, 
      errorMessage: "Erreur lors de la conversion de la date" 
    };
  }
};
