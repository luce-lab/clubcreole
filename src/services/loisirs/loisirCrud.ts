import { supabase } from "@/integrations/supabase/client";
import { Loisir } from "@/components/loisirs/types";
import { validateAndFormatDate } from "./dateUtils.ts";

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

    // Première tentative : utilisation de update().select() pour récupérer directement les données mises à jour
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
      console.log("Aucune donnée n'a été retournée par la mise à jour. Récupération séparée...");
      
      // Si la mise à jour a réussi mais n'a pas renvoyé de données, les récupérer explicitement
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
    
    console.log("Données retournées directement par Supabase:", data);
    
    // Conversion du champ gallery_images
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
  try {
    console.log("Récupération du loisir par ID:", id);
    
    const { data, error } = await supabase
      .from('loisirs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error("Erreur lors de la récupération du loisir:", error);
      throw error;
    }
    
    if (!data) {
      console.error("Aucune donnée trouvée pour le loisir ID:", id);
      throw new Error("Activité non trouvée");
    }
    
    console.log("Loisir récupéré avec succès:", data);
    
    // Conversion du champ gallery_images de Json à string[]
    const result = {
      ...data,
      gallery_images: Array.isArray(data.gallery_images) 
        ? data.gallery_images 
        : []
    } as Loisir;
    
    return result;
  } catch (error) {
    console.error("Erreur lors de la récupération du loisir:", error);
    throw error;
  }
};
