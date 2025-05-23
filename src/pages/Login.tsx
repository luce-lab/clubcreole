
<<<<<<< HEAD
import { useState, useEffect } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cleanupAuthState } from "@/integrations/supabase/client";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { AuthLoadingState } from "@/components/auth/AuthLoadingState";
import { AdminDevTools } from "@/components/auth/AdminDevTools";
=======
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
>>>>>>> f563802 (feat: Implement dashboard structure)

const Login = () => {
  const location = useLocation();
  const initialTab = location.state?.activeTab || "login";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [email, setEmail] = useState("");
<<<<<<< HEAD
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isLoading: authLoading } = useAuth();
  const [clientSideLoading, setClientSideLoading] = useState(false);

  // Clean up auth state when component mounts
  useEffect(() => {
    cleanupAuthState();
  }, []);

  // Handle redirection when user is authenticated
  useEffect(() => {
    if (user && !authLoading) {
      setClientSideLoading(true);
      navigate("/dashboard", { replace: true });
    } else {
      setClientSideLoading(false);
    }
  }, [user, authLoading, navigate]);

  const handleLoginSuccess = () => {
    toast({
      title: "Connexion réussie",
      description: "Vous êtes maintenant connecté",
    });
    // Redirection will be handled by the useEffect
=======
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Erreur de connexion",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Connexion réussie",
        description: "Vous êtes maintenant connecté",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Erreur de connexion",
        description: "Une erreur s'est produite",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
>>>>>>> f563802 (feat: Implement dashboard structure)
  };

  const handleRegisterSuccess = (registeredEmail: string) => {
    setActiveTab("login");
    setEmail(registeredEmail);
  };

  // Show loading state when auth is being checked
  if (authLoading) {
    return <AuthLoadingState message="Vérification de l'authentification..." />;
  }

  // Show loading state during redirection
  if (clientSideLoading) {
    return <AuthLoadingState message="Redirection vers le tableau de bord..." />;
  }

  // User is already authenticated, redirect to dashboard
  if (user) {
    return null; // Will be redirected by useEffect
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-bold text-creole-green">
            Club Créole
          </CardTitle>
          <CardDescription className="text-center">
            Connectez-vous ou créez un compte pour accéder à votre espace
          </CardDescription>
        </CardHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Connexion</TabsTrigger>
            <TabsTrigger value="register">Inscription</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <LoginForm onSuccess={handleLoginSuccess} />
            <div className="px-6 pb-4">
              <AdminDevTools />
            </div>
<<<<<<< HEAD
          </TabsContent>
          
          <TabsContent value="register">
            <RegisterForm onSuccess={handleRegisterSuccess} />
          </TabsContent>
        </Tabs>
=======
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full bg-creole-green hover:bg-creole-green/90"
              disabled={isLoading}
            >
              {isLoading ? "Connexion en cours..." : "Se connecter"}
            </Button>
            <p className="text-center text-sm text-gray-600">
              Pas encore de compte ?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-creole-green hover:underline"
              >
                S'inscrire
              </button>
            </p>
          </CardFooter>
        </form>
>>>>>>> f563802 (feat: Implement dashboard structure)
      </Card>
    </div>
  );
};

export default Login;
