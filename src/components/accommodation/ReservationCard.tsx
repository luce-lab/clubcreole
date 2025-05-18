
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Users } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ReservationCardProps {
  price: number;
  maxGuests: number;
}

export const ReservationCard = ({ price, maxGuests }: ReservationCardProps) => {
  const { toast } = useToast();
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (selectedStartDate && selectedEndDate) {
      const nights = Math.ceil((selectedEndDate.getTime() - selectedStartDate.getTime()) / (1000 * 60 * 60 * 24));
      setTotalPrice(price * nights);
    } else {
      setTotalPrice(0);
    }
  }, [selectedStartDate, selectedEndDate, price]);

  const handleReservation = () => {
    if (!selectedStartDate || !selectedEndDate) {
      toast({
        title: "Information manquante",
        description: "Veuillez sélectionner les dates de séjour",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Réservation confirmée !",
      description: `Votre séjour a été réservé avec succès.`,
    });
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    if (!selectedStartDate) {
      setSelectedStartDate(date);
    } else if (!selectedEndDate && date > selectedStartDate) {
      setSelectedEndDate(date);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    }
  };

  // Fonction pour formater les dates si elles sont sélectionnées
  const getDateDisplay = (date: Date | null) => {
    if (!date) return "";
    return format(date, "dd/MM/yyyy");
  };

  return (
    <div className="sticky top-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{price}€</span>
            <span className="text-sm font-normal text-gray-500">par nuit</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Dates de séjour */}
          <div>
            <h3 className="font-medium mb-2">Sélectionnez vos dates</h3>
            <div className="border rounded-lg p-4">
              <Calendar
                mode="single"
                onSelect={handleDateSelect}
                disabled={(date) => date < new Date()}
                className="w-full"
              />
              <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                <div>
                  {selectedStartDate ? (
                    <span>Arrivée: {getDateDisplay(selectedStartDate)}</span>
                  ) : (
                    <span>Sélectionnez une date d'arrivée</span>
                  )}
                </div>
                <div>
                  {selectedEndDate ? (
                    <span>Départ: {getDateDisplay(selectedEndDate)}</span>
                  ) : (
                    selectedStartDate && <span>Sélectionnez une date de départ</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Nombre de voyageurs */}
          <div>
            <h3 className="font-medium mb-2">Voyageurs</h3>
            <div className="flex items-center border rounded-lg p-3">
              <Users className="h-5 w-5 text-gray-500 mr-2" />
              <select 
                className="flex-grow bg-transparent focus:outline-none"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
              >
                {Array.from({ length: maxGuests }, (_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1} voyageur{i > 0 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Maximum: {maxGuests} voyageurs
            </p>
          </div>

          {/* Récapitulatif du prix */}
          {totalPrice > 0 && (
            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span>{price}€ x {Math.ceil((selectedEndDate!.getTime() - selectedStartDate!.getTime()) / (1000 * 60 * 60 * 24))} nuits</span>
                <span>{totalPrice}€</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Frais de service</span>
                <span>{Math.round(totalPrice * 0.10)}€</span>
              </div>
              <div className="flex justify-between font-bold border-t pt-2 mt-2">
                <span>Total</span>
                <span>{totalPrice + Math.round(totalPrice * 0.10)}€</span>
              </div>
            </div>
          )}

          <Button 
            className="w-full bg-creole-green hover:bg-creole-green/90"
            size="lg"
            onClick={handleReservation}
            disabled={!selectedStartDate || !selectedEndDate}
          >
            Réserver
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
