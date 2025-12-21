
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Crown,
  Users,
  TrendingUp,
  TrendingDown,
  CreditCard,
  AlertCircle,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";

interface Stats {
  totalSubscribers: number;
  activeSubscribers: number;
  trialingSubscribers: number;
  pastDueSubscribers: number;
  canceledSubscribers: number;
  passionneCount: number;
  expertCount: number;
  monthlyRevenue: number;
  totalRevenue: number;
  churnRate: number;
}

export const SubscriptionStats = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch all subscribers
      const { data: subscribers, error: subError } = await supabase
        .from('subscribers')
        .select('*');

      if (subError) throw subError;

      // Fetch purchases for revenue calculation
      const { data: purchases, error: purchaseError } = await supabase
        .from('purchases')
        .select('amount, purchase_date, status')
        .eq('status', 'completed')
        .eq('item_type', 'subscription');

      if (purchaseError) throw purchaseError;

      // Calculate stats
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      const totalSubscribers = subscribers?.length || 0;
      const activeSubscribers = subscribers?.filter(s => s.subscribed && s.subscription_status === 'active').length || 0;
      const trialingSubscribers = subscribers?.filter(s => s.subscription_status === 'trialing').length || 0;
      const pastDueSubscribers = subscribers?.filter(s => s.subscription_status === 'past_due').length || 0;
      const canceledSubscribers = subscribers?.filter(s => s.subscription_status === 'canceled').length || 0;
      const passionneCount = subscribers?.filter(s => s.subscription_tier === 'Passionné' && s.subscribed).length || 0;
      const expertCount = subscribers?.filter(s => s.subscription_tier === 'Expert' && s.subscribed).length || 0;

      const totalRevenue = purchases?.reduce((sum, p) => sum + p.amount, 0) || 0;
      const monthlyRevenue = purchases
        ?.filter(p => new Date(p.purchase_date) >= startOfMonth)
        .reduce((sum, p) => sum + p.amount, 0) || 0;

      // Calculate churn rate (canceled / total * 100)
      const churnRate = totalSubscribers > 0
        ? (canceledSubscribers / totalSubscribers) * 100
        : 0;

      setStats({
        totalSubscribers,
        activeSubscribers,
        trialingSubscribers,
        pastDueSubscribers,
        canceledSubscribers,
        passionneCount,
        expertCount,
        monthlyRevenue,
        totalRevenue,
        churnRate,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      console.error('Error fetching stats:', err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg">
        <AlertCircle className="h-5 w-5" />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Abonnés</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <>
                <div className="text-2xl font-bold">{stats?.totalSubscribers}</div>
                <p className="text-xs text-muted-foreground">
                  {stats?.activeSubscribers} actif(s)
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Revenus du mois</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <>
                <div className="text-2xl font-bold">{stats?.monthlyRevenue.toFixed(2)} €</div>
                <p className="text-xs text-muted-foreground">
                  Total: {stats?.totalRevenue.toFixed(2)} €
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Taux de désabonnement</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <>
                <div className="text-2xl font-bold">{stats?.churnRate.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">
                  {stats?.canceledSubscribers} annulé(s)
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Paiements en retard</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-12" />
            ) : (
              <>
                <div className="text-2xl font-bold text-amber-600">{stats?.pastDueSubscribers}</div>
                <p className="text-xs text-muted-foreground">
                  À surveiller
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Subscription breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5" />
              Répartition par plan
            </CardTitle>
            <CardDescription>
              Nombre d'abonnés par type de plan
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Crown className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Passionné</p>
                      <p className="text-sm text-gray-500">15€ / 2 mois</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {stats?.passionneCount}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <Crown className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">Expert</p>
                      <p className="text-sm text-gray-500">89,99€ / mois</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-purple-600">
                    {stats?.expertCount}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Répartition par statut
            </CardTitle>
            <CardDescription>
              État actuel des abonnements
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Actifs</span>
                  </div>
                  <span className="font-medium">{stats?.activeSubscribers}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span>En période d'essai</span>
                  </div>
                  <span className="font-medium">{stats?.trialingSubscribers}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    <span>Paiement en retard</span>
                  </div>
                  <span className="font-medium text-amber-600">{stats?.pastDueSubscribers}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-gray-400" />
                    <span>Annulés</span>
                  </div>
                  <span className="font-medium text-gray-500">{stats?.canceledSubscribers}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
