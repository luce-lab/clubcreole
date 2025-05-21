
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loisir } from "@/components/loisirs/types";
import { BasicLoisirInfo } from "./components/BasicLoisirInfo";
import { LoisirDates } from "./components/LoisirDates";
import { ParticipantsInfo } from "./components/ParticipantsInfo";
import { FormActions } from "./components/FormActions";

interface LoisirFormProps {
  loisir: Loisir;
  isSubmitting: boolean;
  onSubmit: (formData: {
    title: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
    image: string;
    maxParticipants: number;
    currentParticipants: number;
    galleryImages?: string;
  }) => Promise<void>;
  onCancel: () => void;
}

export const LoisirForm = ({ loisir, isSubmitting, onSubmit, onCancel }: LoisirFormProps) => {
  const { toast } = useToast();
  const [title, setTitle] = useState(loisir.title);
  const [description, setDescription] = useState(loisir.description);
  const [location, setLocation] = useState(loisir.location);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [image, setImage] = useState(loisir.image);
  const [galleryImages, setGalleryImages] = useState("");
  const [maxParticipants, setMaxParticipants] = useState(loisir.max_participants);
  const [currentParticipants, setCurrentParticipants] = useState(loisir.current_participants);

  useEffect(() => {
    // Format dates for input when loisir changes
    try {
      // Handle start date
      const startDateObj = new Date(loisir.start_date);
      const formattedStartDate = startDateObj.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      setStartDate(formattedStartDate);
      
      // Handle end date
      const endDateObj = new Date(loisir.end_date);
      const formattedEndDate = endDateObj.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      setEndDate(formattedEndDate);
    } catch (error) {
      // Fallback if date parsing fails
      setStartDate(loisir.start_date);
      setEndDate(loisir.end_date);
    }

    // Convertir le tableau d'images en texte avec une URL par ligne
    if (loisir.gallery_images && Array.isArray(loisir.gallery_images)) {
      setGalleryImages(loisir.gallery_images.join('\n'));
    }

    setTitle(loisir.title);
    setDescription(loisir.description);
    setLocation(loisir.location);
    setImage(loisir.image);
    setMaxParticipants(loisir.max_participants);
    setCurrentParticipants(loisir.current_participants);
  }, [loisir]);

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
    
    await onSubmit({
      title,
      description,
      location,
      startDate,
      endDate,
      image,
      maxParticipants,
      currentParticipants,
      galleryImages
    });
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
        submitLabel="Enregistrer les modifications"
        loadingLabel="Mise à jour..."
      />
    </form>
  );
};
