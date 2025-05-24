
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, Car, Settings, Eye, Users } from "lucide-react";
import { CarRentalCompanyForPartner } from "@/services/partnerCarRentalService";

interface CompanyCardProps {
  company: CarRentalCompanyForPartner;
  vehicleCount: number;
  activeVehicleCount: number;
  managerCount: number;
  onManageFleet: (companyId: number) => void;
  onViewDetails: (companyId: number) => void;
}

export const CompanyCard = ({ 
  company, 
  vehicleCount, 
  activeVehicleCount, 
  managerCount,
  onManageFleet, 
  onViewDetails 
}: CompanyCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-creole-green/10 rounded-lg">
              <Building className="h-6 w-6 text-creole-green" />
            </div>
            <div>
              <CardTitle className="text-lg">{company.name}</CardTitle>
              <p className="text-sm text-gray-500">{company.location}</p>
            </div>
          </div>
          <Badge variant="secondary">{company.type}</Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-gray-600 line-clamp-2">{company.description}</p>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Car className="h-4 w-4 text-gray-500" />
              <span>{vehicleCount} véhicules</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>{activeVehicleCount} actifs</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span>{managerCount} gestionnaire{managerCount > 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>⭐ {company.rating}</span>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onViewDetails(company.id)}
              className="flex-1"
            >
              <Eye className="h-4 w-4 mr-1" />
              Détails
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              onClick={() => onManageFleet(company.id)}
              className="flex-1"
            >
              <Settings className="h-4 w-4 mr-1" />
              Gérer
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
