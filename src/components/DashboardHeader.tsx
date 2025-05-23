
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
<<<<<<< HEAD
import { useAuth } from "@/contexts/auth";
import { UserRole } from "@/contexts/auth";

interface DashboardHeaderProps {
  userRole: UserRole;
=======

interface DashboardHeaderProps {
  userRole: "admin" | "partner" | "client" | null;
>>>>>>> f563802 (feat: Implement dashboard structure)
}

export const DashboardHeader: FC<DashboardHeaderProps> = ({ userRole }) => {
  const navigate = useNavigate();
<<<<<<< HEAD
  const { user } = useAuth();
=======
>>>>>>> f563802 (feat: Implement dashboard structure)
  
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
<<<<<<< HEAD
          Bienvenue {user?.name || ""} sur votre tableau de bord
=======
          Bienvenue sur votre tableau de bord
>>>>>>> f563802 (feat: Implement dashboard structure)
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
