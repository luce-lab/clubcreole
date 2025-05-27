
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarClock, Gift, CreditCard, Star, Crown } from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export const DashboardClient = () => {
  const { subscriptionData } = useSubscription();

  const getBenefitsText = () => {
    switch (subscriptionData.subscription_tier) {
      case "Passionné":
        return "15% de réduction sur toutes les activités";
      case "Expert":
        return "25% de réduction sur toutes les activités";
      default:
        return "Accès aux tarifs de base";
    }
  };

  return (
    <div className="space-y-6">
      {/* Section abonnement si l'utilisateur est abonné */}
      {subscriptionData.subscribed && (
        <Card className="border-creole-green/20 bg-gradient-to-r from-creole-green/5 to-creole-blue/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-creole-green">
              <Crown className="h-5 w-5" />
              Votre abonnement {subscriptionData.subscription_tier}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Statut :</span>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                Actif
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Avantages :</span>
              <span className="text-sm text-creole-green font-medium">
                {getBenefitsText()}
              </span>
            </div>

            {subscriptionData.subscription_end && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Expire le :</span>
                <span className="text-sm text-gray-600">
                  {format(new Date(subscriptionData.subscription_end), "d MMMM yyyy", { locale: fr })}
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Réservations</CardTitle>
            <CalendarClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">À venir</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Points fidélité</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">125</div>
            <p className="text-xs text-muted-foreground">Encore 75 points pour un cadeau</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Économies</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45€</div>
            <p className="text-xs text-muted-foreground">Économisés avec Club Créole</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Mes réservations</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Activité</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Plongée découverte</TableCell>
                  <TableCell>15/04/2025</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Confirmé
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Restaurant La Case</TableCell>
                  <TableCell>22/04/2025</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      Payé
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Location voiture</TableCell>
                  <TableCell>25/04/2025</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                      En attente
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Offres recommandées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center">
                  <Star className="h-6 w-6 text-creole-green" />
                </div>
                <div>
                  <h3 className="font-medium">Plongée avec les tortues</h3>
                  <p className="text-sm text-gray-600">-15% avec votre abonnement Club Créole</p>
                  <p className="text-xs text-creole-blue mt-1">Aqua Plongée</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center">
                  <Star className="h-6 w-6 text-creole-green" />
                </div>
                <div>
                  <h3 className="font-medium">Soirée créole au Domaine</h3>
                  <p className="text-sm text-gray-600">Concert et dîner pour 2 à 85€ au lieu de 110€</p>
                  <p className="text-xs text-creole-blue mt-1">Restaurant Le Domaine</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center">
                  <Star className="h-6 w-6 text-creole-green" />
                </div>
                <div>
                  <h3 className="font-medium">Journée jet-ski</h3>
                  <p className="text-sm text-gray-600">2ème personne à moitié prix</p>
                  <p className="text-xs text-creole-blue mt-1">Jet Aventure</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
