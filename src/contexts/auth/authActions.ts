
import { supabase, cleanupAuthState } from '@/integrations/supabase/client';

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
        return { success: false, message: error.message };
      }

      if (!data?.user) {
        return { success: false, message: 'Aucun utilisateur trouvé' };
      }
      
      return { success: true, message: 'Connexion réussie' };
    } catch (error: any) {
      return { success: false, message: error.message || 'Erreur de connexion' };
    }
  };

  const signUp = async (email: string, password: string): Promise<{ success: boolean, message: string }> => {
    try {
      // Clean up auth state first
      cleanupAuthState();
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) {
        return { success: false, message: error.message };
      }

      if (data?.user) {
        return { success: true, message: 'Inscription réussie' };
      } else {
        return { success: false, message: 'Erreur lors de la création du compte' };
      }
    } catch (error: any) {
      return { success: false, message: error.message || 'Erreur d\'inscription' };
    }
  };

  const signOut = async () => {
    try {
      // Clean up auth state first
      cleanupAuthState();
      
      // Attempt sign out
      await supabase.auth.signOut();
      
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
