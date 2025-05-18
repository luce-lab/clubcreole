
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/auth";

interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const { signIn } = useAuth();
  
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      return false;
    }
    
    setIsFormSubmitting(true);

    try {
      const { success } = await signIn(email, password);
      if (success && onSuccess) {
        onSuccess();
      }
      return success;
    } catch (error) {
      console.error("Unexpected error during login:", error);
      return false;
    } finally {
      setIsFormSubmitting(false);
    }
  };
  
  return (
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
