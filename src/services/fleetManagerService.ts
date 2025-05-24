
import { supabase } from "@/integrations/supabase/client";

export interface FleetManager {
  id: string;
  user_id: string;
  company_id: number;
  permissions: {
    manage_vehicles: boolean;
    view_reservations: boolean;
    manage_reservations: boolean;
  };
  created_at: string;
  updated_at: string;
  user_email?: string;
  user_name?: string;
  company_name?: string;
}

export interface CreateFleetManagerData {
  email: string;
  password: string;
  name: string;
  company_id: number;
  permissions: {
    manage_vehicles: boolean;
    view_reservations: boolean;
    manage_reservations: boolean;
  };
}

// Récupérer tous les gestionnaires de flotte
export async function fetchFleetManagers(): Promise<FleetManager[]> {
  const { data, error } = await supabase
    .from("fleet_managers")
    .select(`
      *,
      profiles!inner(email, first_name, last_name),
      car_rental_companies!inner(name)
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erreur lors de la récupération des gestionnaires:", error);
    throw error;
  }

  return (data || []).map(manager => ({
    ...manager,
    user_email: manager.profiles?.email,
    user_name: manager.profiles?.first_name 
      ? `${manager.profiles.first_name} ${manager.profiles.last_name || ''}`
      : manager.profiles?.email,
    company_name: manager.car_rental_companies?.name
  }));
}

// Récupérer les gestionnaires d'une entreprise spécifique
export async function fetchFleetManagersByCompany(companyId: number): Promise<FleetManager[]> {
  const { data, error } = await supabase
    .from("fleet_managers")
    .select(`
      *,
      profiles!inner(email, first_name, last_name)
    `)
    .eq("company_id", companyId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erreur lors de la récupération des gestionnaires:", error);
    throw error;
  }

  return (data || []).map(manager => ({
    ...manager,
    user_email: manager.profiles?.email,
    user_name: manager.profiles?.first_name 
      ? `${manager.profiles.first_name} ${manager.profiles.last_name || ''}`
      : manager.profiles?.email
  }));
}

// Créer un gestionnaire de flotte
export async function createFleetManager(managerData: CreateFleetManagerData): Promise<void> {
  // 1. Créer l'utilisateur avec Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: managerData.email,
    password: managerData.password,
    options: {
      data: {
        first_name: managerData.name,
        role: 'partner'
      }
    }
  });

  if (authError) {
    console.error("Erreur lors de la création de l'utilisateur:", authError);
    throw authError;
  }

  if (!authData.user) {
    throw new Error("Utilisateur non créé");
  }

  // 2. Mettre à jour le profil avec le rôle et l'entreprise
  const { error: profileError } = await supabase
    .from("profiles")
    .update({ 
      role: 'partner',
      first_name: managerData.name,
      company_id: managerData.company_id
    })
    .eq("id", authData.user.id);

  if (profileError) {
    console.error("Erreur lors de la mise à jour du profil:", profileError);
    throw profileError;
  }

  // 3. Créer l'entrée gestionnaire de flotte
  const { error: managerError } = await supabase
    .from("fleet_managers")
    .insert({
      user_id: authData.user.id,
      company_id: managerData.company_id,
      permissions: managerData.permissions
    });

  if (managerError) {
    console.error("Erreur lors de la création du gestionnaire:", managerError);
    throw managerError;
  }
}

// Mettre à jour les permissions d'un gestionnaire
export async function updateFleetManagerPermissions(
  managerId: string,
  permissions: FleetManager['permissions']
): Promise<void> {
  const { error } = await supabase
    .from("fleet_managers")
    .update({ permissions })
    .eq("id", managerId);

  if (error) {
    console.error("Erreur lors de la mise à jour des permissions:", error);
    throw error;
  }
}

// Supprimer un gestionnaire de flotte
export async function deleteFleetManager(managerId: string): Promise<void> {
  const { error } = await supabase
    .from("fleet_managers")
    .delete()
    .eq("id", managerId);

  if (error) {
    console.error("Erreur lors de la suppression du gestionnaire:", error);
    throw error;
  }
}
