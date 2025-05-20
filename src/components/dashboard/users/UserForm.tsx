
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

export interface UserFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  subscriptionType: string;
}

interface UserFormProps {
  userData: UserFormData;
  onChange: (field: string, value: string) => void;
  isSubmitting: boolean;
}

export const UserForm = ({ userData, onChange, isSubmitting }: UserFormProps) => {
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
          required
          disabled={isSubmitting}
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
          onChange={(e) => onChange("password", e.target.value)}
          className="col-span-3"
          required
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
  );
};
