
<<<<<<< HEAD
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardClient } from "@/components/dashboard/DashboardClient";
import { DashboardPartner } from "@/components/dashboard/DashboardPartner";
import { DashboardAdmin } from "@/components/dashboard/DashboardAdmin";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, AlertTriangle, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const userRole = user?.role || null;
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [showDebugInfo, setShowDebugInfo] = useState(false);

  // Redirection automatique vers la gestion des loisirs pour les admins si le paramètre est présent
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('redirect') === 'loisirs' && userRole === 'admin') {
      navigate('/loisirs-management');
    }
  }, [userRole, navigate]);

  const handleSignOut = () => {
    signOut();
    navigate("/login");
  }

  // Force reload function to refresh the page completely
  const forceReload = () => {
    window.location.reload();
  };

  return (
    <DashboardLayout>
      {/* Diagnostic Alert - temporaire */}
      <Alert className="mb-6 border-blue-500 bg-blue-50">
        <AlertTriangle className="h-4 w-4 text-blue-600" />
        <AlertTitle className="text-blue-800">Informations utilisateur</AlertTitle>
        <AlertDescription className="text-blue-700">
          <p>
            <strong>Email:</strong> {user?.email}<br />
            <strong>Rôle:</strong> {userRole || "non défini"}<br />
            <strong>ID:</strong> {user?.id?.substring(0, 8)}...
          </p>
          <div className="mt-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowDebugInfo(!showDebugInfo)}
              className="border-blue-500 text-blue-700 hover:bg-blue-100 mr-2"
            >
              {showDebugInfo ? "Masquer les détails" : "Afficher plus de détails"}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={forceReload}
              className="border-blue-500 text-blue-700 hover:bg-blue-100"
            >
              Actualiser la page
            </Button>
          </div>
          
          {showDebugInfo && (
            <div className="mt-3 p-3 bg-white rounded border border-blue-200">
              <h3 className="font-semibold mb-1">Informations complètes:</h3>
              <pre className="text-xs overflow-auto max-h-40 p-2 bg-gray-50">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>
          )}
        </AlertDescription>
      </Alert>

      {userRole !== "admin" && (
        <Alert className="mb-6 border-amber-500 bg-amber-50">
          <Info className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-800">Accès limité</AlertTitle>
          <AlertDescription className="text-amber-700">
            <p>Vous êtes actuellement connecté en tant que <strong className="font-semibold">{userRole === "client" ? "client" : userRole === "partner" ? "partenaire" : "utilisateur"}</strong>. La gestion des loisirs est réservée aux administrateurs.</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSignOut}
                className="border-amber-500 text-amber-700 hover:bg-amber-100"
              >
                Se déconnecter pour changer de compte
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate("/loisirs")}
                className="border-amber-500 text-amber-700 hover:bg-amber-100"
              >
                Voir les loisirs disponibles
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
      
      {userRole === "admin" && <DashboardAdmin selectedUserId={selectedUserId} onSelectUser={setSelectedUserId} />}
      {userRole === "partner" && <DashboardPartner />}
      {userRole === "client" && <DashboardClient />}
    </DashboardLayout>
=======
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
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

type UserRole = "admin" | "partner" | "client" | null;

const Dashboard = () => {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate("/login");
          return;
        }
        
        // Dans un cas réel, vous récupéreriez le rôle depuis la base de données
        // Ici, nous simulons un rôle basé sur l'email pour la démonstration
        const email = session.user.email;
        
        if (email?.includes("admin")) {
          setUserRole("admin");
        } else if (email?.includes("partner")) {
          setUserRole("partner");
        } else {
          setUserRole("client");
        }
        
        setLoading(false);
      } catch (error) {
        toast({
          title: "Erreur d'authentification",
          description: "Impossible de vérifier votre session",
          variant: "destructive",
        });
        navigate("/login");
      }
    };
    
    checkAuth();
  }, [navigate, toast]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
    toast({
      title: "Déconnecté",
      description: "Vous avez été déconnecté avec succès",
    });
  };

  if (loading) {
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
>>>>>>> f563802 (feat: Implement dashboard structure)
  );
};

export default Dashboard;
