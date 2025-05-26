
import { z } from "zod";

export const subscriptionFormSchema = z.object({
  nom: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  prenom: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Veuillez entrer une adresse email valide" }),
  telephone: z.string().min(10, { message: "Veuillez entrer un numéro de téléphone valide" }),
  abonnement: z.enum(["Gratuit", "Passionné", "Expert"], {
    required_error: "Veuillez sélectionner un type d'abonnement",
  })
});

export type SubscriptionFormValues = z.infer<typeof subscriptionFormSchema>;

export interface SubscriptionFormProps {
  onSuccess?: () => void;
}
