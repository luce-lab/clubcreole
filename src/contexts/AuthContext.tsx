
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase, cleanupAuthState } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

type UserRole = 'admin' | 'partner' | 'client' | null;

interface UserWithRole extends User {
  role?: UserRole;
  name?: string;
}

interface AuthContextType {
  user: UserWithRole | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean, message: string }>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<{ success: boolean, message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserWithRole | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    console.log('Setting up auth state listener...');
    // Configurer l'écouteur d'événements d'authentification Supabase
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('Auth state changed:', event);
        setSession(currentSession);
        
        if (currentSession?.user) {
          try {
            // Récupérer le rôle et les informations de l'utilisateur depuis la table profiles
            const { data: profileData, error: profileError } = await supabase
              .from('profiles')
              .select('role, first_name, last_name')
              .eq('id', currentSession.user.id)
              .single();

            if (profileError) {
              console.error('Erreur lors de la récupération du profil:', profileError);
              toast({
                title: "Erreur",
                description: "Impossible de récupérer les informations de profil",
                variant: "destructive",
              });
            }

            console.log('Profile data:', profileData);
            
            const userWithRole: UserWithRole = {
              ...currentSession.user,
              role: profileData?.role as UserRole,
              name: profileData?.first_name 
                ? `${profileData.first_name} ${profileData.last_name || ''}`
                : currentSession.user.email
            };
            
            setUser(userWithRole);
            console.log('User set with role:', userWithRole);
          } catch (error) {
            console.error('Erreur lors du traitement des données utilisateur:', error);
          }
        } else {
          setUser(null);
        }
        
        setIsLoading(false);
      }
    );

    // Vérifier la session au chargement
    const checkSession = async () => {
      console.log('Checking session...');
      try {
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Erreur lors de la récupération de la session:', error);
          setIsLoading(false);
          return;
        }
        
        console.log('Initial session:', initialSession);
        
        if (initialSession?.user) {
          setSession(initialSession);
          
          // Récupérer le rôle et les informations de l'utilisateur depuis la table profiles
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('role, first_name, last_name')
            .eq('id', initialSession.user.id)
            .single();

          if (profileError) {
            console.error('Erreur lors de la récupération du profil:', profileError);
            setIsLoading(false);
            return;
          }

          console.log('Profile data from session check:', profileData);
          
          const userWithRole: UserWithRole = {
            ...initialSession.user,
            role: profileData?.role as UserRole,
            name: profileData?.first_name 
              ? `${profileData.first_name} ${profileData.last_name || ''}`
              : initialSession.user.email
          };
          
          setUser(userWithRole);
        }
      } catch (error) {
        console.error('Exception lors de la vérification de la session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  const signIn = async (email: string, password: string): Promise<{ success: boolean, message: string }> => {
    console.log('Attempting sign in with:', email);
    setIsLoading(true);
    
    try {
      // Nettoyer les états d'authentification précédents pour éviter les conflits
      cleanupAuthState();
      
      console.log('Auth state cleaned, attempting global sign out...');
      
      // Tentative de déconnexion globale avant de se connecter
      try {
        await supabase.auth.signOut({ scope: 'global' });
        console.log('Global sign out succeeded');
      } catch (err) {
        console.error('Erreur lors de la déconnexion globale:', err);
        // Continuer même si cette étape échoue
      }
      
      console.log('Calling signInWithPassword...');
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      console.log('Sign in response:', data, error);
      
      if (error) {
        return { success: false, message: error.message };
      }

      if (data?.user) {
        console.log('Sign in successful, user ID:', data.user.id);
        return { success: true, message: 'Connexion réussie' };
      } else {
        console.error('No user data returned from sign in');
        return { success: false, message: 'Aucun utilisateur trouvé' };
      }
    } catch (error: any) {
      console.error('Unexpected error during login:', error);
      return { success: false, message: error.message || 'Erreur de connexion' };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string): Promise<{ success: boolean, message: string }> => {
    console.log('Attempting sign up with:', email);
    setIsLoading(true);
    
    try {
      // Nettoyer les états d'authentification précédents
      cleanupAuthState();
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      console.log('Sign up response:', data, error);
      
      if (error) {
        return { success: false, message: error.message };
      }

      if (data?.user) {
        toast({
          title: "Inscription réussie",
          description: "Veuillez vérifier votre email pour confirmer votre compte",
        });
        return { success: true, message: 'Inscription réussie' };
      } else {
        return { success: false, message: 'Erreur lors de la création du compte' };
      }
    } catch (error: any) {
      console.error('Unexpected error during registration:', error);
      return { success: false, message: error.message || 'Erreur d\'inscription' };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      console.log('Attempting sign out');
      // Nettoyer d'abord l'état d'authentification
      cleanupAuthState();
      
      // Tentative de déconnexion globale
      try {
        await supabase.auth.signOut({ scope: 'global' });
        console.log('Global sign out completed');
      } catch (err) {
        console.error('Erreur lors de la déconnexion globale:', err);
        // Ignorer les erreurs
      }
      
      // Forcer un rechargement de la page pour un état propre
      window.location.href = '/';
      toast({
        title: "Déconnecté",
        description: "Vous avez été déconnecté avec succès",
      });
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la déconnexion",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, isLoading, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};
