
import { supabase } from '@/integrations/supabase/client';
import { UserWithRole, UserRole } from './types';
import { User } from '@supabase/supabase-js';

export const fetchUserProfile = async (user: User): Promise<UserWithRole> => {
  try {
    // Try to use the security definer function we created to avoid RLS recursion
    const { data: roleData, error: roleError } = await supabase
      .rpc('get_current_user_role');
      
    if (!roleError && roleData) {
      // If the function works, use its result
      const role = roleData as UserRole;
      
      // Get other profile data
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('first_name, last_name')
        .eq('id', user.id)
        .single();
      
      return {
        ...user,
        role: role || null,
        name: profileData?.first_name 
          ? `${profileData.first_name} ${profileData.last_name || ''}`
          : user.email
      };
    } else {
      // Fallback to direct query if function doesn't work
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role, first_name, last_name')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Profile fetch error:', profileError);
        return { ...user, role: null };
      }
      
      // Ensure the role is properly typed as UserRole
      const role = profileData?.role as UserRole;
      
      return {
        ...user,
        role: role || null,
        name: profileData?.first_name 
          ? `${profileData.first_name} ${profileData.last_name || ''}`
          : user.email
      };
    }
  } catch (err) {
    console.error('Error in profile fetch:', err);
    return { ...user, role: null };
  }
};
