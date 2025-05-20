
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardClient } from "@/components/dashboard/DashboardClient";
import { DashboardPartner } from "@/components/dashboard/DashboardPartner";
import { DashboardAdmin } from "@/components/dashboard/DashboardAdmin";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const userRole = user?.role || null;
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

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

  return (
    <DashboardLayout>
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
  );
};

export default Dashboard;
