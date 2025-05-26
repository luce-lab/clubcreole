
import { useSubscription } from "@/hooks/useSubscription";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Calendar, CreditCard, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export const SubscriptionStatus = () => {
  const { subscriptionData, loading, openCustomerPortal, checkSubscription } = useSubscription();

  const getStatusColor = () => {
    if (!subscriptionData.subscribed) return "secondary";
    return "default";
  };

  const getStatusText = () => {
    if (!subscriptionData.subscribed) return "Aucun abonnement";
    return subscriptionData.subscription_tier || "Abonné";
  };

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
          <span className="font-medium">Plan actuel :</span>
          <Badge variant={getStatusColor()}>
            {getStatusText()}
          </Badge>
        </div>

        {subscriptionData.subscription_tier && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <TrendingUp className="h-4 w-4" />
            <span>{getBenefitsText()}</span>
          </div>
        )}

        {subscriptionData.subscription_end && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>
              Expire le {format(new Date(subscriptionData.subscription_end), "d MMMM yyyy", { locale: fr })}
            </span>
          </div>
        )}

        <div className="flex gap-2 pt-4">
          <Button
            onClick={checkSubscription}
            variant="outline"
            size="sm"
            disabled={loading}
            className="flex-1"
          >
            Actualiser
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
