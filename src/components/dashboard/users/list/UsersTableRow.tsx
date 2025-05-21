
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, History, Lock } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { SubscriptionBadge } from "./SubscriptionBadge";
import { UserSubscription } from "./types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface UsersTableRowProps {
  user: UserSubscription;
  onSelectUser: (userId: string) => void;
  onEditUser: (userId: string) => void;
  isSuperAdmin: boolean;
}

export const UsersTableRow = ({ 
  user, 
  onSelectUser, 
  onEditUser,
  isSuperAdmin
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
        {user.registrationDate}
      </TableCell>
      <TableCell
        onClick={() => onSelectUser(user.id)}
      >
        {user.lastActivity}
      </TableCell>
      <TableCell>
        <div className="flex space-x-2">
          {isSuperAdmin ? (
            <>
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
            </>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    disabled
                  >
                    <Lock className="h-4 w-4 text-gray-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Accès restreint à l'administrateur principal</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};
