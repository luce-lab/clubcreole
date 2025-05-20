
import { Badge } from "@/components/ui/badge";

type SubscriptionType = "basic" | "premium" | "none";

interface SubscriptionBadgeProps {
  type: SubscriptionType;
}

export const SubscriptionBadge = ({ type }: SubscriptionBadgeProps) => {
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
