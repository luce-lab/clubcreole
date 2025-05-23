
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AccommodationForm } from "./form/AccommodationForm";
import { Accommodation } from "@/components/accommodation/AccommodationTypes";

interface EditAccommodationDialogProps {
  accommodation: Accommodation | null;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export const EditAccommodationDialog = ({
  accommodation,
  onOpenChange,
  onSuccess,
}: EditAccommodationDialogProps) => {
  return (
    <Dialog open={!!accommodation} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifier l'hébergement</DialogTitle>
        </DialogHeader>
        {accommodation && (
          <AccommodationForm
            accommodation={accommodation}
            onSuccess={onSuccess}
            onCancel={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
