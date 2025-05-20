
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CheckCircle2, Clock, MapPin, Users, Film, Martini, Map, Calendar } from "lucide-react";
import LoisirsRegistrationForm from "./LoisirsRegistrationForm";

interface Loisir {
  id: number;
  title: string;
  description: string;
  location: string;
  start_date: string;
  end_date: string;
  max_participants: number;
  current_participants: number;
  image: string;
}

interface ActivityCardProps {
  loisir: Loisir;
  onUpdateLoisir: (updatedLoisir: Loisir) => void;
}

const ActivityCard = ({ loisir, onUpdateLoisir }: ActivityCardProps) => {
  const [openDialog, setOpenDialog] = useState(false);

  const getActivityIcon = (title: string) => {
    if (title.includes("boite")) return <Martini className="h-4 w-4 text-creole-blue" />;
    if (title.includes("cinéma")) return <Film className="h-4 w-4 text-creole-blue" />;
    if (title.includes("Balade") || title.includes("Randonnée") || title.includes("forêt")) return <Map className="h-4 w-4 text-creole-blue" />;
    return <CheckCircle2 className="h-4 w-4 text-creole-blue" />;
  };

  // Format dates for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      });
    } catch (e) {
      return dateString;
    }
  };

  // Check if the dates are different
  const hasDifferentDates = loisir.start_date !== loisir.end_date;

  return (
    <Card key={loisir.id} className="overflow-hidden flex flex-col h-full">
      <div className="h-48 overflow-hidden">
        <img 
          src={loisir.image} 
          alt={loisir.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          {getActivityIcon(loisir.title)}
          <CardTitle>{loisir.title}</CardTitle>
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
              {hasDifferentDates 
                ? `Du ${formatDate(loisir.start_date)} au ${formatDate(loisir.end_date)}`
                : `Le ${formatDate(loisir.start_date)}`
              }
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-creole-blue" />
            <span className="text-sm">{loisir.current_participants}/{loisir.max_participants} participants</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button 
              className="w-full bg-creole-green hover:bg-creole-green/90"
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
      </CardFooter>
    </Card>
  );
};

export default ActivityCard;
