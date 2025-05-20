
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AddUserDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AddUserDialog = ({ open, onClose, onSuccess }: AddUserDialogProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userData, setUserData] = useState({
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
      console.log("Création d'utilisateur avec:", userData.email);
      
      // Créer l'utilisateur dans Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name,
          }
        }
      });
      
      if (authError) {
        throw authError;
      }
      
      if (!authData.user) {
        throw new Error("Échec de création de l'utilisateur");
      }
      
      console.log("Utilisateur créé avec succès:", authData.user);
      
      // Mettre à jour le profil avec les informations supplémentaires
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          first_name: userData.name,
          phone: userData.phone,
        })
        .eq('id', authData.user.id);
      
      if (profileError) {
        console.warn("Erreur lors de la mise à jour du profil:", profileError);
      }
      
      // Si l'utilisateur a une adresse, créer une entrée dans la table clients
      if (userData.address) {
        const { error: clientError } = await supabase
          .from('clients')
          .insert({
            id: authData.user.id,
            address: userData.address,
            phone: userData.phone,
          });
        
        if (clientError) {
          console.warn("Erreur lors de la création du client:", clientError);
        }
      }
      
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
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nom complet
            </Label>
            <Input
              id="name"
              value={userData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={userData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Mot de passe
            </Label>
            <Input
              id="password"
              type="password"
              value={userData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Téléphone
            </Label>
            <Input
              id="phone"
              value={userData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Adresse
            </Label>
            <Input
              id="address"
              value={userData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="subscription" className="text-right">
              Abonnement
            </Label>
            <Select
              value={userData.subscriptionType}
              onValueChange={(value) => handleChange("subscriptionType", value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Sélectionner un type d'abonnement" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basique</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="none">Aucun</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
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
