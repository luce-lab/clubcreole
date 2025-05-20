
import { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { UserForm, UserFormData } from "./UserForm";
import { createUser } from "./userUtils";

interface AddUserDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AddUserDialog = ({ open, onClose, onSuccess }: AddUserDialogProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userData, setUserData] = useState<UserFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    subscriptionType: ""
  });

  const handleChange = (field: string, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!userData.email || !userData.password) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "L'email et le mot de passe sont requis.",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await createUser(userData);
      
      toast({
        title: "Utilisateur créé",
        description: `L'utilisateur ${userData.name || userData.email} a été créé avec succès.`,
      });
      
      // Reset form
      setUserData({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        subscriptionType: ""
      });
      
      if (onSuccess) {
        onSuccess();
      }
      
      onClose();
    } catch (error: any) {
      console.error("Erreur lors de la création de l'utilisateur:", error);
      
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Une erreur s'est produite lors de la création de l'utilisateur.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Ajouter un nouvel utilisateur</DialogTitle>
          <DialogDescription>
            Remplissez les informations ci-dessous pour créer un nouvel utilisateur.
          </DialogDescription>
        </DialogHeader>
        
        <UserForm 
          userData={userData}
          onChange={handleChange}
          isSubmitting={isSubmitting}
        />
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Création en cours..." : "Créer l'utilisateur"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
