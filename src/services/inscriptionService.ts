
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
    console.log("Début de l'inscription pour:", loisirId, name, email, phone);
    
    // 1. Récupérer les détails de l'activité pour l'email
    const { data: loisirData, error: loisirError } = await supabase
      .from('loisirs')
      .select('*')
      .eq('id', loisirId)
      .single();

    if (loisirError) {
      console.error("Erreur lors de la récupération du loisir:", loisirError);
      throw loisirError;
    }
    if (!loisirData) {
      console.error("Activité non trouvée");
      throw new Error("Activité non trouvée");
    }

    console.log("Données du loisir récupérées:", loisirData);
    
    const loisir = loisirData as Loisir;
    
    // Vérifier que l'activité n'est pas complète
    if (loisir.current_participants >= loisir.max_participants) {
      console.error("L'activité est complète");
      throw new Error("Cette activité est complète, il n'y a plus de places disponibles");
    }

    // 2. Insérer l'inscription dans la base de données
    // Utilisation du timestamp actuel pour inscription_date
    const inscriptionDate = new Date().toISOString();
    
    console.log("Insertion de l'inscription dans la base de données");
    
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
      .select();

    if (error) {
      console.error("Erreur lors de l'insertion de l'inscription:", error);
      throw error;
    }

    console.log("Inscription réussie, données:", data);
    const inscriptionData = data && data.length > 0 ? data[0] : null;
    
    if (!inscriptionData) {
      console.error("Aucune donnée d'inscription n'a été retournée");
      throw new Error("Erreur lors de l'enregistrement de l'inscription");
    }

    // 3. Mettre à jour le compteur de participants
    console.log("Mise à jour du compteur de participants");
    const { error: updateError } = await supabase
      .from('loisirs')
      .update({ current_participants: loisir.current_participants + 1 })
      .eq('id', loisirId);

    if (updateError) {
      console.error("Erreur lors de la mise à jour du compteur de participants:", updateError);
      throw updateError;
    }

    // 4. Envoyer l'email de confirmation
    try {
      console.log("Tentative d'envoi de l'e-mail de confirmation");
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
      if (result.success && inscriptionData) {
        await supabase
          .from('loisirs_inscriptions')
          .update({ confirmation_sent: true })
          .eq('id', inscriptionData.id);
      }
    } catch (emailError) {
      console.error("Erreur lors de l'envoi de l'email:", emailError);
      // Ne pas bloquer l'inscription si l'envoi de l'email échoue
    }

    console.log("Inscription complétée avec succès");
    
    return { 
      success: true, 
      inscription: inscriptionData as Inscription 
    };
  } catch (error: any) {
    console.error("Erreur lors de l'inscription:", error);
    return { 
      success: false, 
      error: error.message || "Une erreur inconnue est survenue" 
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
    
    // Par défaut retourner la date originale
    return dateString;
  } catch (error) {
    console.error("Erreur de formatage de date:", error);
    return dateString;
  }
};
