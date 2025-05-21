
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { format } from "date-fns";
import { createRestaurantReservation } from "@/services/restaurantService";
import { ReservationCompactForm } from "./ReservationCompactForm";
import { ReservationDateTimeSelector } from "./ReservationDateTimeSelector";
import { ReservationGuestsSelector } from "./ReservationGuestsSelector";
import { ReservationContactInfo } from "./ReservationContactInfo";

interface RestaurantReservationFormProps {
  restaurantId: number;
  restaurantName: string;
  showForm?: boolean;
  onClose?: () => void;
}

export const RestaurantReservationForm = ({ 
  restaurantId, 
  restaurantName, 
  showForm = true,
  onClose 
}: RestaurantReservationFormProps) => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("2");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !time || !name || !email || !phone) {
      toast({
        title: "Formulaire incomplet",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Créer la réservation dans la base de données
      await createRestaurantReservation({
        restaurant_id: restaurantId,
        reservation_date: date.toISOString(),
        reservation_time: time,
        guests: parseInt(guests),
        name,
        email,
        phone,
        notes: notes || undefined
      });

      toast({
        title: "Réservation confirmée !",
        description: `Votre table pour ${guests} personne(s) au ${restaurantName} est réservée le ${format(date, 'dd/MM/yyyy')} à ${time}.`,
      });
      
      // Reset form
      setDate(undefined);
      setTime("");
      setGuests("2");
      setName("");
      setEmail("");
      setPhone("");
      setNotes("");
      
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Erreur lors de la création de la réservation:", error);
      toast({
        title: "Erreur",
        description: "Un problème est survenu lors de la réservation. Veuillez réessayer plus tard.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!showForm) {
    return <ReservationCompactForm onShowFullForm={onClose || (() => {})} />;
  }

  return (
    <div className="bg-white border rounded-lg p-6 shadow-sm">
      <h3 className="font-semibold text-lg mb-4">Réservez votre table</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <ReservationDateTimeSelector 
          date={date}
          time={time}
          setDate={setDate}
          setTime={setTime}
        />
        
        <ReservationGuestsSelector
          guests={guests}
          setGuests={setGuests}
        />
        
        <ReservationContactInfo
          name={name}
          email={email}
          phone={phone}
          notes={notes}
          setName={setName}
          setEmail={setEmail}
          setPhone={setPhone}
          setNotes={setNotes}
        />
        
        <div className="pt-2">
          <Button 
            type="submit" 
            className="w-full bg-creole-green hover:bg-creole-green/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Traitement en cours..."
            ) : (
              <>
                <Clock className="mr-2 h-4 w-4" />
                Confirmer la réservation
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
