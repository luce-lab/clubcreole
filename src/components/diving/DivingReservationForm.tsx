import { useState, useEffect } from "react";
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
import { LeisureActivitiesService } from "@/services/loisirs/leisureActivitiesService";
import { Calendar, Clock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { ActivityTimeSlot } from "@/components/loisirs/types";

const formSchema = z.object({
  reservationDate: z.string().min(1, { message: "La date est requise" }),
  reservationTime: z.string().min(1, { message: "L'heure est requise" }),
  numberOfParticipants: z.number().min(1, { message: "Au moins un participant requis" }),
  participantNames: z.array(z.string().min(2, { message: "Le nom est requis" })),
  participantLevels: z.array(z.string().min(1, { message: "Le niveau est requis" })),
  contactEmail: z.string().email({ message: "Email invalide" }),
  contactPhone: z.string().min(10, { message: "Numéro de téléphone invalide" }),
  specialRequests: z.string().optional()
});

interface DivingReservationFormProps {
  activityId: number;
  onReservationSuccess?: () => void;
}

const DivingReservationForm = ({ activityId, onReservationSuccess }: DivingReservationFormProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeSlots, setTimeSlots] = useState<ActivityTimeSlot[]>([]);
  const [numberOfParticipants, setNumberOfParticipants] = useState(1);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reservationDate: "",
      reservationTime: "",
      numberOfParticipants: 1,
      participantNames: [""],
      participantLevels: [""],
      contactEmail: "",
      contactPhone: "",
      specialRequests: ""
    }
  });

  useEffect(() => {
    const loadTimeSlots = async () => {
      try {
        const slots = await LeisureActivitiesService.getActivityTimeSlots(activityId);
        setTimeSlots(slots);
      } catch (error) {
        console.error('Erreur lors du chargement des créneaux:', error);
      }
    };

    loadTimeSlots();
  }, [activityId]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour faire une réservation",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Récupérer les détails de l'activité pour le prix
      const activity = await LeisureActivitiesService.getActivityById(activityId);
      if (!activity) throw new Error('Activité non trouvée');

      await LeisureActivitiesService.createReservation({
        activity_id: activityId,
        user_id: user.id,
        reservation_date: values.reservationDate,
        time_slot: values.reservationTime,
        number_of_participants: values.numberOfParticipants,
        total_price: activity.price_per_person * values.numberOfParticipants,
        participant_names: values.participantNames.slice(0, values.numberOfParticipants),
        participant_levels: values.participantLevels.slice(0, values.numberOfParticipants),
        contact_email: values.contactEmail,
        contact_phone: values.contactPhone,
        special_requests: values.specialRequests,
        status: 'pending'
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

  // Mettre à jour le nombre de participants
  const updateParticipantsCount = (count: number) => {
    setNumberOfParticipants(count);
    form.setValue('numberOfParticipants', count);
    
    // Ajuster les tableaux de noms et niveaux
    const currentNames = form.getValues('participantNames');
    const currentLevels = form.getValues('participantLevels');
    
    const newNames = Array(count).fill('').map((_, i) => currentNames[i] || '');
    const newLevels = Array(count).fill('').map((_, i) => currentLevels[i] || '');
    
    form.setValue('participantNames', newNames);
    form.setValue('participantLevels', newLevels);
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
                        <Input 
                          type="date" 
                          className="pl-10" 
                          min={new Date().toISOString().split('T')[0]}
                          {...field} 
                        />
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
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot.id} value={slot.time_slot}>
                            {slot.time_slot.substring(0, 5)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormLabel>Nombre de participants</FormLabel>
              <Select onValueChange={(value) => updateParticipantsCount(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le nombre de participants" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} participant{num > 1 ? 's' : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Informations des participants */}
            {Array.from({ length: numberOfParticipants }, (_, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-3">Participant {index + 1}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`participantNames.${index}` as `participantNames.${number}`}
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
                    name={`participantLevels.${index}` as `participantLevels.${number}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Niveau d'expérience</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner le niveau" />
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
              </div>
            ))}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email de contact</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="jean.dupont@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Téléphone de contact</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+33 6 12 34 56 78" {...field} />
                    </FormControl>
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
