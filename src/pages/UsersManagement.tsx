import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Plus, Search, UserPlus } from "lucide-react";
import { UsersList } from "@/components/dashboard/UsersList";
import { AddUserDialog } from "@/components/dashboard/users/AddUserDialog";
import { EditUserDialog } from "@/components/dashboard/users/EditUserDialog";
import UserConsumptionHistory from "@/components/dashboard/consumption/UserConsumptionHistory";

const UsersManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("list");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState<boolean>(false);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState<boolean>(false);
  
  const handleSelectUser = (userId: string) => {
    setSelectedUserId(userId);
    setActiveTab("details");
  };

  const handleEditUser = (userId: string) => {
    setSelectedUserId(userId);
    setIsEditUserDialogOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-creole-green">Gestion des Utilisateurs</h1>
            <p className="text-sm text-gray-600">
              Gérez les comptes utilisateurs de la plateforme
            </p>
          </div>
          <Button onClick={() => setIsAddUserDialogOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Ajouter un utilisateur
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Utilisateurs</CardTitle>
                <CardDescription>Liste des utilisateurs enregistrés sur la plateforme</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher un utilisateur..."
                    className="pl-8 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="list" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="list">Liste des utilisateurs</TabsTrigger>
                <TabsTrigger value="details" disabled={!selectedUserId}>
                  Détails de l'utilisateur
                </TabsTrigger>
                <TabsTrigger value="consumption" disabled={!selectedUserId}>
                  Historique de consommation
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="list">
                <UsersList 
                  onSelectUser={handleSelectUser} 
                  onEditUser={handleEditUser}
                  searchQuery={searchQuery}
                />
              </TabsContent>
              
              <TabsContent value="details">
                {selectedUserId && (
                  <UserDetails 
                    userId={selectedUserId} 
                    onEdit={() => setIsEditUserDialogOpen(true)}
                  />
                )}
              </TabsContent>
              
              <TabsContent value="consumption">
                {selectedUserId && (
                  <UserConsumptionHistory userId={selectedUserId} />
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <AddUserDialog 
          open={isAddUserDialogOpen} 
          onClose={() => setIsAddUserDialogOpen(false)} 
        />
        
        {selectedUserId && (
          <EditUserDialog 
            open={isEditUserDialogOpen} 
            onClose={() => setIsEditUserDialogOpen(false)} 
            userId={selectedUserId}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

// Composant pour afficher les détails d'un utilisateur
const UserDetails = ({ userId, onEdit }: { userId: string, onEdit: () => void }) => {
  // Pour la démo, on utilise des données fictives
  // Dans un vrai cas d'usage, ces données viendraient d'un appel API
  const user = {
    id: userId,
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    phone: "+596 123 456 789",
    address: "123 Avenue des Cocotiers, Fort-de-France",
    registeredDate: "2024-01-10",
    lastLogin: "2025-05-15",
    subscription: {
      type: "Premium",
      status: "Actif",
      startDate: "2025-01-15",
      endDate: "2025-07-15",
      autoRenew: true,
      price: "15.99€/mois"
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold mb-1">{user.name}</h3>
          <p className="text-sm text-gray-500">Inscrit le {user.registeredDate}</p>
        </div>
        <Button onClick={onEdit}>Modifier l'utilisateur</Button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Informations personnelles</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="font-medium text-sm text-gray-500">Email:</dt>
                <dd>{user.email}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-sm text-gray-500">Téléphone:</dt>
                <dd>{user.phone}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-sm text-gray-500">Adresse:</dt>
                <dd>{user.address}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-sm text-gray-500">Dernière connexion:</dt>
                <dd>{user.lastLogin}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Abonnement</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="font-medium text-sm text-gray-500">Type:</dt>
                <dd className="font-semibold text-blue-600">{user.subscription.type}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-sm text-gray-500">Statut:</dt>
                <dd>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {user.subscription.status}
                  </span>
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-sm text-gray-500">Date de début:</dt>
                <dd>{user.subscription.startDate}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-sm text-gray-500">Date de fin:</dt>
                <dd>{user.subscription.endDate}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-sm text-gray-500">Renouvellement auto:</dt>
                <dd>{user.subscription.autoRenew ? "Oui" : "Non"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-sm text-gray-500">Tarif:</dt>
                <dd>{user.subscription.price}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UsersManagement;
