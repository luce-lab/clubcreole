
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Martini, MapPin, Calendar, Clock } from "lucide-react";
import { NightEvent } from "./NightlifeTypes";

interface EventSideCardProps {
  event: NightEvent;
  isEventPassed: boolean;
  onOpenReservationDialog: () => void;
  onOpenInvitationDialog: () => void;
}

const EventSideCard = ({ 
  event, 
  isEventPassed,
  onOpenReservationDialog,
  onOpenInvitationDialog
}: EventSideCardProps) => {
  return (
    <Card className="sticky top-4">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">{isEventPassed ? "Prochaines dates" : "Réserver"}</h2>
          <div className="flex items-center">
            <Star className="fill-yellow-500 h-5 w-5" />
            <span className="ml-1 font-semibold">{event.rating}</span>
          </div>
        </div>
        
        {isEventPassed ? (
          <>
            <p className="text-gray-700 mb-4">
              Cet événement est passé, mais vous pouvez recevoir une invitation pour les prochaines dates.
            </p>
            <Button 
              className="w-full bg-purple-600 hover:bg-purple-700 mb-4"
              onClick={onOpenInvitationDialog}
            >
              Recevoir une invitation
            </Button>
          </>
        ) : (
          <>
            <Button 
              className="w-full bg-purple-600 hover:bg-purple-700 mb-4"
              onClick={onOpenReservationDialog}
            >
              Réserver maintenant
            </Button>
          </>
        )}

        <div className="p-4 bg-purple-50 rounded-lg border border-purple-100 mb-4">
          <p className="text-purple-700 text-sm font-medium">Avantage Club Créole</p>
          <p className="text-gray-700 text-sm">{event.offer}</p>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center">
            <Martini className="h-5 w-5 text-gray-500 mr-3" />
            <span className="text-gray-700">{event.type}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-gray-500 mr-3" />
            <span className="text-gray-700">{event.venue}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-gray-500 mr-3" />
            <span className="text-gray-700">{event.date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-gray-500 mr-3" />
            <span className="text-gray-700">{event.time}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventSideCard;
