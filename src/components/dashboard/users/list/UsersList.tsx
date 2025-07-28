
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { fetchUsers } from "../userUtils";
import { UsersTable } from "./UsersTable";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";
import { UserSubscription, UsersListProps } from "./types";
import { useAuth } from "@/contexts/auth";
import { UnauthorizedState } from "./UnauthorizedState";

export const UsersList = ({ 
  onSelectUser = () => {}, 
  onEditUser = () => {}, 
  searchQuery = "",
  refreshTrigger = 0
}: UsersListProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [users, setUsers] = useState<UserSubscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isSuperAdmin = user?.email === "admin@clubcreole.com";

  useEffect(() => {
    const loadUsers = async () => {
      try {
        // console.log("Chargement des utilisateurs...");
        setIsLoading(true);
        setError(null);
        
        const usersData = await fetchUsers();
        // console.log("Données récupérées:", usersData);
        setUsers(usersData);
        
        toast({
          title: "Succès",
          description: `${usersData.length} utilisateur(s) chargé(s)`,
        });
      } catch (err: any) {
        console.error("Erreur lors du chargement des utilisateurs:", err);
        const errorMessage = err.message || "Erreur inconnue lors du chargement des utilisateurs";
        setError(errorMessage);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: errorMessage,
        });
        setUsers([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Charger les utilisateurs seulement si l'utilisateur est super admin
    if (isSuperAdmin) {
      loadUsers();
    } else {
      setIsLoading(false);
      setError("Accès non autorisé");
    }
  }, [toast, refreshTrigger, isSuperAdmin]);

  // Filtrer les utilisateurs en fonction de la recherche
  const filteredUsers = searchQuery 
    ? users.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : users;

  if (isLoading) {
    return <LoadingState />;
  }

  if (!isSuperAdmin) {
    return <UnauthorizedState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <UsersTable 
      users={filteredUsers} 
      onSelectUser={onSelectUser} 
      onEditUser={onEditUser} 
      isSuperAdmin={isSuperAdmin}
    />
  );
};

// Réexporter les types pour les utiliser ailleurs dans l'application
export type { UserSubscription } from "./types";
export type { UsersListProps } from "./types";
