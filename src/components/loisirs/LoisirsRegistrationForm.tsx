
import { useState } from "react";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Loisir } from "./types";
import { createInscription } from "@/services/inscriptionService";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{name?: string, email?: string, phone?: string}>({});

  const validateForm = () => {
    const newErrors: {name?: string, email?: string, phone?: string} = {};
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = "Le nom est obligatoire";
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = "L'email est obligatoire";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Format d'email invalide";
      isValid = false;
    }

    if (!phone.trim()) {
      newErrors.phone = "Le téléphone est obligatoire";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    console.log("Tentative d'inscription pour:", selectedLoisir.id, name, email, phone);

    try {
      const result = await createInscription(
        selectedLoisir.id,
        name,
        email,
        phone
      );

      console.log("Résultat de l'inscription:", result);

      if (result.success) {
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
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      console.error("Erreur lors de l'inscription:", error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur s'est produite lors de l'inscription. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
          <div className="col-span-3 space-y-1">
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={errors.name ? "border-red-500" : ""}
              required
              disabled={isSubmitting}
            />
            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email *
          </Label>
          <div className="col-span-3 space-y-1">
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? "border-red-500" : ""}
              required
              disabled={isSubmitting}
            />
            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="phone" className="text-right">
            Téléphone *
          </Label>
          <div className="col-span-3 space-y-1">
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={errors.phone ? "border-red-500" : ""}
              required
              disabled={isSubmitting}
            />
            {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button 
          type="submit" 
          onClick={handleRegister}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Inscription en cours...
            </>
          ) : (
            "Confirmer l'inscription"
          )}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default LoisirsRegistrationForm;
