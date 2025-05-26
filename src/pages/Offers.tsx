
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PartnerOffers } from "@/components/dashboard/partner/PartnerOffers";
import OffersList from "@/components/offers/OffersList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/auth";

const Offers = () => {
  const { user } = useAuth();
  
  // Si l'utilisateur est connecté et est un partenaire, afficher le dashboard
  if (user) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-creole-green">Gestion des Offres</h1>
            <p className="text-sm text-gray-600">
              Créez et gérez vos offres spéciales, réductions et forfaits
            </p>
          </div>
          
          <PartnerOffers />
        </div>
      </DashboardLayout>
    );
  }

  // Sinon, afficher la page publique des bons plans
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bons Plans Club Créole
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez les offres exclusives de nos partenaires. Restaurants, activités, 
            hébergements... Profitez d'avantages uniques réservés aux membres du Club Créole !
          </p>
        </div>

        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
            <TabsTrigger value="current">Offres actuelles</TabsTrigger>
            <TabsTrigger value="upcoming">Prochainement</TabsTrigger>
          </TabsList>
          
          <TabsContent value="current" className="space-y-6">
            <OffersList />
          </TabsContent>
          
          <TabsContent value="upcoming" className="space-y-6">
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                De nouvelles offres arrivent bientôt !
              </p>
              <p className="text-gray-400 mt-2">
                Revenez prochainement pour découvrir nos prochaines promotions
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Offers;
