
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface VoyanceSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const VoyanceSearchBar = ({ searchTerm, onSearchChange }: VoyanceSearchBarProps) => {
  return (
    <div className="mb-8">
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          placeholder="Rechercher par spécialité..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4 py-3 w-full rounded-full border-gray-300 focus:border-purple-500 focus:ring-purple-500"
        />
      </div>
    </div>
  );
};

export default VoyanceSearchBar;
