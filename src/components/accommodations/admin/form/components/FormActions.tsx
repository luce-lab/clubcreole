
import { Button } from "@/components/ui/button";
import { Accommodation } from "@/components/accommodation/AccommodationTypes";

interface FormActionsProps {
  accommodation?: Accommodation;
  isSubmitting: boolean;
  onCancel: () => void;
}

export const FormActions = ({ accommodation, isSubmitting, onCancel }: FormActionsProps) => {
  return (
    <div className="flex gap-4 pt-4">
      <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
        Annuler
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting 
          ? (accommodation ? "Modification..." : "Création...") 
          : (accommodation ? "Modifier" : "Créer")
        }
      </Button>
    </div>
  );
};
