
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loisir } from "@/components/loisirs/types";
import { CreateLoisirForm } from "./form/CreateLoisirForm";

interface CreateLoisirDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (loisir: Loisir) => void;
}

export const CreateLoisirDialog = ({ open, onOpenChange, onSuccess }: CreateLoisirDialogProps) => {
  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Créer une nouvelle activité</DialogTitle>
          <DialogDescription>
            Ajoutez une nouvelle activité de loisir à la liste des activités disponibles.
          </DialogDescription>
        </DialogHeader>
        
        <CreateLoisirForm 
          onSuccess={onSuccess} 
          onCancel={handleCancel} 
        />
      </DialogContent>
    </Dialog>
  );
};
