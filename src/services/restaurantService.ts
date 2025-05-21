
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

export const createRestaurantReservation = async (reservation: Omit<RestaurantReservation, "id" | "status">) => {
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
    
    return data?.[0];
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
