import { supabase } from "@/integrations/supabase/client";

export interface FleetManager {
  id: string;
  user_id: string;
  company_id: string;
  permissions: {
    manage_vehicles: boolean;
    view_reservations: boolean;
    manage_reservations: boolean;
  };
  created_at: string;
  updated_at: string;
  // Données du profil utilisateur associé
  user?: {
    email: string;
    first_name?: string;
    last_name?: string;
  };
}

export interface CreateFleetManagerData {
  email: string;
  first_name?: string;
  last_name?: string;
  company_id: string;
  permissions?: {
    manage_vehicles: boolean;
    view_reservations: boolean;
    manage_reservations: boolean;
  };
}

// Récupérer les gestionnaires de flotte d'une entreprise
export async function fetchFleetManagersByCompany(companyId: string): Promise<FleetManager[]> {
  const { data, error } = await supabase
    .from("fleet_managers")
    .select(`
      *,
      user:profiles (
        email,
        first_name,
        last_name
      )
    `)
    .eq("company_id", companyId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erreur lors de la récupération des gestionnaires:", error);
    throw error;
  }

  // Transformer les données pour correspondre au type FleetManager
  const managers: FleetManager[] = (data || []).map(item => ({
    id: item.id,
    user_id: item.user_id,
    company_id: item.company_id,
    permissions: typeof item.permissions === 'object' && item.permissions !== null 
      ? item.permissions as { manage_vehicles: boolean; view_reservations: boolean; manage_reservations: boolean; }
      : { manage_vehicles: true, view_reservations: true, manage_reservations: false },
    created_at: item.created_at,
    updated_at: item.updated_at,
    user: Array.isArray(item.user) && item.user.length > 0 ? item.user[0] : undefined
  }));

  return managers;
}

// Créer un nouveau gestionnaire de flotte
export async function createFleetManager(managerData: CreateFleetManagerData): Promise<FleetManager> {
  // D'abord, vérifier si l'utilisateur existe dans profiles
  const { data: existingProfile, error: profileError } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", managerData.email)
    .maybeSingle();

  if (profileError && profileError.code !== 'PGRST116') {
    console.error("Erreur lors de la vérification du profil:", profileError);
    throw profileError;
  }

  let userId: string;

  if (existingProfile) {
    userId = existingProfile.id;
  } else {
    // Créer un nouveau profil utilisateur (sans authentification pour l'instant)
    const profileData = {
      email: managerData.email,
      first_name: managerData.first_name,
      last_name: managerData.last_name,
      role: 'fleet_manager',
      id: crypto.randomUUID()
    };

    const { data: newProfile, error: createProfileError } = await supabase
      .from("profiles")
      .insert([profileData])
      .select()
      .single();

    if (createProfileError) {
      console.error("Erreur lors de la création du profil:", createProfileError);
      throw createProfileError;
    }

    userId = newProfile.id;
  }

  // Créer le gestionnaire de flotte
  const defaultPermissions = {
    manage_vehicles: true,
    view_reservations: true,
    manage_reservations: false
  };

  const { data, error } = await supabase
    .from("fleet_managers")
    .insert([{
      user_id: userId,
      company_id: managerData.company_id,
      permissions: managerData.permissions || defaultPermissions
    }])
    .select(`
      *,
      user:profiles (
        email,
        first_name,
        last_name
      )
    `)
    .single();

  if (error) {
    console.error("Erreur lors de la création du gestionnaire:", error);
    throw error;
  }

  // Transformer les données pour correspondre au type FleetManager
  const manager: FleetManager = {
    id: data.id,
    user_id: data.user_id,
    company_id: data.company_id,
    permissions: typeof data.permissions === 'object' && data.permissions !== null 
      ? data.permissions as { manage_vehicles: boolean; view_reservations: boolean; manage_reservations: boolean; }
      : defaultPermissions,
    created_at: data.created_at,
    updated_at: data.updated_at,
    user: Array.isArray(data.user) && data.user.length > 0 ? data.user[0] : undefined
  };

  return manager;
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
