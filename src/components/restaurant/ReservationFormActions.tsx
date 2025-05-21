
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReservationFormActionsProps {
  step: number;
  prevStep: () => void;
  nextStep: () => void;
  isSubmitting: boolean;
  canContinue: boolean;
  onSubmit: () => void;
}

export const ReservationFormActions = ({
  step,
  prevStep,
  nextStep,
  isSubmitting,
  canContinue,
  onSubmit
}: ReservationFormActionsProps) => {
  return (
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
          className={cn("ml-auto bg-emerald-700 hover:bg-emerald-800", !canContinue ? "opacity-50 cursor-not-allowed" : "")}
          onClick={nextStep}
          disabled={!canContinue}
        >
          {step === 1 && "Continuer"}
          {step === 2 && "Continuer"}
          {step === 3 && "Coordonnées"}
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      ) : (
        <Button 
          type="button" 
          className="ml-auto bg-emerald-700 hover:bg-emerald-800"
          disabled={isSubmitting}
          onClick={onSubmit}
        >
          {isSubmitting ? "Traitement en cours..." : "Confirmer la réservation"}
        </Button>
      )}
    </div>
  );
};
