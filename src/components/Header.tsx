
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Newsletter } from "./Newsletter";
import { useState } from "react";
import { useAuth } from "@/contexts/auth";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/ee9cef8d-d74a-4118-94e3-80f17f1e3fc2.png" 
            alt="Club Créole Logo" 
            className="h-20 w-auto cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-6">
            <a href="#activities" className="text-gray-600 hover:text-creole-green transition-colors">
              Activités
            </a>
            <a href="#advantages" className="text-gray-600 hover:text-creole-green transition-colors">
              Bons Plans
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-creole-green transition-colors">
              Prix
            </a>
            <a href="#cyclone" className="text-gray-600 hover:text-creole-green transition-colors">
              Club Cyclone
            </a>
            <button 
              onClick={() => navigate("/devenir-partenaire")}
              className={`transition-colors ${
                isActive("/devenir-partenaire") 
                  ? "text-creole-green font-semibold" 
                  : "text-gray-600 hover:text-creole-green"
              }`}
            >
              Devenir partenaire
            </button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <button className="text-gray-600 hover:text-creole-green transition-colors">
                  Newsletter
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <Newsletter onSuccess={() => setIsDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </nav>
          <div className="flex gap-2">
            {user ? (
              <>
                <Button variant="default" className="bg-creole-green hover:bg-creole-green/90" onClick={() => navigate("/dashboard")}>
                  Tableau de bord
                </Button>
                <Button variant="outline" onClick={handleLogout}>
                  Déconnexion
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate("/login")}>
                  Connexion
                </Button>
                <Button variant="default" className="bg-creole-green hover:bg-creole-green/90" onClick={() => navigate("/register")}>
                  Inscription
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
