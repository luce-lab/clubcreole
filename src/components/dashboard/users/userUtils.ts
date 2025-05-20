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
  try {
    console.log("Tentative de récupération des utilisateurs...");
    
    // Récupérer directement les utilisateurs depuis l'API auth (sans utiliser profiles)
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) {
      console.error("Erreur lors de la récupération des utilisateurs:", authError);
      throw authError;
    }
    
    if (!authUsers || !authUsers.users) {
      console.log("Aucun utilisateur trouvé");
      return [];
    }
    
    console.log(`${authUsers.users.length} utilisateurs trouvés`);
    
    // Transformer les données des utilisateurs au format requis
    const formattedUsers = authUsers.users.map(user => {
      // Convertir les dates au format souhaité
      const createdAt = new Date(user.created_at);
      const formattedCreatedAt = createdAt.toISOString().split('T')[0];
      
      // Utiliser la dernière date de mise à jour comme dernière activité
      const lastActivity = new Date(user.updated_at || user.created_at);
      const formattedLastActivity = lastActivity.toISOString().split('T')[0];
      
      // Construire l'objet utilisateur avec les types corrects
      return {
        id: user.id,
        name: user.user_metadata?.name || user.email?.split('@')[0] || 'Utilisateur',
        email: user.email || '',
        subscriptionStatus: "none" as "active" | "none" | "pending" | "expired",
        subscriptionType: "none" as "basic" | "premium" | "none",
        subscriptionEndDate: null,
        registeredDate: formattedCreatedAt,
        lastActivity: formattedLastActivity,
      };
    });
    
    return formattedUsers;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    throw error;
  }
};
