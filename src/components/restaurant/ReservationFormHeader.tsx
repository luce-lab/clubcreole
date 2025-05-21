
import { format } from "date-fns";
import { fr } from 'date-fns/locale';

interface ReservationFormHeaderProps {
  step: number;
  date?: Date;
  time?: string;
  guests?: string;
  restaurantName: string;
}

export const ReservationFormHeader = ({
  step,
  date,
  time,
  guests,
  restaurantName
}: ReservationFormHeaderProps) => {
  // Header title based on the current step
  const renderStepHeader = () => {
    if (step === 1) {
      return "Réservez votre table";
    } else if (step === 2) {
      return date ? `${format(date, 'dd MMMM', { locale: fr })}` : "Sélectionnez une heure";
    } else if (step === 3) {
      return `${format(date!, 'dd MMMM', { locale: fr })} · ${time}`;
    } else {
      return "Vos coordonnées";
    }
  };

  // Subtitle based on the current step
  const renderStepSubtitle = () => {
    if (step === 1) {
      return restaurantName;
    } else if (step === 2) {
      return "Sélectionnez une heure";
    } else if (step === 3) {
      return `${guests} ${parseInt(guests || '0') > 1 ? 'personnes' : 'personne'}`;
    } else {
      return "Confirmer vos informations";
    }
  };

  return (
    <div className="p-6 border-b">
      <h3 className="font-semibold text-xl mb-1">{renderStepHeader()}</h3>
      <p className="text-sm text-gray-500">{renderStepSubtitle()}</p>
    </div>
  );
};
