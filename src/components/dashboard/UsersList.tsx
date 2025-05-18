
import { useState } from "react";
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
import { useToast } from "@/components/ui/use-toast";

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

export const UsersList = () => {
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

  const handleViewHistory = (userId: string) => {
    toast({
      title: "Détails de consommation",
      description: `Affichage de l'historique de consommation pour l'utilisateur ${userId}`,
    });
    
    // Ici, on pourrait implémenter une navigation ou un modal vers UserConsumptionHistory
    // avec l'ID de l'utilisateur comme paramètre
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Utilisateurs et abonnements</CardTitle>
      </CardHeader>
      <CardContent>
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
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{getStatusBadge(user.subscriptionStatus)}</TableCell>
                <TableCell>{getSubscriptionTypeBadge(user.subscriptionType)}</TableCell>
                <TableCell>
                  {user.subscriptionEndDate || "—"}
                </TableCell>
                <TableCell>{user.registeredDate}</TableCell>
                <TableCell>{user.lastActivity}</TableCell>
                <TableCell>
                  <button 
                    className="text-xs text-blue-600 hover:underline"
                    onClick={() => handleViewHistory(user.id)}
                  >
                    Voir l'historique
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
