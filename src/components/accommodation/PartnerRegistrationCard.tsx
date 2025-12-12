
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, TrendingUp, BarChart3, Users, Shield } from "lucide-react";

/**
 * PartnerRegistrationCard component
 * Displayed on non-partner accommodation detail pages to encourage property owners
 * to register as partners and enable online reservations.
 */
export const PartnerRegistrationCard = () => {
  const navigate = useNavigate();

  return (
    <div className="sticky top-8">
      <Card className="shadow-lg border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-3">
            <div className="bg-orange-100 p-3 rounded-full">
              <AlertCircle className="h-8 w-8 text-orange-600" />
            </div>
          </div>
          <CardTitle className="text-xl text-gray-800">
            Cet hébergement n'accepte pas encore les réservations en ligne
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-bold text-lg text-creole-green mb-3">
              Vous êtes le propriétaire ?
            </h3>
            <p className="text-gray-600 mb-4">
              Rejoignez notre réseau de partenaires et commencez à recevoir des réservations dès aujourd'hui !
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <div className="bg-creole-green/10 p-2 rounded-full shrink-0">
                  <TrendingUp className="h-5 w-5 text-creole-green" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Augmentez votre visibilité</h4>
                  <p className="text-sm text-gray-600">
                    Touchez des milliers de voyageurs recherchant un hébergement en Guadeloupe
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-creole-green/10 p-2 rounded-full shrink-0">
                  <BarChart3 className="h-5 w-5 text-creole-green" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Gérez vos réservations facilement</h4>
                  <p className="text-sm text-gray-600">
                    Tableau de bord intuitif pour suivre et gérer toutes vos réservations
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-creole-green/10 p-2 rounded-full shrink-0">
                  <Users className="h-5 w-5 text-creole-green" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Accédez à nos outils de gestion</h4>
                  <p className="text-sm text-gray-600">
                    Statistiques détaillées, calendrier de disponibilité, gestion des tarifs
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-creole-green/10 p-2 rounded-full shrink-0">
                  <Shield className="h-5 w-5 text-creole-green" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Rejoignez notre réseau de confiance</h4>
                  <p className="text-sm text-gray-600">
                    Faites partie de partenaires vérifiés et bénéficiez de notre support
                  </p>
                </div>
              </div>
            </div>

            <Button
              className="w-full bg-creole-green hover:bg-creole-green/90 text-lg py-6"
              size="lg"
              onClick={() => navigate('/devenir-partenaire')}
            >
              Devenir partenaire
            </Button>

            <p className="text-xs text-gray-500 text-center mt-3">
              Inscription gratuite • Activation rapide • Support dédié
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
