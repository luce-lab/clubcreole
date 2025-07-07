
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const newsletterSchema = z.object({
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide",
  }),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

interface NewsletterProps {
  onSuccess?: () => void;
  variant?: string; // Added variant prop
}

export function Newsletter({ onSuccess, variant }: NewsletterProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: NewsletterFormValues) {
    setIsSubmitting(true);

    try {
      // Save email to Supabase
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ email: values.email }]);

      if (error) {
        if (error.code === '23505') {
          // Unique constraint violation - email already exists
          toast({
            title: "Déjà inscrit",
            description: "Cette adresse email est déjà inscrite à notre newsletter.",
            variant: "default",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Inscription réussie !",
          description: "Merci de vous être inscrit à notre newsletter.",
        });
      }

      form.reset();
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur s'est produite lors de votre inscription. Veuillez réessayer.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={variant === "footer" ? "p-0" : "p-4"}>
      <h2 className="text-2xl font-bold text-creole-green mb-4">
        Abonnez-vous à notre newsletter
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Recevez nos dernières offres et actualités directement dans votre boîte mail.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex w-full max-w-md items-center space-x-2">
                    <Input
                      type="email"
                      placeholder="votre@email.com"
                      {...field}
                      disabled={isSubmitting}
                      className="flex-1 text-black" 
                    />
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="bg-creole-green hover:bg-creole-green/90"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Envoi...
                        </>
                      ) : (
                        "S'abonner"
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
