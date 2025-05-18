
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Martini, 
  Users, 
  Star, 
  Share, 
  AlertCircle,
  Ticket
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { nightEvents } from "./NightlifeActivity";

// Schéma de validation pour le formulaire d'invitation
const invitationFormSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Veuillez entrer un email valide" })
});

type InvitationFormValues = z.infer<typeof invitationFormSchema>;

const NightlifeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [event, setEvent] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [ticketCount, setTicketCount] = useState(1);
  const [isReservationDialogOpen, setIsReservationDialogOpen] = useState(false);
  const [isInvitationDialogOpen, setIsInvitationDialogOpen] = useState(false);
  const [isEventPassed, setIsEventPassed] = useState(false);

  // Formulaire d'invitation
  const invitationForm = useForm<InvitationFormValues>({
    resolver: zodResolver(invitationFormSchema),
    defaultValues: {
      name: "",
      email: ""
    }
  });

  useEffect(() => {
    // Trouver l'événement correspondant à l'ID dans l'URL
    const foundEvent = nightEvents.find(e => e.id === parseInt(id || "0"));
    if (foundEvent) {
      setEvent(foundEvent);
      
      // Vérifier si l'événement est passé (pour cet exemple, on vérifie si la date contient "Mercredis" ou "Jeudis")
      // Dans une application réelle, vous compareriez avec la date actuelle
      const isPassed = foundEvent.date.includes("Mercredis") || foundEvent.date.includes("Jeudis");
      setIsEventPassed(isPassed);

    } else {
      navigate("/soiree");
    }
  }, [id, navigate]);

  const handleBooking = () => {
    if (!selectedDate) {
      toast({
        title: "Sélectionnez une date",
        description: "Veuillez choisir une date pour continuer",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Réservation confirmée !",
      description: `Vous avez réservé ${ticketCount} place${ticketCount > 1 ? 's' : ''} pour ${event.name}`,
    });
    
    setIsReservationDialogOpen(false);
  };

  const handleInvitationSubmit = (data: InvitationFormValues) => {
    toast({
      title: "Demande d'invitation envoyée !",
      description: `Merci ${data.name}, vous recevrez une invitation pour les prochaines dates à ${data.email}`,
    });
    
    setIsInvitationDialogOpen(false);
    invitationForm.reset();
  };

  const handleShare = () => {
    if (navigator.share && event) {
      navigator.share({
        title: event.name,
        text: `Découvrez ${event.name} à ${event.venue}`,
        url: window.location.href
      }).catch(() => {
        toast({
          description: "Lien copié dans le presse-papier",
        });
        navigator.clipboard.writeText(window.location.href);
      });
    } else {
      toast({
        description: "Lien copié dans le presse-papier",
      });
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center">
        <p>Chargement de l'événement...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>

      {/* En-tête avec image */}
      <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
        <img 
          src={event.image} 
          alt={event.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
          <Badge className="self-start mb-2 bg-[#6E59A5] text-white">
            <Martini className="w-4 h-4 mr-1" />
            {event.type}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">{event.name}</h1>
          <p className="text-xl text-white/90">{event.venue}</p>
        </div>
      </div>

      {/* Alerte si l'événement est passé */}
      {isEventPassed && (
        <Alert className="bg-amber-50 border-amber-200 mb-6">
          <AlertCircle className="h-4 w-4 text-amber-500" />
          <AlertTitle className="text-amber-800">Événement passé</AlertTitle>
          <AlertDescription className="text-amber-700">
            Cet événement est passé. Inscrivez-vous pour être notifié des prochaines dates.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* Informations sur l'événement */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-purple-600">À propos de l'événement</h2>
                <Button variant="outline" size="icon" onClick={handleShare}>
                  <Share className="h-5 w-5" />
                </Button>
              </div>
              
              <p className="text-gray-700 mb-6">{event.description}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{event.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Clock className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Horaire</p>
                    <p className="font-medium">{event.time}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <MapPin className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Lieu</p>
                    <p className="font-medium">{event.venue}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Ticket className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Prix</p>
                    <p className="font-medium">{event.price}€ par personne</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Caractéristiques */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-lg font-bold text-purple-600 mb-4">Caractéristiques de l'événement</h2>
              <div className="grid grid-cols-2 gap-3">
                {event.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center">
                    <div className="bg-purple-100 p-2 rounded-full mr-3">
                      <Martini className="h-4 w-4 text-purple-600" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Avantages Club Créole */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center text-purple-600 mb-4">
                <Users className="h-5 w-5 mr-2" />
                <h2 className="text-lg font-bold">Avantage Club Créole</h2>
              </div>
              <p className="mb-4">{event.offer}</p>
              <p className="text-sm text-gray-600">
                Profitez de réductions spéciales et d'avantages exclusifs en présentant votre carte de membre du Club Créole.
              </p>
            </CardContent>
          </Card>
          
        </div>
        
        {/* Carte de réservation */}
        <div>
          <Card className="sticky top-4">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">{isEventPassed ? "Prochaines dates" : "Réserver"}</h2>
                <div className="flex items-center">
                  <Star className="fill-yellow-500 h-5 w-5" />
                  <span className="ml-1 font-semibold">{event.rating}</span>
                </div>
              </div>
              
              {isEventPassed ? (
                <>
                  <p className="text-gray-700 mb-4">
                    Cet événement est passé, mais vous pouvez recevoir une invitation pour les prochaines dates.
                  </p>
                  <Dialog open={isInvitationDialogOpen} onOpenChange={setIsInvitationDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 mb-4">
                        Recevoir une invitation
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Recevoir une invitation</DialogTitle>
                      </DialogHeader>
                      <Form {...invitationForm}>
                        <form onSubmit={invitationForm.handleSubmit(handleInvitationSubmit)} className="space-y-4">
                          <FormField
                            control={invitationForm.control}
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
                            control={invitationForm.control}
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
                </>
              ) : (
                <>
                  <Dialog open={isReservationDialogOpen} onOpenChange={setIsReservationDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 mb-4">
                        Réserver maintenant
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Réservation - {event.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium mb-2">Date</h3>
                          <CalendarComponent
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            className="rounded-md border w-full"
                            disabled={(date) => {
                              const now = new Date();
                              now.setHours(0, 0, 0, 0);
                              return date < now;
                            }}
                          />
                        </div>

                        <div>
                          <h3 className="text-sm font-medium mb-2">Nombre de places</h3>
                          <div className="flex items-center border rounded-md">
                            <Button
                              variant="ghost"
                              size="sm"
                              disabled={ticketCount <= 1}
                              onClick={() => setTicketCount(prev => Math.max(1, prev - 1))}
                            >
                              -
                            </Button>
                            <span className="flex-1 text-center">{ticketCount}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              disabled={ticketCount >= 10}
                              onClick={() => setTicketCount(prev => Math.min(10, prev + 1))}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                        
                        <div className="border-t pt-4 mt-4">
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Prix unitaire</span>
                            <span>{event.price}€</span>
                          </div>
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Nombre de places</span>
                            <span>{ticketCount}</span>
                          </div>
                          <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>{event.price * ticketCount}€</span>
                          </div>
                          
                          <Button 
                            className="w-full mt-4 bg-purple-600 hover:bg-purple-700" 
                            onClick={handleBooking}
                          >
                            Confirmer la réservation
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </>
              )}

              <div className="p-4 bg-purple-50 rounded-lg border border-purple-100 mb-4">
                <p className="text-purple-700 text-sm font-medium">Avantage Club Créole</p>
                <p className="text-gray-700 text-sm">{event.offer}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <Martini className="h-5 w-5 text-gray-500 mr-3" />
                  <span className="text-gray-700">{event.type}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-500 mr-3" />
                  <span className="text-gray-700">{event.venue}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-500 mr-3" />
                  <span className="text-gray-700">{event.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-500 mr-3" />
                  <span className="text-gray-700">{event.time}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NightlifeDetail;
