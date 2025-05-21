
import { useState } from "react";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

interface LoisirsInvitationFormProps {
  loisirTitle: string;
  onClose: () => void;
}

const LoisirsInvitationForm = ({ loisirTitle, onClose }: LoisirsInvitationFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (!name || !email) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    // Simuler l'envoi d'une notification
    console.log("Envoi d'une notification à:", { name, email, loisirTitle });

    toast({
      title: "Demande enregistrée !",
      description: "Vous serez informé des prochaines dates pour cette activité.",
    });

    // Réinitialiser le formulaire et fermer la boîte de dialogue
    setName("");
    setEmail("");
    onClose();
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>M'informer des prochaines dates</DialogTitle>
        <DialogDescription>
          Laissez-nous vos coordonnées pour être informé quand l'activité "{loisirTitle}" sera à nouveau disponible.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="invitation-name" className="text-right">
            Nom *
          </Label>
          <Input
            id="invitation-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="invitation-email" className="text-right">
            Email *
          </Label>
          <Input
            id="invitation-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" onClick={handleSubmit}>
          Envoyer
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default LoisirsInvitationForm;
