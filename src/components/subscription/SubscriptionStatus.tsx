
import { useSubscription } from "@/hooks/useSubscription";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Crown,
  Calendar,
  CreditCard,
  TrendingUp,
  AlertCircle,
  RefreshCw,
  Clock,
  XCircle
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { PaymentRetryAlert } from "./PaymentRetryAlert";

export const SubscriptionStatus = () => {
  const {
    subscriptionData,
    loading,
    error,
    openCustomerPortal,
    checkSubscription,
    getStatusLabel,
    getStatusColor,
    hasPaymentIssues
  } = useSubscription();

  const getBenefitsText = () => {
    switch (subscriptionData.subscription_tier) {
      case "Passionné":
        return "15% de réduction sur toutes les activités";
      case "Expert":
        return "25% de réduction sur toutes les activités";
      default:
        return "Accès aux tarifs de base";
    }
  };

  const getStatusIcon = () => {
    switch (subscriptionData.subscription_status) {
      case 'trialing':
        return <Clock className="h-4 w-4" />;
      case 'past_due':
      case 'unpaid':
        return <AlertCircle className="h-4 w-4" />;
      case 'canceled':
        return <XCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  // Loading skeleton
  if (loading && !subscriptionData.subscribed) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5" />
            Statut d'abonnement
          </CardTitle>
          <CardDescription>
            Gérez votre abonnement et vos avantages
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-20" />
          </div>
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-40" />
          <div className="flex gap-2 pt-4">
            <Skeleton className="h-9 flex-1" />
            <Skeleton className="h-9 flex-1" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="h-5 w-5" />
          Statut d'abonnement
        </CardTitle>
        <CardDescription>
          Gérez votre abonnement et vos avantages
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Payment issues alert */}
        {hasPaymentIssues() && <PaymentRetryAlert />}

        {/* Error state */}
        {error && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-md">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
            <Button
              onClick={checkSubscription}
              variant="ghost"
              size="sm"
              className="ml-auto"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Current plan */}
        <div className="flex items-center justify-between">
          <span className="font-medium">Plan actuel :</span>
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <Badge variant={getStatusColor()}>
              {subscriptionData.subscription_tier || getStatusLabel()}
            </Badge>
          </div>
        </div>

        {/* Subscription status details */}
        {subscriptionData.subscribed && subscriptionData.subscription_status && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-medium">Statut :</span>
            <span>{getStatusLabel()}</span>
          </div>
        )}

        {/* Benefits */}
        {subscriptionData.subscription_tier && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <TrendingUp className="h-4 w-4" />
            <span>{getBenefitsText()}</span>
          </div>
        )}

        {/* Trial end date */}
        {subscriptionData.trial_end && subscriptionData.subscription_status === 'trialing' && (
          <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 p-2 rounded-md">
            <Clock className="h-4 w-4" />
            <span>
              Période d'essai jusqu'au {format(new Date(subscriptionData.trial_end), "d MMMM yyyy", { locale: fr })}
            </span>
          </div>
        )}

        {/* Cancel at period end warning */}
        {subscriptionData.cancel_at_period_end && subscriptionData.subscription_end && (
          <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 p-2 rounded-md">
            <AlertCircle className="h-4 w-4" />
            <span>
              Annulation programmée le {format(new Date(subscriptionData.subscription_end), "d MMMM yyyy", { locale: fr })}
            </span>
          </div>
        )}

        {/* Subscription end date */}
        {subscriptionData.subscription_end && !subscriptionData.cancel_at_period_end && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>
              {subscriptionData.subscribed ? "Renouvellement" : "Expire"} le {format(new Date(subscriptionData.subscription_end), "d MMMM yyyy", { locale: fr })}
            </span>
          </div>
        )}

        {/* Last invoice info */}
        {subscriptionData.last_invoice_amount && subscriptionData.last_invoice_date && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <CreditCard className="h-4 w-4" />
            <span>
              Dernier paiement : {subscriptionData.last_invoice_amount.toFixed(2)} €
              le {format(new Date(subscriptionData.last_invoice_date), "d MMM yyyy", { locale: fr })}
            </span>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-2 pt-4">
          <Button
            onClick={checkSubscription}
            variant="outline"
            size="sm"
            disabled={loading}
            className="flex-1"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Actualisation...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Actualiser
              </>
            )}
          </Button>

          {subscriptionData.subscribed && (
            <Button
              onClick={openCustomerPortal}
              variant="default"
              size="sm"
              disabled={loading}
              className="flex-1 bg-creole-green hover:bg-creole-green/90"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Gérer
            </Button>
          )}
        </div>

        {/* Upsell for non-subscribers */}
        {!subscriptionData.subscribed && (
          <div className="pt-2">
            <p className="text-sm text-gray-600 mb-2">
              Souscrivez à un abonnement pour bénéficier de réductions exclusives !
            </p>
            <Button
              onClick={() => window.location.href = '/#pricing'}
              className="w-full bg-creole-green hover:bg-creole-green/90"
            >
              Voir les abonnements
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
