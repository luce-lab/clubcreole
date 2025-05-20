
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { UsersTableRow } from "./UsersTableRow";
import { UserSubscription } from "./types";

interface UsersTableProps {
  users: UserSubscription[];
  onSelectUser: (userId: string) => void;
  onEditUser: (userId: string) => void;
}

export const UsersTable = ({ users, onSelectUser, onEditUser }: UsersTableProps) => {
  if (users.length === 0) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date d'expiration</TableHead>
            <TableHead>Inscription</TableHead>
            <TableHead>Dernière activité</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={8} className="text-center py-6 text-gray-500">
              Aucun utilisateur trouvé
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Date d'expiration</TableHead>
          <TableHead>Inscription</TableHead>
          <TableHead>Dernière activité</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <UsersTableRow 
            key={user.id} 
            user={user} 
            onSelectUser={onSelectUser} 
            onEditUser={onEditUser} 
          />
        ))}
      </TableBody>
    </Table>
  );
};
