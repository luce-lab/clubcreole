
import { supabase } from "@/integrations/supabase/client";
import { Loisir, Inscription } from "@/components/loisirs/types";
import { format, parseISO, isValid } from "date-fns";
import { fr } from "date-fns/locale";
import { isDateValid } from "./loisirService";

export const createInscription = async (
  loisirId: number,
  name: string,
  email: string,
  phone: string
): Promise<{ success: boolean; error?: string; inscription?: Inscription }> => {
  try {
    // 1. Récupérer les détails de l'activité pour l'email
    const { data: loisirData, error: loisirError } = await supabase
      .from('loisirs')
      .select('*')
      .eq('id', loisirId)
      .single();

    if (loisirError) throw loisirError;
    if (!loisirData) throw new Error("Activité non trouvée");

    const loisir = loisirData as Loisir;
    
    // Vérifier que la date de l'activité est valide avant de permettre l'inscription
    const isStartDateValid = isDateValid(loisir.start_date);
    const isEndDateValid = isDateValid(loisir.end_date);
    
    if (!isStartDateValid || !isEndDateValid) {
      throw new Error("Les dates de cette activité ne sont pas encore confirmées");
    }

    // 2. Insérer l'inscription dans la base de données
    // Utilisation du timestamp actuel pour inscription_date
    const inscriptionDate = new Date().toISOString();
    
    const { data, error } = await supabase
      .from('loisirs_inscriptions')
      .insert([
        { 
          loisir_id: loisirId, 
          name, 
          email, 
          phone, 
          inscription_date: inscriptionDate,
          confirmation_sent: false
        }
      ])
      .select()
      .single();

    if (error) throw error;

    // 3. Mettre à jour le compteur de participants
    const { error: updateError } = await supabase
      .from('loisirs')
      .update({ current_participants: loisir.current_participants + 1 })
      .eq('id', loisirId);

    if (updateError) throw updateError;

    // 4. Envoyer l'email de confirmation
    try {
      // Création de l'URL complète pour la fonction
      const functionUrl = 'https://psryoyugyimibjhwhvlh.supabase.co/functions/v1/send-confirmation';
      
      // Formater les dates pour l'email
      const formattedDate = formatDate(loisir.start_date);
      
      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // La clé d'API publique n'est pas nécessaire ici car la fonction est configurée sans vérification JWT
        },
        body: JSON.stringify({
          name,
          email,
          activity: {
            id: loisir.id,
            title: loisir.title,
            location: loisir.location,
            start_date: loisir.start_date,
            formattedDate: formattedDate
          },
        }),
      });

      const result = await response.json();
      console.log("Email confirmation result:", result);

      // Si l'email a été envoyé avec succès, marquer confirmation_sent comme true
      if (result.success && data) {
        await supabase
          .from('loisirs_inscriptions')
          .update({ confirmation_sent: true })
          .eq('id', data.id);
      }
    } catch (emailError) {
      console.error("Erreur lors de l'envoi de l'email:", emailError);
      // Ne pas bloquer l'inscription si l'envoi de l'email échoue
    }

    return { 
      success: true, 
      inscription: data as Inscription 
    };
  } catch (error: any) {
    console.error("Erreur lors de l'inscription:", error);
    return { 
      success: false, 
      error: error.message 
    };
  }
};

export const getInscriptionsByLoisirId = async (loisirId: number): Promise<Inscription[]> => {
  try {
    const { data, error } = await supabase
      .from('loisirs_inscriptions')
      .select('*')
      .eq('loisir_id', loisirId)
      .order('inscription_date', { ascending: false });

    if (error) throw error;
    
    return data as Inscription[];
  } catch (error) {
    console.error("Erreur lors de la récupération des inscriptions:", error);
    return [];
  }
};

// Fonction utilitaire pour formater les dates
export const formatDate = (dateString: string): string => {
  try {
    // Essayer d'abord de parser comme une date ISO
    let date = parseISO(dateString);
    
    // Vérifier si la date est valide
    if (!isValid(date)) {
      // Essayer le format DD/MM/YYYY
      if (dateString.includes('/')) {
        const [day, month, year] = dateString.split('/');
        date = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
      }
    }
    
    // Vérifier si la date est maintenant valide
    if (isValid(date)) {
      return format(date, 'dd MMMM yyyy', { locale: fr });
    }
    
    // Par défaut retourner "Date à confirmer"
    return "Date à confirmer";
  } catch (error) {
    console.error("Erreur de formatage de date:", error);
    return "Date à confirmer";
  }
};
