
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PartnerReservations } from "@/components/dashboard/partner/PartnerReservations";

const Reservations = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-creole-green">Gestion des Réservations</h1>
          <p className="text-sm text-gray-600">
            Gérez toutes vos réservations depuis cette interface
          </p>
        </div>
        
        <PartnerReservations />
      </div>
    </DashboardLayout>
  );
};

export default Reservations;
