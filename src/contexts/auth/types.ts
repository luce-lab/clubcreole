
import { User, Session } from '@supabase/supabase-js';

export type UserRole = 'admin' | 'partner' | 'client' | null;

export interface UserWithRole extends User {
  role?: UserRole;
  name?: string;
}

export interface AuthContextType {
  user: UserWithRole | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean, message: string }>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<{ success: boolean, message: string }>;
}
