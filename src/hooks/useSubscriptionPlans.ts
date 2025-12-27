import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface SubscriptionPlan {
  id: number;
  name: string;
  description: string | null;
  price: number; // Converted from cents to euros
  duration_days: number;
  display_features: string[];
  sort_order: number;
}

interface SubscriptionPlanRow {
  id: number;
  name: string;
  description: string | null;
  price_cents: number;
  duration_days: number;
  display_features: string[] | null;
  sort_order: number | null;
}

function getPeriodLabel(durationDays: number): string {
  if (durationDays >= 365) {
    return "an";
  } else if (durationDays >= 28 && durationDays <= 31) {
    return "mois";
  } else if (durationDays === 7) {
    return "semaine";
  }
  return `${durationDays} jours`;
}

async function fetchSubscriptionPlans(): Promise<SubscriptionPlan[]> {
  const { data, error } = await supabase
    .from("subscription_plans")
    .select(
      "id, name, description, price_cents, duration_days, display_features, sort_order"
    )
    .eq("is_active", true)
    .eq("is_public", true)
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch subscription plans: ${error.message}`);
  }

  return ((data as SubscriptionPlanRow[]) || []).map((plan) => ({
    id: plan.id,
    name: plan.name,
    description: plan.description,
    price: plan.price_cents / 100, // Convert cents to euros
    duration_days: plan.duration_days,
    display_features: plan.display_features || [],
    sort_order: plan.sort_order || 0,
  }));
}

export function useSubscriptionPlans() {
  return useQuery({
    queryKey: ["subscription-plans"],
    queryFn: fetchSubscriptionPlans,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Export utility function for period label
export { getPeriodLabel };
