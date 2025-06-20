
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { VoyanceMedium } from "./types";

interface ContactMediumDialogProps {
  medium: VoyanceMedium;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ContactMediumDialog = ({ medium, open, onOpenChange }: ContactMediumDialogProps) => {
  const [formData, setFormData] = useState({
    client_name: "",
    client_email: "",
    client_phone: "",
    preferred_date: undefined as Date | undefined,
    preferred_time: "",
    consultation_type: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30", "18:00", "18:30", "19:00"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.client_name || !formData.client_email || !formData.client_phone || 
        !formData.preferred_date || !formData.preferred_time || !formData.consultation_type) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('voyance_consultations')
        .insert([
          {
            medium_id: medium.id,
            client_name: formData.client_name,
            client_email: formData.client_email,
            client_phone: formData.client_phone,
            preferred_date: format(formData.preferred_date, 'yyyy-MM-dd'),
            preferred_time: formData.preferred_time,
            consultation_type: formData.consultation_type,
            message: formData.message,
          }
        ]);

      if (error) {
        throw error;
      }

      toast({
        title: "Demande envoyée !",
        description: "Votre demande de consultation a été envoyée avec succès. Le médium vous contactera bientôt.",
      });

      // Reset form
      setFormData({
        client_name: "",
        client_email: "",
        client_phone: "",
        preferred_date: undefined,
        preferred_time: "",
        consultation_type: "",
        message: "",
      });

      onOpenChange(false);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la demande:', error);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Demander une consultation avec {medium.name}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="client_name">Nom complet *</Label>
              <Input
                id="client_name"
                value={formData.client_name}
                onChange={(e) => setFormData(prev => ({...prev, client_name: e.target.value}))}
                required
              />
            </div>
            <div>
              <Label htmlFor="client_phone">Téléphone *</Label>
              <Input
                id="client_phone"
                type="tel"
                value={formData.client_phone}
                onChange={(e) => setFormData(prev => ({...prev, client_phone: e.target.value}))}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="client_email">Email *</Label>
            <Input
              id="client_email"
              type="email"
              value={formData.client_email}
              onChange={(e) => setFormData(prev => ({...prev, client_email: e.target.value}))}
              required
            />
          </div>

          <div>
            <Label>Type de consultation *</Label>
            <Select value={formData.consultation_type} onValueChange={(value) => setFormData(prev => ({...prev, consultation_type: value}))}>
              <SelectTrigger>
                <SelectValue placeholder="Choisissez le type de consultation" />
              </SelectTrigger>
              <SelectContent>
                {medium.consultation_types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Date préférée *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.preferred_date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.preferred_date ? (
                      format(formData.preferred_date, "PPP", { locale: fr })
                    ) : (
                      <span>Choisir une date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.preferred_date}
                    onSelect={(date) => setFormData(prev => ({...prev, preferred_date: date}))}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label>Heure préférée *</Label>
              <Select value={formData.preferred_time} onValueChange={(value) => setFormData(prev => ({...prev, preferred_time: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir l'heure" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="message">Message (optionnel)</Label>
            <Textarea
              id="message"
              placeholder="Décrivez vos attentes ou questions particulières..."
              value={formData.message}
              onChange={(e) => setFormData(prev => ({...prev, message: e.target.value}))}
              rows={3}
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Tarif :</strong> {medium.price_per_session}€ par séance<br />
              <strong>Spécialités :</strong> {medium.specialties.join(", ")}
            </p>
          </div>

          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-purple-600 hover:bg-purple-700">
              {isSubmitting ? "Envoi en cours..." : "Envoyer la demande"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
