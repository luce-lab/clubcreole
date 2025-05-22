
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Loisir } from "@/components/loisirs/types";
import { LoisirForm } from "./form/LoisirForm";
import { updateLoisir } from "@/services/loisirService";

interface EditLoisirDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loisir: Loisir;
  onSuccess?: (loisir: Loisir) => void;
}

export const EditLoisirDialog = ({ open, onOpenChange, loisir, onSuccess }: EditLoisirDialogProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: {
    title: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
    image: string;
    maxParticipants: number;
    currentParticipants: number;
    galleryImages?: string;
  }) => {
    setIsSubmitting(true);

    try {
      console.log("Formulaire soumis avec:", formData);
      
      // Conversion des URLs des images de la galerie en tableau
      const galleryImages = formData.galleryImages
        ? formData.galleryImages.split('\n').map(url => url.trim()).filter(Boolean)
        : [];

      const updatedLoisir = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        start_date: formData.startDate,
        end_date: formData.endDate,
        image: formData.image,
        max_participants: formData.maxParticipants,
        current_participants: formData.currentParticipants,
        gallery_images: galleryImages
      };

      console.log("Données à envoyer:", updatedLoisir);

      const result = await updateLoisir(loisir.id, updatedLoisir);
      console.log("Résultat de la mise à jour:", result);

      toast({
        title: "Activité modifiée",
        description: "L'activité de loisir a été mise à jour avec succès",
      });

      if (onSuccess) {
        onSuccess(result);
      }

      onOpenChange(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'activité:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour de l'activité",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Modifier l'activité</DialogTitle>
          <DialogDescription>
            Modifiez les détails de cette activité de loisir.
          </DialogDescription>
        </DialogHeader>
        
        <LoisirForm
          loisir={loisir}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
