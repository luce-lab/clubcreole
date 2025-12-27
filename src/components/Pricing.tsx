import { Check, Loader2 } from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";
import { useSubscriptionPlans, getPeriodLabel } from "@/hooks/useSubscriptionPlans";
import { useAuth } from "@/contexts/auth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export const Pricing = () => {
  const { user } = useAuth();
  const { subscriptionData, loading: subscriptionLoading, createCheckout, openCustomerPortal } = useSubscription();
  const { data: plans, isLoading: plansLoading, error: plansError } = useSubscriptionPlans();

  const loading = subscriptionLoading || plansLoading;

  const getPriceType = (planName: string): string | null => {
    // Plan gratuit doesn't require checkout
    const lowerName = planName.toLowerCase();
    if (lowerName === "gratuit") return null;
    // Map plan name to Stripe price type
    if (lowerName === "passionné" || lowerName === "passionne") return "passionne";
    if (lowerName === "expert") return "expert";
    return lowerName;
  };

  const handleSubscription = (priceType: string | null) => {
    if (!priceType) {
      // Plan gratuit - pas besoin d'action particulière
      return;
    }

    if (!user) {
      // Plans payants - rediriger vers la connexion si pas connecté
      window.location.href = '/login';
      return;
    }
    createCheckout(priceType);
  };

  const isCurrentPlan = (planName: string) => {
    if (!user) return false;
    if (planName.toLowerCase() === "gratuit" && !subscriptionData.subscribed) return true;
    return subscriptionData.subscription_tier?.toLowerCase() === planName.toLowerCase();
  };

  const getCardStyling = (planName: string) => {
    const baseStyle = "bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow relative";

    // Si l'utilisateur est connecté ET a un abonnement actif ET c'est son plan actuel
    if (user && subscriptionData.subscribed && isCurrentPlan(planName)) {
      return baseStyle + " ring-2 ring-creole-green";
    }

    return baseStyle;
  };

  const getButtonStyling = (planName: string) => {
    if (!user) {
      // Si pas connecté, tous les plans sont disponibles en vert
      return "w-full bg-creole-green hover:bg-creole-green/90";
    }

    // Si connecté ET a un abonnement actif ET c'est le plan actuel
    if (subscriptionData.subscribed && isCurrentPlan(planName)) {
      return "w-full bg-gray-300 text-gray-500 cursor-not-allowed";
    }

    // Pour tous les autres cas (pas d'abonnement ou abonnement différent), bouton vert
    return "w-full bg-creole-green hover:bg-creole-green/90";
  };

  const getButtonText = (planName: string) => {
    if (loading) return "Chargement...";

    if (!user) {
      return `Choisir ${planName}`;
    }

    // Si connecté ET a un abonnement actif ET c'est le plan actuel
    if (subscriptionData.subscribed && isCurrentPlan(planName)) {
      return "Plan actuel";
    }

    return `Choisir ${planName}`;
  };

  const isButtonDisabled = (planName: string) => {
    if (loading) return true;

    if (!user) {
      // Si pas connecté, aucun bouton n'est désactivé
      return false;
    }

    // Seul le plan actuel est désactivé (si l'utilisateur a un abonnement actif)
    return subscriptionData.subscribed && isCurrentPlan(planName);
  };

  // Get badge text based on plan name (since no badge_text column exists)
  const getBadgeText = (planName: string): string | null => {
    const lowerName = planName.toLowerCase();
    if (lowerName === "passionné" || lowerName === "passionne") return "Populaire";
    if (lowerName === "expert") return "Premium";
    return null;
  };

  // Loading skeleton
  if (plansLoading) {
    return (
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-creole-blue mb-4">
            Nos Abonnements
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Découvrez nos formules d'abonnement et profitez de réductions exclusives sur toutes nos activités
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg p-8">
                <Skeleton className="h-8 w-32 mb-4" />
                <Skeleton className="h-12 w-24 mb-4" />
                <Skeleton className="h-4 w-full mb-6" />
                <div className="space-y-4 mb-8">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (plansError) {
    return (
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-creole-blue mb-4">
            Nos Abonnements
          </h2>
          <p className="text-center text-red-500 mb-12">
            Impossible de charger les abonnements. Veuillez réessayer plus tard.
          </p>
        </div>
      </section>
    );
  }

  // No plans available
  if (!plans || plans.length === 0) {
    return (
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-creole-blue mb-4">
            Nos Abonnements
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Aucun abonnement disponible pour le moment.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-creole-blue mb-4">
          Nos Abonnements
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Découvrez nos formules d'abonnement et profitez de réductions exclusives sur toutes nos activités
        </p>

        {user && subscriptionData.subscribed && (
          <div className="text-center mb-8">
            <p className="text-lg text-green-600 mb-2">
              Vous êtes abonné au plan {subscriptionData.subscription_tier}
            </p>
            <Button
              onClick={openCustomerPortal}
              variant="outline"
              disabled={loading}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Gérer mon abonnement
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const priceType = getPriceType(plan.name);
            const badgeText = getBadgeText(plan.name);
            const isCurrentUserPlan = user && subscriptionData.subscribed && isCurrentPlan(plan.name);

            return (
              <div
                key={plan.id}
                className={getCardStyling(plan.name)}
              >
                {isCurrentUserPlan && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-creole-green">
                    Plan actuel
                  </Badge>
                )}

                {!isCurrentUserPlan && badgeText && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-creole-green">
                    {badgeText}
                  </Badge>
                )}

                <h3 className="text-2xl font-bold text-creole-green mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold">{plan.price}€</span>
                  <span className="text-gray-500 ml-2">/{getPeriodLabel(plan.duration_days)}</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <ul className="space-y-4 mb-8">
                  {plan.display_features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check className="h-5 w-5 text-creole-green mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSubscription(priceType)}
                  disabled={isButtonDisabled(plan.name)}
                  className={getButtonStyling(plan.name)}
                >
                  {getButtonText(plan.name)}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
