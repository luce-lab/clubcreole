
import { Plane } from "lucide-react";

export const TravelOffersEmpty = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Nos Offres de Voyage
        </h2>
        
        <div className="text-center py-12">
          <Plane className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500 text-lg">
            Aucune offre de voyage disponible pour le moment
          </p>
          <p className="text-gray-400 mt-2">
            Revenez bientôt pour découvrir nos prochaines destinations
          </p>
        </div>
      </div>
    </section>
  );
};
