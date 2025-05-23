import { supabase } from "@/integrations/supabase/client";
import { Loisir } from "@/components/loisirs/types";
import { validateAndFormatDate } from "./dateUtils";

/**
 * Mise à jour d'une activité de loisir
 */
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
    console.log("Mise à jour de l'activité:", loisirId);
    console.log("Données reçues:", updatedData);
    
    // Valider et formater les dates avant de les envoyer à la base de données
    const formattedData = {
      ...updatedData,
      start_date: validateAndFormatDate(updatedData.start_date),
      end_date: validateAndFormatDate(updatedData.end_date)
    };

    console.log("Données formatées avant envoi à Supabase:", formattedData);

    // Exécuter la requête de mise à jour et récupérer explicitement le résultat
    const { data, error } = await supabase
      .from('loisirs')
      .update(formattedData)
      .eq('id', loisirId)
      .select();

    if (error) {
      console.error("Erreur Supabase lors de la mise à jour:", error);
      throw new Error(`Erreur de mise à jour: ${error.message}`);
    }
    
    if (!data || data.length === 0) {
      console.error("Aucune donnée n'a été retournée après la mise à jour");
      
      // Récupérer directement les données après la mise à jour si la requête n'en a pas renvoyé
      const { data: fetchedData, error: fetchError } = await supabase
        .from('loisirs')
        .select('*')
        .eq('id', loisirId)
        .single();
        
      if (fetchError) {
        console.error("Erreur lors de la récupération après mise à jour:", fetchError);
        throw new Error(`Erreur lors de la récupération: ${fetchError.message}`);
      }
      
      if (!fetchedData) {
        throw new Error("L'activité n'a pas pu être trouvée après la mise à jour");
      }
      
      console.log("Données récupérées séparément après mise à jour:", fetchedData);
      
      // Conversion du champ gallery_images
      const result = {
        ...fetchedData,
        gallery_images: Array.isArray(fetchedData.gallery_images) 
          ? fetchedData.gallery_images 
          : []
      } as Loisir;
      
      console.log("Loisir mis à jour (récupéré séparément):", result);
      return result;
    }
    
    console.log("Données retournées par Supabase:", data);
    
    // Prendre le premier élément du tableau résultat
    const updatedLoisir = data[0];
    
    // Conversion du champ gallery_images
    const result = {
      ...updatedLoisir,
      gallery_images: Array.isArray(updatedLoisir.gallery_images) 
        ? updatedLoisir.gallery_images 
        : []
    } as Loisir;
    
    console.log("Loisir mis à jour (formatté pour le frontend):", result);
    return result;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'activité:", error);
    throw error;
  }
};

/**
 * Récupération d'une activité de loisir par son ID
 */
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
