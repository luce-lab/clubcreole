
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Calendar } from "lucide-react";

export const PartnerReservations = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Données fictives pour la démonstration
  const reservations = [
    {
      id: "1", 
      client: "Jean Dupont", 
      email: "jean.dupont@example.com", 
      service: "Plongée découverte", 
      date: "15/04/2025", 
      time: "10:00", 
      persons: 2,
      status: "confirmed",
      payment: "paid"
    },
    {
      id: "2", 
      client: "Marie Lambert", 
      email: "marie.lambert@example.com", 
      service: "Plongée exploration", 
      date: "16/04/2025", 
      time: "14:30", 
      persons: 3,
      status: "pending",
      payment: "pending"
    },
    {
      id: "3", 
      client: "Thomas Martin", 
      email: "thomas.martin@example.com", 
      service: "Formation niveau 1", 
      date: "18/04/2025", 
      time: "09:00", 
      persons: 1,
      status: "confirmed",
      payment: "paid"
    },
    {
      id: "4", 
      client: "Sophie Dubois", 
      email: "sophie.dubois@example.com", 
      service: "Baptême de plongée", 
      date: "20/04/2025", 
      time: "11:15", 
      persons: 4,
      status: "confirmed",
      payment: "paid"
    },
    {
      id: "5", 
      client: "Lucas Moreau", 
      email: "lucas.moreau@example.com", 
      service: "Plongée de nuit", 
      date: "25/04/2025", 
      time: "19:30", 
      persons: 2,
      status: "cancelled",
      payment: "refunded"
    }
  ];

  // Filtrage des réservations en fonction du statut et de la recherche
  const filteredReservations = reservations.filter(reservation => {
    const matchesStatus = filterStatus === "all" || reservation.status === filterStatus;
    const matchesSearch = reservation.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          reservation.service.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadgeClasses = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmé";
      case "pending":
        return "En attente";
      case "cancelled":
        return "Annulé";
      default:
        return status;
    }
  };

  const getPaymentBadgeClasses = (payment: string) => {
    switch (payment) {
      case "paid":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-amber-100 text-amber-800";
      case "refunded":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentLabel = (payment: string) => {
    switch (payment) {
      case "paid":
        return "Payé";
      case "pending":
        return "En attente";
      case "refunded":
        return "Remboursé";
      default:
        return payment;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher une réservation..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="confirmed">Confirmé</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="cancelled">Annulé</SelectItem>
            </SelectContent>
          </Select>
          <Button>Nouvelle réservation</Button>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Heure</TableHead>
              <TableHead>Personnes</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Paiement</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReservations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  Aucune réservation trouvée
                </TableCell>
              </TableRow>
            ) : (
              filteredReservations.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{reservation.client}</div>
                      <div className="text-sm text-muted-foreground">{reservation.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{reservation.service}</TableCell>
                  <TableCell>{reservation.date}</TableCell>
                  <TableCell>{reservation.time}</TableCell>
                  <TableCell>{reservation.persons}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClasses(reservation.status)}`}>
                      {getStatusLabel(reservation.status)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getPaymentBadgeClasses(reservation.payment)}`}>
                      {getPaymentLabel(reservation.payment)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Détails</Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
