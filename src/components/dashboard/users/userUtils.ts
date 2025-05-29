
import { supabase } from "@/integrations/supabase/client";
import { UserFormData } from "./UserForm";

export const createUser = async (userData: UserFormData) => {
  console.log("Création d'utilisateur avec:", userData.email);
  
  // Créer l'utilisateur dans Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: userData.email,
    password: userData.password,
    user_metadata: {
      name: userData.name,
    },
    email_confirm: true
  });
  
  if (authError) {
    console.error("Erreur lors de la création de l'utilisateur:", authError);
    throw authError;
  }
  
  if (!authData.user) {
    throw new Error("Échec de création de l'utilisateur");
  }
  
  console.log("Utilisateur créé avec succès:", authData.user);
  
  // Le profil sera automatiquement créé par le trigger handle_new_user
  // Attendre un peu pour que le trigger s'exécute
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return authData.user;
};

export const fetchUsers = async () => {
  try {
    console.log("Récupération des utilisateurs...");
    
    // Récupérer directement depuis la table profiles
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('id, email, first_name, last_name, created_at, updated_at, role')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Erreur lors de la récupération des profils:", error);
      throw new Error(`Erreur lors de la récupération des utilisateurs: ${error.message}`);
    }
    
    if (!profiles || profiles.length === 0) {
      console.log("Aucun utilisateur trouvé");
      return [];
    }
    
    console.log(`${profiles.length} utilisateurs trouvés:`, profiles);
    
    // Transformer les données des profils au format requis
    const formattedUsers = profiles.map(profile => {
      // Convertir les dates au format souhaité
      const createdAt = new Date(profile.created_at);
      const formattedCreatedAt = createdAt.toISOString().split('T')[0];
      
      // Utiliser la dernière date de mise à jour comme dernière activité
      const lastActivity = new Date(profile.updated_at || profile.created_at);
      const formattedLastActivity = lastActivity.toISOString().split('T')[0];
      
      return {
        id: profile.id,
        name: profile.first_name || profile.email?.split('@')[0] || 'Utilisateur',
        email: profile.email || '',
        subscriptionStatus: "none" as "active" | "none" | "pending" | "expired",
        subscriptionType: "none" as "basic" | "premium" | "none",
        subscriptionEndDate: null,
        registrationDate: formattedCreatedAt,
        lastActivity: formattedLastActivity,
      };
    });
    
    return formattedUsers;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    throw error;
  }
};
