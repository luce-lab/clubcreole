
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface DashboardHeaderProps {
  userRole: "admin" | "partner" | "client" | null;
}

export const DashboardHeader: FC<DashboardHeaderProps> = ({ userRole }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  return (
    <div className="flex justify-between items-center w-full">
      <div>
        <h1 className="text-2xl font-bold text-creole-green">
          {userRole === "admin" 
            ? "Administration" 
            : userRole === "partner" 
            ? "Espace Partenaire" 
            : "Espace Client"}
        </h1>
        <p className="text-sm text-gray-600">
          Bienvenue {user?.name || ""} sur votre tableau de bord
        </p>
      </div>
      
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="icon" 
          className="relative"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
            3
          </span>
        </Button>
      </div>
    </div>
  );
};
