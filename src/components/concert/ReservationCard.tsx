
import { useState } from "react";
import { Star, Music, MapPin, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";
import { Concert } from "./ConcertTypes";
import { Ticket } from "lucide-react";

interface ReservationCardProps {
  concert: Concert;
}

const ReservationCard: React.FC<ReservationCardProps> = ({ concert }) => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [ticketCount, setTicketCount] = useState(1);
  const [isReservationDialogOpen, setIsReservationDialogOpen] = useState(false);

  const handleBooking = () => {
    if (!selectedDate) {
      toast({
        title: "Sélectionnez une date",
        description: "Veuillez choisir une date pour continuer",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Réservation confirmée !",
      description: `Vous avez réservé ${ticketCount} place${ticketCount > 1 ? 's' : ''} pour ${concert.name}`,
    });
    
    setIsReservationDialogOpen(false);
  };

  return (
    <Card className="sticky top-4">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Réserver</h2>
          <div className="flex items-center">
            <Star className="fill-yellow-500 h-5 w-5" />
            <span className="ml-1 font-semibold">{concert.rating}</span>
          </div>
        </div>
        
        <Dialog open={isReservationDialogOpen} onOpenChange={setIsReservationDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 mb-4">
              Réserver maintenant
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Réservation - {concert.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Date</h3>
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border w-full"
                  disabled={(date) => {
                    const now = new Date();
                    now.setHours(0, 0, 0, 0);
                    return date < now;
                  }}
                />
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Nombre de places</h3>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={ticketCount <= 1}
                    onClick={() => setTicketCount(prev => Math.max(1, prev - 1))}
                  >
                    -
                  </Button>
                  <span className="flex-1 text-center">{ticketCount}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={ticketCount >= 10}
                    onClick={() => setTicketCount(prev => Math.min(10, prev + 1))}
                  >
                    +
                  </Button>
                </div>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Prix unitaire</span>
                  <span>{concert.price}€</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Nombre de places</span>
                  <span>{ticketCount}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{concert.price * ticketCount}€</span>
                </div>
                
                <Button 
                  className="w-full mt-4 bg-purple-600 hover:bg-purple-700" 
                  onClick={handleBooking}
                >
                  Confirmer la réservation
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <div className="p-4 bg-purple-50 rounded-lg border border-purple-100 mb-4">
          <p className="text-purple-700 text-sm font-medium">Avantage Club Créole</p>
          <p className="text-gray-700 text-sm">{concert.offer}</p>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center">
            <Music className="h-5 w-5 text-gray-500 mr-3" />
            <span className="text-gray-700">{concert.genre}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-gray-500 mr-3" />
            <span className="text-gray-700">{concert.location}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-gray-500 mr-3" />
            <span className="text-gray-700">{concert.date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-gray-500 mr-3" />
            <span className="text-gray-700">{concert.time}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReservationCard;
