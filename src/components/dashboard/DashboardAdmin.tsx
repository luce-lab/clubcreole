
import { useState, useEffect, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  ShoppingBag, 
  Activity, 
  CreditCard, 
  Calendar,
  Palmtree
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { UsersList } from "./UsersList";

interface DashboardAdminProps {
  selectedUserId?: string | null;
  onSelectUser?: (userId: string | null) => void;
}

// Use lazy loading to avoid circular dependencies and improve performance
const UserConsumptionHistory = lazy(() => import('./consumption/UserConsumptionHistory'));

export const DashboardAdmin = ({ selectedUserId, onSelectUser }: DashboardAdminProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("partners");
  
  // Si un utilisateur est sélectionné, passer à l'onglet de consommation
  useEffect(() => {
    if (selectedUserId) {
      setActiveTab("consumption");
    }
  }, [selectedUserId]);

  return (
    <div className="space-y-6">
      {/* Ajout d'une bannière très visible pour la gestion des loisirs */}
      <div className="bg-gradient-to-r from-creole-green/20 to-creole-green/10 p-4 rounded-lg border border-creole-green/30 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-creole-green rounded-full p-2">
              <Palmtree className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-creole-green">Gestion des Loisirs</h2>
              <p className="text-sm text-gray-600">Créez et gérez toutes vos activités de loisirs</p>
            </div>
          </div>
          <Button 
            onClick={() => navigate("/loisirs-management")} 
            size="lg"
            className="bg-creole-green hover:bg-creole-green/90 shadow-md"
          >
            <Palmtree className="mr-2 h-5 w-5" />
            Accéder à la gestion des loisirs
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Utilisateurs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,258</div>
            <p className="text-xs text-muted-foreground">+12% par rapport au mois dernier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Partenaires</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">+4 depuis le mois dernier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Activité</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">Connexions cette semaine</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Revenus</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,234€</div>
            <p className="text-xs text-muted-foreground">+18% par rapport au mois dernier</p>
          </CardContent>
        </Card>
      </div>

      {/* Section des liens de gestion rapides */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-blue-800">Gestion des Loisirs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-blue-700">
              Créez, modifiez ou supprimez des activités de loisirs et gérez les inscriptions
            </p>
            <Button 
              onClick={() => navigate("/loisirs-management")} 
              className="bg-creole-green hover:bg-creole-green/90"
            >
              <Palmtree className="mr-2 h-4 w-4" />
              Accéder à la gestion des loisirs
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200 hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-purple-800">Gestion des Utilisateurs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-purple-700">
              Consultez les informations des utilisateurs, modifiez leurs profils et leurs rôles
            </p>
            <Button 
              onClick={() => navigate("/users")} 
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Users className="mr-2 h-4 w-4" />
              Gérer les utilisateurs
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-3 h-auto">
            <TabsTrigger value="partners">Partenaires</TabsTrigger>
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
            <TabsTrigger value="consumption">Consommation</TabsTrigger>
          </TabsList>
        </div>
          
        <TabsContent value="partners" className="mt-4">
          <Card>
            <CardHeader className="flex justify-between">
              <div>
                <CardTitle>Derniers partenaires inscrits</CardTitle>
              </div>
              <Button onClick={() => navigate("/partners")} variant="outline" size="sm">
                Voir tous les partenaires
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Date d'inscription</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Aqua Plongée</TableCell>
                    <TableCell>Plongée</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Actif
                      </span>
                    </TableCell>
                    <TableCell>12/04/2025</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Jet Aventure</TableCell>
                    <TableCell>Jet-Ski</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Actif
                      </span>
                    </TableCell>
                    <TableCell>10/04/2025</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Resto Creole</TableCell>
                    <TableCell>Restauration</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                        En attente
                      </span>
                    </TableCell>
                    <TableCell>08/04/2025</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Hotel Karibea</TableCell>
                    <TableCell>Hébergement</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Actif
                      </span>
                    </TableCell>
                    <TableCell>05/04/2025</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="mt-4">
          <Card>
            <CardHeader className="flex justify-between">
              <div>
                <CardTitle>Utilisateurs récents</CardTitle>
              </div>
              <Button onClick={() => navigate("/users")} variant="outline" size="sm">
                Gérer tous les utilisateurs
              </Button>
            </CardHeader>
            <CardContent>
              <UsersList onSelectUser={onSelectUser} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="consumption" className="mt-4">
          <div className="mb-4">
            {selectedUserId && (
              <button 
                onClick={() => onSelectUser && onSelectUser(null)} 
                className="text-blue-600 hover:underline flex items-center"
              >
                ← Retour à la liste des utilisateurs
              </button>
            )}
          </div>
          <Suspense fallback={<div>Chargement...</div>}>
            <UserConsumptionHistory userId={selectedUserId || undefined} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
};
