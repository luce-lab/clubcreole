
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

    // Exécution de la requête de mise à jour
    const { data, error } = await supabase
      .from('loisirs')
      .update(formattedData)
      .eq('id', loisirId)
      .select('*')
      .single();

    if (error) {
      console.error("Erreur Supabase lors de la mise à jour:", error);
      throw new Error(`Erreur de mise à jour: ${error.message}`);
    }
    
    if (!data) {
      console.error("Aucune donnée n'a été retournée après la mise à jour");
      throw new Error("Aucune donnée mise à jour n'a été retournée");
    }
    
    console.log("Données retournées par Supabase:", data);
    
    // Conversion du champ gallery_images de Json à string[]
    const result = {
      ...data,
      gallery_images: Array.isArray(data.gallery_images) 
        ? data.gallery_images 
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
