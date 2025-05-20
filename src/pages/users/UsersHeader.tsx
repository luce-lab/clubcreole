
import { Button } from "@/components/ui/button";
import { UserPlus, Lock } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface UsersHeaderProps {
  onAddUser: () => void;
  isSuperAdmin: boolean;
}

export const UsersHeader = ({ onAddUser, isSuperAdmin }: UsersHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">Gestion des utilisateurs</h1>
        <p className="text-muted-foreground">
          {isSuperAdmin 
            ? "Consultez et gérez les utilisateurs de la plateforme" 
            : "Consultez les utilisateurs de la plateforme (accès en lecture seule)"}
        </p>
      </div>

      {isSuperAdmin ? (
        <Button onClick={onAddUser}>
          <UserPlus className="mr-2 h-4 w-4" />
          Ajouter un utilisateur
        </Button>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" disabled>
                <Lock className="mr-2 h-4 w-4" />
                Gestion restreinte
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Seul l'administrateur principal peut ajouter des utilisateurs</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};
