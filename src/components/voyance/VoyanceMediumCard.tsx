
import { Star, MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ContactMediumDialog } from "./ContactMediumDialog";
import { useState } from "react";
import type { VoyanceMedium } from "./types";

interface VoyanceMediumCardProps {
  medium: VoyanceMedium;
}

export const VoyanceMediumCard = ({ medium }: VoyanceMediumCardProps) => {
  const [showContactDialog, setShowContactDialog] = useState(false);

  const handleContactClick = () => {
    setShowContactDialog(true);
  };

  const handlePhoneClick = () => {
    if (medium.contact_phone) {
      window.open(`tel:${medium.contact_phone}`, '_self');
    }
  };

  const handleWhatsAppClick = () => {
    if (medium.contact_whatsapp) {
      window.open(`https://wa.me/${medium.contact_whatsapp.replace(/\s/g, '')}`, '_blank');
    }
  };

  return (
    <>
      <Card className="h-full hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="pb-4">
          <div className="relative">
            <img
              src={medium.image}
              alt={medium.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium">{medium.rating}</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{medium.name}</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {medium.specialties.map((specialty, index) => (
                <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-800">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>

          <p className="text-gray-600 text-sm line-clamp-3">{medium.description}</p>

          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{medium.location}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span className="font-medium">{medium.experience_years} ans d'expérience</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span className="font-medium">{medium.price_per_session}€ par séance</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {medium.consultation_types.map((type, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {type}
              </Badge>
            ))}
          </div>

          <div className="pt-4 space-y-2">
            <Button onClick={handleContactClick} className="w-full bg-purple-600 hover:bg-purple-700">
              <Mail className="h-4 w-4 mr-2" />
              Demander une consultation
            </Button>
            
            <div className="flex gap-2">
              {medium.contact_phone && (
                <Button variant="outline" size="sm" onClick={handlePhoneClick} className="flex-1">
                  <Phone className="h-4 w-4 mr-1" />
                  Appeler
                </Button>
              )}
              {medium.contact_whatsapp && (
                <Button variant="outline" size="sm" onClick={handleWhatsAppClick} className="flex-1">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  WhatsApp
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <ContactMediumDialog
        medium={medium}
        open={showContactDialog}
        onOpenChange={setShowContactDialog}
      />
    </>
  );
};
