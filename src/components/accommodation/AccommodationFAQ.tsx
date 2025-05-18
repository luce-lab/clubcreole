
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Amenity {
  name: string;
  available: boolean;
}

interface AccommodationFAQProps {
  amenities: Amenity[];
}

export const AccommodationFAQ = ({ amenities }: AccommodationFAQProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Questions fréquentes</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Les animaux sont-ils acceptés ?</AccordionTrigger>
            <AccordionContent>
              {amenities.find(a => a.name === "Animaux acceptés")?.available
                ? "Oui, les animaux domestiques sont les bienvenus."
                : "Non, les animaux ne sont pas acceptés dans cet hébergement."}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Y a-t-il un parking gratuit ?</AccordionTrigger>
            <AccordionContent>
              {amenities.find(a => a.name === "Parking gratuit")?.available
                ? "Oui, un parking gratuit est disponible pour les clients."
                : "Non, cet hébergement ne dispose pas de parking gratuit."}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Comment puis-je annuler ma réservation ?</AccordionTrigger>
            <AccordionContent>
              Vous pouvez annuler gratuitement jusqu'à 48 heures avant votre arrivée. Au-delà, des frais d'annulation peuvent s'appliquer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};
