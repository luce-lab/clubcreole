
import { Shield, AlertTriangle } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";

export const UnauthorizedState = () => {
  return (
    <Card className="border-yellow-300 bg-yellow-50">
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <Shield className="mr-2 h-5 w-5 text-yellow-600" />
          <CardTitle className="text-yellow-800">Accès restreint</CardTitle>
        </div>
        <CardDescription className="text-yellow-700">
          La gestion des utilisateurs est réservée à l'administrateur principal
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-start space-x-4">
          <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
          <div className="space-y-2">
            <p>Seul le compte administrateur principal (admin@clubcreole.com) est autorisé à gérer les utilisateurs.</p>
            <p className="text-sm">Si vous avez besoin d'apporter des modifications aux utilisateurs, veuillez contacter l'administrateur principal.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
