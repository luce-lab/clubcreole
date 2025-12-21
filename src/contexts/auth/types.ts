
import { User, Session } from '@supabase/supabase-js';

export type UserRole = 'admin' | 'partner' | 'client' | null;

export interface UserWithRole extends User {
  role?: UserRole;
  name?: string;
  company_id?: string; // Changed from number to string to match UUID type from database
  first_name?: string;
  last_name?: string;
  phone?: string;
}

export interface SignUpData {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
}

export interface AuthContextType {
  user: UserWithRole | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean, message: string }>;
  signOut: () => Promise<void>;
  signUp: (data: SignUpData) => Promise<{ success: boolean, message: string }>;
  createAdminUser: (email: string, password: string, name?: string) => Promise<{ success: boolean, message: string }>;
}
