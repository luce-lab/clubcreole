
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";

// Schéma de validation pour le formulaire d'invitation
const invitationFormSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Veuillez entrer un email valide" })
});

type InvitationFormValues = z.infer<typeof invitationFormSchema>;

interface InvitationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const InvitationDialog = ({ isOpen, onOpenChange }: InvitationDialogProps) => {
  const { toast } = useToast();

  const form = useForm<InvitationFormValues>({
    resolver: zodResolver(invitationFormSchema),
    defaultValues: {
      name: "",
      email: ""
    }
  });

  const handleInvitationSubmit = (data: InvitationFormValues) => {
    toast({
      title: "Demande d'invitation envoyée !",
      description: `Merci ${data.name}, vous recevrez une invitation pour les prochaines dates à ${data.email}`,
    });
    
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Recevoir une invitation</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleInvitationSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre nom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Votre email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit"
              className="w-full mt-4 bg-purple-600 hover:bg-purple-700" 
            >
              S'inscrire
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default InvitationDialog;
