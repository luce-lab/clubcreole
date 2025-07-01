import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AlertCircle } from "lucide-react";
import { isBefore } from "date-fns";
import LoisirsRegistrationForm from "./LoisirsRegistrationForm";
import { Loisir } from "./types";
import LoisirsInvitationForm from "./LoisirsInvitationForm";
import { parseDate } from "@/services/loisirs";
import { useAuth } from "@/contexts/auth";

interface LoisirsRegistrationBlockProps {
  loisir: Loisir;
  onUpdateLoisir: (updatedLoisir: Loisir) => void;
}

const LoisirsRegistrationBlock = ({ loisir, onUpdateLoisir }: LoisirsRegistrationBlockProps) => {
  const [openRegistration, setOpenRegistration] = useState(false);
  const [openInvitation, setOpenInvitation] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const startDate = parseDate(loisir.start_date);
  const endDate = parseDate(loisir.end_date);
  const now = new Date();
  
  const areDatesValid = startDate !== null && endDate !== null;
  const isPast = endDate ? isBefore(endDate, now) : false;
  const isFull = loisir.current_participants >= loisir.max_participants;
  const shouldShowInvitation = isPast || !areDatesValid;

  const handleRegistrationClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      setOpenRegistration(true);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {shouldShowInvitation 
            ? "Cette activité n'est pas disponible actuellement" 
            : "Participer à cette activité"
          }
        </CardTitle>
        <CardDescription>
          {!areDatesValid && (
            "Les dates de cette activité ne sont pas encore confirmées. Inscrivez-vous pour être notifié."
          )}
          {areDatesValid && isPast && (
            "Cette activité est terminée. Vous pouvez vous inscrire pour être notifié des prochaines dates."
          )}
          {areDatesValid && !isPast && (
            "Réservez votre place pour cette activité passionnante."
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {areDatesValid && !isPast && (
          <div className="space-y-4">
            <p className="text-sm">
              <span className="font-semibold">Places restantes:</span>{" "}
              {Math.max(0, loisir.max_participants - loisir.current_participants)} sur {loisir.max_participants}
            </p>
            
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-creole-green h-2.5 rounded-full" 
                style={{ 
                  width: `${Math.min(100, (loisir.current_participants / loisir.max_participants) * 100)}%` 
                }}
              ></div>
            </div>
          </div>
        )}
        
        {!areDatesValid && (
          <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
            <span className="text-sm text-yellow-700">
              Les dates pour cette activité ne sont pas encore confirmées.
            </span>
          </div>
        )}
        
        {isPast && (
          <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-md">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            <span className="text-sm text-amber-700">
              Cette activité est terminée.
            </span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {shouldShowInvitation ? (
          <Dialog open={openInvitation} onOpenChange={setOpenInvitation}>
            <DialogTrigger asChild>
              <Button className="w-full">
                <AlertCircle className="mr-2 h-4 w-4" />
                M'informer des prochaines dates
              </Button>
            </DialogTrigger>
            <LoisirsInvitationForm 
              loisirTitle={loisir.title}
              onClose={() => setOpenInvitation(false)}
            />
          </Dialog>
        ) : (
          <>
            <Button 
              className="w-full"
              disabled={isFull}
              onClick={handleRegistrationClick}
            >
              {isFull ? "Complet" : "S'inscrire maintenant"}
            </Button>
            <Dialog open={openRegistration} onOpenChange={setOpenRegistration}>
              <LoisirsRegistrationForm 
                selectedLoisir={loisir}
                onSuccess={onUpdateLoisir}
                onClose={() => setOpenRegistration(false)}
              />
            </Dialog>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default LoisirsRegistrationBlock;
