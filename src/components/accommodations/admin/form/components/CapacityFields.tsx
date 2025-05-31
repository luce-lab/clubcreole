
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CapacityFieldsProps {
  formData: {
    max_guests: number;
    rooms: number;
    bathrooms: number;
    rating: number;
  };
  onInputChange: (field: string, value: any) => void;
}

export const CapacityFields = ({ formData, onInputChange }: CapacityFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="max_guests">Nombre de personnes max *</Label>
        <Input
          id="max_guests"
          type="number"
          min="1"
          value={formData.max_guests}
          onChange={(e) => onInputChange("max_guests", parseInt(e.target.value) || 1)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="rooms">Nombre de chambres *</Label>
        <Input
          id="rooms"
          type="number"
          min="1"
          value={formData.rooms}
          onChange={(e) => onInputChange("rooms", parseInt(e.target.value) || 1)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bathrooms">Nombre de salles de bain *</Label>
        <Input
          id="bathrooms"
          type="number"
          min="1"
          value={formData.bathrooms}
          onChange={(e) => onInputChange("bathrooms", parseInt(e.target.value) || 1)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="rating">Note (1-5) *</Label>
        <Input
          id="rating"
          type="number"
          min="1"
          max="5"
          step="0.1"
          value={formData.rating}
          onChange={(e) => onInputChange("rating", parseFloat(e.target.value) || 5)}
          required
        />
      </div>
    </div>
  );
};
