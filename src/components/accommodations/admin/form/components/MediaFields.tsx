
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface MediaFieldsProps {
  formData: {
    image: string;
    description: string;
  };
  onInputChange: (field: string, value: any) => void;
}

export const MediaFields = ({ formData, onInputChange }: MediaFieldsProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="image">URL de l'image principale *</Label>
        <Input
          id="image"
          type="url"
          value={formData.image}
          onChange={(e) => onInputChange("image", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => onInputChange("description", e.target.value)}
          rows={4}
          required
        />
      </div>
    </>
  );
};
