
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { useAuth } from "@/contexts/auth";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { useToast } from "@/components/ui/use-toast";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Utiliser la même logique que dans Dashboard.tsx et DashboardSidebar.tsx
  const userRole = user?.user_metadata?.role || user?.role || 'client';
  const finalUserRole = user?.email === 'admin@clubcreole.com' ? 'admin' : userRole;

  // // console.log('DashboardLayout - User email:', user?.email);
  // // console.log('DashboardLayout - Final user role:', finalUserRole);

  // Rediriger vers la page de login si non authentifié
  useEffect(() => {
    if (!isLoading && !user) {
      toast({
        title: "Accès refusé",
        description: "Veuillez vous connecter pour accéder au tableau de bord",
        variant: "destructive",
      });
      navigate("/login");
    }
  }, [isLoading, user, navigate, toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Chargement...</div>
      </div>
    );
  }

  // Si l'utilisateur n'est pas connecté, ne rien afficher (la redirection sera gérée par useEffect)
  if (!user) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="border-b border-sidebar-border">
            <div className="flex items-center gap-2 px-2">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-creole-green text-white">
                {finalUserRole === "admin" ? "A" : finalUserRole === "partner" ? "P" : "C"}
              </div>
              <div>
                <h3 className="font-medium text-sm">
                  {finalUserRole === "admin" 
                    ? "Administrateur" 
                    : finalUserRole === "partner" 
                    ? "Partenaire" 
                    : "Client"}
                </h3>
                <p className="text-xs text-gray-500">Tableau de bord</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <DashboardSidebar />
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="bg-gray-50">
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-8">
              <DashboardHeader userRole={finalUserRole} />
              <SidebarTrigger />
            </div>
            
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
