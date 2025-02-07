
import { Palmtree } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Palmtree className="h-8 w-8 text-creole-green" />
          <div>
            <h1 className="text-2xl font-bold text-creole-green">Club Créole</h1>
            <p className="text-sm text-creole-blue">Le partenaire de vos Loisirs !</p>
          </div>
        </div>
        <nav className="hidden md:flex gap-6">
          <a href="#activities" className="text-gray-600 hover:text-creole-green transition-colors">
            Activités
          </a>
          <a href="#advantages" className="text-gray-600 hover:text-creole-green transition-colors">
            Avantages
          </a>
          <a href="#pricing" className="text-gray-600 hover:text-creole-green transition-colors">
            Prix
          </a>
          <a href="#cyclone" className="text-gray-600 hover:text-creole-green transition-colors">
            Club Cyclone
          </a>
        </nav>
      </div>
    </header>
  );
};
