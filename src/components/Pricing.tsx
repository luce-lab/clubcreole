
import { Check } from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";
import { useAuth } from "@/contexts/auth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const subscriptions = [
  {
    name: "Gratuit",
    price: "0",
    period: "mois",
    description: "Pour découvrir nos activités",
    features: [
      "Accès à toutes les activités (tarif de base)",
      "Newsletter mensuelle",
      "Compte personnel"
    ],
    priceType: null
  },
  {
    name: "Passionné",
    price: "15",
    period: "2 mois",
    description: "Pour les amateurs d'activités nautiques",
    features: [
      "15% de réduction sur toutes les activités",
      "Accès prioritaire aux réservations",
      "Événements VIP",
      "Support prioritaire"
    ],
    priceType: "passionnе"
  },
  {
    name: "Expert",
    price: "89.99",
    period: "mois",
    description: "L'expérience ultime",
    features: [
      "25% de réduction sur toutes les activités",
      "Accès illimité aux équipements",
      "Événements exclusifs",
      "Service conciergerie dédié",
      "Assurance activités incluse"
    ],
    priceType: "expert"
  }
];

export const Pricing = () => {
  const { user } = useAuth();
  const { subscriptionData, loading, createCheckout, openCustomerPortal } = useSubscription();

  const handleSubscription = (priceType: string | null) => {
    if (!priceType) {
      // Plan gratuit - pas besoin d'action particulière si pas connecté
      if (!user) {
        console.log("Plan gratuit sélectionné pour utilisateur non connecté");
        return;
      }
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
    if (!user) return false; // Si pas connecté, aucun plan n'est actuel
    if (planName === "Gratuit" && !subscriptionData.subscribed) return true;
    return subscriptionData.subscription_tier === planName;
  };

  const getCardStyling = (planName: string) => {
    if (!user) {
      // Si pas connecté, tous les plans ont le même style
      return "bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow relative";
    }
    
    // Si connecté, mettre en évidence le plan actuel
    if (isCurrentPlan(planName)) {
      return "bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow relative ring-2 ring-creole-green";
    }
    
    return "bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow relative";
  };

  const getButtonStyling = (planName: string, priceType: string | null) => {
    if (!user) {
      // Si pas connecté, seul le plan gratuit est activé
      if (planName === "Gratuit") {
        return "w-full bg-creole-green hover:bg-creole-green/90";
      }
      return "w-full bg-creole-green hover:bg-creole-green/90";
    }
    
    // Si connecté et c'est le plan actuel
    if (isCurrentPlan(planName)) {
      return "w-full bg-gray-300 text-gray-500";
    }
    
    // Si connecté mais pas le plan actuel
    if (planName === "Gratuit") {
      return "w-full bg-gray-300 text-gray-500";
    }
    
    return "w-full bg-creole-green hover:bg-creole-green/90";
  };

  const getButtonText = (planName: string, priceType: string | null) => {
    if (loading) return "Chargement...";
    
    if (!user) {
      if (planName === "Gratuit") return "Choisir gratuit";
      return `Choisir ${planName}`;
    }
    
    if (isCurrentPlan(planName)) return "Plan actuel";
    
    if (planName === "Gratuit") return "Plan gratuit";
    return `Choisir ${planName}`;
  };

  const isButtonDisabled = (planName: string, priceType: string | null) => {
    if (loading) return true;
    
    if (!user) {
      // Si pas connecté, aucun bouton n'est désactivé
      return false;
    }
    
    return isCurrentPlan(planName) || planName === "Gratuit";
  };

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
              Gérer mon abonnement
            </Button>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {subscriptions.map((sub, index) => (
            <div 
              key={index}
              className={getCardStyling(sub.name)}
            >
              {user && isCurrentPlan(sub.name) && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-creole-green">
                  Plan actuel
                </Badge>
              )}
              
              <h3 className="text-2xl font-bold text-creole-green mb-2">{sub.name}</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold">{sub.price}€</span>
                <span className="text-gray-500 ml-2">/{sub.period}</span>
              </div>
              <p className="text-gray-600 mb-6">{sub.description}</p>
              <ul className="space-y-4 mb-8">
                {sub.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <Check className="h-5 w-5 text-creole-green mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                onClick={() => handleSubscription(sub.priceType)}
                disabled={isButtonDisabled(sub.name, sub.priceType)}
                className={getButtonStyling(sub.name, sub.priceType)}
              >
                {getButtonText(sub.name, sub.priceType)}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
