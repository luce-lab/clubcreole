
import { ReactNode } from "react";
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
import { useAuth } from "@/contexts/AuthContext";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const userRole = user?.role || null;

  // Redirect to login if not authenticated
  if (!isLoading && !user) {
    navigate("/login");
    return null;
  }

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
            <DashboardSidebar userRole={userRole} />
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="bg-gray-50">
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-8">
              <DashboardHeader userRole={userRole} />
              <SidebarTrigger />
            </div>
            
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
