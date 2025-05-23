
import { supabase } from "@/integrations/supabase/client";

export interface CarRentalReservation {
  id: string;
  rental_company_name: string;
  selected_model: string;
  start_date: string;
  end_date: string;
  driver_name: string;
  driver_email: string;
  driver_phone: string;
  status: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCarRentalReservationData {
  rental_company_name: string;
  selected_model: string;
  start_date: string;
  end_date: string;
  driver_name: string;
  driver_email: string;
  driver_phone: string;
  notes?: string;
}

export async function createCarRentalReservation(
  reservationData: CreateCarRentalReservationData
): Promise<CarRentalReservation> {
  console.log("Création d'une réservation de location de voiture:", reservationData);

  const { data, error } = await supabase
    .from("car_rental_reservations")
    .insert(reservationData)
    .select("*")
    .single();

  if (error) {
    console.error("Erreur lors de la création de la réservation:", error);
    throw error;
  }

  console.log("Réservation créée avec succès:", data);
  return data;
}

export async function fetchCarRentalReservations(): Promise<CarRentalReservation[]> {
  const { data, error } = await supabase
    .from("car_rental_reservations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erreur lors de la récupération des réservations:", error);
    throw error;
  }

  return data || [];
}

export async function updateCarRentalReservationStatus(
  id: string,
  status: string
): Promise<void> {
  const { error } = await supabase
    .from("car_rental_reservations")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("Erreur lors de la mise à jour du statut:", error);
    throw error;
  }
}

export async function deleteCarRentalReservation(id: string): Promise<void> {
  const { error } = await supabase
    .from("car_rental_reservations")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Erreur lors de la suppression de la réservation:", error);
    throw error;
  }
}
