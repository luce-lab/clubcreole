
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { createRestaurantReservation } from "@/services/restaurantService";

export interface ReservationFormData {
  date: Date | undefined;
  time: string;
  guests: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

interface UseRestaurantReservationProps {
  restaurantId: number;
  restaurantName: string;
  restaurantLocation?: string;
  onClose?: () => void;
}

export const useRestaurantReservation = ({
  restaurantId, 
  restaurantName,
  restaurantLocation = "",
  onClose
}: UseRestaurantReservationProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ReservationFormData>({
    date: undefined,
    time: "",
    guests: "2",
    name: "",
    email: "",
    phone: "",
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const updateField = <K extends keyof ReservationFormData>(key: K, value: ReservationFormData[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    if (!formData.date || !formData.time || !formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Formulaire incomplet",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await createRestaurantReservation({
        restaurant_id: restaurantId,
        reservation_date: formData.date.toISOString(),
        reservation_time: formData.time,
        guests: parseInt(formData.guests),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        notes: formData.notes || undefined
      }, restaurantName, restaurantLocation);

      toast({
        title: "Réservation confirmée !",
        description: `Votre table pour ${formData.guests} personne(s) au ${restaurantName} est réservée le ${format(formData.date, 'dd/MM/yyyy')} à ${formData.time}. Un email de confirmation a été envoyé.`,
      });
      
      // Reset form
      setFormData({
        date: undefined,
        time: "",
        guests: "2",
        name: "",
        email: "",
        phone: "",
        notes: ""
      });
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
    if (step === 1 && !formData.date) {
      toast({
        title: "Date manquante",
        description: "Veuillez sélectionner une date",
        variant: "destructive"
      });
      return;
    }
    
    if (step === 2 && !formData.time) {
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

  return {
    formData,
    updateField,
    isSubmitting,
    step,
    handleSubmit,
    nextStep,
    prevStep
  };
};
