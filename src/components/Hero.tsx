
import { Button } from "@/components/ui/button"; 
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const Hero = () => {
  const isMobile = useIsMobile();
  
  return <section className="bg-gradient-to-br from-creole-green/10 to-creole-blue/10 py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-creole-green mb-6">
          Bienvenue au Club Créole
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8">
          Et de votre Vie Quotidienne !
        </p>
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg fade-in">
          <p className="text-gray-700 text-lg mb-6">Le Club Créole un programme de fidélité innovant, conçu pour les passionnés de la culture créole et les voyageurs en quête d'expériences authentiques. Il offre à ses membres un accès privilégié à un réseau de partenaires sélectionnés dans le secteur touristique, leur permettant ainsi de bénéficier de réductions, d'avantages exclusifs et de services sur mesure.</p>
          
          <Button 
            size={isMobile ? "default" : "lg"}
            className="bg-creole-green hover:bg-creole-green/90 text-white font-semibold group transition-all duration-300 transform hover:scale-105 w-full md:w-auto text-sm sm:text-base whitespace-normal md:whitespace-nowrap px-3 py-2 md:px-8 md:py-3"
          >
            {isMobile ? "DÉCOUVRIR" : "DÉCOUVREZ - ABONNEZ-VOUS - PROFITEZ"}
            <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform shrink-0" />
          </Button>
        </div>
      </div>
    </section>;
};
