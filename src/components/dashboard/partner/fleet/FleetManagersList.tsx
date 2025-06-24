
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Users, Trash2 } from "lucide-react";
import { 
  fetchFleetManagersByCompany, 
  updateFleetManagerPermissions,
  deleteFleetManager,
  FleetManager 
} from "@/services/fleetManagerService";

interface FleetManagersListProps {
  companyId: string;
  companyName: string;
}

export const FleetManagersList = ({ companyId, companyName }: FleetManagersListProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: managers = [], isLoading } = useQuery({
    queryKey: ['fleet-managers', companyId],
    queryFn: () => fetchFleetManagersByCompany(companyId),
  });

  const updatePermissionsMutation = useMutation({
    mutationFn: ({ managerId, permissions }: { managerId: string; permissions: FleetManager['permissions'] }) =>
      updateFleetManagerPermissions(managerId, permissions),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fleet-managers', companyId] });
      toast({
        title: "Permissions mises à jour",
        description: "Les permissions du gestionnaire ont été mises à jour avec succès.",
      });
    },
    onError: (error) => {
      console.error("Erreur lors de la mise à jour:", error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour les permissions.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFleetManager,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fleet-managers', companyId] });
      toast({
        title: "Gestionnaire supprimé",
        description: "Le gestionnaire a été supprimé avec succès.",
      });
    },
    onError: (error) => {
      console.error("Erreur lors de la suppression:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le gestionnaire.",
        variant: "destructive",
      });
    },
  });

  const handlePermissionChange = (managerId: string, permission: keyof FleetManager['permissions'], value: boolean) => {
    const manager = managers.find(m => m.id === managerId);
    if (!manager) return;

    const newPermissions = {
      ...manager.permissions,
      [permission]: value
    };

    updatePermissionsMutation.mutate({ managerId, permissions: newPermissions });
  };

  const handleDelete = (managerId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce gestionnaire ?")) {
      deleteMutation.mutate(managerId);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center h-32">
            <div className="text-lg">Chargement des gestionnaires...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Gestionnaires de Flotte - {companyName}
        </CardTitle>
        <p className="text-sm text-gray-600">
          {managers.length} gestionnaire{managers.length > 1 ? 's' : ''} assigné{managers.length > 1 ? 's' : ''}
        </p>
      </CardHeader>
      
      <CardContent>
        {managers.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Gestionnaire</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {managers.map((manager) => (
                <TableRow key={manager.id}>
                  <TableCell>
                    <div className="font-medium">
                      {manager.user?.first_name} {manager.user?.last_name}
                    </div>
                  </TableCell>
                  <TableCell>{manager.user?.email}</TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={manager.permissions.manage_vehicles}
                          onCheckedChange={(checked) => 
                            handlePermissionChange(manager.id, 'manage_vehicles', checked)
                          }
                        />
                        <span className="text-sm">Gérer véhicules</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={manager.permissions.view_reservations}
                          onCheckedChange={(checked) => 
                            handlePermissionChange(manager.id, 'view_reservations', checked)
                          }
                        />
                        <span className="text-sm">Voir réservations</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={manager.permissions.manage_reservations}
                          onCheckedChange={(checked) => 
                            handlePermissionChange(manager.id, 'manage_reservations', checked)
                          }
                        />
                        <span className="text-sm">Gérer réservations</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(manager.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 text-gray-500">
            Aucun gestionnaire assigné à cette entreprise.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
