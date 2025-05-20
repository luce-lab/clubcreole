
import { useState } from "react";
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

export interface UserEditData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  subscriptionType: string;
  subscriptionStatus: string;
  autoRenew: boolean;
}

interface UserEditFormProps {
  userData: UserEditData;
  onChange: (field: string, value: any) => void;
  isSubmitting: boolean;
}

export const UserEditForm = ({ userData, onChange, isSubmitting }: UserEditFormProps) => {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Nom complet
        </Label>
        <Input
          id="name"
          value={userData.name}
          onChange={(e) => onChange("name", e.target.value)}
          className="col-span-3"
          disabled={isSubmitting}
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
          onChange={(e) => onChange("email", e.target.value)}
          className="col-span-3"
          disabled={isSubmitting}
        />
      </div>
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="phone" className="text-right">
          Téléphone
        </Label>
        <Input
          id="phone"
          value={userData.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          className="col-span-3"
          disabled={isSubmitting}
        />
      </div>
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="address" className="text-right">
          Adresse
        </Label>
        <Input
          id="address"
          value={userData.address}
          onChange={(e) => onChange("address", e.target.value)}
          className="col-span-3"
          disabled={isSubmitting}
        />
      </div>
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="subscription" className="text-right">
          Abonnement
        </Label>
        <Select
          value={userData.subscriptionType}
          onValueChange={(value) => onChange("subscriptionType", value)}
          disabled={isSubmitting}
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
          onValueChange={(value) => onChange("subscriptionStatus", value)}
          disabled={isSubmitting}
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
            onCheckedChange={(checked) => onChange("autoRenew", checked)}
            disabled={isSubmitting}
          />
          <Label htmlFor="autoRenew">
            {userData.autoRenew ? "Activé" : "Désactivé"}
          </Label>
        </div>
      </div>
    </div>
  );
};
