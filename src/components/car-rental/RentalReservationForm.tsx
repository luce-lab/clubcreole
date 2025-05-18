
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { CarModel } from "./CarRentalTypes";

interface RentalReservationFormProps {
  rentalName: string;
  selectedModel: string | null;
  models?: CarModel[];
}

// Form schema for reservation
const formSchema = z.object({
  startDate: z.string().min(1, { message: "La date de début est requise" }),
  endDate: z.string().min(1, { message: "La date de fin est requise" }),
  driverName: z.string().min(2, { message: "Le nom est requis" }),
  driverEmail: z.string().email({ message: "Email invalide" }),
  driverPhone: z.string().min(10, { message: "Numéro de téléphone invalide" })
});

const RentalReservationForm = ({ rentalName, selectedModel, models }: RentalReservationFormProps) => {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate: "",
      endDate: "",
      driverName: "",
      driverEmail: "",
      driverPhone: ""
    }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!selectedModel) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un modèle de voiture",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Réservation confirmée !",
      description: `Votre réservation pour ${rentalName} (${selectedModel}) a été enregistrée.`,
    });
  };

  return (
    <Card className="sticky top-4">
      <CardContent className="pt-6">
        <h2 className="text-xl font-bold mb-4">Réserver maintenant</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de début</FormLabel>
                  <FormControl>
                    <div className="flex">
                      <Calendar className="mr-2 h-4 w-4 opacity-50" />
                      <Input type="date" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de fin</FormLabel>
                  <FormControl>
                    <div className="flex">
                      <Calendar className="mr-2 h-4 w-4 opacity-50" />
                      <Input type="date" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="border-t border-b py-4 my-4">
              <h3 className="font-semibold mb-2">Informations du conducteur</h3>
              <FormField
                control={form.control}
                name="driverName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom complet</FormLabel>
                    <FormControl>
                      <Input placeholder="Jean Dupont" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="driverEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="jean.dupont@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="driverPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Téléphone</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+33 6 12 34 56 78" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="p-4 bg-gray-50 rounded-lg mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Modèle sélectionné</span>
                <span className="font-semibold">{selectedModel || "Aucun"}</span>
              </div>
              {selectedModel && (
                <div className="flex justify-between mt-2 pt-2 border-t">
                  <span className="font-bold">Total estimé</span>
                  <span className="font-bold text-creole-green">
                    {models?.find(m => m.name === selectedModel)?.pricePerDay}€ / jour
                  </span>
                </div>
              )}
            </div>

            <Button type="submit" className="w-full bg-creole-green hover:bg-creole-green/90">
              Confirmer la réservation
            </Button>

            <p className="text-xs text-gray-500 text-center mt-2">
              En réservant, vous acceptez nos conditions générales et notre politique de confidentialité.
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RentalReservationForm;
