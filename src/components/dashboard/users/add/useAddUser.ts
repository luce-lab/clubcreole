
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { UserFormData } from "../UserForm";
import { createUser } from "../userUtils";

interface UseAddUserProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export const useAddUser = ({ onClose, onSuccess }: UseAddUserProps) => {
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

  return {
    userData,
    isSubmitting,
    handleChange,
    handleSubmit
  };
};
