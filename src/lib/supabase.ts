
import { createClient } from '@supabase/supabase-js';
import { cleanupAuthState } from '@/integrations/supabase/client';

const supabaseUrl = "https://psryoyugyimibjhwhvlh.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzcnlveXVneWltaWJqaHdodmxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4NTM2NDMsImV4cCI6MjA0OTQyOTY0M30.HqVFT7alWrZtjf1cHxeAeqpsWMjVEnnXfVtwesYga-0";

// Créer le client Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Fonction utilitaire pour vérifier si Supabase est configuré
export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey);
};

// Fonction pour déconnecter un utilisateur en mode robuste
export const signOutRobust = async () => {
  try {
    // Nettoyage de l'état d'authentification
    cleanupAuthState();
    
    // Tentative de déconnexion globale
    try {
      await supabase.auth.signOut({ scope: 'global' });
    } catch (err) {
      // Ignorer les erreurs
      console.error("Erreur lors de la déconnexion globale:", err);
    }
    
    return true;
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error);
    return false;
  }
};
