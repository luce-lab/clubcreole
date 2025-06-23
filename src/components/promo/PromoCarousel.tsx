
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import PromoCard from "./PromoCard";
import { useNavigate } from "react-router-dom";

interface PromoItem {
  id: number;
  title: string;
  description: string;
  image: string;
  badge?: string;
  ctaText: string;
  ctaUrl: string;
}

// Données de démonstration pour les promotions
const promoData: PromoItem[] = [
  {
    id: 1,
    title: "Découvrez nos hébergements de charme",
    description: "Profitez d'un séjour inoubliable dans nos établissements partenaires avec des réductions exclusives pour les membres Club Créole.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    badge: "Offre Spéciale",
    ctaText: "Découvrir les hébergements",
    ctaUrl: "/hebergements"
  },
  {
    id: 2,
    title: "Saveurs authentiques créoles",
    description: "Explorez la richesse de la gastronomie antillaise dans nos restaurants partenaires et bénéficiez d'avantages exclusifs.",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de",
    badge: "Nouveau",
    ctaText: "Explorer les restaurants",
    ctaUrl: "/restauration"
  },
  {
    id: 3,
    title: "Aventures et sensations fortes",
    description: "Plongée, randonnée, canoë... Vivez des expériences uniques avec nos activités outdoor et profitez de tarifs préférentiels.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
    badge: "Aventure",
    ctaText: "Voir les activités",
    ctaUrl: "/loisirs"
  },
  {
    id: 4,
    title: "Soirées et événements exclusifs",
    description: "Accédez en priorité aux concerts et soirées les plus prisés des Antilles. Réservez vos places dès maintenant.",
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14",
    badge: "Exclusif",
    ctaText: "Découvrir les événements",
    ctaUrl: "/concerts"
  }
];

export const PromoCarousel = () => {
  const navigate = useNavigate();

  const handleCtaClick = (url: string) => {
    navigate(url);
  };

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
            {promoData.map((promo) => (
              <CarouselItem key={promo.id} className="md:basis-1/2 lg:basis-1/2 pl-4">
                <PromoCard
                  {...promo}
                  onCtaClick={() => handleCtaClick(promo.ctaUrl)}
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
