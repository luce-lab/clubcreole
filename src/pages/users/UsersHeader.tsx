
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

interface UsersHeaderProps {
  onAddUser: () => void;
}

export const UsersHeader = ({ onAddUser }: UsersHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-creole-green">Gestion des Utilisateurs</h1>
        <p className="text-sm text-gray-600">
          Gérez les comptes utilisateurs de la plateforme
        </p>
      </div>
      <Button onClick={onAddUser}>
        <UserPlus className="mr-2 h-4 w-4" />
        Ajouter un utilisateur
      </Button>
    </div>
  );
};

export default UsersHeader;
