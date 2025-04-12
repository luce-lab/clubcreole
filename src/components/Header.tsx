
import { Palmtree } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Newsletter } from "./Newsletter";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export const Header = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

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
        <div className="flex items-center gap-6">
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
            {isLoggedIn ? (
              <>
                <Button variant="outline" onClick={() => navigate("/dashboard")}>
                  Tableau de bord
                </Button>
                <Button variant="ghost" onClick={handleLogout}>
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
