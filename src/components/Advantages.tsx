
import { Gift, Wrench, HeartHandshake, Music, Hotel, Ticket } from "lucide-react";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Mapping des icônes depuis les noms stockés en base
const iconMap = {
  Gift,
  Wrench,
  HeartHandshake,
  Music,
  Hotel,
  Ticket,
} as const;

interface BonPlan {
  id: number;
  title: string;
  description: string;
  icon: keyof typeof iconMap;
  image: string | null;
  badge: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const Advantages = () => {
  const { data: bonsPlans, isLoading, error } = useQuery({
    queryKey: ['bons-plans'],
    queryFn: async () => {
      console.log('Récupération des bons plans...');
      const { data, error } = await supabase
        .from('bons_plans')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erreur lors de la récupération des bons plans:', error);
        throw error;
      }

      console.log(`${data?.length || 0} bons plans récupérés`);
      return data as BonPlan[];
    },
  });

  if (isLoading) {
    return (
      <section id="advantages" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-creole-blue mb-4">
            Les bons plans !
          </h2>
          <p className="text-center text-gray-600 mb-8">Les coups de cœur du mois</p>
          
          <div className="w-full max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 rounded-lg h-64"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="advantages" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-creole-blue mb-4">
            Les bons plans !
          </h2>
          <p className="text-center text-gray-600 mb-8">Les coups de cœur du mois</p>
          
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Erreur lors du chargement des bons plans
            </p>
            <p className="text-gray-400 mt-2">
              Veuillez réessayer plus tard
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!bonsPlans || bonsPlans.length === 0) {
    return (
      <section id="advantages" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-creole-blue mb-4">
            Les bons plans !
          </h2>
          <p className="text-center text-gray-600 mb-8">Les coups de cœur du mois</p>
          
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Aucun bon plan disponible pour le moment
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="advantages" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-creole-blue mb-4">
          Les bons plans !
        </h2>
        <p className="text-center text-gray-600 mb-8">Les coups de cœur du mois</p>
        
        <Carousel 
          className="w-full max-w-5xl mx-auto"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {bonsPlans.map((bonPlan) => {
              const IconComponent = iconMap[bonPlan.icon];
              
              return (
                <CarouselItem key={bonPlan.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <Card className="h-full bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                    {bonPlan.image && (
                      <div className="w-full h-40 overflow-hidden rounded-t-lg relative group">
                        <img 
                          src={bonPlan.image} 
                          alt={bonPlan.title} 
                          className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-105"
                        />
                      </div>
                    )}
                    <CardHeader className="pb-2">
                      {bonPlan.badge && (
                        <Badge className="self-start bg-creole-blue text-white mb-2">
                          {bonPlan.badge}
                        </Badge>
                      )}
                      <div className="flex items-center gap-2">
                        {IconComponent && <IconComponent className="h-6 w-6 text-creole-green" />}
                        <CardTitle className="text-xl font-semibold text-gray-800">
                          {bonPlan.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600">
                        {bonPlan.description}
                      </CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        className="text-creole-green border-creole-green hover:bg-creole-green hover:text-white w-full mt-2"
                      >
                        En savoir plus
                      </Button>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              );
            })}
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
