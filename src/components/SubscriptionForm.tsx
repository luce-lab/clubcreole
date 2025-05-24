
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useSubscription } from "@/hooks/useSubscription";
import { useAuth } from "@/contexts/auth";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";

const subscriptionFormSchema = z.object({
  nom: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  prenom: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Veuillez entrer une adresse email valide" }),
  telephone: z.string().min(10, { message: "Veuillez entrer un numéro de téléphone valide" }),
  abonnement: z.enum(["Gratuit", "Passionné", "Expert"], {
    required_error: "Veuillez sélectionner un type d'abonnement",
  })
});

type SubscriptionFormValues = z.infer<typeof subscriptionFormSchema>;

interface SubscriptionFormProps {
  onSuccess?: () => void;
}

export function SubscriptionForm({ onSuccess }: SubscriptionFormProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const { createCheckout } = useSubscription();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<SubscriptionFormValues>({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      email: user?.email || "",
      telephone: "",
      abonnement: "Gratuit"
    }
  });

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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="nom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Votre nom" {...field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="prenom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input placeholder="Votre prénom" {...field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="votre@email.com" {...field} disabled={isSubmitting} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="telephone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Téléphone</FormLabel>
              <FormControl>
                <Input placeholder="Votre numéro de téléphone" {...field} disabled={isSubmitting} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="abonnement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Abonnement</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
                disabled={isSubmitting}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un abonnement" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Gratuit">Gratuit</SelectItem>
                  <SelectItem value="Passionné">Passionné - 15€/2 mois</SelectItem>
                  <SelectItem value="Expert">Expert - 89.99€/mois</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full bg-creole-green hover:bg-creole-green/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Traitement en cours...
            </>
          ) : "S'abonner"}
        </Button>
      </form>
    </Form>
  );
}
