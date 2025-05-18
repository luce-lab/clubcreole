
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterConfig } from "./types";

export const ConsumptionFilters: React.FC<FilterConfig> = ({
  categoryFilter,
  typeFilter,
  statusFilter,
  setCategoryFilter,
  setTypeFilter,
  setStatusFilter,
  categories,
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <div className="w-full md:w-auto">
        <label className="text-sm font-medium">Catégorie</label>
        <Select value={categoryFilter || "all"} onValueChange={(value) => setCategoryFilter(value === "all" ? null : value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Toutes les catégories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les catégories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="w-full md:w-auto">
        <label className="text-sm font-medium">Type</label>
        <Select value={typeFilter || "all"} onValueChange={(value: any) => setTypeFilter(value === "all" ? null : value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tous les types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            <SelectItem value="réservation">Réservation</SelectItem>
            <SelectItem value="achat">Achat</SelectItem>
            <SelectItem value="consultation">Consultation</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="w-full md:w-auto">
        <label className="text-sm font-medium">Statut</label>
        <Select value={statusFilter || "all"} onValueChange={(value: any) => setStatusFilter(value === "all" ? null : value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tous les statuts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="complété">Complété</SelectItem>
            <SelectItem value="annulé">Annulé</SelectItem>
            <SelectItem value="en cours">En cours</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
