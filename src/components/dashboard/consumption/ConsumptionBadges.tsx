
import { Badge } from "@/components/ui/badge";
import { ConsumptionItem } from "./types";

export const getStatusBadge = (status: ConsumptionItem["status"]) => {
  switch (status) {
    case "complété":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          Complété
        </Badge>
      );
    case "annulé":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
          Annulé
        </Badge>
      );
    case "en cours":
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          En cours
        </Badge>
      );
    default:
      return null;
  }
};

export const getTypeBadge = (type: ConsumptionItem["type"]) => {
  switch (type) {
    case "réservation":
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          Réservation
        </Badge>
      );
    case "achat":
      return (
        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
          Achat
        </Badge>
      );
    case "consultation":
      return (
        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
          Consultation
        </Badge>
      );
    default:
      return null;
  }
};
