
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Ship, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const JetSkiActivity = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const availableTimes = ["09:00", "11:00", "14:00", "16:00"];
  const price = 95;

  const images = [
    {
      url: "https://images.unsplash.com/photo-1534447677768-be436bb09401",
      alt: "Scooter des mers sur l'eau turquoise",
      title: "Sensations fortes garanties"
    },
    {
      url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
      alt: "Vue aérienne d'un lagon tropical",
      title: "Explorez les plus belles criques"
    }
  ];

  const handleReservation = () => {
    if (!date || !selectedTime) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une date et une heure",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Réservation confirmée !",
      description: `Votre session de jet-ski est réservée pour le ${date.toLocaleDateString()} à ${selectedTime}`,
    });
  };

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

      <div className="flex items-center gap-4 mb-8">
        <Ship className="h-8 w-8 text-creole-green" />
        <h1 className="text-3xl font-bold text-creole-blue">Scooter des mers</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {images.map((image, index) => (
          <div key={index} className="relative group overflow-hidden rounded-lg shadow-lg">
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white p-4 text-lg font-semibold">{image.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>À propos de l'activité</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Profitez d'une expérience unique en scooter des mers dans les eaux
              cristallines des Antilles. Naviguez le long des côtes, découvrez des
              criques isolées et vivez des sensations fortes.
            </p>
            <div className="text-2xl font-bold text-creole-green">
              {price}€ / personne
            </div>
            <ul className="list-disc list-inside space-y-2">
              <li>Équipement de sécurité fourni</li>
              <li>Briefing de sécurité inclus</li>
              <li>Durée : 1 heure</li>
              <li>Permis bateau non requis</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Réserver une session</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Choisissez une date</h3>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                disabled={(date) => date < new Date()}
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Choisissez un horaire</h3>
              <div className="grid grid-cols-2 gap-2">
                {availableTimes.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    onClick={() => setSelectedTime(time)}
                    className="w-full"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleReservation}
              className="w-full"
              size="lg"
            >
              Réserver maintenant
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JetSkiActivity;
