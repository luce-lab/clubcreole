
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
      .select('*')
      .single();

    if (error) {
      console.error("Erreur Supabase:", error);
      throw error;
    }
    
    if (!data) {
      throw new Error("Aucune donnée mise à jour n'a été retournée");
    }
    
    console.log("Loisir mis à jour:", data);
    
    // Conversion du champ gallery_images de Json à string[]
    return {
      ...data,
      gallery_images: Array.isArray(data.gallery_images) 
        ? data.gallery_images 
        : []
    } as Loisir;
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
