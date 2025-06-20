
import { useState, useEffect } from "react";
import { Coffee, Bed, Music, Martini, Car, Gamepad2, Mountain, Ship, Waves, Eye, Plane, LucideProps } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getActivities, Activity } from "../services/activityService";

// Map pour faire correspondre les noms d'icônes de la DB aux composants React
const iconMap: { [key: string]: React.ComponentType<LucideProps> } = {
  Gamepad2,
  Coffee,
  Bed,
  Music,
  Martini,
  Car,
  Waves,
  Ship,
  Mountain,
  Eye,
  Plane,
};

export const Activities = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await getActivities();
        setActivities(data);
      } catch (err) {
        setError("Impossible de charger les activités.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <section id="activities" className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p>Chargement des activités...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="activities" className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center text-red-500">
          <p>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="activities" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-creole-blue mb-12">
          Nos Activités
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {activities.map((activity) => {
            const IconComponent = iconMap[activity.icon_name];
            if (!IconComponent) {
              // Gère le cas où l'icône n'est pas trouvée
              return null;
            }
            return (
              <div
                key={activity.id}
                className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => navigate(activity.path)}
              >
                <IconComponent className="h-12 w-12 text-creole-green mb-4" />
                <h3 className="text-xl font-semibold text-center text-gray-800">{activity.name}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Activities;
