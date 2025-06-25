
import { FleetManagersList } from "./FleetManagersList";
import { CreateFleetManagerDialog } from "./CreateFleetManagerDialog";

interface ManagersTabContentProps {
  companyId: string;
  companyName: string;
}

export const ManagersTabContent = ({ companyId, companyName }: ManagersTabContentProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <CreateFleetManagerDialog 
          companyId={companyId} 
          companyName={companyName} 
        />
      </div>
      <FleetManagersList 
        companyId={companyId} 
        companyName={companyName} 
      />
    </div>
  );
};
