
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Loisir } from "@/components/loisirs/types";
import { BasicLoisirInfo } from "./components/BasicLoisirInfo";
import { LoisirDates } from "./components/LoisirDates";
import { ParticipantsInfo } from "./components/ParticipantsInfo";
import { FormActions } from "./components/FormActions";

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
  const [currentParticipants, setCurrentParticipants] = useState(0);
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
        <BasicLoisirInfo
          title={title}
          description={description}
          location={location}
          image={image}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
          onLocationChange={setLocation}
          onImageChange={setImage}
        />

        <LoisirDates
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />

        <ParticipantsInfo
          maxParticipants={maxParticipants}
          currentParticipants={currentParticipants}
          galleryImages={galleryImages}
          onMaxParticipantsChange={setMaxParticipants}
          onCurrentParticipantsChange={setCurrentParticipants}
          onGalleryImagesChange={setGalleryImages}
        />
      </div>

      <FormActions
        isSubmitting={isSubmitting}
        onCancel={onCancel}
        submitLabel="Créer l'activité"
        loadingLabel="Création en cours..."
      />
    </form>
  );
};
