
import { Check, X, Image } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TravelOffer {
  inclusions: string[];
  exclusions: string[];
  gallery_images: string[];
}

interface TravelDetailInfoProps {
  offer: TravelOffer;
}

export const TravelDetailInfo = ({ offer }: TravelDetailInfoProps) => {
  return (
    <div className="space-y-6">
      {/* Gallery Images */}
      {offer.gallery_images && offer.gallery_images.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="h-5 w-5" />
              Galerie photos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {offer.gallery_images.map((image, index) => (
                <div key={index} className="aspect-video rounded-lg overflow-hidden">
                  <img 
                    src={image} 
                    alt={`Galerie ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Inclusions */}
      {offer.inclusions && offer.inclusions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Check className="h-5 w-5" />
              Inclus dans le voyage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {offer.inclusions.map((inclusion, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{inclusion}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Exclusions */}
      {offer.exclusions && offer.exclusions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700">
              <X className="h-5 w-5" />
              Non inclus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {offer.exclusions.map((exclusion, index) => (
                <div key={index} className="flex items-center gap-2">
                  <X className="h-4 w-4 text-red-600 flex-shrink-0" />
                  <span className="text-gray-700">{exclusion}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Important Information */}
      <Card className="border-amber-200 bg-amber-50">
        <CardHeader>
          <CardTitle className="text-amber-800">Informations importantes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="border-amber-300 text-amber-800">
              Réservation obligatoire
            </Badge>
            <Badge variant="outline" className="border-amber-300 text-amber-800">
              Paiement sécurisé
            </Badge>
            <Badge variant="outline" className="border-amber-300 text-amber-800">
              Confirmation immédiate
            </Badge>
          </div>
          
          <div className="text-sm text-amber-800 space-y-1">
            <p>• Les prix sont indiqués par personne en chambre double</p>
            <p>• Passeport valide requis pour les destinations internationales</p>
            <p>• Conditions d'annulation selon les CGV de l'agence partenaire</p>
            <p>• Assurance voyage recommandée</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
