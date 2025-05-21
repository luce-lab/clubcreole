
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface FormActionsProps {
  isSubmitting: boolean;
  onCancel: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  loadingLabel?: string;
}

export const FormActions = ({
  isSubmitting,
  onCancel,
  submitLabel = "Enregistrer",
  cancelLabel = "Annuler",
  loadingLabel = "Chargement...",
}: FormActionsProps) => {
  return (
    <div className="flex justify-end space-x-2 mt-4">
      <Button type="button" variant="outline" onClick={onCancel}>
        {cancelLabel}
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {loadingLabel}
          </>
        ) : (
          submitLabel
        )}
      </Button>
    </div>
  );
};
