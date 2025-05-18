
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { ConsumptionItem } from "./types";
import { formatDate } from "./utils";
import { getStatusBadge, getTypeBadge } from "./ConsumptionBadges";

interface ConsumptionTableProps {
  filteredHistory: ConsumptionItem[];
}

export const ConsumptionTable: React.FC<ConsumptionTableProps> = ({ filteredHistory }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Catégorie</TableHead>
          <TableHead>Détail</TableHead>
          <TableHead>Prix</TableHead>
          <TableHead>Statut</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredHistory.length > 0 ? (
          filteredHistory.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{formatDate(item.date)}</TableCell>
              <TableCell>{getTypeBadge(item.type)}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell className="font-medium">{item.itemName}</TableCell>
              <TableCell>{item.price ? `${item.price}€` : "—"}</TableCell>
              <TableCell>{getStatusBadge(item.status)}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="h-24 text-center">
              Aucune activité trouvée avec ces critères
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
