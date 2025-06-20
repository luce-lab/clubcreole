
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Users, Phone, Mail, MessageSquare, Euro, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TravelOffer {
  id: number;
  title: string;
  price: number;
  max_participants: number | null;
  current_participants: number | null;
  partners?: {
    business_name: string;
    phone: string | null;
    website: string | null;
  };
}

interface TravelReservationFormProps {
  offer: TravelOffer;
}

export const TravelReservationForm = ({ offer }: TravelReservationFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    participants: 1,
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    specialRequests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableSpots = (offer.max_participants || 20) - (offer.current_participants || 0);
  const totalPrice = formData.participants * offer.price;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.contactName || !formData.contactEmail || !formData.contactPhone) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    if (formData.participants > availableSpots) {
      toast({
        title: "Nombre de participants invalide",
        description: `Seulement ${availableSpots} places disponibles`,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Ici, on enverrait normalement la réservation à la base de données
      // Pour l'instant, on simule juste le succès
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Demande de réservation envoyée",
        description: "Votre demande a été transmise à notre partenaire. Vous recevrez une confirmation par email.",
      });

      // Reset form
      setFormData({
        participants: 1,
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        specialRequests: ''
      });

    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de votre demande",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Réserver ce voyage
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Partner Info */}
          {offer.partners && (
            <div className="p-3 bg-blue-50 rounded-lg text-sm">
              <p className="font-medium text-blue-900 mb-1">Organisé par:</p>
              <p className="text-blue-800">{offer.partners.business_name}</p>
              {offer.partners.phone && (
                <p className="text-blue-700 text-xs mt-1">{offer.partners.phone}</p>
              )}
            </div>
          )}

          {/* Number of Participants */}
          <div className="space-y-2">
            <Label htmlFor="participants">Nombre de participants *</Label>
            <Select
              value={formData.participants.toString()}
              onValueChange={(value) => setFormData(prev => ({ ...prev, participants: parseInt(value) }))}
              disabled={availableSpots === 0}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: Math.min(availableSpots, 10) }, (_, i) => i + 1).map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? 'personne' : 'personnes'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="h-4 w-4" />
              <span>{availableSpots} places disponibles</span>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contactName">Nom complet *</Label>
              <Input
                id="contactName"
                type="text"
                value={formData.contactName}
                onChange={(e) => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
                placeholder="Votre nom et prénom"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactEmail">Email *</Label>
              <Input
                id="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                placeholder="votre@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPhone">Téléphone *</Label>
              <Input
                id="contactPhone"
                type="tel"
                value={formData.contactPhone}
                onChange={(e) => setFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
                placeholder="+590 590 XX XX XX"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialRequests">Demandes particulières</Label>
              <Textarea
                id="specialRequests"
                value={formData.specialRequests}
                onChange={(e) => setFormData(prev => ({ ...prev, specialRequests: e.target.value }))}
                placeholder="Régime alimentaire, accessibilité, etc."
                rows={3}
              />
            </div>
          </div>

          {/* Price Summary */}
          <div className="p-4 bg-gray-50 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span>{formData.participants} × {offer.price}€</span>
              <span>{totalPrice}€</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total</span>
              <span className="text-green-600">{totalPrice}€</span>
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={isSubmitting || availableSpots === 0}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Envoi en cours...
              </>
            ) : availableSpots === 0 ? (
              'Complet'
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Demander une réservation
              </>
            )}
          </Button>

          <div className="text-xs text-gray-500 text-center space-y-1">
            <p>* Champs obligatoires</p>
            <p>Votre demande sera transmise à notre partenaire pour confirmation</p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
