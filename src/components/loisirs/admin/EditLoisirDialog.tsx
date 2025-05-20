
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loisir } from "@/components/loisirs/types";

interface EditLoisirDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loisir: Loisir;
  onSuccess?: (loisir: Loisir) => void;
}

export const EditLoisirDialog = ({ open, onOpenChange, loisir, onSuccess }: EditLoisirDialogProps) => {
  const { toast } = useToast();
  const [title, setTitle] = useState(loisir.title);
  const [description, setDescription] = useState(loisir.description);
  const [location, setLocation] = useState(loisir.location);
  const [date, setDate] = useState("");
  const [image, setImage] = useState(loisir.image);
  const [maxParticipants, setMaxParticipants] = useState(loisir.max_participants);
  const [currentParticipants, setCurrentParticipants] = useState(loisir.current_participants);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Format date for input when loisir changes
    try {
      const dateObj = new Date(loisir.date);
      const formattedDate = dateObj.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      setDate(formattedDate);
    } catch (error) {
      setDate(loisir.date);
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
    setIsSubmitting(true);

    try {
      const updatedLoisir = {
        title,
        description,
        location,
        date,
        image,
        max_participants: maxParticipants,
        current_participants: currentParticipants,
      };

      const { data, error } = await supabase
        .from('loisirs')
        .update(updatedLoisir)
        .eq('id', loisir.id)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Activité modifiée",
        description: "L'activité de loisir a été mise à jour avec succès",
      });

      if (onSuccess && data) {
        onSuccess(data);
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
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Modifier l'activité</DialogTitle>
            <DialogDescription>
              Modifiez les détails de cette activité de loisir.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-title" className="text-right">
                Titre
              </Label>
              <Input
                id="edit-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-description" className="text-right">
                Description
              </Label>
              <Textarea
                id="edit-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-location" className="text-right">
                Lieu
              </Label>
              <Input
                id="edit-location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-date" className="text-right">
                Date
              </Label>
              <Input
                id="edit-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-image" className="text-right">
                URL Image
              </Label>
              <Input
                id="edit-image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-maxParticipants" className="text-right">
                Participants max
              </Label>
              <Input
                id="edit-maxParticipants"
                type="number"
                min={currentParticipants}
                value={maxParticipants}
                onChange={(e) => setMaxParticipants(parseInt(e.target.value))}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-currentParticipants" className="text-right">
                Inscrits actuels
              </Label>
              <Input
                id="edit-currentParticipants"
                type="number"
                min="0"
                max={maxParticipants}
                value={currentParticipants}
                onChange={(e) => setCurrentParticipants(parseInt(e.target.value))}
                className="col-span-3"
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
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
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
