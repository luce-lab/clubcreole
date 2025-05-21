
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Clock } from "lucide-react";
import { format, isAfter, isBefore, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import LoisirsRegistrationForm from "./LoisirsRegistrationForm";
import { Loisir } from "./types";
import LoisirsInvitationForm from "./LoisirsInvitationForm";

interface LoisirsRegistrationBlockProps {
  loisir: Loisir;
  onUpdateLoisir: (updatedLoisir: Loisir) => void;
}

const LoisirsRegistrationBlock = ({ loisir, onUpdateLoisir }: LoisirsRegistrationBlockProps) => {
  const [openRegistration, setOpenRegistration] = useState(false);
  const [openInvitation, setOpenInvitation] = useState(false);

  // Vérifier si l'activité est terminée
  const now = new Date();
  const endDate = parseISO(loisir.end_date);
  const isPast = isBefore(endDate, now);

  // Vérifier si l'activité est complète
  const isFull = loisir.current_participants >= loisir.max_participants;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isPast ? "Cette activité est terminée" : "Participer à cette activité"}
        </CardTitle>
        <CardDescription>
          {isPast 
            ? "Vous pouvez vous inscrire pour être notifié des prochaines dates"
            : "Réservez votre place pour cette activité passionnante"
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isPast && (
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
      </CardContent>
      <CardFooter>
        {isPast ? (
          <Dialog open={openInvitation} onOpenChange={setOpenInvitation}>
            <DialogTrigger asChild>
              <Button className="w-full">
                M'informer des prochaines dates
              </Button>
            </DialogTrigger>
            <LoisirsInvitationForm 
              loisirTitle={loisir.title}
              onClose={() => setOpenInvitation(false)}
            />
          </Dialog>
        ) : (
          <Dialog open={openRegistration} onOpenChange={setOpenRegistration}>
            <DialogTrigger asChild>
              <Button 
                className="w-full"
                disabled={isFull}
              >
                {isFull ? "Complet" : "S'inscrire maintenant"}
              </Button>
            </DialogTrigger>
            <LoisirsRegistrationForm 
              selectedLoisir={loisir}
              onSuccess={onUpdateLoisir}
              onClose={() => setOpenRegistration(false)}
            />
          </Dialog>
        )}
      </CardFooter>
    </Card>
  );
};

export default LoisirsRegistrationBlock;
