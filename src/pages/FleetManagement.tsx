
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PartnerFleetManagement } from "@/components/dashboard/partner/PartnerFleetManagement";
import { useAuth } from "@/contexts/auth";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Car } from "lucide-react";

const FleetManagement = () => {
  const { user } = useAuth();
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-creole-green flex items-center gap-2">
            <Car className="h-6 w-6" />
            Gestion de Flotte
          </h1>
          <p className="text-sm text-gray-600">
            Gérez vos entreprises de location et votre flotte de véhicules
          </p>
        </div>
        
        {user?.role === 'partner' ? (
          <PartnerFleetManagement />
        ) : (
          <Alert>
            <AlertDescription>
              Accès réservé aux partenaires de location de voitures
            </AlertDescription>
          </Alert>
        )}
      </div>
    </DashboardLayout>
  );
};

export default FleetManagement;
