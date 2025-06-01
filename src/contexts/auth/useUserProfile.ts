
import { supabase } from '@/integrations/supabase/client';
import { UserWithRole, UserRole } from './types.ts';
import { User } from '@supabase/supabase-js';

export const fetchUserProfile = async (user: User): Promise<UserWithRole> => {
  try {
    console.log('Fetching user profile for:', user.email);
    
    // Get profile data with the new RLS policies
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('role, first_name, last_name, company_id')
      .eq('id', user.id)
      .maybeSingle(); // Use maybeSingle instead of single to handle missing profiles

    if (profileError) {
      console.error('Profile fetch error:', profileError);
      
      // Return user with default role if there's an error
      return {
        ...user,
        role: null,
        name: user.email || 'Utilisateur',
        company_id: undefined
      };
    }
    
    // Handle case where profile doesn't exist yet
    if (!profileData) {
      console.log('Profile not found, this might be a new user');
      return {
        ...user,
        role: null,
        name: user.email || 'Utilisateur', 
        company_id: undefined
      };
    }
    
    // Ensure the role is properly typed as UserRole
    const role = profileData.role as UserRole;
    
    console.log('Profile data retrieved successfully:', profileData);
    
    return {
      ...user,
      role: role || null,
      name: profileData.first_name 
        ? `${profileData.first_name} ${profileData.last_name || ''}`.trim()
        : user.email || 'Utilisateur',
      company_id: profileData.company_id
    };
  } catch (err) {
    console.error('Error in profile fetch:', err);
    // Always return a valid user object even if profile fetch fails
    return { 
      ...user, 
      role: null,
      name: user.email || 'Utilisateur',
      company_id: undefined
    };
  }
};
