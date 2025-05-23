
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
import { updateLoisir } from "@/services/loisirs";

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

      const updatedData = {
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

      console.log("Données à envoyer à l'API:", updatedData);

      try {
        console.log("Appel à updateLoisir avec:", loisir.id, updatedData);
        const result = await updateLoisir(loisir.id, updatedData);
        
        console.log("Résultat brut de updateLoisir:", result);
        
        // Vérifier explicitement que nous avons un résultat valide
        if (!result || typeof result !== 'object' || !('id' in result)) {
          console.error("Résultat invalide de la mise à jour:", result);
          throw new Error("Données de mise à jour invalides");
        }
        
        console.log("Résultat de la mise à jour (EditLoisirDialog):", result);

        toast({
          title: "Activité modifiée",
          description: "L'activité de loisir a été mise à jour avec succès",
        });

        if (onSuccess && typeof onSuccess === 'function') {
          try {
            console.log("Appel de onSuccess avec:", result);
            onSuccess(result);
          } catch (callbackError) {
            console.error("Erreur lors de la callback onSuccess:", callbackError);
          }
        } else {
          console.log("Pas de callback onSuccess ou pas une fonction");
        }

        onOpenChange(false);
      } catch (apiError) {
        console.error("Erreur renvoyée par updateLoisir:", apiError);
        toast({
          variant: "destructive",
          title: "Erreur API",
          description: apiError instanceof Error 
            ? `Erreur: ${apiError.message}` 
            : "Une erreur est survenue lors de l'appel à l'API",
        });
      }
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
