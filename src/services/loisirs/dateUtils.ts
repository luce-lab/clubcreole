import { parseISO, format, isValid, isBefore, isAfter, parse } from "date-fns";
import { fr } from "date-fns/locale";

/**
 * Fonction utilitaire pour valider et formater les dates
 */
export const validateAndFormatDate = (dateString: string): string => {
  try {
    // Essayer de parser comme date ISO
    let date = parseISO(dateString);
    
    // Si ce n'est pas une date ISO valide, essayer d'autres formats
    if (!isValid(date) && dateString.includes('/')) {
      const parts = dateString.split('/');
      // Supposer format DD/MM/YYYY
      if (parts.length === 3) {
        const [day, month, year] = parts;
        date = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
      }
    }
    
    // Essayer le format français "15 juillet 2025, 16:00"
    if (!isValid(date) && dateString.includes(' ')) {
      try {
        // Enlever la partie heure si présente
        const datePart = dateString.split(',')[0];
        date = parse(datePart, 'd MMMM yyyy', new Date(), { locale: fr });
      } catch (e) {
        console.error("Échec du parsing de la date au format français:", e);
      }
    }
    
    // Vérifier si la date est maintenant valide
    if (isValid(date)) {
      return format(date, "yyyy-MM-dd", { locale: fr }); // Format YYYY-MM-DD
    }
    
    // Si on ne peut pas formater, retourner la chaîne d'origine
    console.warn("Date non valide:", dateString);
    return dateString;
  } catch (error) {
    console.error("Erreur de validation/formatage de date:", error);
    return dateString;
  }
};

/**
 * Convertit une chaîne de date en objet Date (gère différents formats)
 */
export const parseDate = (dateString: string): Date | null => {
  try {
    // Essayer d'abord de parser comme une date ISO
    let date = parseISO(dateString);
    
    // Si ce n'est pas une date ISO valide, essayer d'autres formats
    if (!isValid(date)) {
      // Format européen DD/MM/YYYY
      if (dateString.includes('/')) {
        const parts = dateString.split('/');
        if (parts.length === 3) {
          const [day, month, year] = parts;
          date = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
        }
      }
      // Format avec texte comme "15 juin 2024, 14:00"
      else if (dateString.includes(' ')) {
        try {
          // Enlever la partie heure si présente
          const datePart = dateString.split(',')[0];
          date = parse(datePart, 'd MMMM yyyy', new Date(), { locale: fr });
        } catch (e) {
          console.error("Échec du parsing de la date au format français:", e);
        }
      }
    }
    
    return isValid(date) ? date : null;
  } catch (error) {
    console.error("Erreur de parsing de date:", error);
    return null;
  }
};

/**
 * Vérifier si une date est valide (passée ou future)
 */
export const isDateValid = (dateString: string): boolean => {
  const date = parseDate(dateString);
  return date !== null;
};

/**
 * Vérifier si une activité est terminée
 */
export const isActivityPast = (endDate: string): boolean => {
  try {
    const parsedEndDate = parseDate(endDate);
    
    if (!parsedEndDate) {
      console.warn("Date de fin non valide:", endDate);
      return false;
    }
    
    const now = new Date();
    return isBefore(parsedEndDate, now);
  } catch (error) {
    console.error("Erreur lors de la vérification de la date de fin:", error);
    return false;
  }
};

/**
 * Formatage des dates pour affichage
 */
export const formatDisplayDate = (dateString: string): string => {
  try {
    const date = parseDate(dateString);
    
    // Vérifier si la date est maintenant valide
    if (date && isValid(date)) {
      return format(date, "d MMMM yyyy", { locale: fr });
    }
    
    // Retourner une indication si la date n'est pas valide
    return "Date à confirmer";
  } catch (e) {
    console.error("Erreur de format de date:", e);
    return "Date à confirmer";
  }
};
