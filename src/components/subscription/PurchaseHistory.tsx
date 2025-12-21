
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ShoppingBag,
  Calendar,
  Euro,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Filter
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Purchase {
  id: string;
  item_type: string;
  item_name: string;
  amount: number;
  currency: string;
  purchase_date: string;
  status: string;
  stripe_invoice_id: string | null;
  stripe_subscription_id: string | null;
  metadata: Record<string, any> | null;
}

type StatusFilter = 'all' | 'completed' | 'failed' | 'pending';

export const PurchaseHistory = () => {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  useEffect(() => {
    if (user) {
      fetchPurchaseHistory();
    }
  }, [user]);

  const fetchPurchaseHistory = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('purchases')
        .select('id, item_type, item_name, amount, currency, purchase_date, status, stripe_invoice_id, stripe_subscription_id, metadata')
        .order('purchase_date', { ascending: false });

      if (error) throw error;
      setPurchases(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      console.error('Error fetching purchase history:', err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getItemTypeColor = (type: string) => {
    switch (type) {
      case 'subscription':
        return 'bg-green-100 text-green-800';
      case 'offer':
        return 'bg-blue-100 text-blue-800';
      case 'activity':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getItemTypeLabel = (type: string) => {
    switch (type) {
      case 'subscription':
        return 'Abonnement';
      case 'offer':
        return 'Offre';
      case 'activity':
        return 'Activité';
      default:
        return type;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Terminé
          </Badge>
        );
      case 'failed':
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Échoué
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="secondary">
            <RefreshCw className="h-3 w-3 mr-1" />
            En attente
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredPurchases = purchases.filter(purchase => {
    if (statusFilter === 'all') return true;
    return purchase.status === statusFilter;
  });

  const totalAmount = filteredPurchases
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  if (!user) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-gray-500">
            Connectez-vous pour voir votre historique d'achats
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Historique des achats
            </CardTitle>
            <CardDescription>
              Consultez l'historique de vos abonnements et achats
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as StatusFilter)}>
              <SelectTrigger className="w-[140px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filtrer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="completed">Terminés</SelectItem>
                <SelectItem value="failed">Échoués</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={fetchPurchaseHistory}
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Error state */}
        {error && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-md mb-4">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
            <Button
              onClick={fetchPurchaseHistory}
              variant="ghost"
              size="sm"
              className="ml-auto"
            >
              Réessayer
            </Button>
          </div>
        )}

        {/* Loading skeleton */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                  <Skeleton className="h-6 w-20" />
                </div>
                {i < 2 && <Separator className="my-3" />}
              </div>
            ))}
          </div>
        ) : filteredPurchases.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingBag className="h-12 w-12 mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">
              {statusFilter === 'all'
                ? "Aucun achat enregistré pour le moment"
                : `Aucun achat avec le statut "${statusFilter === 'completed' ? 'terminé' : statusFilter === 'failed' ? 'échoué' : 'en attente'}"`
              }
            </p>
          </div>
        ) : (
          <>
            {/* Summary */}
            {totalAmount > 0 && (
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    Total ({filteredPurchases.filter(p => p.status === 'completed').length} achats)
                  </span>
                  <span className="font-semibold text-lg">{totalAmount.toFixed(2)} €</span>
                </div>
              </div>
            )}

            {/* Purchase list */}
            <div className="space-y-4">
              {filteredPurchases.map((purchase, index) => (
                <div key={purchase.id}>
                  {index > 0 && <Separator className="my-4" />}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <Badge className={getItemTypeColor(purchase.item_type)}>
                          {getItemTypeLabel(purchase.item_type)}
                        </Badge>
                        <span className="text-sm font-medium truncate">
                          {purchase.item_name}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(purchase.purchase_date), "d MMMM yyyy", { locale: fr })}
                        </div>
                        {getStatusBadge(purchase.status)}
                      </div>

                      {/* Stripe invoice link */}
                      {purchase.stripe_invoice_id && (
                        <div className="mt-2">
                          <span className="text-xs text-gray-400">
                            Facture: {purchase.stripe_invoice_id.slice(0, 20)}...
                          </span>
                        </div>
                      )}

                      {/* Failed payment details */}
                      {purchase.status === 'failed' && purchase.metadata && (
                        <div className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded">
                          {purchase.metadata.attempt_count && (
                            <span>Tentative {purchase.metadata.attempt_count}/3</span>
                          )}
                          {purchase.metadata.next_retry && (
                            <span className="ml-2">
                              • Prochaine tentative: {format(new Date(purchase.metadata.next_retry), "d MMM à HH:mm", { locale: fr })}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="text-right shrink-0">
                      <div className="flex items-center gap-1 font-semibold">
                        <Euro className="h-4 w-4" />
                        {purchase.amount.toFixed(2)}
                      </div>
                      {purchase.stripe_invoice_id && purchase.status === 'completed' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs text-gray-500 hover:text-gray-700 p-0 h-auto mt-1"
                          onClick={() => {
                            // In a real app, this would open the Stripe invoice PDF
                            console.log('Open invoice:', purchase.stripe_invoice_id);
                          }}
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Facture
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
