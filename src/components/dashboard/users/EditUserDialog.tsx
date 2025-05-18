
import { useState, useEffect } from "react";
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
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

interface EditUserDialogProps {
  open: boolean;
  onClose: () => void;
  userId: string;
}

export const EditUserDialog = ({ open, onClose, userId }: EditUserDialogProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Dans un cas réel, ces données seraient chargées depuis une API
  const [userData, setUserData] = useState({
    id: userId,
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    phone: "+596 123 456 789",
    address: "123 Avenue des Cocotiers, Fort-de-France",
    subscriptionType: "premium",
    subscriptionStatus: "active",
    autoRenew: true
  });

  useEffect(() => {
    // Dans une application réelle, on chargerait les données depuis une API ici
    if (open) {
      // Simulated API call
      console.log(`Fetching user data for ID: ${userId}`);
    }
  }, [open, userId]);

  const handleChange = (field: string, value: any) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulation d'un appel API
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      
      toast({
        title: "Utilisateur modifié",
        description: `Les informations de ${userData.name} ont été mises à jour avec succès.`,
      });
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Modifier l'utilisateur</DialogTitle>
          <DialogDescription>
            Modifiez les informations de l'utilisateur ci-dessous.
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
                <SelectValue placeholder="Type d'abonnement" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basique</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="none">Aucun</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Statut
            </Label>
            <Select
              value={userData.subscriptionStatus}
              onValueChange={(value) => handleChange("subscriptionStatus", value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Statut de l'abonnement" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Actif</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="expired">Expiré</SelectItem>
                <SelectItem value="none">Aucun</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="autoRenew" className="text-right">
              Renouvellement auto
            </Label>
            <div className="flex items-center space-x-2 col-span-3">
              <Switch
                id="autoRenew"
                checked={userData.autoRenew}
                onCheckedChange={(checked) => handleChange("autoRenew", checked)}
              />
              <Label htmlFor="autoRenew">
                {userData.autoRenew ? "Activé" : "Désactivé"}
              </Label>
            </div>
          </div>
        </div>
        
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
