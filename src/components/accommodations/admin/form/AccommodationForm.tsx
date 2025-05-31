
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accommodation } from "@/components/accommodation/AccommodationTypes";
import { createAccommodation, updateAccommodation } from "@/services/accommodationService";
import { useToast } from "@/components/ui/use-toast";

interface AccommodationFormProps {
  accommodation?: Accommodation;
  onSuccess: () => void;
  onCancel: () => void;
}

export const AccommodationForm = ({ accommodation, onSuccess, onCancel }: AccommodationFormProps) => {
  const [formData, setFormData] = useState({
    name: accommodation?.name || "",
    type: accommodation?.type || "",
    location: accommodation?.location || "",
    description: accommodation?.description || "",
    price: accommodation?.price || 0,
    rating: accommodation?.rating || 5,
    image: accommodation?.image || "",
    max_guests: accommodation?.max_guests || 2,
    rooms: accommodation?.rooms || 1,
    bathrooms: accommodation?.bathrooms || 1,
    gallery_images: accommodation?.gallery_images || [],
    features: accommodation?.features || [],
    amenities: accommodation?.amenities || [],
    rules: accommodation?.rules || [],
    discount: accommodation?.discount || undefined,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log("=== SOUMISSION FORMULAIRE ===");
    console.log("Mode:", accommodation ? "modification" : "création");
    console.log("Données du formulaire:", formData);

    try {
      // Nettoyer les données avant l'envoi
      const cleanedData = {
        ...formData,
        // Gestion spéciale pour discount
        discount: formData.discount === undefined || formData.discount === null ? undefined : Number(formData.discount)
      };

      console.log("Données nettoyées:", cleanedData);

      if (accommodation) {
        console.log("Mise à jour de l'hébergement ID:", accommodation.id);
        await updateAccommodation(accommodation.id, cleanedData);
        toast({
          title: "Hébergement modifié",
          description: "L'hébergement a été modifié avec succès",
        });
      } else {
        console.log("Création d'un nouvel hébergement");
        await createAccommodation(cleanedData);
        toast({
          title: "Hébergement créé",
          description: "L'hébergement a été créé avec succès",
        });
      }
      onSuccess();
    } catch (error) {
      console.error("❌ Erreur lors de la sauvegarde:", error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder l'hébergement",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    console.log(`Changement champ ${field}:`, value);
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDiscountChange = (value: string) => {
    console.log("Changement discount:", value);
    // Convertir en nombre ou undefined si vide
    const numValue = value === "" ? undefined : parseInt(value);
    setFormData(prev => ({ ...prev, discount: numValue }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Nom de l'hébergement *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Type d'hébergement *</Label>
          <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
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
            onChange={(e) => handleInputChange("location", e.target.value)}
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
            onChange={(e) => handleInputChange("price", parseFloat(e.target.value) || 0)}
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
            onChange={(e) => handleDiscountChange(e.target.value)}
            placeholder="Ex: 20 pour 20% de réduction"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="max_guests">Nombre de personnes max *</Label>
          <Input
            id="max_guests"
            type="number"
            min="1"
            value={formData.max_guests}
            onChange={(e) => handleInputChange("max_guests", parseInt(e.target.value) || 1)}
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
            onChange={(e) => handleInputChange("rooms", parseInt(e.target.value) || 1)}
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
            onChange={(e) => handleInputChange("bathrooms", parseInt(e.target.value) || 1)}
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
            onChange={(e) => handleInputChange("rating", parseFloat(e.target.value) || 5)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">URL de l'image principale *</Label>
        <Input
          id="image"
          type="url"
          value={formData.image}
          onChange={(e) => handleInputChange("image", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          rows={4}
          required
        />
      </div>

      <div className="flex gap-4 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Annuler
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting 
            ? (accommodation ? "Modification..." : "Création...") 
            : (accommodation ? "Modifier" : "Créer")
          }
        </Button>
      </div>
    </form>
  );
};
