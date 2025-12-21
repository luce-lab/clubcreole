
import { supabase, cleanupAuthState } from '@/integrations/supabase/client';
import { SignUpData } from './types';

export const useAuthActions = () => {
  const signIn = async (email: string, password: string): Promise<{ success: boolean, message: string }> => {
    try {
      // Clean up auth state first
      cleanupAuthState();
      
      // Sign in with email and password
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error("Erreur de connexion:", error);
        return { success: false, message: error.message };
      }

      if (!data?.user) {
        console.error("Aucun utilisateur trouvé après la connexion");
        return { success: false, message: 'Aucun utilisateur trouvé' };
      }
      
      // console.log("Connexion réussie pour:", data.user.email);
      return { success: true, message: 'Connexion réussie' };
    } catch (error: any) {
      console.error("Exception lors de la connexion:", error);
      return { success: false, message: error.message || 'Erreur de connexion' };
    }
  };

  const signUp = async (signUpData: SignUpData): Promise<{ success: boolean, message: string }> => {
    try {
      const { email, password, first_name, last_name, phone } = signUpData;

      // console.log("Début de l'inscription pour:", email);

      // Clean up auth state first
      cleanupAuthState();

      // Tentative d'inscription avec les champs supplémentaires
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            email: email,
            first_name: first_name || null,
            last_name: last_name || null,
            phone: phone || null,
          }
        }
      });
      
      if (error) {
        console.error("Erreur d'inscription:", error);
        return { success: false, message: error.message };
      }

      // Vérification des données de l'utilisateur
      if (data?.user) {
        // console.log("Utilisateur créé avec succès:", data.user);
        
        // Vérification de la création du profil
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
          
        if (profileError) {
          console.warn("Profil non trouvé après inscription, cela peut être normal si le trigger n'a pas encore été exécuté:", profileError);
        } else {
          // console.log("Profil créé avec succès:", profileData);
        }
        
        return { success: true, message: 'Inscription réussie' };
      } else {
        console.error("Aucun utilisateur retourné après l'inscription");
        return { success: false, message: 'Erreur lors de la création du compte' };
      }
    } catch (error: any) {
      console.error("Exception lors de l'inscription:", error);
      return { success: false, message: error.message || 'Erreur d\'inscription' };
    }
  };

  const signOut = async () => {
    try {
      // console.log("Tentative de déconnexion...");
      
      // Clean up auth state first
      cleanupAuthState();
      
      // Attempt sign out
      await supabase.auth.signOut();
      
      // console.log("Déconnexion réussie, redirection...");
      
      // Force page reload
      window.location.href = '/';
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  return {
    signIn,
    signUp,
    signOut,
  };
};
