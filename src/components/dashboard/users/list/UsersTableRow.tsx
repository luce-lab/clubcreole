
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, History } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { SubscriptionBadge } from "./SubscriptionBadge";
import { UserSubscription } from "./types";

interface UsersTableRowProps {
  user: UserSubscription;
  onSelectUser: (userId: string) => void;
  onEditUser: (userId: string) => void;
}

export const UsersTableRow = ({ 
  user, 
  onSelectUser, 
  onEditUser 
}: UsersTableRowProps) => {
  return (
    <TableRow key={user.id} className="cursor-pointer hover:bg-slate-50">
      <TableCell 
        className="font-medium"
        onClick={() => onSelectUser(user.id)}
      >
        {user.name}
      </TableCell>
      <TableCell
        onClick={() => onSelectUser(user.id)}
      >
        {user.email}
      </TableCell>
      <TableCell
        onClick={() => onSelectUser(user.id)}
      >
        <StatusBadge status={user.subscriptionStatus} />
      </TableCell>
      <TableCell
        onClick={() => onSelectUser(user.id)}
      >
        <SubscriptionBadge type={user.subscriptionType} />
      </TableCell>
      <TableCell
        onClick={() => onSelectUser(user.id)}
      >
        {user.subscriptionEndDate || "—"}
      </TableCell>
      <TableCell
        onClick={() => onSelectUser(user.id)}
      >
        {user.registeredDate}
      </TableCell>
      <TableCell
        onClick={() => onSelectUser(user.id)}
      >
        {user.lastActivity}
      </TableCell>
      <TableCell>
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onEditUser(user.id);
            }}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onSelectUser(user.id);
            }}
          >
            <History className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
