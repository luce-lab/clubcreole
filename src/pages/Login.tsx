
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

const Login = () => {
  const location = useLocation();
  const initialTab = location.state?.activeTab || "login";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [email, setEmail] = useState("");
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
          </TabsContent>
          
          <TabsContent value="register">
            <RegisterForm onSuccess={handleRegisterSuccess} />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Login;
