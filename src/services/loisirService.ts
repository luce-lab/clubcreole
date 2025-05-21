
import { supabase } from "@/integrations/supabase/client";
import { Loisir } from "@/components/loisirs/types";

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
  const { data, error } = await supabase
    .from('loisirs')
    .update(updatedData)
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
