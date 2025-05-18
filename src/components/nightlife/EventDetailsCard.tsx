
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Martini, Share, Users, Ticket } from "lucide-react";
import { NightEvent } from "./NightlifeTypes";

interface EventDetailsCardProps {
  event: NightEvent;
  onShare: () => void;
}

const EventDetailsCard = ({ event, onShare }: EventDetailsCardProps) => {
  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-purple-600">À propos de l'événement</h2>
            <Button variant="outline" size="icon" onClick={onShare}>
              <Share className="h-5 w-5" />
            </Button>
          </div>
          
          <p className="text-gray-700 mb-6">{event.description}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{event.date}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Horaire</p>
                <p className="font-medium">{event.time}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <MapPin className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Lieu</p>
                <p className="font-medium">{event.venue}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <Ticket className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Prix</p>
                <p className="font-medium">{event.price}€ par personne</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default EventDetailsCard;
