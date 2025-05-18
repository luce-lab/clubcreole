
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const PastEventAlert = () => {
  return (
    <Alert className="bg-amber-50 border-amber-200 mb-6">
      <AlertCircle className="h-4 w-4 text-amber-500" />
      <AlertTitle className="text-amber-800">Événement passé</AlertTitle>
      <AlertDescription className="text-amber-700">
        Cet événement est passé. Inscrivez-vous pour être notifié des prochaines dates.
      </AlertDescription>
    </Alert>
  );
};

export default PastEventAlert;
