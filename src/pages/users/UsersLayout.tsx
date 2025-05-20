
import { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader,
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface UsersLayoutProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  selectedUserId: string | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  listContent: ReactNode;
  detailsContent: ReactNode;
  consumptionContent: ReactNode;
}

export const UsersLayout = ({
  activeTab,
  onTabChange,
  selectedUserId,
  searchQuery,
  onSearchChange,
  listContent,
  detailsContent,
  consumptionContent
}: UsersLayoutProps) => {
  return (
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
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="list" value={activeTab} onValueChange={onTabChange}>
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
            {listContent}
          </TabsContent>
          
          <TabsContent value="details">
            {selectedUserId && detailsContent}
          </TabsContent>
          
          <TabsContent value="consumption">
            {selectedUserId && consumptionContent}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UsersLayout;
