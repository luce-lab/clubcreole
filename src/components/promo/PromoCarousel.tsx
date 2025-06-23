
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import PromoCard from "./PromoCard";
import { useNavigate } from "react-router-dom";
import { usePromotions } from "@/hooks/usePromotions";

export const PromoCarousel = () => {
  const navigate = useNavigate();
  const { promotions, loading, error } = usePromotions();

  const handleCtaClick = (url: string) => {
    navigate(url);
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-creole-blue/5 to-creole-green/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-creole-blue mb-4">
              Offres Exclusives Club Créole
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez nos promotions et offres spéciales réservées aux membres. 
              Profitez d'avantages uniques pour vos sorties aux Antilles.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-creole-green"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-br from-creole-blue/5 to-creole-green/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-creole-blue mb-4">
              Offres Exclusives Club Créole
            </h2>
            <p className="text-lg text-red-600 max-w-2xl mx-auto">
              Une erreur est survenue lors du chargement des promotions.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (promotions.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-br from-creole-blue/5 to-creole-green/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-creole-blue mb-4">
              Offres Exclusives Club Créole
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Aucune promotion disponible pour le moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-creole-blue/5 to-creole-green/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-creole-blue mb-4">
            Offres Exclusives Club Créole
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez nos promotions et offres spéciales réservées aux membres. 
            Profitez d'avantages uniques pour vos sorties aux Antilles.
          </p>
        </div>

        <Carousel 
          className="w-full max-w-6xl mx-auto"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {promotions.map((promo) => (
              <CarouselItem key={promo.id} className="md:basis-1/2 lg:basis-1/2 pl-4">
                <PromoCard
                  id={promo.id}
                  title={promo.title}
                  description={promo.description}
                  image={promo.image}
                  badge={promo.badge}
                  ctaText={promo.cta_text}
                  onCtaClick={() => handleCtaClick(promo.cta_url)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="flex justify-center mt-8 gap-2">
            <CarouselPrevious className="relative static" />
            <CarouselNext className="relative static" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default PromoCarousel;
