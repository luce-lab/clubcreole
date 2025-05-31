
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BasicInfoFieldsProps {
  formData: {
    name: string;
    type: string;
    location: string;
    price: number;
    discount?: number;
  };
  onInputChange: (field: string, value: any) => void;
  onDiscountChange: (value: string) => void;
}

export const BasicInfoFields = ({ formData, onInputChange, onDiscountChange }: BasicInfoFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="name">Nom de l'hébergement *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => onInputChange("name", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Type d'hébergement *</Label>
        <Select value={formData.type} onValueChange={(value) => onInputChange("type", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez le type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Villa">Villa</SelectItem>
            <SelectItem value="Hôtel">Hôtel</SelectItem>
            <SelectItem value="Bungalow">Bungalow</SelectItem>
            <SelectItem value="Appartement">Appartement</SelectItem>
            <SelectItem value="Gîte">Gîte</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Localisation *</Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => onInputChange("location", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Prix par nuit (€) *</Label>
        <Input
          id="price"
          type="number"
          min="0"
          step="0.01"
          value={formData.price}
          onChange={(e) => onInputChange("price", parseFloat(e.target.value) || 0)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="discount">Réduction (%) - Actuel: {formData.discount || "Aucune"}</Label>
        <Input
          id="discount"
          type="number"
          min="0"
          max="100"
          value={formData.discount || ""}
          onChange={(e) => onDiscountChange(e.target.value)}
          placeholder="Ex: 20 pour 20% de réduction"
        />
      </div>
    </div>
  );
};
