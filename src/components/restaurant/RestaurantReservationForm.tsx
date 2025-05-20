
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Calendar as CalendarIcon, Clock, Users } from "lucide-react";
import { fr } from 'date-fns/locale';
import { format } from "date-fns";

interface RestaurantReservationFormProps {
  restaurantId: number;
  restaurantName: string;
  showForm?: boolean;
  onClose?: () => void;
}

export const RestaurantReservationForm = ({ 
  restaurantId, 
  restaurantName, 
  showForm = true,
  onClose 
}: RestaurantReservationFormProps) => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("2");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Générer les options d'horaires (midi et soir)
  const lunchTimeOptions = ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30"];
  const dinnerTimeOptions = ["19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !time || !name || !email || !phone) {
      toast({
        title: "Formulaire incomplet",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simuler un envoi de réservation
    setTimeout(() => {
      toast({
        title: "Réservation confirmée !",
        description: `Votre table pour ${guests} personne(s) au ${restaurantName} est réservée le ${format(date, 'dd/MM/yyyy')} à ${time}.`,
      });
      
      // Reset form
      setDate(undefined);
      setTime("");
      setGuests("2");
      setName("");
      setEmail("");
      setPhone("");
      setNotes("");
      setIsSubmitting(false);
      
      if (onClose) {
        onClose();
      }
    }, 1500);
  };

  if (!showForm) {
    return (
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="font-semibold text-lg mb-4">Réservez une table</h3>
        <p className="text-gray-700 mb-4">
          Réservez votre table et profitez d'une expérience gastronomique exceptionnelle.
        </p>
        <Button 
          className="w-full bg-creole-green hover:bg-creole-green/90"
          onClick={onClose}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          Réserver maintenant
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-lg p-6 shadow-sm">
      <h3 className="font-semibold text-lg mb-4">Réservez votre table</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Date */}
        <div className="space-y-2">
          <Label htmlFor="date">Date de réservation *</Label>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            locale={fr}
            disabled={(date) => date < new Date()}
            className="border rounded-md"
            initialFocus
          />
        </div>

        {/* Heure */}
        <div className="space-y-2">
          <Label htmlFor="time">Heure de réservation *</Label>
          <Select value={time} onValueChange={setTime}>
            <SelectTrigger id="time" className="w-full">
              <SelectValue placeholder="Sélectionner une heure" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="" disabled>Sélectionner une heure</SelectItem>
              
              <SelectItem value="lunch-header" disabled className="font-medium">
                Déjeuner
              </SelectItem>
              {lunchTimeOptions.map(time => (
                <SelectItem key={`lunch-${time}`} value={time}>
                  {time}
                </SelectItem>
              ))}
              
              <SelectItem value="dinner-header" disabled className="font-medium">
                Dîner
              </SelectItem>
              {dinnerTimeOptions.map(time => (
                <SelectItem key={`dinner-${time}`} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Nombre de personnes */}
        <div className="space-y-2">
          <Label htmlFor="guests">Nombre de personnes *</Label>
          <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger id="guests">
              <SelectValue placeholder="Nombre de personnes" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <SelectItem key={num} value={num.toString()}>
                  {num} personne{num > 1 ? "s" : ""}
                </SelectItem>
              ))}
              <SelectItem value="9+">Plus de 8 personnes</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Coordonnées */}
        <div className="space-y-2">
          <Label htmlFor="name">Nom et prénom *</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Votre nom complet"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Téléphone *</Label>
          <Input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="06 XX XX XX XX"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="notes">Demandes spéciales</Label>
          <Input
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Allergie, occasion spéciale, etc."
          />
        </div>
        
        <div className="pt-2">
          <Button 
            type="submit" 
            className="w-full bg-creole-green hover:bg-creole-green/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Traitement en cours..."
            ) : (
              <>
                <Clock className="mr-2 h-4 w-4" />
                Confirmer la réservation
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
