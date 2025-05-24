
import { supabase } from "@/integrations/supabase/client";

export interface DivingReservation {
  id: string;
  reservation_date: string;
  reservation_time: string;
  participant_name: string;
  participant_email: string;
  participant_phone: string;
  experience_level: string;
  special_requests?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CreateDivingReservationData {
  reservation_date: string;
  reservation_time: string;
  participant_name: string;
  participant_email: string;
  participant_phone: string;
  experience_level: string;
  special_requests?: string;
}

export async function createDivingReservation(
  reservationData: CreateDivingReservationData
): Promise<DivingReservation> {
  console.log("Création d'une réservation de plongée:", reservationData);

  const { data, error } = await supabase
    .from("diving_reservations")
    .insert(reservationData)
    .select("*")
    .single();

  if (error) {
    console.error("Erreur lors de la création de la réservation:", error);
    throw error;
  }

  console.log("Réservation de plongée créée avec succès:", data);
  return data;
}

export async function fetchDivingReservations(): Promise<DivingReservation[]> {
  const { data, error } = await supabase
    .from("diving_reservations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erreur lors de la récupération des réservations:", error);
    throw error;
  }

  return data || [];
}

export async function updateDivingReservationStatus(
  id: string,
  status: string
): Promise<void> {
  const { error } = await supabase
    .from("diving_reservations")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("Erreur lors de la mise à jour du statut:", error);
    throw error;
  }
}

export async function deleteDivingReservation(id: string): Promise<void> {
  const { error } = await supabase
    .from("diving_reservations")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Erreur lors de la suppression de la réservation:", error);
    throw error;
  }
}
