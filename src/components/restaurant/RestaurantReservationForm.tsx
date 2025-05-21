
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, User, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { fr } from 'date-fns/locale';
import { createRestaurantReservation } from "@/services/restaurantService";
import { ReservationCompactForm } from "./ReservationCompactForm";
import { ReservationDateTimeSelector } from "./ReservationDateTimeSelector";
import { ReservationGuestsSelector } from "./ReservationGuestsSelector";
import { ReservationContactInfo } from "./ReservationContactInfo";
import { cn } from "@/lib/utils";

interface RestaurantReservationFormProps {
  restaurantId: number;
  restaurantName: string;
  restaurantLocation?: string;
  showForm?: boolean;
  onClose?: () => void;
}

export const RestaurantReservationForm = ({ 
  restaurantId, 
  restaurantName,
  restaurantLocation = "", 
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
  const [step, setStep] = useState(1);

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
      // Créer la réservation dans la base de données et envoyer l'email
      await createRestaurantReservation({
        restaurant_id: restaurantId,
        reservation_date: date.toISOString(),
        reservation_time: time,
        guests: parseInt(guests),
        name,
        email,
        phone,
        notes: notes || undefined
      }, restaurantName, restaurantLocation);

      toast({
        title: "Réservation confirmée !",
        description: `Votre table pour ${guests} personne(s) au ${restaurantName} est réservée le ${format(date, 'dd/MM/yyyy')} à ${time}. Un email de confirmation a été envoyé.`,
      });
      
      // Reset form
      setDate(undefined);
      setTime("");
      setGuests("2");
      setName("");
      setEmail("");
      setPhone("");
      setNotes("");
      setStep(1);
      
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

  const nextStep = () => {
    if (step === 1 && !date) {
      toast({
        title: "Date manquante",
        description: "Veuillez sélectionner une date",
        variant: "destructive"
      });
      return;
    }
    
    if (step === 2 && !time) {
      toast({
        title: "Heure manquante", 
        description: "Veuillez sélectionner une heure",
        variant: "destructive"
      });
      return;
    }
    
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  if (!showForm) {
    return <ReservationCompactForm onShowFullForm={onClose || (() => {})} />;
  }

  // Afficher l'étape actuelle dans l'en-tête du formulaire
  const renderStepHeader = () => {
    if (step === 1) {
      return "Réservez votre table";
    } else if (step === 2) {
      return date ? `${format(date, 'dd MMMM', { locale: fr })}` : "Sélectionnez une heure";
    } else if (step === 3) {
      return `${format(date!, 'dd MMMM', { locale: fr })} · ${time}`;
    }
  };

  // Afficher les détails de l'étape actuelle dans le sous-titre
  const renderStepSubtitle = () => {
    if (step === 1) {
      return restaurantName;
    } else if (step === 2) {
      return "Sélectionnez une heure";
    } else if (step === 3) {
      return `${guests} ${parseInt(guests) > 1 ? 'personnes' : 'personne'}`;
    }
  };

  return (
    <div className="bg-white border rounded-lg shadow-sm">
      <div className="p-6 border-b">
        <h3 className="font-semibold text-xl mb-1">{renderStepHeader()}</h3>
        <p className="text-sm text-gray-500">{renderStepSubtitle()}</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="p-6">
          {step === 1 && (
            <ReservationDateTimeSelector 
              date={date}
              time={time}
              setDate={setDate}
              setTime={setTime}
              step={step}
            />
          )}
          
          {step === 2 && (
            <ReservationDateTimeSelector 
              date={date}
              time={time}
              setDate={setDate}
              setTime={setTime}
              step={step}
            />
          )}
          
          {step === 3 && (
            <ReservationGuestsSelector
              guests={guests}
              setGuests={setGuests}
            />
          )}
          
          {step === 4 && (
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
          )}
        </div>
        
        <div className="border-t p-4 flex justify-between">
          {step > 1 && (
            <Button 
              type="button" 
              variant="outline"
              onClick={prevStep}
            >
              Retour
            </Button>
          )}
          
          {step < 4 ? (
            <Button 
              type="button" 
              className={cn("ml-auto bg-emerald-700 hover:bg-emerald-800", step === 1 && !date ? "opacity-50 cursor-not-allowed" : "")}
              onClick={nextStep}
              disabled={step === 1 && !date || step === 2 && !time}
            >
              {step === 1 && "Continuer"}
              {step === 2 && "Continuer"}
              {step === 3 && "Coordonnées"}
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Button 
              type="submit" 
              className="ml-auto bg-emerald-700 hover:bg-emerald-800"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Traitement en cours..."
              ) : (
                <>
                  Confirmer la réservation
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
