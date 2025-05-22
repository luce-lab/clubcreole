
import { supabase } from "@/integrations/supabase/client";
import { Loisir } from "@/components/loisirs/types";
import { parseISO, format, isValid, isBefore, isAfter } from "date-fns";
import { fr } from "date-fns/locale";

// Fonction utilitaire pour valider et formater les dates
const validateAndFormatDate = (dateString: string): string => {
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

// Convertit une chaîne de date en objet Date (gère différents formats)
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
        // Pour simplifier, extraire seulement la date sans l'heure
        const frenchMonths = {
          'janvier': '01', 'février': '02', 'mars': '03', 'avril': '04', 
          'mai': '05', 'juin': '06', 'juillet': '07', 'août': '08', 
          'septembre': '09', 'octobre': '10', 'novembre': '11', 'décembre': '12'
        };
        
        let day, month, year;
        
        for (const [monthName, monthNum] of Object.entries(frenchMonths)) {
          if (dateString.toLowerCase().includes(monthName)) {
            const parts = dateString.split(' ');
            day = parts[0].padStart(2, '0');
            month = monthNum;
            // Extraire l'année (peut avoir une virgule)
            year = parts[2].replace(',', '');
            date = new Date(`${year}-${month}-${day}`);
            break;
          }
        }
      }
    }
    
    return isValid(date) ? date : null;
  } catch (error) {
    console.error("Erreur de parsing de date:", error);
    return null;
  }
};

// Vérifier si une date est valide (passée ou future)
export const isDateValid = (dateString: string): boolean => {
  const date = parseDate(dateString);
  return date !== null;
};

// Vérifier si une activité est terminée
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

export const updateLoisir = async (
  loisirId: number,
  updatedData: {
    title: string;
    description: string;
    location: string;
    start_date: string;
    end_date: string;
    image: string;
    max_participants: number;
    current_participants: number;
    gallery_images?: string[];
  }
): Promise<Loisir> => {
  try {
    console.log("Mise à jour de l'activité:", loisirId, updatedData);
    
    // Valider et formater les dates avant de les envoyer à la base de données
    const formattedData = {
      ...updatedData,
      start_date: validateAndFormatDate(updatedData.start_date),
      end_date: validateAndFormatDate(updatedData.end_date)
    };

    console.log("Données formatées:", formattedData);

    const { data, error } = await supabase
      .from('loisirs')
      .update(formattedData)
      .eq('id', loisirId)
      .select('*');

    if (error) {
      console.error("Erreur Supabase:", error);
      throw error;
    }
    
    // Si nous avons reçu des données, nous prenons le premier élément
    if (data && data.length > 0) {
      const updatedLoisir = data[0];
      
      console.log("Loisir mis à jour:", updatedLoisir);
      
      // Conversion du champ gallery_images de Json à string[]
      return {
        ...updatedLoisir,
        gallery_images: Array.isArray(updatedLoisir.gallery_images) 
          ? updatedLoisir.gallery_images 
          : []
      } as Loisir;
    } else {
      throw new Error("Aucune donnée mise à jour n'a été retournée");
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'activité:", error);
    throw error;
  }
};

export const getLoisirById = async (id: number): Promise<Loisir> => {
  const { data, error } = await supabase
    .from('loisirs')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  if (!data) throw new Error("Activité non trouvée");
  
  // Conversion du champ gallery_images de Json à string[]
  return {
    ...data,
    gallery_images: Array.isArray(data.gallery_images) 
      ? data.gallery_images 
      : []
  } as Loisir;
};
