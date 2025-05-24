
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Car } from "lucide-react";
import { FleetManagersList } from "./FleetManagersList";
import { CreateFleetManagerDialog } from "./CreateFleetManagerDialog";
import { VehicleManagement } from "./VehicleManagement";

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
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                Retour
              </Button>
              <div>
                <CardTitle className="text-xl">Gestion - {companyName}</CardTitle>
                <p className="text-sm text-gray-600">
                  Gérez les gestionnaires et la flotte de véhicules
                </p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant={activeTab === 'managers' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('managers')}
              >
                <Users className="h-4 w-4 mr-1" />
                Gestionnaires
              </Button>
              <Button
                variant={activeTab === 'vehicles' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('vehicles')}
              >
                <Car className="h-4 w-4 mr-1" />
                Véhicules
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {activeTab === 'managers' && (
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
          )}
          
          {activeTab === 'vehicles' && (
            <VehicleManagement 
              companyId={companyId}
              companyName={companyName}
              onBack={() => {}} // Pas de retour car on est dans les onglets
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
