
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Calendar, Euro, Gift } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface SubscriptionStats {
  totalSpent: number;
  totalSavings: number;
  activitiesUsed: number;
  offersUsed: number;
  memberSince: string | null;
}

export const SubscriptionStats = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<SubscriptionStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      // Fetch purchase data for statistics
      const { data: purchases, error: purchasesError } = await supabase
        .from('purchases')
        .select('*');

      if (purchasesError) throw purchasesError;

      // Fetch subscriber data for member since date
      const { data: subscriber, error: subscriberError } = await supabase
        .from('subscribers')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (subscriberError && subscriberError.code !== 'PGRST116') {
        throw subscriberError;
      }

      const totalSpent = purchases?.reduce((sum, p) => sum + Number(p.amount), 0) || 0;
      const activitiesUsed = purchases?.filter(p => p.item_type === 'activity').length || 0;
      const offersUsed = purchases?.filter(p => p.item_type === 'offer').length || 0;
      
      // Estimated savings based on subscription tier
      let totalSavings = 0;
      if (subscriber?.subscription_tier === 'Passionné') {
        totalSavings = (activitiesUsed + offersUsed) * 5; // Estimated 5€ savings per use
      } else if (subscriber?.subscription_tier === 'Expert') {
        totalSavings = (activitiesUsed + offersUsed) * 8; // Estimated 8€ savings per use
      }

      setStats({
        totalSpent,
        totalSavings,
        activitiesUsed,
        offersUsed,
        memberSince: subscriber?.subscription_start || null
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total dépensé</CardTitle>
          <Euro className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalSpent.toFixed(2)}€</div>
          <p className="text-xs text-muted-foreground">Depuis votre inscription</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Économies estimées</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{stats.totalSavings.toFixed(2)}€</div>
          <p className="text-xs text-muted-foreground">Grâce à votre abonnement</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Activités utilisées</CardTitle>
          <Gift className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activitiesUsed}</div>
          <p className="text-xs text-muted-foreground">Réservations effectuées</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Membre depuis</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {stats.memberSince ? (
            <>
              <div className="text-lg font-bold">
                {format(new Date(stats.memberSince), "MMM yyyy", { locale: fr })}
              </div>
              <p className="text-xs text-muted-foreground">
                {format(new Date(stats.memberSince), "d MMMM yyyy", { locale: fr })}
              </p>
            </>
          ) : (
            <div className="text-lg font-bold">-</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
