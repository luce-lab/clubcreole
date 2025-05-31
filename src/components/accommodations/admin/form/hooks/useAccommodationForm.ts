
import { useState } from "react";
import { Accommodation } from "@/components/accommodation/AccommodationTypes";
import { createAccommodation, updateAccommodation } from "@/services/accommodationService";
import { useToast } from "@/components/ui/use-toast";

interface UseAccommodationFormProps {
  accommodation?: Accommodation;
  onSuccess: () => void;
}

export const useAccommodationForm = ({ accommodation, onSuccess }: UseAccommodationFormProps) => {
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

  return {
    formData,
    isSubmitting,
    handleSubmit,
    handleInputChange,
    handleDiscountChange,
  };
};
