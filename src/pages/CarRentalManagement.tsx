
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { 
  fetchCarRentalReservations, 
  updateCarRentalReservationStatus, 
  deleteCarRentalReservation,
  CarRentalReservation 
} from "@/services/carRentalService";
import { Trash2, Eye, CheckCircle, XCircle, Clock } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const CarRentalManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedReservation, setSelectedReservation] = useState<CarRentalReservation | null>(null);

  const { data: reservations = [], isLoading, error } = useQuery({
    queryKey: ['car-rental-reservations'],
    queryFn: fetchCarRentalReservations,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => 
      updateCarRentalReservationStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['car-rental-reservations'] });
      toast({
        title: "Statut mis à jour",
        description: "Le statut de la réservation a été mis à jour avec succès.",
      });
    },
    onError: (error) => {
      console.error("Erreur lors de la mise à jour:", error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut de la réservation.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCarRentalReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['car-rental-reservations'] });
      toast({
        title: "Réservation supprimée",
        description: "La réservation a été supprimée avec succès.",
      });
    },
    onError: (error) => {
      console.error("Erreur lors de la suppression:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la réservation.",
        variant: "destructive",
      });
    },
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Confirmé</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />En attente</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Annulé</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Chargement des réservations...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-red-600">Erreur lors du chargement des réservations</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-creole-green">
              Gestion des Locations de Voitures
            </CardTitle>
            <p className="text-gray-600">
              Gérez toutes les réservations de location de voitures des clients
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">{reservations.length}</div>
                  <p className="text-xs text-muted-foreground">Total réservations</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-green-600">
                    {reservations.filter(r => r.status === 'confirmed').length}
                  </div>
                  <p className="text-xs text-muted-foreground">Confirmées</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-yellow-600">
                    {reservations.filter(r => r.status === 'pending').length}
                  </div>
                  <p className="text-xs text-muted-foreground">En attente</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-red-600">
                    {reservations.filter(r => r.status === 'cancelled').length}
                  </div>
                  <p className="text-xs text-muted-foreground">Annulées</p>
                </CardContent>
              </Card>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Entreprise</TableHead>
                  <TableHead>Modèle</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reservations.map((reservation) => (
                  <TableRow key={reservation.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{reservation.driver_name}</div>
                        <div className="text-sm text-gray-500">{reservation.driver_email}</div>
                        <div className="text-sm text-gray-500">{reservation.driver_phone}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {reservation.rental_company_name}
                    </TableCell>
                    <TableCell>{reservation.selected_model}</TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm">Du {formatDate(reservation.start_date)}</div>
                        <div className="text-sm">Au {formatDate(reservation.end_date)}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(reservation.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedReservation(reservation)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {reservation.status === 'pending' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-green-600"
                            onClick={() => updateStatusMutation.mutate({ 
                              id: reservation.id, 
                              status: 'confirmed' 
                            })}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                        {reservation.status !== 'cancelled' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-red-600"
                            onClick={() => updateStatusMutation.mutate({ 
                              id: reservation.id, 
                              status: 'cancelled' 
                            })}
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        )}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" className="text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Supprimer la réservation</AlertDialogTitle>
                              <AlertDialogDescription>
                                Êtes-vous sûr de vouloir supprimer cette réservation ? Cette action est irréversible.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annuler</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteMutation.mutate(reservation.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Supprimer
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {reservations.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Aucune réservation de location de voiture trouvée.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Modal de détails */}
        {selectedReservation && (
          <AlertDialog open={!!selectedReservation} onOpenChange={() => setSelectedReservation(null)}>
            <AlertDialogContent className="max-w-2xl">
              <AlertDialogHeader>
                <AlertDialogTitle>Détails de la réservation</AlertDialogTitle>
              </AlertDialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold">Informations client</h4>
                    <p><strong>Nom:</strong> {selectedReservation.driver_name}</p>
                    <p><strong>Email:</strong> {selectedReservation.driver_email}</p>
                    <p><strong>Téléphone:</strong> {selectedReservation.driver_phone}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Informations location</h4>
                    <p><strong>Entreprise:</strong> {selectedReservation.rental_company_name}</p>
                    <p><strong>Modèle:</strong> {selectedReservation.selected_model}</p>
                    <p><strong>Statut:</strong> {getStatusBadge(selectedReservation.status)}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">Dates</h4>
                  <p><strong>Du:</strong> {formatDate(selectedReservation.start_date)}</p>
                  <p><strong>Au:</strong> {formatDate(selectedReservation.end_date)}</p>
                </div>
                {selectedReservation.notes && (
                  <div>
                    <h4 className="font-semibold">Notes</h4>
                    <p>{selectedReservation.notes}</p>
                  </div>
                )}
                <div>
                  <h4 className="font-semibold">Informations système</h4>
                  <p><strong>Créé le:</strong> {formatDate(selectedReservation.created_at)}</p>
                  <p><strong>Modifié le:</strong> {formatDate(selectedReservation.updated_at)}</p>
                </div>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setSelectedReservation(null)}>
                  Fermer
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CarRentalManagement;
