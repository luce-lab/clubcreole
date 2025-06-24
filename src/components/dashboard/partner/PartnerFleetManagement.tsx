
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { FleetOverview } from "./fleet/FleetOverview";
import { CompanyCard } from "./fleet/CompanyCard";
import { CompanyFleetManagement } from "./fleet/CompanyFleetManagement";
import { 
  fetchPartnerCarRentalCompanies, 
  fetchCarModelsByCompany,
  fetchPartnerCarRentalReservations 
} from "@/services/partnerCarRentalService";
import { fetchFleetManagersByCompany } from "@/services/fleetManagerService";

export const PartnerFleetManagement = () => {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [selectedCompanyName, setSelectedCompanyName] = useState<string>("");

  const { data: companies = [], isLoading: companiesLoading } = useQuery({
    queryKey: ['partner-car-rental-companies'],
    queryFn: fetchPartnerCarRentalCompanies,
  });

  const { data: reservations = [] } = useQuery({
    queryKey: ['partner-car-rental-reservations'],
    queryFn: fetchPartnerCarRentalReservations,
  });

  // Récupérer les statistiques pour chaque entreprise
  const companiesWithStats = companies.map(company => {
    const companyReservations = reservations.filter(r => r.rental_company_name === company.business_name);
    return {
      ...company,
      reservationCount: companyReservations.length
    };
  });

  const handleManageFleet = (companyId: string) => {
    const company = companies.find(c => c.id === companyId);
    setSelectedCompanyId(companyId);
    setSelectedCompanyName(company?.business_name || "");
  };

  const handleBack = () => {
    setSelectedCompanyId(null);
    setSelectedCompanyName("");
  };

  if (selectedCompanyId) {
    return (
      <CompanyFleetManagement 
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
          <CompanyCardWithStats
            key={company.id}
            company={company}
            onManageFleet={handleManageFleet}
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

// Composant wrapper pour récupérer les statistiques de chaque entreprise
const CompanyCardWithStats = ({ company, onManageFleet, onViewDetails }: any) => {
  const { data: models = [] } = useQuery({
    queryKey: ['car-models', company.id],
    queryFn: () => fetchCarModelsByCompany(company.id),
  });

  const { data: managers = [] } = useQuery({
    queryKey: ['fleet-managers', company.id],
    queryFn: () => fetchFleetManagersByCompany(company.id),
  });

  const vehicleCount = models.length;
  const activeVehicleCount = models.filter(m => m.is_active).length;
  const managerCount = managers.length;

  return (
    <CompanyCard
      company={company}
      vehicleCount={vehicleCount}
      activeVehicleCount={activeVehicleCount}
      managerCount={managerCount}
      onManageFleet={onManageFleet}
      onViewDetails={onViewDetails}
    />
  );
};
