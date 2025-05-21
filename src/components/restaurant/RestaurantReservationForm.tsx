
import { useRestaurantReservation } from "@/hooks/useRestaurantReservation";
import { ReservationCompactForm } from "./ReservationCompactForm";
import { ReservationDateTimeSelector } from "./ReservationDateTimeSelector";
import { ReservationGuestsSelector } from "./ReservationGuestsSelector";
import { ReservationContactInfo } from "./ReservationContactInfo";
import { ReservationFormHeader } from "./ReservationFormHeader";
import { ReservationFormActions } from "./ReservationFormActions";

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
  const {
    formData,
    updateField,
    isSubmitting,
    step,
    handleSubmit,
    nextStep,
    prevStep
  } = useRestaurantReservation({
    restaurantId,
    restaurantName,
    restaurantLocation,
    onClose
  });

  if (!showForm) {
    return <ReservationCompactForm onShowFullForm={onClose || (() => {})} />;
  }

  // Determine if we can continue to the next step
  const canContinue = step === 1 ? !!formData.date : step === 2 ? !!formData.time : true;

  return (
    <div className="bg-white border rounded-lg shadow-sm">
      <ReservationFormHeader 
        step={step}
        date={formData.date}
        time={formData.time}
        guests={formData.guests}
        restaurantName={restaurantName}
      />
      
      <form onSubmit={handleSubmit}>
        <div className="p-6">
          {step === 1 && (
            <ReservationDateTimeSelector 
              date={formData.date}
              time={formData.time}
              setDate={(date) => updateField('date', date)}
              setTime={(time) => updateField('time', time)}
              step={step}
            />
          )}
          
          {step === 2 && (
            <ReservationDateTimeSelector 
              date={formData.date}
              time={formData.time}
              setDate={(date) => updateField('date', date)}
              setTime={(time) => updateField('time', time)}
              step={step}
            />
          )}
          
          {step === 3 && (
            <ReservationGuestsSelector
              guests={formData.guests}
              setGuests={(guests) => updateField('guests', guests)}
            />
          )}
          
          {step === 4 && (
            <ReservationContactInfo
              name={formData.name}
              email={formData.email}
              phone={formData.phone}
              notes={formData.notes}
              setName={(name) => updateField('name', name)}
              setEmail={(email) => updateField('email', email)}
              setPhone={(phone) => updateField('phone', phone)}
              setNotes={(notes) => updateField('notes', notes)}
            />
          )}
        </div>
        
        <ReservationFormActions 
          step={step} 
          prevStep={prevStep}
          nextStep={nextStep}
          isSubmitting={isSubmitting}
          canContinue={canContinue}
          onSubmit={handleSubmit}
        />
      </form>
    </div>
  );
};
