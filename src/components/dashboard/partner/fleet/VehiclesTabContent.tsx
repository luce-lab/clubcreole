
import { VehicleManagement } from "./VehicleManagement";

interface VehiclesTabContentProps {
  companyId: number;
  companyName: string;
}

export const VehiclesTabContent = ({ companyId, companyName }: VehiclesTabContentProps) => {
  return (
    <VehicleManagement 
      companyId={companyId}
      companyName={companyName}
      onBack={() => {}} // Pas de retour car on est dans les onglets
    />
  );
};
