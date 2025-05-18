
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
    // Set up auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        setSession(currentSession);
        
        if (!currentSession?.user) {
          setUser(null);
          setIsLoading(false);
          return;
        }
        
        // Handle session with user
        try {
          // Fetch user profile in a non-blocking way
          setTimeout(async () => {
            try {
              const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('role, first_name, last_name')
                .eq('id', currentSession.user.id)
                .single();
  
              if (profileError) {
                console.error('Profile fetch error:', profileError);
                return;
              }
              
              const userWithRole: UserWithRole = {
                ...currentSession.user,
                role: profileData?.role as UserRole,
                name: profileData?.first_name 
                  ? `${profileData.first_name} ${profileData.last_name || ''}`
                  : currentSession.user.email
              };
              
              setUser(userWithRole);
            } catch (err) {
              console.error('Error in profile fetch:', err);
            }
          }, 0);
          
          // Set basic user immediately for better UX
          setUser(currentSession.user);
        } catch (error) {
          console.error('Auth state processing error:', error);
        } finally {
          setIsLoading(false);
        }
      }
    );
    
    // Check initial session
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Session error:', error);
          setIsLoading(false);
          return;
        }
        
        // If no session, mark as not loading and return
        if (!data.session) {
          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.error('Session check error:', error);
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
    setIsLoading(true);
    
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
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string): Promise<{ success: boolean, message: string }> => {
    setIsLoading(true);
    
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
        toast({
          title: "Inscription réussie",
          description: "Veuillez vérifier votre email pour confirmer votre compte",
        });
        return { success: true, message: 'Inscription réussie' };
      } else {
        return { success: false, message: 'Erreur lors de la création du compte' };
      }
    } catch (error: any) {
      return { success: false, message: error.message || 'Erreur d\'inscription' };
    } finally {
      setIsLoading(false);
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
