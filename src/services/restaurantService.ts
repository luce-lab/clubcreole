
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

export interface RestaurantReservation {
  id?: string;
  restaurant_id: number;
  reservation_date: string;
  reservation_time: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  notes?: string;
  status?: string;
}

export const createRestaurantReservation = async (reservation: Omit<RestaurantReservation, "id" | "status">, restaurantName: string, restaurantLocation: string) => {
  try {
    // Formatage de la date au format ISO pour stockage dans la base de données
    const formattedDate = format(new Date(reservation.reservation_date), "yyyy-MM-dd");
    
    const { data, error } = await supabase
      .from("restaurant_reservations")
      .insert([
        {
          ...reservation,
          reservation_date: formattedDate
        }
      ])
      .select();

    if (error) {
      console.error("Erreur lors de la création de la réservation:", error);
      throw new Error(error.message);
    }
    
    // Envoyer l'email de confirmation via l'Edge Function
    let emailSuccess = true;
    let emailMessage = "";
    
    try {
      const response = await fetch("https://psryoyugyimibjhwhvlh.supabase.co/functions/v1/restaurant-confirmation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzcnlveXVneWltaWJqaHdodmxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4NTM2NDMsImV4cCI6MjA0OTQyOTY0M30.HqVFT7alWrZtjf1cHxeAeqpsWMjVEnnXfVtwesYga-0`,
        },
        body: JSON.stringify({
          name: reservation.name,
          email: reservation.email,
          restaurant: {
            id: reservation.restaurant_id,
            name: restaurantName,
            location: restaurantLocation
          },
          reservation: {
            date: formattedDate,
            time: reservation.reservation_time,
            guests: reservation.guests,
            notes: reservation.notes
          }
        })
      });

      const emailResult = await response.json();
      
      if (!response.ok) {
        console.warn("Problème lors de l'envoi de l'email de confirmation:", emailResult);
        emailSuccess = false;
        emailMessage = "L'email de confirmation n'a pas pu être envoyé, mais votre réservation a bien été enregistrée.";
      } else if (emailResult.emailResponse && emailResult.emailResponse.error) {
        // Le service d'email a retourné une erreur (ex: en mode test)
        console.warn("Avertissement du service d'email:", emailResult.emailResponse);
        emailSuccess = false;
        emailMessage = "Note: En mode test, l'email n'a pas été envoyé à votre adresse, mais votre réservation est confirmée.";
      }
    } catch (emailError) {
      console.error("Erreur lors de l'envoi de l'email de confirmation:", emailError);
      emailSuccess = false;
      emailMessage = "L'email de confirmation n'a pas pu être envoyé en raison d'un problème technique, mais votre réservation a bien été enregistrée.";
    }
    
    return { 
      reservation: data?.[0], 
      emailSuccess, 
      emailMessage 
    };
  } catch (err) {
    console.error("Erreur lors de la création de la réservation:", err);
    throw err;
  }
};

export const getRestaurantReservations = async (restaurantId: number) => {
  try {
    const { data, error } = await supabase
      .from("restaurant_reservations")
      .select("*")
      .eq("restaurant_id", restaurantId);

    if (error) {
      console.error("Erreur lors de la récupération des réservations:", error);
      throw new Error(error.message);
    }

    return data;
  } catch (err) {
    console.error("Erreur lors de la récupération des réservations:", err);
    throw err;
  }
};
