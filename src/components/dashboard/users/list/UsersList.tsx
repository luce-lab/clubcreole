
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { fetchUsers } from "../userUtils";
import { UsersTable } from "./UsersTable";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";
import { UserSubscription, UsersListProps } from "./types";

export const UsersList = ({ 
  onSelectUser = () => {}, 
  onEditUser = () => {}, 
  searchQuery = "",
  refreshTrigger = 0
}: UsersListProps) => {
  const { toast } = useToast();
  const [users, setUsers] = useState<UserSubscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        console.log("Chargement des utilisateurs...");
        setIsLoading(true);
        const usersData = await fetchUsers();
        console.log("Données récupérées:", usersData);
        setUsers(usersData);
        setError(null);
      } catch (err: any) {
        console.error("Erreur lors du chargement des utilisateurs:", err);
        const errorMessage = err.message || "Erreur inconnue";
        setError("Impossible de charger les utilisateurs: " + errorMessage);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: errorMessage,
        });
        // Réinitialiser la liste d'utilisateurs en cas d'erreur
        setUsers([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, [toast, refreshTrigger]);

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

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <UsersTable 
      users={filteredUsers} 
      onSelectUser={onSelectUser} 
      onEditUser={onEditUser} 
    />
  );
};

// Réexporter les types pour les utiliser ailleurs dans l'application
export type { UserSubscription } from "./types";
export type { UsersListProps } from "./types";
