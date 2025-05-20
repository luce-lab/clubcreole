
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Loisir } from "@/components/loisirs/types";
import { FormField } from "./FormField";

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
      currentParticipants
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <FormField
          id="edit-title"
          label="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <FormField
          id="edit-description"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          isTextarea
        />

        <FormField
          id="edit-location"
          label="Lieu"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <FormField
          id="edit-startDate"
          label="Date de début"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />

        <FormField
          id="edit-endDate"
          label="Date de fin"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />

        <FormField
          id="edit-image"
          label="URL Image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />

        <FormField
          id="edit-maxParticipants"
          label="Participants max"
          type="number"
          min={currentParticipants}
          value={maxParticipants}
          onChange={(e) => setMaxParticipants(parseInt(e.target.value))}
          required
        />

        <FormField
          id="edit-currentParticipants"
          label="Inscrits actuels"
          type="number"
          min="0"
          max={maxParticipants}
          value={currentParticipants}
          onChange={(e) => setCurrentParticipants(parseInt(e.target.value))}
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
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Mise à jour...
            </>
          ) : (
            "Enregistrer les modifications"
          )}
        </Button>
      </div>
    </form>
  );
};
