
import { useState, useEffect } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Edit, History, Calendar } from "lucide-react";

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
}

export const UsersList = ({ onSelectUser, onEditUser, searchQuery = "" }: UsersListProps) => {
  const { toast } = useToast();
  const [users, setUsers] = useState<UserSubscription[]>([
    {
      id: "1",
      name: "Jean Dupont",
      email: "jean.dupont@example.com",
      subscriptionStatus: "active",
      subscriptionType: "premium",
      subscriptionEndDate: "2025-07-15",
      registeredDate: "2024-01-10",
      lastActivity: "2025-05-12",
    },
    {
      id: "2",
      name: "Marie Lambert",
      email: "marie.lambert@example.com",
      subscriptionStatus: "active",
      subscriptionType: "basic",
      subscriptionEndDate: "2025-06-22",
      registeredDate: "2024-02-05",
      lastActivity: "2025-05-17",
    },
    {
      id: "3",
      name: "Thomas Martin",
      email: "thomas.martin@example.com",
      subscriptionStatus: "expired",
      subscriptionType: "basic",
      subscriptionEndDate: "2025-04-30",
      registeredDate: "2024-01-25",
      lastActivity: "2025-04-28",
    },
    {
      id: "4",
      name: "Sophie Dubois",
      email: "sophie.dubois@example.com",
      subscriptionStatus: "pending",
      subscriptionType: "premium",
      subscriptionEndDate: null,
      registeredDate: "2024-05-01",
      lastActivity: "2025-05-16",
    },
    {
      id: "5",
      name: "Michel Blanc",
      email: "michel.blanc@example.com",
      subscriptionStatus: "none",
      subscriptionType: "none",
      subscriptionEndDate: null,
      registeredDate: "2024-03-15",
      lastActivity: "2025-04-10",
    },
  ]);

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
