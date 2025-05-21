
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Loisir } from "@/components/loisirs/types";
import { FormField } from "./FormField";

interface CreateLoisirFormProps {
  onSuccess?: (loisir: Loisir) => void;
  onCancel: () => void;
}

export const CreateLoisirForm = ({ onSuccess, onCancel }: CreateLoisirFormProps) => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [image, setImage] = useState("https://source.unsplash.com/random/300x200/?activity");
  const [galleryImages, setGalleryImages] = useState("");
  const [maxParticipants, setMaxParticipants] = useState(10);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that end date is not before start date
    if (new Date(endDate) < new Date(startDate)) {
      toast({
        variant: "destructive",
        title: "Erreur de date",
        description: "La date de fin ne peut pas être antérieure à la date de début",
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Process gallery images from text to array
      const galleryImagesArray = galleryImages
        ? galleryImages.split('\n').filter(url => url.trim() !== '')
        : [];

      const newLoisir = {
        title,
        description,
        location,
        start_date: startDate,
        end_date: endDate,
        image,
        gallery_images: galleryImagesArray,
        max_participants: maxParticipants,
        current_participants: 0,
      };

      const { data, error } = await supabase
        .from('loisirs')
        .insert(newLoisir)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Activité ajoutée",
        description: "L'activité de loisir a été ajoutée avec succès",
      });

      if (onSuccess && data) {
        // Conversion du champ gallery_images de Json à string[]
        const formattedLoisir = {
          ...data,
          gallery_images: Array.isArray(data.gallery_images) 
            ? data.gallery_images 
            : []
        } as Loisir;
        
        onSuccess(formattedLoisir);
      }

      // Reset all form fields
      setTitle("");
      setDescription("");
      setLocation("");
      setStartDate("");
      setEndDate("");
      setImage("https://source.unsplash.com/random/300x200/?activity");
      setGalleryImages("");
      setMaxParticipants(10);
      
      // Close dialog by calling onCancel
      onCancel();
    } catch (error) {
      console.error("Erreur lors de la création de l'activité:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la création de l'activité",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <FormField
          id="title"
          label="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <FormField
          id="description"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          isTextarea
        />

        <FormField
          id="location"
          label="Lieu"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <FormField
          id="startDate"
          label="Date de début"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />

        <FormField
          id="endDate"
          label="Date de fin"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />

        <FormField
          id="image"
          label="URL Image principale"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />

        <FormField
          id="galleryImages"
          label="URLs des images de la galerie (une URL par ligne)"
          value={galleryImages}
          onChange={(e) => setGalleryImages(e.target.value)}
          isTextarea
          placeholder="https://exemple.com/image1.jpg&#10;https://exemple.com/image2.jpg&#10;https://exemple.com/image3.jpg"
        />

        <FormField
          id="maxParticipants"
          label="Participants max"
          type="number"
          min="1"
          value={maxParticipants}
          onChange={(e) => setMaxParticipants(parseInt(e.target.value))}
          required
        />
      </div>

      <div className="flex justify-end space-x-2 mt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Création en cours...
            </>
          ) : (
            "Créer l'activité"
          )}
        </Button>
      </div>
    </form>
  );
};
