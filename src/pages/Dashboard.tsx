
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
  );
};

export default Dashboard;
