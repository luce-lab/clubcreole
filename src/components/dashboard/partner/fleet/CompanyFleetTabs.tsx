
import { Button } from "@/components/ui/button";
import { Users, Car } from "lucide-react";

interface CompanyFleetTabsProps {
  activeTab: 'managers' | 'vehicles';
  onTabChange: (tab: 'managers' | 'vehicles') => void;
}

export const CompanyFleetTabs = ({ activeTab, onTabChange }: CompanyFleetTabsProps) => {
  return (
    <div className="flex space-x-2">
      <Button
        variant={activeTab === 'managers' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onTabChange('managers')}
      >
        <Users className="h-4 w-4 mr-1" />
        Gestionnaires
      </Button>
      <Button
        variant={activeTab === 'vehicles' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onTabChange('vehicles')}
      >
        <Car className="h-4 w-4 mr-1" />
        Véhicules
      </Button>
    </div>
  );
};
