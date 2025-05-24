
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Waves } from "lucide-react";
import BackButton from "@/components/common/BackButton";
import DivingReservationForm from "@/components/diving/DivingReservationForm";

const DivingActivity = () => {
  const [showReservationForm, setShowReservationForm] = useState(false);

  const images = [
    {
      url: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
      alt: "Vague océanique sur la plage",
      title: "Découvrez nos spots de plongée"
    },
    {
      url: "https://images.unsplash.com/photo-1518877593221-1f28583780b4",
      alt: "Baleine à bosse sautant hors de l'eau",
      title: "Observation de la vie marine"
    }
  ];

  const price = 75;

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton backTo="/loisirs" />

      <div className="flex items-center gap-4 mb-8">
        <Waves className="h-8 w-8 text-creole-green" />
        <h1 className="text-3xl font-bold text-creole-blue">Plongée sous-marine</h1>
      </div>

      {/* Galerie photos */}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>À propos de l'activité</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Découvrez les fonds marins des Antilles lors d'une plongée
              sous-marine encadrée par nos moniteurs professionnels. Explorez la
              vie marine colorée et les récifs coralliens magnifiques.
            </p>
            <div className="text-2xl font-bold text-creole-green">
              {price}€ / personne
            </div>
            <ul className="list-disc list-inside space-y-2">
              <li>Équipement fourni</li>
              <li>Moniteur certifié</li>
              <li>Durée : 2 heures</li>
              <li>Niveau débutant accepté</li>
            </ul>

            <div className="pt-4">
              <Button
                onClick={() => setShowReservationForm(!showReservationForm)}
                className="w-full bg-creole-green hover:bg-creole-green/90"
                size="lg"
              >
                {showReservationForm ? "Masquer le formulaire" : "Réserver maintenant"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {showReservationForm && (
          <div className="lg:col-span-1">
            <DivingReservationForm 
              onReservationSuccess={() => setShowReservationForm(false)}
            />
          </div>
        )}

        {!showReservationForm && (
          <Card>
            <CardHeader>
              <CardTitle>Informations pratiques</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Horaires disponibles</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 border rounded text-center">09:00</div>
                  <div className="p-2 border rounded text-center">11:00</div>
                  <div className="p-2 border rounded text-center">14:00</div>
                  <div className="p-2 border rounded text-center">16:00</div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Niveaux acceptés</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Débutant (première plongée)</li>
                  <li>• Intermédiaire (avec certification)</li>
                  <li>• Avancé (plongée profonde)</li>
                  <li>• Professionnel (exploration libre)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Ce qui est inclus</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Tout l'équipement de plongée</li>
                  <li>• Briefing de sécurité complet</li>
                  <li>• Accompagnement par un moniteur certifié</li>
                  <li>• Assurance responsabilité civile</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DivingActivity;
