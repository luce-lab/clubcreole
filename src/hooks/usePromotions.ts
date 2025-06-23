
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Promotion } from "@/components/promo/types";

export const usePromotions = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('promotions')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true });

        if (error) {
          throw error;
        }

        setPromotions(data || []);
      } catch (err) {
        console.error('Error fetching promotions:', err);
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  return { promotions, loading, error };
};
