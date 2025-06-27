
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CompanyFleetHeader } from "./CompanyFleetHeader";
import { CompanyFleetTabs } from "./CompanyFleetTabs";
import { ManagersTabContent } from "./ManagersTabContent";
import { VehiclesTabContent } from "./VehiclesTabContent";

interface CompanyFleetManagementProps {
  companyId: number;
  companyName: string;
  onBack: () => void;
}

export const CompanyFleetManagement = ({ companyId, companyName, onBack }: CompanyFleetManagementProps) => {
  const [activeTab, setActiveTab] = useState<'managers' | 'vehicles'>('managers');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CompanyFleetHeader companyName={companyName} onBack={onBack} />
            <CompanyFleetTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
        </CardHeader>
        
        <CardContent>
          {activeTab === 'managers' && (
            <ManagersTabContent companyId={companyId} companyName={companyName} />
          )}
          
          {activeTab === 'vehicles' && (
            <VehiclesTabContent companyId={companyId} companyName={companyName} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
