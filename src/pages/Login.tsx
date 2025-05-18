
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn, signUp, user, isLoading: authLoading } = useAuth();

  // Si l'utilisateur est déjà connecté, redirection vers le tableau de bord
  useEffect(() => {
    if (user) {
      console.log('User is authenticated, redirecting to dashboard:', user);
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Handle sign in triggered with:', email);
    
    if (!email || !password) {
      toast({
        title: "Erreur de connexion",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }
    
    setIsFormSubmitting(true);

    try {
      console.log('Calling signIn function...');
      const { success, message } = await signIn(email, password);
      console.log('Sign in result:', success, message);

      if (!success) {
        toast({
          title: "Erreur de connexion",
          description: message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Connexion réussie",
        description: "Vous êtes maintenant connecté",
      });
      
      // La redirection sera gérée par useEffect quand l'état user sera mis à jour
    } catch (error) {
      console.error("Unexpected error during login:", error);
      toast({
        title: "Erreur de connexion",
        description: "Une erreur s'est produite",
        variant: "destructive",
      });
    } finally {
      setIsFormSubmitting(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Handle sign up triggered with:', registerEmail);
    
    if (!registerEmail || !registerPassword || !confirmPassword) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }
    
    if (registerPassword !== confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive",
      });
      return;
    }
    
    setIsFormSubmitting(true);
    
    try {
      const { success, message } = await signUp(registerEmail, registerPassword);
      
      if (!success) {
        toast({
          title: "Erreur d'inscription",
          description: message,
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé. Vous pouvez maintenant vous connecter.",
      });
      
      setActiveTab("login");
      setEmail(registerEmail);
      setPassword("");
    } catch (error) {
      console.error("Unexpected error during registration:", error);
      toast({
        title: "Erreur d'inscription",
        description: "Une erreur s'est produite",
        variant: "destructive",
      });
    } finally {
      setIsFormSubmitting(false);
    }
  };

  // Affichage d'un indicateur de chargement pendant que l'état d'authentification est vérifié
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-creole-green" />
          <p className="text-lg">Vérification de l'authentification...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-creole-green" />
          <p className="text-lg">Redirection vers le tableau de bord...</p>
        </div>
      </div>
    );
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
            <form onSubmit={handleSignIn}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isFormSubmitting || authLoading}
                    placeholder="votre@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isFormSubmitting || authLoading}
                    placeholder="••••••••"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full bg-creole-green hover:bg-creole-green/90"
                  disabled={isFormSubmitting || authLoading}
                >
                  {isFormSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Connexion en cours...
                    </>
                  ) : "Se connecter"}
                </Button>
                <p className="text-center text-sm text-gray-600 mt-4">
                  <Link to="/" className="text-creole-green hover:underline">
                    Retour à l'accueil
                  </Link>
                </p>
              </CardFooter>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleSignUp}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    required
                    disabled={isFormSubmitting || authLoading}
                    placeholder="votre@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Mot de passe</Label>
                  <Input
                    id="register-password"
                    type="password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    required
                    disabled={isFormSubmitting || authLoading}
                    placeholder="••••••••"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={isFormSubmitting || authLoading}
                    placeholder="••••••••"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full bg-creole-green hover:bg-creole-green/90"
                  disabled={isFormSubmitting || authLoading}
                >
                  {isFormSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Inscription en cours...
                    </>
                  ) : "S'inscrire"}
                </Button>
                <p className="text-center text-sm text-gray-600 mt-4">
                  <Link to="/" className="text-creole-green hover:underline">
                    Retour à l'accueil
                  </Link>
                </p>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Login;
