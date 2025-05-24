
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PartnerCarRentalReservations } from "@/components/dashboard/partner/PartnerCarRentalReservations";
import { useAuth } from "@/contexts/auth";

const Reservations = () => {
  const { user } = useAuth();
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-creole-green">Gestion des Réservations</h1>
          <p className="text-sm text-gray-600">
            Gérez toutes vos réservations de location de voitures depuis cette interface
          </p>
        </div>
        
        {user?.role === 'partner' ? (
          <PartnerCarRentalReservations />
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Accès réservé aux partenaires de location de voitures</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Reservations;
