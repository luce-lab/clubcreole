import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "../../contexts/auth";
import { useToast } from "../ui/use-toast";
import { SignUpData } from "../../contexts/auth/types";

interface RegisterFormProps {
  onSuccess?: (data: SignUpData) => void;
}

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const { toast } = useToast();
  const { signUp } = useAuth();
  
  const validatePhone = (phone: string): boolean => {
    // Basic phone validation for French and international formats
    const phoneRegex = /^[+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/;
    return phone === '' || phoneRegex.test(phone);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation des champs obligatoires
    if (!email || !password || !confirmPassword || !firstName || !lastName) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return false;
    }

    // Validation du mot de passe
    if (password !== confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive",
      });
      return false;
    }

    // Validation du mot de passe (longueur minimale)
    if (password.length < 6) {
      toast({
        title: "Erreur",
        description: "Le mot de passe doit contenir au moins 6 caractères",
        variant: "destructive",
      });
      return false;
    }

    // Validation du numéro de téléphone (si fourni)
    if (phone && !validatePhone(phone)) {
      toast({
        title: "Erreur",
        description: "Le format du numéro de téléphone n'est pas valide",
        variant: "destructive",
      });
      return false;
    }

    setIsFormSubmitting(true);

    try {
      const signUpData: SignUpData = {
        email,
        password,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        phone: phone.trim() || undefined
      };

      const { success, message } = await signUp(signUpData);

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
          onSuccess(signUpData);
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="register-firstName">Prénom *</Label>
            <Input
              id="register-firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              disabled={isFormSubmitting}
              placeholder="Jean"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="register-lastName">Nom *</Label>
            <Input
              id="register-lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              disabled={isFormSubmitting}
              placeholder="Dupont"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="register-email">Email *</Label>
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
          <Label htmlFor="register-phone">Téléphone</Label>
          <Input
            id="register-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={isFormSubmitting}
            placeholder="+33 6 12 34 56 78"
          />
          <p className="text-xs text-gray-500">
            Format accepté: international (ex: +33...) ou français (ex: 06...)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="register-password">Mot de passe *</Label>
            <Input
              id="register-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isFormSubmitting}
              placeholder="••••••••"
              minLength={6}
            />
            <p className="text-xs text-gray-500">Minimum 6 caractères</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirmer le mot de passe *</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isFormSubmitting}
              placeholder="••••••••"
              minLength={6}
            />
          </div>
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
        <p className="text-center text-xs text-gray-400">
          * Champs obligatoires
        </p>
      </CardFooter>
    </form>
  );
};
