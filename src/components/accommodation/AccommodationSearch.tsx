
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AccommodationSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  priceFilter: string;
  setPriceFilter: (filter: string) => void;
}

export const AccommodationSearch = ({
  searchTerm,
  setSearchTerm,
  priceFilter,
  setPriceFilter
}: AccommodationSearchProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-10">
      <h2 className="text-2xl font-bold mb-6 text-creole-green">Trouvez votre hébergement idéal</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Rechercher par nom, lieu ou type..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="md:w-1/4">
          <select
            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <option value="">Prix (Tous)</option>
            <option value="low">Économique (≤ 80€)</option>
            <option value="medium">Modéré (80-100€)</option>
            <option value="high">Premium (≥ 100€)</option>
          </select>
        </div>
        <Button 
          className="bg-creole-green hover:bg-creole-green/90"
          onClick={() => {
            setSearchTerm("");
            setPriceFilter("");
          }}
        >
          Réinitialiser
        </Button>
      </div>
    </div>
  );
};
