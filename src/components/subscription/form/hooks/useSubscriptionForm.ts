
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { useSubscription } from "@/hooks/useSubscription";
import { useAuth } from "@/contexts/auth";
import { subscriptionFormSchema, SubscriptionFormValues } from "../types";

export function useSubscriptionForm(onSuccess?: () => void) {
  const { toast } = useToast();
  const { user } = useAuth();
  const { createCheckout } = useSubscription();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SubscriptionFormValues>({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: {
      nom: user?.last_name || "",
      prenom: user?.first_name || "",
      email: user?.email || "",
      telephone: user?.phone || "",
      abonnement: "Gratuit"
    }
  });

  // Réinitialiser le formulaire quand les données utilisateur changent
  useEffect(() => {
    if (user) {
      form.reset({
        nom: user.last_name || "",
        prenom: user.first_name || "",
        email: user.email || "",
        telephone: user.phone || "",
        abonnement: form.getValues("abonnement")
      });
    }
  }, [user, form]);

  async function onSubmit(values: SubscriptionFormValues) {
    setIsSubmitting(true);
    
    try {
      if (!user) {
        toast({
          title: "Connexion requise",
          description: "Vous devez être connecté pour vous abonner",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Pour l'abonnement gratuit, pas besoin de Stripe
      if (values.abonnement === "Gratuit") {
        toast({
          title: "Inscription réussie !",
          description: "Vous êtes maintenant inscrit au plan gratuit.",
        });
        form.reset();
        if (onSuccess) onSuccess();
        setIsSubmitting(false);
        return;
      }

      // Pour les autres abonnements, rediriger vers Stripe
      const priceType = values.abonnement === "Passionné" ? "passionnе" : "expert";
      await createCheckout(priceType);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur s'est produite lors de votre inscription. Veuillez réessayer."
      });
      console.error("Erreur d'inscription:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    form,
    onSubmit,
    isSubmitting
  };
}
