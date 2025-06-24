
import { supabase } from "@/integrations/supabase/client";
import type { CarRentalReservation } from './carRentalService';

export interface PartnerCarRentalReservation extends CarRentalReservation {
  company_name?: string;
}

export interface CarRentalCompanyForPartner {
  id: string;
  business_name: string;
  business_type: string;
  image: string;
  location: string;
  description: string;
  rating: number;
  offer: string;
  icon_name: string;
  created_at: string;
  updated_at: string;
}

export interface CarModelForPartner {
  id: number;
  company_id: string;
  name: string;
  image: string;
  price_per_day: number;
  category: string;
  seats: number;
  transmission: string;
  air_con: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Récupérer les entreprises de location du partenaire connecté depuis la table partners
export async function fetchPartnerCarRentalCompanies(): Promise<CarRentalCompanyForPartner[]> {
  const { data, error } = await supabase
    .from("partners")
    .select("*")
    .eq("business_type", "car_rental")
    .order("business_name");

  if (error) {
    console.error("Erreur lors de la récupération des entreprises:", error);
    throw error;
  }

  return data || [];
}

// Récupérer les réservations de location de voitures du partenaire
export async function fetchPartnerCarRentalReservations(): Promise<PartnerCarRentalReservation[]> {
  const { data, error } = await supabase
    .from("car_rental_reservations")
    .select(`
      *,
      company_name:rental_company_name
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erreur lors de la récupération des réservations:", error);
    throw error;
  }

  return data || [];
}

// Récupérer les modèles de voitures d'une entreprise spécifique
export async function fetchCarModelsByCompany(companyId: string): Promise<CarModelForPartner[]> {
  const { data, error } = await supabase
    .from("car_models")
    .select("*")
    .eq("company_id", companyId)
    .order("name");

  if (error) {
    console.error("Erreur lors de la récupération des modèles:", error);
    throw error;
  }

  return data || [];
}

// Mettre à jour le statut d'un modèle de voiture (actif/inactif)
export async function updateCarModelStatus(modelId: number, isActive: boolean): Promise<void> {
  const { error } = await supabase
    .from("car_models")
    .update({ is_active: isActive })
    .eq("id", modelId);

  if (error) {
    console.error("Erreur lors de la mise à jour du statut:", error);
    throw error;
  }
}

// Mettre à jour le statut d'une réservation de location de voiture
export async function updatePartnerCarRentalReservationStatus(
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

// Supprimer une réservation de location de voiture
export async function deletePartnerCarRentalReservation(id: string): Promise<void> {
  const { error } = await supabase
    .from("car_rental_reservations")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Erreur lors de la suppression de la réservation:", error);
    throw error;
  }
}
