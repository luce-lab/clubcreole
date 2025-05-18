
import { supabase } from '@/integrations/supabase/client';
import { UserWithRole } from './types';
import { User } from '@supabase/supabase-js';

export const fetchUserProfile = async (user: User): Promise<UserWithRole> => {
  try {
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('role, first_name, last_name')
      .eq('id', user.id)
      .single();

    if (profileError) {
      console.error('Profile fetch error:', profileError);
      return { ...user, role: null };
    }
    
    return {
      ...user,
      role: profileData?.role || null,
      name: profileData?.first_name 
        ? `${profileData.first_name} ${profileData.last_name || ''}`
        : user.email
    };
  } catch (err) {
    console.error('Error in profile fetch:', err);
    return { ...user, role: null };
  }
};
