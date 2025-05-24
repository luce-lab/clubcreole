
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { FleetOverview } from "./fleet/FleetOverview";
import { CompanyCard } from "./fleet/CompanyCard";
import { VehicleManagement } from "./fleet/VehicleManagement";
import { 
  fetchPartnerCarRentalCompanies, 
  fetchCarModelsByCompany,
  fetchPartnerCarRentalReservations 
} from "@/services/partnerCarRentalService";

export const PartnerFleetManagement = () => {
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null);
  const [selectedCompanyName, setSelectedCompanyName] = useState<string>("");

  const { data: companies = [], isLoading: companiesLoading } = useQuery({
    queryKey: ['partner-car-rental-companies'],
    queryFn: fetchPartnerCarRentalCompanies,
  });

  const { data: reservations = [] } = useQuery({
    queryKey: ['partner-car-rental-reservations'],
    queryFn: fetchPartnerCarRentalReservations,
  });

  // Calculer les statistiques pour chaque entreprise
  const companiesWithStats = companies.map(company => {
    const companyReservations = reservations.filter(r => r.rental_company_name === company.name);
    return {
      ...company,
      reservationCount: companyReservations.length
    };
  });

  const handleManageModels = (companyId: number) => {
    const company = companies.find(c => c.id === companyId);
    setSelectedCompanyId(companyId);
    setSelectedCompanyName(company?.name || "");
  };

  const handleBack = () => {
    setSelectedCompanyId(null);
    setSelectedCompanyName("");
  };

  if (selectedCompanyId) {
    return (
      <VehicleManagement 
        companyId={selectedCompanyId}
        companyName={selectedCompanyName}
        onBack={handleBack}
      />
    );
  }

  if (companiesLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center h-32">
            <div className="text-lg">Chargement de votre flotte...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Calculer les statistiques globales
  const totalCompanies = companies.length;
  const totalReservations = reservations.length;

  return (
    <div className="space-y-6">
      <FleetOverview 
        totalCompanies={totalCompanies}
        totalVehicles={0} // À calculer avec les modèles
        activeVehicles={0} // À calculer avec les modèles actifs
        totalReservations={totalReservations}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companiesWithStats.map((company) => (
          <CompanyCard
            key={company.id}
            company={company}
            vehicleCount={0} // À implémenter
            activeVehicleCount={0} // À implémenter
            onManageModels={handleManageModels}
            onViewDetails={(id) => console.log("View details", id)}
          />
        ))}
      </div>

      {companies.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8 text-gray-500">
              Aucune entreprise de location trouvée. Contactez l'administrateur pour configurer vos entreprises.
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
