
import React, { createContext, useState, useContext, useEffect } from 'react';

type UserRole = 'admin' | 'partner' | 'client' | null;

interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean, message: string }>;
  signOut: () => void;
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
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simuler la vérification de session au chargement
    const savedUser = localStorage.getItem('simulated_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string): Promise<{ success: boolean, message: string }> => {
    // Simulation de connexion basée sur l'email
    setIsLoading(true);
    
    try {
      // Attente simulée pour imiter un appel réseau
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let mockUser: User | null = null;
      
      // Déterminer le rôle en fonction de l'email
      if (email.includes('admin')) {
        mockUser = {
          id: 'admin-id-123',
          email,
          role: 'admin',
          name: 'Administrateur'
        };
      } else if (email.includes('partner')) {
        mockUser = {
          id: 'partner-id-456',
          email,
          role: 'partner',
          name: 'Partenaire'
        };
      } else {
        mockUser = {
          id: 'client-id-789',
          email,
          role: 'client',
          name: 'Client'
        };
      }
      
      if (mockUser) {
        // Stocker l'utilisateur simulé
        localStorage.setItem('simulated_user', JSON.stringify(mockUser));
        setUser(mockUser);
        return { success: true, message: 'Connexion réussie' };
      } else {
        return { success: false, message: 'Email ou mot de passe incorrect' };
      }
    } catch (error) {
      return { success: false, message: 'Erreur de connexion' };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem('simulated_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
