
import { useState } from "react";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Loisir {
  id: number;
  title: string;
  current_participants: number;
}

interface LoisirsRegistrationFormProps {
  selectedLoisir: Loisir;
  onSuccess: (updatedLoisir: Loisir) => void;
  onClose: () => void;
}

const LoisirsRegistrationForm = ({ 
  selectedLoisir, 
  onSuccess, 
  onClose 
}: LoisirsRegistrationFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !phone) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('loisirs')
        .update({ current_participants: selectedLoisir.current_participants + 1 })
        .eq('id', selectedLoisir.id);
      
      if (error) throw error;
      
      toast({
        title: "Inscription réussie !",
        description: `Vous êtes inscrit à "${selectedLoisir.title}". Un email de confirmation a été envoyé à ${email}.`,
      });
      
      onSuccess({
        ...selectedLoisir,
        current_participants: selectedLoisir.current_participants + 1
      });
      
      setName("");
      setEmail("");
      setPhone("");
      onClose();
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'inscription. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Inscription à {selectedLoisir.title}</DialogTitle>
        <DialogDescription>
          Remplissez le formulaire ci-dessous pour vous inscrire à cette activité.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Nom *
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email *
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="phone" className="text-right">
            Téléphone *
          </Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="col-span-3"
            required
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" onClick={handleRegister}>
          Confirmer l'inscription
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default LoisirsRegistrationForm;
