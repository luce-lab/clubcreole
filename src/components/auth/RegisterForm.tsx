import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "../../contexts/auth";
import { useToast } from "../ui/use-toast";

interface RegisterFormProps {
  onSuccess?: (email: string) => void;
}

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const { toast } = useToast();
  const { signUp } = useAuth();
  
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return false;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive",
      });
      return false;
    }
    
    setIsFormSubmitting(true);
    
    try {
      const { success, message } = await signUp(email, password);
      
      if (!success) {
        toast({
          title: "Erreur d'inscription",
          description: message,
          variant: "destructive",
        });
        return false;
      } else {
        toast({
          title: "Inscription réussie",
          description: "Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.",
        });
        
        if (onSuccess) {
          onSuccess(email);
        }
        return true;
      }
    } catch (error) {
      console.error("Unexpected error during registration:", error);
      toast({
        title: "Erreur d'inscription",
        description: "Une erreur s'est produite",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsFormSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSignUp}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="register-email">Email</Label>
          <Input
            id="register-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isFormSubmitting}
            placeholder="votre@email.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="register-password">Mot de passe</Label>
          <Input
            id="register-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isFormSubmitting}
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
  );
};
