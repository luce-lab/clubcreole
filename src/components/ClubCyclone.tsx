import { Shield } from "lucide-react";

export const ClubCyclone = () => {
  return (
    <section id="cyclone" className="py-20 bg-gradient-to-br from-creole-red/10 to-creole-blue/10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Shield className="h-16 w-16 text-creole-red mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-creole-red mb-6">
            Club Cyclone
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Une exclusivité en option pour votre tranquillité
          </p>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-gray-700">
              En cas de passage d'une tempête ou d'un cyclone, une équipe d'intervention prend en charge le déblayement, le nettoyage, les abords immédiats de votre domicile ainsi que vous donner des produits de première nécessité.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};