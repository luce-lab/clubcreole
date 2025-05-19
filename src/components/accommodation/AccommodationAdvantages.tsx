
import { Star, Bed, MapPin } from "lucide-react";

export const AccommodationAdvantages = () => {
  return (
    <section className="bg-gray-50 py-16 rounded-lg shadow-md mb-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-creole-blue mb-12">
          Pourquoi réserver avec Club Créole ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-creole-green/10 rounded-full flex items-center justify-center mb-4">
              <Star className="h-6 w-6 text-creole-green" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Qualité garantie</h3>
            <p className="text-gray-600">
              Tous nos hébergements sont soigneusement sélectionnés et régulièrement inspectés pour garantir votre confort.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-creole-green/10 rounded-full flex items-center justify-center mb-4">
              <Bed className="h-6 w-6 text-creole-green" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Large choix</h3>
            <p className="text-gray-600">
              Des villas luxueuses aux gîtes authentiques, nous avons l'hébergement parfait pour tous les goûts et budgets.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-creole-green/10 rounded-full flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-creole-green" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Emplacements stratégiques</h3>
            <p className="text-gray-600">
              Nos hébergements sont idéalement situés pour vous permettre de profiter pleinement de toutes les activités de l'île.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
