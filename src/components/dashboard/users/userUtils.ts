
import { supabase } from "@/integrations/supabase/client";
import { UserFormData } from "./UserForm";

export const createUser = async (userData: UserFormData) => {
  console.log("Création d'utilisateur avec:", userData.email);
  
  // Créer l'utilisateur dans Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password,
    options: {
      data: {
        name: userData.name,
      }
    }
  });
  
  if (authError) {
    throw authError;
  }
  
  if (!authData.user) {
    throw new Error("Échec de création de l'utilisateur");
  }
  
  console.log("Utilisateur créé avec succès:", authData.user);
  
  // Mettre à jour le profil avec les informations supplémentaires
  const { error: profileError } = await supabase
    .from('profiles')
    .update({
      first_name: userData.name,
      phone: userData.phone,
    })
    .eq('id', authData.user.id);
  
  if (profileError) {
    console.warn("Erreur lors de la mise à jour du profil:", profileError);
  }
  
  // Si l'utilisateur a une adresse, créer une entrée dans la table clients
  if (userData.address) {
    const { error: clientError } = await supabase
      .from('clients')
      .insert({
        id: authData.user.id,
        address: userData.address,
        phone: userData.phone,
      });
    
    if (clientError) {
      console.warn("Erreur lors de la création du client:", clientError);
    }
  }
  
  return authData.user;
};

// Amélioration de la fonction pour récupérer la liste des utilisateurs avec les types corrects
export const fetchUsers = async () => {
  // Récupérer les profils des utilisateurs
  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('*');

  if (profilesError) {
    console.error("Erreur lors de la récupération des profils:", profilesError);
    throw profilesError;
  }

  // Pour chaque profil, récupérer des informations supplémentaires si nécessaire
  const usersWithDetails = await Promise.all(profiles.map(async (profile) => {
    // Récupérer les informations du client si elles existent
    const { data: clientData } = await supabase
      .from('clients')
      .select('*')
      .eq('id', profile.id)
      .single();
    
    // Convertir les dates au format souhaité
    const createdAt = new Date(profile.created_at);
    const formattedCreatedAt = createdAt.toISOString().split('T')[0];
    
    // Par défaut, on utilise la dernière date de mise à jour comme dernière activité
    const lastActivity = new Date(profile.updated_at);
    const formattedLastActivity = lastActivity.toISOString().split('T')[0];
    
    // Déterminer le statut de l'abonnement (avec un type correct)
    const subscriptionStatus = clientData ? "active" : "none";
    
    // Déterminer le type d'abonnement (avec un type correct)
    const subscriptionType = clientData ? "basic" : "none";
    
    // Construction de l'objet utilisateur avec les types corrects
    return {
      id: profile.id,
      name: profile.first_name || profile.email?.split('@')[0] || 'Utilisateur',
      email: profile.email,
      subscriptionStatus: subscriptionStatus as "active" | "none" | "pending" | "expired",
      subscriptionType: subscriptionType as "basic" | "premium" | "none",
      subscriptionEndDate: null,
      registeredDate: formattedCreatedAt,
      lastActivity: formattedLastActivity,
    };
  }));

  return usersWithDetails;
};
