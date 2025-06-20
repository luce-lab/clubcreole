import { supabase } from "../integrations/supabase/client";

export interface Activity {
  id: number;
  name: string;
  path: string;
  icon_name: string;
}

export const getActivities = async (): Promise<Activity[]> => {
  const { data, error } = await supabase.from("activities").select("*");

  if (error) {
    console.error("Error fetching activities:", error);
    throw new Error(error.message);
  }

  return data || [];
}; 