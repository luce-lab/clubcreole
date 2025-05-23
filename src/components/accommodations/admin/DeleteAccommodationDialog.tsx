
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Accommodation } from "@/components/accommodation/AccommodationTypes";
import { deleteAccommodation } from "@/services/accommodationService";
import { useToast } from "@/components/ui/use-toast";

interface DeleteAccommodationDialogProps {
  accommodation: Accommodation | null;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export const DeleteAccommodationDialog = ({
  accommodation,
  onOpenChange,
  onSuccess,
}: DeleteAccommodationDialogProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    if (!accommodation) return;

    setIsDeleting(true);
    try {
      await deleteAccommodation(accommodation.id);
      toast({
        title: "Hébergement supprimé",
        description: "L'hébergement a été supprimé avec succès",
      });
      onSuccess();
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'hébergement",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={!!accommodation} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
          <AlertDialogDescription>
            Êtes-vous sûr de vouloir supprimer l'hébergement "{accommodation?.name}" ?
            Cette action est irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700"
          >
            {isDeleting ? "Suppression..." : "Supprimer"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
