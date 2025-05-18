
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus } from "lucide-react";

export const PartnerClients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Données fictives pour la démonstration
  const clients = [
    {
      id: "1", 
      name: "Jean Dupont", 
      email: "jean.dupont@example.com", 
      phone: "+596 123 456 789",
      joinedDate: "10/01/2025", 
      reservationsCount: 3,
      totalSpent: "450€"
    },
    {
      id: "2", 
      name: "Marie Lambert", 
      email: "marie.lambert@example.com", 
      phone: "+596 234 567 890",
      joinedDate: "15/02/2025", 
      reservationsCount: 1,
      totalSpent: "120€"
    },
    {
      id: "3", 
      name: "Thomas Martin", 
      email: "thomas.martin@example.com", 
      phone: "+596 345 678 901",
      joinedDate: "20/02/2025", 
      reservationsCount: 2,
      totalSpent: "380€"
    },
    {
      id: "4", 
      name: "Sophie Dubois", 
      email: "sophie.dubois@example.com", 
      phone: "+596 456 789 012",
      joinedDate: "05/03/2025", 
      reservationsCount: 1,
      totalSpent: "95€"
    },
    {
      id: "5", 
      name: "Lucas Moreau", 
      email: "lucas.moreau@example.com", 
      phone: "+596 567 890 123",
      joinedDate: "12/03/2025", 
      reservationsCount: 4,
      totalSpent: "720€"
    }
  ];

  // Filtrage des clients en fonction de la recherche
  const filteredClients = clients.filter(client => {
    return client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
           client.phone.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un client..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un client
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Date d'inscription</TableHead>
              <TableHead>Réservations</TableHead>
              <TableHead>Total dépensé</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Aucun client trouvé
                </TableCell>
              </TableRow>
            ) : (
              filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell>{client.joinedDate}</TableCell>
                  <TableCell>{client.reservationsCount}</TableCell>
                  <TableCell>{client.totalSpent}</TableCell>
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
