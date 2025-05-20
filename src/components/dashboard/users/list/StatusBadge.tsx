
import { Badge } from "@/components/ui/badge";

type SubscriptionStatus = "active" | "pending" | "expired" | "none";

interface StatusBadgeProps {
  status: SubscriptionStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
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
