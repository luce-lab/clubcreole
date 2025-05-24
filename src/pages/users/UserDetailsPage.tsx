
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { UserDetails } from "./UserDetails";
import { useAuth } from "@/contexts/auth";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const UserDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const isSuperAdmin = user?.email === "admin@clubcreole.com";
  
  const handleEdit = () => {
    // Cette fonction sera implémentée selon vos besoins
    console.log("Edit user", id);
  };

  const handleBack = () => {
    navigate("/users");
  };

  if (!id) {
    return (
      <DashboardLayout>
        <div className="text-center py-8">
          <p className="text-red-500">ID utilisateur manquant</p>
          <Button onClick={handleBack} className="mt-4">
            Retour à la liste des utilisateurs
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
          <h1 className="text-2xl font-bold text-creole-green">
            Détails de l'utilisateur
          </h1>
        </div>
        
        <UserDetails 
          userId={id} 
          onEdit={handleEdit}
          isSuperAdmin={isSuperAdmin}
        />
      </div>
    </DashboardLayout>
  );
};

export default UserDetailsPage;
