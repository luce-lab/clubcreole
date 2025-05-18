
import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { 
  Card, 
  CardContent, 
  CardHeader,
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShoppingBag, Plus, Search, Edit, Trash2 } from "lucide-react";

const PartnersManagement = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  
  // Données de partenaires fictives pour la démonstration
  const partners = [
    { id: "1", name: "Aqua Plongée", category: "Activité", status: "active", joinedDate: "01/02/2025", revenue: "2450€" },
    { id: "2", name: "Hôtel Karibea", category: "Hébergement", status: "active", joinedDate: "15/01/2025", revenue: "12350€" },
    { id: "3", name: "Location Caraïbes", category: "Location", status: "pending", joinedDate: "05/03/2025", revenue: "0€" },
    { id: "4", name: "Restaurant du Port", category: "Restauration", status: "active", joinedDate: "20/02/2025", revenue: "3650€" },
    { id: "5", name: "Club Cyclone", category: "Événement", status: "inactive", joinedDate: "10/12/2024", revenue: "8900€" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-creole-green">Gestion des Partenaires</h1>
            <p className="text-sm text-gray-600">
              Gérez tous les partenaires de la plateforme
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un partenaire
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Partenaires</CardTitle>
                <CardDescription>Liste des partenaires enregistrés sur la plateforme</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Input 
                  placeholder="Rechercher un partenaire..." 
                  className="w-64" 
                  icon={<Search className="h-4 w-4 opacity-50" />}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">Tous</TabsTrigger>
                <TabsTrigger value="active">Actifs</TabsTrigger>
                <TabsTrigger value="pending">En attente</TabsTrigger>
                <TabsTrigger value="inactive">Inactifs</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <PartnersList partners={partners} />
              </TabsContent>
              
              <TabsContent value="active">
                <PartnersList partners={partners.filter(p => p.status === 'active')} />
              </TabsContent>
              
              <TabsContent value="pending">
                <PartnersList partners={partners.filter(p => p.status === 'pending')} />
              </TabsContent>
              
              <TabsContent value="inactive">
                <PartnersList partners={partners.filter(p => p.status === 'inactive')} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

// Sous-composant pour la liste des partenaires
const PartnersList = ({ partners }: { partners: any[] }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Date d'inscription</TableHead>
            <TableHead>Revenus générés</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {partners.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                Aucun partenaire trouvé
              </TableCell>
            </TableRow>
          ) : (
            partners.map((partner) => (
              <TableRow key={partner.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <div className="bg-creole-green/10 p-2 rounded-md">
                      <ShoppingBag className="h-4 w-4 text-creole-green" />
                    </div>
                    {partner.name}
                  </div>
                </TableCell>
                <TableCell>{partner.category}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    partner.status === 'active' ? 'bg-green-100 text-green-700' :
                    partner.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {partner.status === 'active' ? 'Actif' :
                     partner.status === 'pending' ? 'En attente' : 'Inactif'}
                  </span>
                </TableCell>
                <TableCell>{partner.joinedDate}</TableCell>
                <TableCell>{partner.revenue}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PartnersManagement;
