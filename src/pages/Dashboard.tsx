
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardClient } from "@/components/dashboard/DashboardClient";
import { DashboardPartner } from "@/components/dashboard/DashboardPartner";
import { DashboardAdmin } from "@/components/dashboard/DashboardAdmin";
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
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user, signOut, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const userRole = user?.role || null;

  // Rediriger vers login si non authentifié
  if (!isLoading && !user) {
    navigate("/login");
    return null;
  }

  const handleLogout = async () => {
    signOut();
    navigate("/");
    toast({
      title: "Déconnecté",
      description: "Vous avez été déconnecté avec succès",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Chargement...</div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="border-b border-sidebar-border">
            <div className="flex items-center gap-2 px-2">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-creole-green text-white">
                {userRole === "admin" ? "A" : userRole === "partner" ? "P" : "C"}
              </div>
              <div>
                <h3 className="font-medium text-sm">
                  {userRole === "admin" 
                    ? "Administrateur" 
                    : userRole === "partner" 
                    ? "Partenaire" 
                    : "Client"}
                </h3>
                <p className="text-xs text-gray-500">Tableau de bord</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
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
                    <SidebarMenuButton tooltip="Utilisateurs">
                      <Users className="h-5 w-5" />
                      <span>Utilisateurs</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Partenaires">
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
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="bg-gray-50">
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-8">
              <DashboardHeader userRole={userRole} />
              <SidebarTrigger />
            </div>

            {userRole === "admin" && <DashboardAdmin />}
            {userRole === "partner" && <DashboardPartner />}
            {userRole === "client" && <DashboardClient />}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
