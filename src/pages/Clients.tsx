
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PartnerClients } from "@/components/dashboard/partner/PartnerClients";

const Clients = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-creole-green">Gestion des Clients de Test</h1>
          <p className="text-sm text-gray-600">
            Gérez vos clients et leurs informations pour les locations de voitures
          </p>
        </div>
        
        <PartnerClients />
      </div>
    </DashboardLayout>
  );
};

export default Clients;
