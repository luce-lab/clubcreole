
<<<<<<< HEAD
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarClock, Users, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PartnerReservations } from "./partner/PartnerReservations";
import { PartnerClients } from "./partner/PartnerClients";
import { PartnerOffers } from "./partner/PartnerOffers";

export const DashboardPartner = () => {
  const [activeTab, setActiveTab] = useState("overview");

=======
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarClock, Users, ShoppingBag, Star } from "lucide-react";

export const DashboardPartner = () => {
>>>>>>> f563802 (feat: Implement dashboard structure)
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Réservations</CardTitle>
            <CalendarClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">Cette semaine</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">184</div>
            <p className="text-xs text-muted-foreground">+12% depuis le mois dernier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Offres</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Actives en ce moment</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Note moyenne</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <p className="text-xs text-muted-foreground">Basée sur 76 avis</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
<<<<<<< HEAD
          <CardTitle>Gestion partenaire</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Aperçu</TabsTrigger>
              <TabsTrigger value="reservations">Réservations</TabsTrigger>
              <TabsTrigger value="clients">Clients</TabsTrigger>
              <TabsTrigger value="offers">Offres</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Dernières réservations</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Jean Dupont</TableCell>
                      <TableCell>Plongée découverte</TableCell>
                      <TableCell>15/04/2025</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          Confirmé
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Marie Lambert</TableCell>
                      <TableCell>Plongée exploration</TableCell>
                      <TableCell>16/04/2025</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                          En attente
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Thomas Martin</TableCell>
                      <TableCell>Formation niveau 1</TableCell>
                      <TableCell>18/04/2025</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          Confirmé
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Sophie Dubois</TableCell>
                      <TableCell>Baptême de plongée</TableCell>
                      <TableCell>20/04/2025</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          Payé
                        </span>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <div className="flex justify-between items-center mt-6">
                  <h3 className="text-lg font-medium">Statistiques rapides</h3>
                  <Button variant="outline" size="sm">Voir toutes les statistiques</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Taux de conversion</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">68%</div>
                      <p className="text-xs text-muted-foreground">+5% par rapport au mois dernier</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Chiffre d'affaires</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">4,280€</div>
                      <p className="text-xs text-muted-foreground">Ce mois-ci</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reservations">
              <PartnerReservations />
            </TabsContent>
            
            <TabsContent value="clients">
              <PartnerClients />
            </TabsContent>
            
            <TabsContent value="offers">
              <PartnerOffers />
            </TabsContent>
          </Tabs>
=======
          <CardTitle>Dernières réservations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Jean Dupont</TableCell>
                <TableCell>Plongée découverte</TableCell>
                <TableCell>15/04/2025</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    Confirmé
                  </span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Marie Lambert</TableCell>
                <TableCell>Plongée exploration</TableCell>
                <TableCell>16/04/2025</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                    En attente
                  </span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Thomas Martin</TableCell>
                <TableCell>Formation niveau 1</TableCell>
                <TableCell>18/04/2025</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    Confirmé
                  </span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Sophie Dubois</TableCell>
                <TableCell>Baptême de plongée</TableCell>
                <TableCell>20/04/2025</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    Payé
                  </span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
>>>>>>> f563802 (feat: Implement dashboard structure)
        </CardContent>
      </Card>
    </div>
  );
};
