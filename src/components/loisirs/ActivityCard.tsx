
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CheckCircle2, MapPin, Users, Film, Martini, Map, Calendar, ArrowRight, AlertCircle } from "lucide-react";
import LoisirsRegistrationForm from "./LoisirsRegistrationForm";
import { Loisir } from "./types";
import { isActivityPast, isDateValid, formatDisplayDate } from "@/services/loisirService";
import LoisirsInvitationForm from "./LoisirsInvitationForm";

interface ActivityCardProps {
  loisir: Loisir;
  onUpdateLoisir: (updatedLoisir: Loisir) => void;
}

const ActivityCard = ({ loisir, onUpdateLoisir }: ActivityCardProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openInvitationDialog, setOpenInvitationDialog] = useState(false);
  const navigate = useNavigate();

  const getActivityIcon = (title: string) => {
    if (title.includes("boite")) return <Martini className="h-4 w-4 text-creole-blue" />;
    if (title.includes("cinéma")) return <Film className="h-4 w-4 text-creole-blue" />;
    if (title.includes("Balade") || title.includes("Randonnée") || title.includes("forêt")) return <Map className="h-4 w-4 text-creole-blue" />;
    return <CheckCircle2 className="h-4 w-4 text-creole-blue" />;
  };

  // Check if the dates are valid
  const isStartDateValid = isDateValid(loisir.start_date);
  const isEndDateValid = isDateValid(loisir.end_date);
  const areDatesValid = isStartDateValid && isEndDateValid;
  
  // Vérifier si l'activité est passée
  const isPastActivity = isActivityPast(loisir.end_date);

  // Check if the dates are different
  const hasDifferentDates = loisir.start_date !== loisir.end_date;
  
  // Fix: Only consider an activity invalid if the activity is in the past
  const isActivityInvalid = isPastActivity;
  
  // Remplacer l'image pour "Sortie en boite - La Creolita"
  const getImageForActivity = (loisir: Loisir) => {
    if (loisir.title.includes("Sortie en boite") && loisir.title.includes("La Creolita")) {
      return "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80";
    }
    return loisir.image;
  };

  const handleViewDetails = () => {
    navigate(`/loisirs/${loisir.id}`);
  };

  return (
    <Card key={loisir.id} className="overflow-hidden flex flex-col h-full">
      <div className="h-48 overflow-hidden cursor-pointer" onClick={handleViewDetails}>
        <img 
          src={getImageForActivity(loisir)} 
          alt={loisir.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          {getActivityIcon(loisir.title)}
          <CardTitle className="cursor-pointer hover:text-creole-green" onClick={handleViewDetails}>
            {loisir.title}
          </CardTitle>
        </div>
        <CardDescription>{loisir.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-creole-blue" />
            <span className="text-sm">{loisir.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-creole-blue" />
            <span className="text-sm">
              {areDatesValid ? (
                hasDifferentDates 
                  ? `Du ${formatDisplayDate(loisir.start_date)} au ${formatDisplayDate(loisir.end_date)}`
                  : `Le ${formatDisplayDate(loisir.start_date)}`
              ) : (
                <>
                  {hasDifferentDates 
                    ? `Du ${loisir.start_date} au ${loisir.end_date}`
                    : `Le ${loisir.start_date}`
                  }
                 
                </>
              )}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-creole-blue" />
            <span className="text-sm">{loisir.current_participants}/{loisir.max_participants} participants</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        {isPastActivity ? (
          <Dialog open={openInvitationDialog} onOpenChange={setOpenInvitationDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex-1">
                <AlertCircle className="mr-1 h-4 w-4" /> M'informer des prochaines dates
              </Button>
            </DialogTrigger>
            <LoisirsInvitationForm 
              loisirTitle={loisir.title}
              onClose={() => setOpenInvitationDialog(false)}
            />
          </Dialog>
        ) : (
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="flex-1"
                disabled={loisir.current_participants >= loisir.max_participants}
              >
                {loisir.current_participants >= loisir.max_participants ? 'Complet' : "S'inscrire"}
              </Button>
            </DialogTrigger>
            <LoisirsRegistrationForm 
              selectedLoisir={loisir}
              onSuccess={onUpdateLoisir}
              onClose={() => setOpenDialog(false)}
            />
          </Dialog>
        )}
        <Button 
          className="bg-creole-green hover:bg-creole-green/90" 
          onClick={handleViewDetails}
        >
          Détails <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ActivityCard;
