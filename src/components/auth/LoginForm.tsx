
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/auth";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { signIn } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    
    if (!email || !password) {
      setErrorMessage("Veuillez remplir tous les champs");
      return false;
    }
    
    setIsFormSubmitting(true);

    try {
      const { success, message } = await signIn(email, password);
      
      if (success) {
        // Redirection différente selon le type d'utilisateur
        if (email === 'admin@clubcreole.com' || email.includes('partner')) {
          navigate("/dashboard");
        } else {
          // Rediriger les clients vers la page d'accueil
          navigate("/");
        }
        
        if (onSuccess) {
          onSuccess();
        }
        return true;
      } else {
        setErrorMessage(message || "Identifiants incorrects");
        return false;
      }
    } catch (error) {
      console.error("Unexpected error during login:", error);
      setErrorMessage("Une erreur inattendue s'est produite");
      return false;
    } finally {
      setIsFormSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSignIn}>
      <CardContent className="space-y-4">
        {errorMessage && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isFormSubmitting}
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
            disabled={isFormSubmitting}
            placeholder="••••••••"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button 
          type="submit" 
          className="w-full bg-creole-green hover:bg-creole-green/90"
          disabled={isFormSubmitting}
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
  );
};
