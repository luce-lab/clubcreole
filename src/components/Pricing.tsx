import { Check } from "lucide-react";

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
    ]
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
    ]
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
    ]
  }
];

export const Pricing = () => {
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
          {subscriptions.map((sub, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-2xl font-bold text-creole-green mb-2">{sub.name}</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold">{sub.price}€</span>
                <span className="text-gray-500 ml-2">/{sub.period}</span>
              </div>
              <p className="text-gray-600 mb-6">{sub.description}</p>
              <ul className="space-y-4">
                {sub.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <Check className="h-5 w-5 text-creole-green mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-8 w-full bg-creole-green text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors">
                Choisir {sub.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
