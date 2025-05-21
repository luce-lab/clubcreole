
import { supabase } from "@/integrations/supabase/client";
import { Loisir } from "@/components/loisirs/types";
import { parseISO, format, isValid } from "date-fns";

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
      return date.toISOString().split('T')[0]; // Format YYYY-MM-DD
    }
    
    // Si on ne peut pas formater, retourner la chaîne d'origine
    console.warn("Date non valide:", dateString);
    return dateString;
  } catch (error) {
    console.error("Erreur de validation/formatage de date:", error);
    return dateString;
  }
};

// Vérifier si une date est valide (passée ou future)
export const isDateValid = (dateString: string): boolean => {
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
    
    return isValid(date);
  } catch {
    return false;
  }
};

// Vérifier si une activité est terminée
export const isActivityPast = (endDate: string): boolean => {
  try {
    // Essayer de parser comme date ISO
    let date = parseISO(endDate);
    
    // Si ce n'est pas une date ISO valide, essayer d'autres formats
    if (!isValid(date) && endDate.includes('/')) {
      const parts = endDate.split('/');
      // Supposer format DD/MM/YYYY
      if (parts.length === 3) {
        const [day, month, year] = parts;
        date = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
      }
    }
    
    if (!isValid(date)) {
      console.warn("Date de fin non valide:", endDate);
      return false; // Si la date n'est pas valide, considérer que l'activité n'est pas terminée
    }
    
    const now = new Date();
    return date < now;
  } catch (error) {
    console.error("Erreur lors de la vérification de la date de fin:", error);
    return false;
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
  // Valider et formater les dates avant de les envoyer à la base de données
  const formattedData = {
    ...updatedData,
    start_date: validateAndFormatDate(updatedData.start_date),
    end_date: validateAndFormatDate(updatedData.end_date)
  };

  const { data, error } = await supabase
    .from('loisirs')
    .update(formattedData)
    .eq('id', loisirId)
    .select();

  if (error) throw error;
  
  // Si nous avons reçu des données, nous prenons le premier élément
  const updatedLoisir = data && data.length > 0 ? data[0] : null;
  if (!updatedLoisir) throw new Error("Aucune donnée mise à jour n'a été retournée");
  
  // Conversion du champ gallery_images de Json à string[]
  return {
    ...updatedLoisir,
    gallery_images: Array.isArray(updatedLoisir.gallery_images) 
      ? updatedLoisir.gallery_images 
      : []
  } as Loisir;
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
