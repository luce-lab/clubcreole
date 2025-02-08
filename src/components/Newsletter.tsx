
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Ici, vous pourriez ajouter la logique pour enregistrer l'email dans votre base de données
      toast({
        title: "Inscription réussie !",
        description: "Merci de vous être inscrit à notre newsletter.",
      });
      setEmail("");
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-bold text-white">Newsletter</h3>
      <p className="text-gray-400">
        Restez informé de nos dernières actualités et offres spéciales !
      </p>
      <div className="flex gap-2">
        <Input
          type="email"
          placeholder="Votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-white"
          disabled={isLoading}
        />
        <Button
          type="submit"
          className="bg-creole-green hover:bg-creole-green/90 text-white"
          disabled={isLoading}
        >
          {isLoading ? "Inscription..." : "S'inscrire"}
        </Button>
      </div>
    </form>
  );
};
