
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import {
  ArrowLeft,
  Mail,
  Crown,
  Calendar,
  CreditCard,
  AlertCircle,
  XCircle,
  RefreshCw,
  ExternalLink,
  Clock,
  User,
  CheckCircle2,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Subscriber } from "./SubscriptionsList";

interface SubscriptionDetailProps {
  subscriber: Subscriber;
  onBack: () => void;
  onUpdate: () => void;
}

interface Purchase {
  id: string;
  item_name: string;
  amount: number;
  purchase_date: string;
  status: string;
  stripe_invoice_id: string | null;
}

export const SubscriptionDetail = ({ subscriber, onBack, onUpdate }: SubscriptionDetailProps) => {
  const { toast } = useToast();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loadingPurchases, setLoadingPurchases] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchPurchases();
  }, [subscriber.id]);

  const fetchPurchases = async () => {
    setLoadingPurchases(true);
    try {
      const { data, error } = await supabase
        .from('purchases')
        .select('id, item_name, amount, purchase_date, status, stripe_invoice_id')
        .eq('user_id', subscriber.id)
        .order('purchase_date', { ascending: false })
        .limit(10);

      if (error) throw error;
      setPurchases(data || []);
    } catch (err) {
      console.error('Error fetching purchases:', err);
    } finally {
      setLoadingPurchases(false);
    }
  };

  const handleCancelSubscription = async () => {
    setActionLoading(true);
    try {
      // Update the subscriber record to mark as canceled
      const { error } = await supabase
        .from('subscribers')
        .update({
          cancel_at_period_end: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', subscriber.id);

      if (error) throw error;

      toast({
        title: "Annulation programmée",
        description: "L'abonnement sera annulé à la fin de la période en cours.",
      });

      onUpdate();
    } catch (err) {
      console.error('Error canceling subscription:', err);
      toast({
        title: "Erreur",
        description: "Impossible d'annuler l'abonnement",
        variant: "destructive",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleReactivateSubscription = async () => {
    setActionLoading(true);
    try {
      const { error } = await supabase
        .from('subscribers')
        .update({
          cancel_at_period_end: false,
          updated_at: new Date().toISOString(),
        })
        .eq('id', subscriber.id);

      if (error) throw error;

      toast({
        title: "Abonnement réactivé",
        description: "L'annulation programmée a été annulée.",
      });

      onUpdate();
    } catch (err) {
      console.error('Error reactivating subscription:', err);
      toast({
        title: "Erreur",
        description: "Impossible de réactiver l'abonnement",
        variant: "destructive",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleImmediateCancel = async () => {
    setActionLoading(true);
    try {
      const { error } = await supabase
        .from('subscribers')
        .update({
          subscribed: false,
          subscription_status: 'canceled',
          canceled_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', subscriber.id);

      if (error) throw error;

      toast({
        title: "Abonnement annulé",
        description: "L'abonnement a été immédiatement annulé.",
      });

      onUpdate();
    } catch (err) {
      console.error('Error immediately canceling subscription:', err);
      toast({
        title: "Erreur",
        description: "Impossible d'annuler immédiatement l'abonnement",
        variant: "destructive",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadge = () => {
    if (!subscriber.subscribed) {
      return <Badge variant="secondary" className="text-lg px-3 py-1">Inactif</Badge>;
    }

    switch (subscriber.subscription_status) {
      case 'active':
        return subscriber.cancel_at_period_end ? (
          <Badge variant="outline" className="text-lg px-3 py-1 border-amber-500 text-amber-700">
            Annulation prévue
          </Badge>
        ) : (
          <Badge className="text-lg px-3 py-1 bg-green-100 text-green-800">Actif</Badge>
        );
      case 'trialing':
        return <Badge variant="outline" className="text-lg px-3 py-1 border-blue-500 text-blue-700">Période d'essai</Badge>;
      case 'past_due':
        return <Badge variant="destructive" className="text-lg px-3 py-1">Paiement en retard</Badge>;
      case 'canceled':
        return <Badge variant="secondary" className="text-lg px-3 py-1">Annulé</Badge>;
      default:
        return <Badge variant="secondary" className="text-lg px-3 py-1">{subscriber.subscription_status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{subscriber.email}</h2>
          <p className="text-gray-500">Détail de l'abonnement</p>
        </div>
        {getStatusBadge()}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Subscription info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5" />
                Informations d'abonnement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Plan</p>
                  <p className="font-medium">{subscriber.subscription_tier || 'Aucun'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Statut</p>
                  <p className="font-medium">{subscriber.subscription_status || 'Inactif'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date d'expiration</p>
                  <p className="font-medium">
                    {subscriber.subscription_end
                      ? format(new Date(subscriber.subscription_end), "d MMMM yyyy", { locale: fr })
                      : '-'
                    }
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Dernier paiement</p>
                  <p className="font-medium">
                    {subscriber.last_invoice_amount
                      ? `${subscriber.last_invoice_amount.toFixed(2)} €`
                      : '-'
                    }
                  </p>
                </div>
              </div>

              {subscriber.cancel_at_period_end && (
                <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-3 rounded-md">
                  <AlertCircle className="h-4 w-4" />
                  <span>Cet abonnement sera annulé à la fin de la période en cours</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Stripe info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Informations Stripe
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Customer ID</p>
                  <div className="flex items-center gap-2">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                      {subscriber.stripe_customer_id || 'Non défini'}
                    </code>
                    {subscriber.stripe_customer_id && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(`https://dashboard.stripe.com/customers/${subscriber.stripe_customer_id}`, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Subscription ID</p>
                  <div className="flex items-center gap-2">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                      {subscriber.stripe_subscription_id || 'Non défini'}
                    </code>
                    {subscriber.stripe_subscription_id && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(`https://dashboard.stripe.com/subscriptions/${subscriber.stripe_subscription_id}`, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Purchase history */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Historique des paiements
              </CardTitle>
              <CardDescription>
                Les 10 derniers paiements
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loadingPurchases ? (
                <div className="space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : purchases.length === 0 ? (
                <p className="text-center text-gray-500 py-4">Aucun paiement enregistré</p>
              ) : (
                <div className="space-y-2">
                  {purchases.map((purchase) => (
                    <div
                      key={purchase.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{purchase.item_name}</p>
                        <p className="text-sm text-gray-500">
                          {format(new Date(purchase.purchase_date), "d MMM yyyy", { locale: fr })}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{purchase.amount.toFixed(2)} €</p>
                        <Badge
                          variant={purchase.status === 'completed' ? 'default' : 'destructive'}
                          className="text-xs"
                        >
                          {purchase.status === 'completed' ? (
                            <><CheckCircle2 className="h-3 w-3 mr-1" />Payé</>
                          ) : (
                            <><XCircle className="h-3 w-3 mr-1" />Échoué</>
                          )}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Actions */}
        <div className="space-y-6">
          {/* Quick info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informations client
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-sm">{subscriber.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-sm">
                  Inscrit le {format(new Date(subscriber.created_at), "d MMM yyyy", { locale: fr })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-gray-400" />
                <span className="text-sm">
                  Mis à jour le {format(new Date(subscriber.updated_at), "d MMM yyyy", { locale: fr })}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {subscriber.subscribed && !subscriber.cancel_at_period_end && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      disabled={actionLoading}
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      Annuler à la fin de période
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Annuler l'abonnement ?</AlertDialogTitle>
                      <AlertDialogDescription>
                        L'abonnement sera annulé à la fin de la période en cours.
                        L'utilisateur conservera ses avantages jusqu'à cette date.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction onClick={handleCancelSubscription}>
                        Confirmer
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}

              {subscriber.cancel_at_period_end && (
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={handleReactivateSubscription}
                  disabled={actionLoading}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Réactiver l'abonnement
                </Button>
              )}

              {subscriber.subscribed && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="w-full justify-start"
                      disabled={actionLoading}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Annulation immédiate
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Annulation immédiate ?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Cette action est irréversible. L'abonnement sera immédiatement annulé
                        et l'utilisateur perdra tous ses avantages.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleImmediateCancel}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Confirmer l'annulation
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}

              {subscriber.stripe_customer_id && (
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => window.open(`https://dashboard.stripe.com/customers/${subscriber.stripe_customer_id}`, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Voir dans Stripe
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
