
import { useState, useEffect } from "react";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/auth";

interface LoisirsInvitationFormProps {
  loisirTitle: string;
  onClose: () => void;
}

const LoisirsInvitationForm = ({ loisirTitle, onClose }: LoisirsInvitationFormProps) => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{name?: string, email?: string}>({});

  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      setName(user.user_metadata?.full_name || user.user_metadata?.name || "");
    }
  }, [user]);

  const validateForm = () => {
    const newErrors: {name?: string, email?: string} = {};
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

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      
      toast({
        title: "Demande enregistrée !",
        description: `Vous serez informé des prochaines dates pour "${loisirTitle}".`,
      });

      // Réinitialiser le formulaire et fermer la boîte de dialogue
      setName("");
      setEmail("");
      onClose();
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de la demande:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
          <div className="col-span-3 space-y-1">
            <Input
              id="invitation-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={errors.name ? "border-red-500" : ""}
              disabled={isSubmitting}
            />
            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="invitation-email" className="text-right">
            Email *
          </Label>
          <div className="col-span-3 space-y-1">
            <Input
              id="invitation-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? "border-red-500" : ""}
              disabled={isSubmitting || !!user}
            />
            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button 
          type="submit" 
          onClick={handleSubmit} 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enregistrement...
            </>
          ) : (
            "Envoyer"
          )}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default LoisirsInvitationForm;
