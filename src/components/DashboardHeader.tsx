
import { FC } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell, Home } from "lucide-react";
import { useAuth } from "@/contexts/auth";

interface DashboardHeaderProps {
  userRole: string;
}

export const DashboardHeader: FC<DashboardHeaderProps> = ({ userRole }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  
  // Obtenir le nom d'affichage approprié selon le rôle
  const getDisplayName = () => {
    if (user?.user_metadata?.name) {
      return user.user_metadata.name;
    }
    
    // Fallback : extraire le nom de l'email avant le @
    if (user?.email) {
      return user.email.split('@')[0];
    }
    
    return "Utilisateur";
  };
  
  const isOnHomePage = location.pathname === "/";
  
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
          Bienvenue {getDisplayName()} sur votre tableau de bord
        </p>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Bouton retour vers le site pour les clients - toujours visible */}
        {userRole === "client" && (
          <Button 
            variant={isOnHomePage ? "default" : "outline"}
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            {isOnHomePage ? "Sur le site" : "Retour vers le site"}
          </Button>
        )}
        
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
