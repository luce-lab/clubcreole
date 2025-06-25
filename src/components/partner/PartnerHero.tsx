
import { Handshake } from "lucide-react";

export const PartnerHero = () => {
  return (
    <section className="bg-gradient-to-r from-creole-green to-green-600 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Devenez Partenaire Club Créole
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Rejoignez notre réseau de partenaires et développez votre activité en Martinique
          </p>
          <div className="flex justify-center">
            <Handshake className="h-16 w-16 opacity-80" />
          </div>
        </div>
      </div>
    </section>
  );
};
