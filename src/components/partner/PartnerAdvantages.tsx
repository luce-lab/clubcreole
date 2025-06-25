
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, Star } from "lucide-react";

export const PartnerAdvantages = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Pourquoi devenir partenaire ?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-creole-green mx-auto mb-4" />
                <CardTitle>Visibilité accrue</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Accédez à notre large base de membres et augmentez votre visibilité sur le marché martiniquais.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-creole-green mx-auto mb-4" />
                <CardTitle>Croissance garantie</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Bénéficiez de notre réseau établi pour développer votre chiffre d'affaires.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Star className="h-12 w-12 text-creole-green mx-auto mb-4" />
                <CardTitle>Support dédié</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Notre équipe vous accompagne dans la mise en place et la gestion de votre partenariat.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
