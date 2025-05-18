
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { NightEvent } from "./NightlifeTypes";

interface ReservationDialogProps {
  event: NightEvent;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ReservationDialog = ({ event, isOpen, onOpenChange }: ReservationDialogProps) => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [ticketCount, setTicketCount] = useState(1);

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
      description: `Vous avez réservé ${ticketCount} place${ticketCount > 1 ? 's' : ''} pour ${event.name}`,
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Réservation - {event.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Date</h3>
            <Calendar
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
              <span>{event.price}€</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Nombre de places</span>
              <span>{ticketCount}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{event.price * ticketCount}€</span>
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
  );
};

export default ReservationDialog;
