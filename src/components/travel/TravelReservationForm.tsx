
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Users, Phone, Mail, MessageSquare, Euro, Calendar, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth";
import { useNavigate, useLocation } from "react-router-dom";

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
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    participants: 1,
    contactFirstName: '',
    contactLastName: '',
    contactEmail: '',
    contactPhone: '',
    specialRequests: '',
    participantsDetails: [] as Array<{ firstName: string; lastName: string }>
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableSpots = (offer.max_participants || 20) - (offer.current_participants || 0);
  const totalPrice = formData.participants * offer.price;

  // Auto-fill user info if logged in
  useEffect(() => {
    if (user) {
      const fullName = user.user_metadata?.full_name || user.user_metadata?.name || '';
      const [firstName, ...lastNameParts] = fullName.split(' ');
      const lastName = lastNameParts.join(' ');
      
      setFormData(prev => {
        const newParticipantsDetails = [...prev.participantsDetails];
        if (newParticipantsDetails.length === 0) {
          newParticipantsDetails.push({ firstName: firstName || '', lastName: lastName || '' });
        } else {
          newParticipantsDetails[0] = { firstName: firstName || '', lastName: lastName || '' };
        }
        
        return {
          ...prev,
          contactEmail: user.email || '',
          contactFirstName: firstName || '',
          contactLastName: lastName || '',
          participantsDetails: newParticipantsDetails
        };
      });
    }
  }, [user]);

  // Update participants details when number of participants changes
  useEffect(() => {
    setFormData(prev => {
      const newParticipantsDetails = Array.from({ length: prev.participants }, (_, i) => 
        prev.participantsDetails[i] || { firstName: '', lastName: '' }
      );
      return {
        ...prev,
        participantsDetails: newParticipantsDetails
      };
    });
  }, [formData.participants]);

  const handleAuthRequired = () => {
    // Store current URL for redirect after login
    const currentPath = location.pathname + location.search;
    navigate(`/login?redirect=${encodeURIComponent(currentPath)}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is authenticated first
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour effectuer une réservation",
        variant: "destructive",
      });
      handleAuthRequired();
      return;
    }
    
    if (!formData.contactFirstName || !formData.contactLastName || !formData.contactEmail || !formData.contactPhone) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    // Validate all participants have names
    const incompleteParticipants = formData.participantsDetails.some(p => !p.firstName || !p.lastName);
    if (incompleteParticipants) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir le nom et prénom de tous les participants",
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
      // Create the reservation in the database
      const { data, error } = await supabase
        .from('travel_reservations')
        .insert({
          travel_offer_id: offer.id,
          user_id: user?.id || null,
          contact_name: `${formData.contactFirstName} ${formData.contactLastName}`,
          contact_first_name: formData.contactFirstName,
          contact_last_name: formData.contactLastName,
          contact_email: formData.contactEmail,
          contact_phone: formData.contactPhone,
          participants: formData.participants,
          participants_details: formData.participantsDetails,
          special_requests: formData.specialRequests || null,
          total_price: totalPrice,
          status: 'pending'
        })
        .select()
        .single();

      if (error) {
        console.error('Erreur lors de la création de la réservation:', error);
        throw error;
      }

      
      // Si la requête réussit, on affiche un message de succès avec toast
      toast({
        title: "Demande de réservation envoyée",
        description: "Votre demande a été transmise à notre partenaire. Vous recevrez une confirmation par email.",
      });

      // Reset form
      setFormData({
        participants: 1,
        contactFirstName: '',
        contactLastName: '',
        contactEmail: '',
        contactPhone: '',
        specialRequests: '',
        participantsDetails: [{ firstName: '', lastName: '' }]
      });

    } catch (error) {
      console.error('Erreur lors de la réservation:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer.",
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
        {!user && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg mb-4">
            <div className="flex items-center gap-2 text-amber-800">
              <LogIn className="h-4 w-4" />
              <p className="text-sm font-medium">Connexion requise</p>
            </div>
            <p className="text-xs text-amber-700 mt-1">
              Vous devez être connecté pour effectuer une réservation
            </p>
          </div>
        )}
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
            <div className="p-3 bg-blue-50 rounded-lg">
              <Label className="text-base font-semibold text-blue-900">Personne de contact (Vous)</Label>
              <p className="text-sm text-blue-700 mb-3">
                Ces informations seront utilisées pour toute communication concernant la réservation
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="contactFirstName">Prénom *</Label>
                  <Input
                    id="contactFirstName"
                    type="text"
                    value={formData.contactFirstName}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, contactFirstName: e.target.value }));
                      // Sync with first participant
                      const newDetails = [...formData.participantsDetails];
                      if (newDetails[0]) {
                        newDetails[0] = { ...newDetails[0], firstName: e.target.value };
                        setFormData(prev => ({ ...prev, participantsDetails: newDetails }));
                      }
                    }}
                    placeholder="Prénom"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactLastName">Nom *</Label>
                  <Input
                    id="contactLastName"
                    type="text"
                    value={formData.contactLastName}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, contactLastName: e.target.value }));
                      // Sync with first participant
                      const newDetails = [...formData.participantsDetails];
                      if (newDetails[0]) {
                        newDetails[0] = { ...newDetails[0], lastName: e.target.value };
                        setFormData(prev => ({ ...prev, participantsDetails: newDetails }));
                      }
                    }}
                    placeholder="Nom"
                    required
                  />
                </div>
              </div>
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

          {/* Participants Information */}
          <div className="space-y-4">
            <div className="border-t pt-4">
              <Label className="text-base font-semibold">Informations des participants</Label>
              <p className="text-sm text-gray-600 mb-4">
                Veuillez renseigner le nom et prénom de tous les participants
              </p>
              
              {formData.participantsDetails.map((participant, index) => (
                <div key={index} className="space-y-2 p-3 bg-gray-50 rounded-lg">
                  <Label className="text-sm font-medium">
                    Participant {index + 1} {index === 0 ? '(Vous - personne de contact)' : ''}
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="text"
                      value={participant.firstName}
                      onChange={(e) => {
                        const newDetails = [...formData.participantsDetails];
                        newDetails[index] = { ...newDetails[index], firstName: e.target.value };
                        setFormData(prev => ({ ...prev, participantsDetails: newDetails }));
                        
                        // Auto-fill contact info for first participant
                        if (index === 0) {
                          setFormData(prev => ({ ...prev, contactFirstName: e.target.value }));
                        }
                      }}
                      placeholder="Prénom"
                      required
                    />
                    <Input
                      type="text"
                      value={participant.lastName}
                      onChange={(e) => {
                        const newDetails = [...formData.participantsDetails];
                        newDetails[index] = { ...newDetails[index], lastName: e.target.value };
                        setFormData(prev => ({ ...prev, participantsDetails: newDetails }));
                        
                        // Auto-fill contact info for first participant
                        if (index === 0) {
                          setFormData(prev => ({ ...prev, contactLastName: e.target.value }));
                        }
                      }}
                      placeholder="Nom"
                      required
                    />
                  </div>
                </div>
              ))}
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
