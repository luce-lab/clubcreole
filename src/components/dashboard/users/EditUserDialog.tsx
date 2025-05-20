
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserEditForm } from "./edit/UserEditForm";
import { useUserEdit } from "./edit/useUserEdit";

interface EditUserDialogProps {
  open: boolean;
  onClose: () => void;
  userId: string;
}

export const EditUserDialog = ({ open, onClose, userId }: EditUserDialogProps) => {
  const { userData, isSubmitting, handleChange, handleSubmit } = useUserEdit({ 
    userId, 
    onClose 
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Modifier l'utilisateur</DialogTitle>
          <DialogDescription>
            Modifiez les informations de l'utilisateur ci-dessous.
          </DialogDescription>
        </DialogHeader>
        
        <UserEditForm 
          userData={userData}
          onChange={handleChange}
          isSubmitting={isSubmitting}
        />
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Enregistrement..." : "Enregistrer les modifications"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
