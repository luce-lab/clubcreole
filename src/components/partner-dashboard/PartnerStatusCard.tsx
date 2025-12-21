import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, XCircle, Building2 } from "lucide-react";

interface Partner {
  id: number;
  business_name: string;
  status: string;
  created_at: string;
  business_type: string;
}

interface PartnerStatusCardProps {
  partner: Partner | null;
  isLoading: boolean;
}

export const PartnerStatusCard = ({ partner, isLoading }: PartnerStatusCardProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!partner) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-gray-500">Aucune candidature trouvée</p>
        </CardContent>
      </Card>
    );
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'approuve':
        return {
          icon: <CheckCircle className="h-8 w-8 text-green-500" />,
          label: 'Approuvé',
          bgColor: 'bg-green-50',
          textColor: 'text-green-700',
          borderColor: 'border-green-200',
          description: 'Félicitations ! Votre candidature a été approuvée. Vous pouvez maintenant gérer votre profil.'
        };
      case 'rejete':
        return {
          icon: <XCircle className="h-8 w-8 text-red-500" />,
          label: 'Rejeté',
          bgColor: 'bg-red-50',
          textColor: 'text-red-700',
          borderColor: 'border-red-200',
          description: 'Votre candidature n\'a pas été retenue. Vous pouvez nous contacter pour plus d\'informations.'
        };
      default:
        return {
          icon: <Clock className="h-8 w-8 text-orange-500" />,
          label: 'En attente',
          bgColor: 'bg-orange-50',
          textColor: 'text-orange-700',
          borderColor: 'border-orange-200',
          description: 'Votre candidature est en cours d\'examen. Nous vous contacterons bientôt.'
        };
    }
  };

  const statusConfig = getStatusConfig(partner.status);
  const formattedDate = new Date(partner.created_at).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const getBusinessTypeLabel = (type: string) => {
    const types: { [key: string]: string } = {
      restaurant: 'Restaurant',
      activity: 'Activité de loisir',
      car_rental: 'Location de voiture',
      travel_agency: 'Agence de voyage',
      accommodation: 'Hébergement',
      other: 'Autre'
    };
    return types[type] || type;
  };

  return (
    <Card className={`${statusConfig.bgColor} ${statusConfig.borderColor} border-2`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Building2 className="h-6 w-6 text-creole-green" />
            </div>
            <div>
              <CardTitle className="text-xl">{partner.business_name}</CardTitle>
              <p className="text-sm text-gray-600">{getBusinessTypeLabel(partner.business_type)}</p>
            </div>
          </div>
          {statusConfig.icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${statusConfig.bgColor} ${statusConfig.textColor} font-medium`}>
            {statusConfig.label}
          </div>

          <p className="text-gray-600">{statusConfig.description}</p>

          <div className="pt-2 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Candidature soumise le {formattedDate}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
