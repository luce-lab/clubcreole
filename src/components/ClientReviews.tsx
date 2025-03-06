
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Review = {
  id: number;
  name: string;
  location: string;
  rating: number;
  comment: string;
  advantage: string;
  image: string;
};

const reviews: Review[] = [
  {
    id: 1,
    name: "Marie Dupont",
    location: "Guadeloupe",
    rating: 5,
    comment: "Grâce au Club Créole, j'ai découvert des restaurants authentiques et obtenu des réductions exclusives. Une expérience inoubliable !",
    advantage: "Réductions Exclusives",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 2,
    name: "Jean Martin",
    location: "Martinique",
    rating: 5,
    comment: "Le service VIP du Club Créole est extraordinaire. J'ai eu accès à des événements privés et des expériences uniques que je n'aurais jamais découverts autrement.",
    advantage: "Accès VIP",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 3,
    name: "Sophie Leclerc",
    location: "Saint-Martin",
    rating: 5,
    comment: "L'application Club Créole est très intuitive et pratique. J'ai pu planifier facilement mon séjour et profiter de tous les avantages en quelques clics.",
    advantage: "Application Mobile",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 4,
    name: "Thomas Petit",
    location: "Guyane",
    rating: 5,
    comment: "Le service client du Club Créole est exceptionnel. Ils ont répondu à toutes mes questions et m'ont aidé à organiser un séjour parfait.",
    advantage: "Service Client Premium",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 5,
    name: "Camille Dubois",
    location: "La Réunion",
    rating: 5,
    comment: "En tant que membre du Club Créole, j'ai pu découvrir des activités locales authentiques, guidées par des experts passionnés. Une immersion culturelle incroyable !",
    advantage: "Expériences Authentiques",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
  }
];

export const ClientReviews = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };
  
  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-creole-blue/5 to-creole-green/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-creole-green mb-4">
            Avis de nos membres
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Découvrez ce que nos membres disent des avantages du Club Créole et comment
            nous transformons leurs expériences.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div 
            className="overflow-hidden"
            aria-live="polite"
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {reviews.map((review) => (
                <div key={review.id} className="w-full flex-shrink-0 px-4">
                  <Card className="bg-white shadow-lg hover:shadow-xl transition-all border-none">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex flex-col md:flex-row gap-6 items-center">
                        <div className="mb-4 md:mb-0">
                          <div className="relative w-24 h-24 md:w-28 md:h-28 overflow-hidden rounded-full border-4 border-creole-green/20">
                            <img 
                              src={review.image} 
                              alt={review.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        
                        <div className="flex-1 text-center md:text-left">
                          <Badge 
                            variant="outline" 
                            className="mb-3 bg-creole-green/10 text-creole-green border-creole-green/20 font-medium px-3 py-1"
                          >
                            {review.advantage}
                          </Badge>
                          
                          <div className="relative">
                            <Quote className="absolute text-creole-green/10 w-10 h-10 -left-2 -top-2" />
                            <p className="text-gray-700 mb-4 relative z-10">
                              "{review.comment}"
                            </p>
                          </div>
                          
                          <div className="flex items-center justify-center md:justify-start mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "w-4 h-4 mr-1",
                                  i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                                )}
                              />
                            ))}
                          </div>
                          
                          <div>
                            <h4 className="font-bold text-lg">{review.name}</h4>
                            <p className="text-gray-500 text-sm">{review.location}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors border border-gray-200 z-10"
            aria-label="Témoignage précédent"
          >
            <ArrowLeft className="w-5 h-5 text-creole-green" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors border border-gray-200 z-10"
            aria-label="Témoignage suivant"
          >
            <ArrowRight className="w-5 h-5 text-creole-green" />
          </button>
          
          <div className="flex justify-center mt-6 gap-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all",
                  index === activeIndex
                    ? "bg-creole-green scale-110"
                    : "bg-gray-300 hover:bg-gray-400"
                )}
                aria-label={`Aller au témoignage ${index + 1}`}
                aria-current={index === activeIndex ? "true" : "false"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
