
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
  
  return updatedLoisir;
};
