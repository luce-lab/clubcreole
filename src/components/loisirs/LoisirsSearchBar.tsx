
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface LoisirsSearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  value?: string;
}

const LoisirsSearchBar = ({ onSearch, placeholder = "Rechercher par mots-clés...", value = "" }: LoisirsSearchBarProps) => {
  const searchQuery = value;

  const handleSearch = (query: string) => {
    onSearch(query);
  };

  const clearSearch = () => {
    onSearch("");
  };

  return (
    <div className="relative max-w-md mx-auto mb-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      {searchQuery && (
        <p className="text-sm text-gray-600 mt-2">
          Recherche pour : "{searchQuery}"
        </p>
      )}
    </div>
  );
};

export default LoisirsSearchBar;
