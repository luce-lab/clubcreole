
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PartnerOffers } from "@/components/dashboard/partner/PartnerOffers";

const Offers = () => {
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
};

export default Offers;
