
import { supabase } from '@/integrations/supabase/client';
import { UserWithRole, UserRole } from './types';
import { User } from '@supabase/supabase-js';

export const fetchUserProfile = async (user: User): Promise<UserWithRole> => {
  try {
    console.log('Fetching user profile for:', user.email);
    
    // Get profile data directly - the new RLS policies should allow this
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('role, first_name, last_name, company_id')
      .eq('id', user.id)
      .single();

    if (profileError) {
      console.error('Profile fetch error:', profileError);
      
      // If we can't fetch the profile, it might be because it doesn't exist yet
      // This is normal for newly created users
      if (profileError.code === 'PGRST116') {
        console.log('Profile not found, this might be a new user');
        return {
          ...user,
          role: null,
          name: user.email || 'Utilisateur',
          company_id: undefined
        };
      }
      
      throw profileError;
    }
    
    // Ensure the role is properly typed as UserRole
    const role = profileData?.role as UserRole;
    
    console.log('Profile data retrieved:', profileData);
    
    return {
      ...user,
      role: role || null,
      name: profileData?.first_name 
        ? `${profileData.first_name} ${profileData.last_name || ''}`
        : user.email || 'Utilisateur',
      company_id: profileData?.company_id
    };
  } catch (err) {
    console.error('Error in profile fetch:', err);
    return { 
      ...user, 
      role: null,
      name: user.email || 'Utilisateur',
      company_id: undefined
    };
  }
};
