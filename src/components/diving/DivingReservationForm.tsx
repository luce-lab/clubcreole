
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { createDivingReservation } from "@/services/divingService";
import { Calendar, Clock } from "lucide-react";

const formSchema = z.object({
  reservationDate: z.string().min(1, { message: "La date est requise" }),
  reservationTime: z.string().min(1, { message: "L'heure est requise" }),
  participantName: z.string().min(2, { message: "Le nom est requis" }),
  participantEmail: z.string().email({ message: "Email invalide" }),
  participantPhone: z.string().min(10, { message: "Numéro de téléphone invalide" }),
  experienceLevel: z.string().min(1, { message: "Le niveau d'expérience est requis" }),
  specialRequests: z.string().optional()
});

interface DivingReservationFormProps {
  onReservationSuccess?: () => void;
}

const DivingReservationForm = ({ onReservationSuccess }: DivingReservationFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reservationDate: "",
      reservationTime: "",
      participantName: "",
      participantEmail: "",
      participantPhone: "",
      experienceLevel: "",
      specialRequests: ""
    }
  });

  const availableTimes = ["09:00", "11:00", "14:00", "16:00"];

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    try {
      await createDivingReservation({
        reservation_date: values.reservationDate,
        reservation_time: values.reservationTime,
        participant_name: values.participantName,
        participant_email: values.participantEmail,
        participant_phone: values.participantPhone,
        experience_level: values.experienceLevel,
        special_requests: values.specialRequests
      });

      toast({
        title: "Réservation confirmée !",
        description: `Votre plongée est réservée pour le ${new Date(values.reservationDate).toLocaleDateString()} à ${values.reservationTime}`,
      });

      form.reset();
      onReservationSuccess?.();
    } catch (error) {
      console.error("Erreur lors de la réservation:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la réservation. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardContent className="pt-6">
        <h2 className="text-xl font-bold mb-4">Réserver une plongée</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="reservationDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de plongée</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input type="date" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reservationTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Heure de plongée</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-gray-400" />
                            <SelectValue placeholder="Sélectionner une heure" />
                          </div>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableTimes.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="participantName"
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
                name="participantEmail"
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="participantPhone"
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

              <FormField
                control={form.control}
                name="experienceLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Niveau d'expérience</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner votre niveau" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beginner">Débutant</SelectItem>
                        <SelectItem value="intermediate">Intermédiaire</SelectItem>
                        <SelectItem value="advanced">Avancé</SelectItem>
                        <SelectItem value="professional">Professionnel</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="specialRequests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Demandes spéciales (optionnel)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Allergies, besoins particuliers, etc." 
                      className="resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Informations importantes</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Équipement fourni (masque, tuba, palmes, combinaison)</li>
                <li>• Moniteur certifié inclus</li>
                <li>• Durée : 2 heures (briefing + plongée)</li>
                <li>• Niveau débutant accepté</li>
                <li>• Prix : 75€ / personne</li>
              </ul>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-creole-green hover:bg-creole-green/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Réservation en cours..." : "Confirmer la réservation"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default DivingReservationForm;
