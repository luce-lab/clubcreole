
import { Plane, MapPin, Calendar, Users } from "lucide-react";

export const TravelHeader = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <Plane className="h-16 w-16 mx-auto mb-4 text-yellow-400" />
          <h1 className="text-4xl font-bold mb-4">Voyages</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Découvrez nos offres de voyage exceptionnelles avec nos partenaires agences de voyage
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="text-center">
            <MapPin className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
            <h3 className="text-xl font-semibold mb-2">Destinations de rêve</h3>
            <p className="text-blue-100">
              Explorez les plus belles destinations du monde
            </p>
          </div>
          
          <div className="text-center">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
            <h3 className="text-xl font-semibold mb-2">Dates flexibles</h3>
            <p className="text-blue-100">
              Choisissez les dates qui vous conviennent
            </p>
          </div>
          
          <div className="text-center">
            <Users className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
            <h3 className="text-xl font-semibold mb-2">Groupe ou individuel</h3>
            <p className="text-blue-100">
              Voyagez seul, en couple ou en groupe
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
