
import React, { createContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import { AuthContextType, UserWithRole } from './types';
import { useAuthActions } from './authActions';
import { fetchUserProfile } from './useUserProfile';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserWithRole | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const { signIn, signUp, signOut } = useAuthActions();

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
              const userWithRole = await fetchUserProfile(currentSession.user);
              console.log('User profile retrieved:', userWithRole);
              setUser(userWithRole);
            } catch (err) {
              console.error('Error in profile fetch:', err);
            }
          }, 0);
          
          // Set basic user immediately for better UX
          setUser({
            ...currentSession.user,
            role: null // Set a default role to satisfy the UserWithRole type
          });
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

  const handleSignIn = async (email: string, password: string) => {
    setIsLoading(true);
    const result = await signIn(email, password);
    setIsLoading(false);
    return result;
  };

  const handleSignUp = async (email: string, password: string) => {
    setIsLoading(true);
    const result = await signUp(email, password);
    
    if (result.success) {
      toast({
        title: "Inscription réussie",
        description: "Veuillez vérifier votre email pour confirmer votre compte",
      });
    }
    
    setIsLoading(false);
    return result;
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la déconnexion",
        variant: "destructive",
      });
    }
  };

  const handleCreateAdminUser = async (email: string, password: string, name?: string) => {
    setIsLoading(true);
    try {
      // S'inscrire normalement
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role: 'admin'
          }
        }
      });
      
      if (error) throw error;
      
      if (data.user) {
        // Mettre à jour le rôle dans le profil
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ role: 'admin', first_name: name })
          .eq('id', data.user.id);
          
        if (profileError) {
          console.error('Error updating profile:', profileError);
          setIsLoading(false);
          return { 
            success: false, 
            message: 'Erreur lors de la mise à jour du rôle administrateur' 
          };
        }
      
        setIsLoading(false);
        return { success: true, message: 'Utilisateur administrateur créé avec succès' };
      } else {
        setIsLoading(false);
        return { success: false, message: 'Erreur lors de la création de l\'utilisateur' };
      }
    } catch (error: any) {
      console.error('Create admin error:', error);
      setIsLoading(false);
      return { 
        success: false, 
        message: error.message || 'Erreur lors de la création de l\'administrateur' 
      };
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      isLoading, 
      signIn: handleSignIn, 
      signOut: handleSignOut, 
      signUp: handleSignUp,
      createAdminUser: handleCreateAdminUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Helper function to create test users - only for development
export const createTestUsers = async () => {
  try {
    // Create admin user
    const { data: adminData, error: adminError } = await supabase.auth.signUp({
      email: 'admin@clubcreole.com',
      password: 'adminPassword123',
    });
    
    if (adminError) throw adminError;
    if (adminData.user) {
      // Set admin role
      await supabase.from('profiles').update({ role: 'admin' }).eq('id', adminData.user.id);
    }
    
    // Create partner user
    const { data: partnerData, error: partnerError } = await supabase.auth.signUp({
      email: 'partner@clubcreole.com',
      password: 'partnerPassword123',
    });
    
    if (partnerError) throw partnerError;
    if (partnerData.user) {
      // Set partner role
      await supabase.from('profiles').update({ role: 'partner' }).eq('id', partnerData.user.id);
    }
    
    // Create client user
    const { data: clientData, error: clientError } = await supabase.auth.signUp({
      email: 'client@clubcreole.com',
      password: 'clientPassword123',
    });
    
    if (clientError) throw clientError;
    
    return { success: true, message: 'Test users created successfully' };
  } catch (error) {
    console.error('Error creating test users:', error);
    return { success: false, message: 'Failed to create test users' };
  }
};
