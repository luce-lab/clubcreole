
import { useState } from "react";
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
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { createInscription } from "@/services/inscriptionService"; 

interface AddParticipantDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loisirId: number;
  onSuccess: (participant: { name: string; email: string; phone: string; loisir_id: number }) => void;
  remainingSpots: number;
}

export const AddParticipantDialog = ({
  open,
  onOpenChange,
  loisirId,
  onSuccess,
  remainingSpots,
}: AddParticipantDialogProps) => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (remainingSpots <= 0) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Cette activité est déjà complète",
      });
      return;
    }

    if (!name || !email || !phone) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createInscription(loisirId, name, email, phone);
      
      if (result.success) {
        toast({
          title: "Succès",
          description: "Le participant a été ajouté avec succès",
        });
        
        resetForm();
        onSuccess({
          name,
          email,
          phone,
          loisir_id: loisirId,
        });
        
        onOpenChange(false);
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      console.error("Erreur lors de l'ajout du participant:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout du participant",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) resetForm();
      onOpenChange(isOpen);
    }}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Ajouter un participant</DialogTitle>
            <DialogDescription>
              {remainingSpots > 0 
                ? `Il reste ${remainingSpots} place(s) disponible(s) pour cette activité.` 
                : "Cette activité est complète."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="participant-name" className="text-right">
                Nom
              </Label>
              <Input
                id="participant-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                required
                disabled={remainingSpots <= 0 || isSubmitting}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="participant-email" className="text-right">
                Email
              </Label>
              <Input
                id="participant-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
                required
                disabled={remainingSpots <= 0 || isSubmitting}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="participant-phone" className="text-right">
                Téléphone
              </Label>
              <Input
                id="participant-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="col-span-3"
                required
                disabled={remainingSpots <= 0 || isSubmitting}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Annuler
            </Button>
            <Button type="submit" disabled={remainingSpots <= 0 || isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Ajout en cours...
                </>
              ) : (
                "Ajouter le participant"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
