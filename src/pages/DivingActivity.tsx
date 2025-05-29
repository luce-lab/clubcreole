import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Waves } from "lucide-react";
import BackButton from "@/components/common/BackButton";
import DivingReservationForm from "@/components/diving/DivingReservationForm";
import { LeisureActivitiesService } from "@/services/loisirs/leisureActivitiesService";
import { ActivityWithDetails } from "@/components/loisirs/types";

const DivingActivity = () => {
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [activityData, setActivityData] = useState<ActivityWithDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadDivingActivity = async () => {
      try {
        // Récupérer l'activité de plongée (on assume que c'est la première activité de catégorie 'diving')
        const activities = await LeisureActivitiesService.getActivitiesByCategory('diving');
        
        if (activities.length > 0) {
          const divingActivity = await LeisureActivitiesService.getActivityWithDetails(activities[0].id);
          setActivityData(divingActivity);
        } else {
          toast({
            title: "Erreur",
            description: "Aucune activité de plongée trouvée",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Erreur lors du chargement de l\'activité:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les données de l'activité",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadDivingActivity();
  }, [toast]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Chargement...</div>
        </div>
      </div>
    );
  }

  if (!activityData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <BackButton backTo="/loisirs" />
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Activité non trouvée</div>
        </div>
      </div>
    );
  }

  const { activity, images, time_slots, levels, inclusions } = activityData;

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton backTo="/loisirs" />

      <div className="flex items-center gap-4 mb-8">
        <Waves className="h-8 w-8 text-creole-green" />
        <h1 className="text-3xl font-bold text-creole-blue">{activity.name}</h1>
      </div>

      {/* Galerie photos */}
      {images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {images.map((image) => (
            <div key={image.id} className="relative group overflow-hidden rounded-lg shadow-lg">
              <img
                src={image.url}
                alt={image.alt_text}
                className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white p-4 text-lg font-semibold">{image.title}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>À propos de l'activité</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>{activity.description}</p>
            <div className="text-2xl font-bold text-creole-green">
              {activity.price_per_person}€ / personne
            </div>
            
            {inclusions.length > 0 && (
              <ul className="list-disc list-inside space-y-2">
                {inclusions.map((inclusion) => (
                  <li key={inclusion.id}>{inclusion.inclusion_text}</li>
                ))}
              </ul>
            )}

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
              activityId={activity.id}
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
              {time_slots.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Horaires disponibles</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {time_slots.map((slot) => (
                      <div key={slot.id} className="p-2 border rounded text-center">
                        {slot.time_slot.substring(0, 5)}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {levels.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Niveaux acceptés</h3>
                  <ul className="space-y-1 text-sm">
                    {levels.map((level) => (
                      <li key={level.id}>• {level.level_description}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h3 className="font-semibold mb-2">Détails de l'activité</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Durée : {activity.duration_hours} heures</li>
                  <li>• Maximum {activity.max_participants} participants</li>
                  {activity.equipment_provided && <li>• Équipement fourni</li>}
                  {activity.professional_guide && <li>• Guide professionnel inclus</li>}
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
