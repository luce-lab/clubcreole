
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Car, Edit, Plus, Users, Wind } from "lucide-react";
import { 
  fetchCarModelsByCompany, 
  updateCarModelStatus,
  CarModelForPartner 
} from "@/services/partnerCarRentalService";

interface VehicleManagementProps {
  companyId: string;
  companyName: string;
  onBack: () => void;
}

export const VehicleManagement = ({ companyId, companyName, onBack }: VehicleManagementProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: models = [], isLoading } = useQuery({
    queryKey: ['car-models', companyId],
    queryFn: () => fetchCarModelsByCompany(companyId),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ modelId, isActive }: { modelId: number; isActive: boolean }) => 
      updateCarModelStatus(modelId, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['car-models', companyId] });
      toast({
        title: "Statut mis à jour",
        description: "Le statut du véhicule a été mis à jour avec succès.",
      });
    },
    onError: (error) => {
      console.error("Erreur lors de la mise à jour:", error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut du véhicule.",
        variant: "destructive",
      });
    },
  });

  const handleStatusChange = (modelId: number, isActive: boolean) => {
    updateStatusMutation.mutate({ modelId, isActive });
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center h-32">
            <div className="text-lg">Chargement des véhicules...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                Retour
              </Button>
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  Gestion Flotte - {companyName}
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Gérez les véhicules de votre entreprise
                </p>
              </div>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-1" />
              Ajouter Véhicule
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{models.length}</div>
                <p className="text-xs text-muted-foreground">Total véhicules</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-green-600">
                  {models.filter(m => m.is_active).length}
                </div>
                <p className="text-xs text-muted-foreground">Actifs</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-gray-600">
                  {models.filter(m => !m.is_active).length}
                </div>
                <p className="text-xs text-muted-foreground">Inactifs</p>
              </CardContent>
            </Card>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Véhicule</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Prix/Jour</TableHead>
                <TableHead>Caractéristiques</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {models.map((model) => (
                <TableRow key={model.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img 
                        src={model.image} 
                        alt={model.name}
                        className="w-12 h-8 object-cover rounded"
                      />
                      <div>
                        <div className="font-medium">{model.name}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{model.category}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {model.price_per_day}€
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span className="text-xs">{model.seats}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {model.transmission}
                      </Badge>
                      {model.air_con && (
                        <Badge variant="secondary" className="text-xs">
                          <Wind className="h-3 w-3 mr-1" />
                          Clim
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={model.is_active}
                        onCheckedChange={(checked) => handleStatusChange(model.id, checked)}
                      />
                      <span className="text-sm">
                        {model.is_active ? "Actif" : "Inactif"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {models.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Aucun véhicule trouvé pour cette entreprise.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
