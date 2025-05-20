
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createTestUsers } from "@/contexts/auth/AuthProvider";
import { Loader2, WrenchIcon, UserCogIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CreateAdminForm } from "./CreateAdminForm";

export const AdminDevTools = () => {
  const [isCreatingUsers, setIsCreatingUsers] = useState(false);
  const [isAdminDialogOpen, setIsAdminDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleCreateTestUsers = async () => {
    setIsCreatingUsers(true);
    try {
      const result = await createTestUsers();
      
      if (result.success) {
        toast({
          title: "Utilisateurs de test créés",
          description: "Admin, partenaire et client ont été créés avec succès.",
        });
      } else {
        toast({
          title: "Erreur",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error creating test users:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la création des utilisateurs de test.",
        variant: "destructive",
      });
    } finally {
      setIsCreatingUsers(false);
    }
  };

  const handleAdminCreationSuccess = () => {
    setIsAdminDialogOpen(false);
  };

  return (
    <div className="mt-8 border-t pt-4">
      <details className="text-sm text-gray-500">
        <summary className="cursor-pointer flex items-center text-gray-500 hover:text-gray-700">
          <WrenchIcon className="h-4 w-4 mr-1" />
          Outils de développement
        </summary>
        
        <div className="mt-2 p-3 bg-gray-50 rounded-md">
          <h4 className="font-medium text-gray-700 mb-2">Créer des utilisateurs de test</h4>
          <p className="text-xs text-gray-600 mb-3">
            Cela créera trois utilisateurs de test avec différents rôles:
          </p>
          <ul className="text-xs text-gray-600 mb-3 space-y-1">
            <li>• Admin: admin@clubcreole.com / adminPassword123</li>
            <li>• Partenaire: partner@clubcreole.com / partnerPassword123</li>
            <li>• Client: client@clubcreole.com / clientPassword123</li>
          </ul>
          <div className="flex flex-col gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleCreateTestUsers}
              disabled={isCreatingUsers}
            >
              {isCreatingUsers ? (
                <>
                  <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                  Création en cours...
                </>
              ) : (
                "Créer les utilisateurs de test"
              )}
            </Button>
            
            <Dialog open={isAdminDialogOpen} onOpenChange={setIsAdminDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  variant="default"
                  className="bg-creole-green hover:bg-creole-green/90"
                >
                  <UserCogIcon className="mr-2 h-3 w-3" />
                  Créer un nouvel administrateur
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Créer un utilisateur administrateur</DialogTitle>
                  <DialogDescription>
                    Créez un nouvel utilisateur avec des privilèges d'administration pour gérer l'ensemble des données.
                  </DialogDescription>
                </DialogHeader>
                <CreateAdminForm onSuccess={handleAdminCreationSuccess} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </details>
    </div>
  );
};
