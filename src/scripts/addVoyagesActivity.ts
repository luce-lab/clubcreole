
import { supabase } from "../integrations/supabase/client";

export const addVoyagesActivity = async () => {
  try {
    // Vérifier si l'activité Voyages existe déjà
    const { data: existingActivity, error: checkError } = await supabase
      .from('activities')
      .select('*')
      .eq('name', 'Voyages')
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Erreur lors de la vérification:', checkError);
      return;
    }

    if (existingActivity) {
      // console.log('L\'activité Voyages existe déjà');
      return;
    }

    // Ajouter l'activité Voyages
    const { data, error } = await supabase
      .from('activities')
      .insert([
        {
          name: 'Voyages',
          path: '/voyages',
          icon_name: 'Plane'
        }
      ])
      .select();

    if (error) {
      console.error('Erreur lors de l\'ajout de l\'activité Voyages:', error);
      return;
    }

    // console.log('Activité Voyages ajoutée avec succès:', data);
  } catch (error) {
    console.error('Erreur inattendue:', error);
  }
};
