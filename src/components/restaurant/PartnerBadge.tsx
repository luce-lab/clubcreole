import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

interface PartnerBadgeProps {
  isPartner?: boolean;
  className?: string;
}

export const PartnerBadge = ({ isPartner = false, className = "" }: PartnerBadgeProps) => {
  if (!isPartner) return null;

  return (
    <Badge
      variant="default"
      className={`bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 ${className}`}
    >
      <CheckCircle2 className="w-3 h-3 mr-1" />
      Partenaire
    </Badge>
  );
};
