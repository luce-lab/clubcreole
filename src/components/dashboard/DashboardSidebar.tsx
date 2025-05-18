
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { 
  Users, 
  ShoppingBag, 
  LineChart, 
  Settings, 
  LogOut, 
  Home, 
  User,
  CalendarClock
} from "lucide-react";

interface DashboardSidebarProps {
  userRole: "admin" | "partner" | "client" | null;
}

export const DashboardSidebar: FC<DashboardSidebarProps> = ({ userRole }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    signOut();
    navigate("/");
    toast({
      title: "Déconnecté",
      description: "Vous avez été déconnecté avec succès",
    });
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton tooltip="Accueil" onClick={() => navigate("/")}>
          <Home className="h-5 w-5" />
          <span>Accueil</span>
        </SidebarMenuButton>
      </SidebarMenuItem>

      {/* Menu pour les administrateurs */}
      {userRole === "admin" && (
        <>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Utilisateurs" onClick={() => navigate("/users")}>
              <Users className="h-5 w-5" />
              <span>Utilisateurs</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Partenaires" onClick={() => navigate("/partners")}>
              <ShoppingBag className="h-5 w-5" />
              <span>Partenaires</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Statistiques">
              <LineChart className="h-5 w-5" />
              <span>Statistiques</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Paramètres">
              <Settings className="h-5 w-5" />
              <span>Paramètres</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </>
      )}

      {/* Menu pour les partenaires */}
      {userRole === "partner" && (
        <>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Offres">
              <ShoppingBag className="h-5 w-5" />
              <span>Mes offres</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Réservations">
              <CalendarClock className="h-5 w-5" />
              <span>Réservations</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Statistiques">
              <LineChart className="h-5 w-5" />
              <span>Statistiques</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </>
      )}

      {/* Menu pour les clients */}
      {userRole === "client" && (
        <>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Profil">
              <User className="h-5 w-5" />
              <span>Mon profil</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Réservations">
              <CalendarClock className="h-5 w-5" />
              <span>Mes réservations</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </>
      )}

      {/* Bouton de déconnexion pour tous */}
      <SidebarMenuItem>
        <SidebarMenuButton tooltip="Déconnexion" onClick={handleLogout}>
          <LogOut className="h-5 w-5" />
          <span>Déconnexion</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
