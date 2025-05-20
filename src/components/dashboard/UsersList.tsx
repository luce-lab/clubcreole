import { useState, useEffect } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Edit, History } from "lucide-react";
import { fetchUsers } from "./users/userUtils";

// Types pour les utilisateurs et leurs abonnements
interface UserSubscription {
  id: string;
  name: string;
  email: string;
  subscriptionStatus: "active" | "pending" | "expired" | "none";
  subscriptionType: "basic" | "premium" | "none";
  subscriptionEndDate: string | null;
  registeredDate: string;
  lastActivity: string;
}

interface UsersListProps {
  onSelectUser?: (userId: string) => void;
  onEditUser?: (userId: string) => void;
  searchQuery?: string;
  refreshTrigger?: number; // Ajout d'un déclencheur de rafraîchissement
}

export const UsersList = ({ 
  onSelectUser, 
  onEditUser, 
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
        setIsLoading(true);
        const usersData = await fetchUsers();
        // Les données retournées par fetchUsers() respectent maintenant le type UserSubscription[]
        setUsers(usersData);
        setError(null);
      } catch (err: any) {
        console.error("Erreur lors du chargement des utilisateurs:", err);
        setError("Impossible de charger les utilisateurs");
        toast({
          variant: "destructive",
          title: "Erreur",
          description: err.message || "Impossible de charger les utilisateurs",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, [toast, refreshTrigger]); // Rafraîchir lorsque refreshTrigger change

  // Filtrer les utilisateurs en fonction de la recherche
  const filteredUsers = searchQuery 
    ? users.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : users;

  const getStatusBadge = (status: UserSubscription["subscriptionStatus"]) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Actif
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            En attente
          </Badge>
        );
      case "expired":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Expiré
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            Aucun
          </Badge>
        );
    }
  };

  const getSubscriptionTypeBadge = (type: UserSubscription["subscriptionType"]) => {
    switch (type) {
      case "premium":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Premium
          </Badge>
        );
      case "basic":
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
            Basique
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            Aucun
          </Badge>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="w-full text-center py-8">
        <p className="text-gray-500">Chargement des utilisateurs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full text-center py-8">
        <p className="text-red-500">{error}</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => setError(null)}
        >
          Réessayer
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date d'expiration</TableHead>
            <TableHead>Inscription</TableHead>
            <TableHead>Dernière activité</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-6 text-gray-500">
                Aucun utilisateur trouvé
              </TableCell>
            </TableRow>
          ) : (
            filteredUsers.map((user) => (
              <TableRow key={user.id} className="cursor-pointer hover:bg-slate-50">
                <TableCell 
                  className="font-medium"
                  onClick={() => onSelectUser && onSelectUser(user.id)}
                >
                  {user.name}
                </TableCell>
                <TableCell
                  onClick={() => onSelectUser && onSelectUser(user.id)}
                >
                  {user.email}
                </TableCell>
                <TableCell
                  onClick={() => onSelectUser && onSelectUser(user.id)}
                >
                  {getStatusBadge(user.subscriptionStatus)}
                </TableCell>
                <TableCell
                  onClick={() => onSelectUser && onSelectUser(user.id)}
                >
                  {getSubscriptionTypeBadge(user.subscriptionType)}
                </TableCell>
                <TableCell
                  onClick={() => onSelectUser && onSelectUser(user.id)}
                >
                  {user.subscriptionEndDate || "—"}
                </TableCell>
                <TableCell
                  onClick={() => onSelectUser && onSelectUser(user.id)}
                >
                  {user.registeredDate}
                </TableCell>
                <TableCell
                  onClick={() => onSelectUser && onSelectUser(user.id)}
                >
                  {user.lastActivity}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => onEditUser && onEditUser(user.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => onSelectUser && onSelectUser(user.id)}
                    >
                      <History className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
