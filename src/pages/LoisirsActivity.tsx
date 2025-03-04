
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { CheckCircle2, Clock, MapPin, Users } from "lucide-react";

interface Loisir {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  maxParticipants: number;
  currentParticipants: number;
  image: string;
}

const loisirs: Loisir[] = [
  {
    id: 1,
    title: "Atelier cuisine créole",
    description: "Apprenez à préparer les plats traditionnels de la cuisine antillaise avec un chef local.",
    location: "Fort-de-France, Martinique",
    date: "15 juin 2024, 14:00",
    maxParticipants: 12,
    currentParticipants: 8,
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Festival de danse et musique",
    description: "Découvrez les rythmes traditionnels du zouk, de la biguine et du gwoka lors de ce festival animé.",
    location: "Pointe-à-Pitre, Guadeloupe",
    date: "22 juin 2024, 18:00",
    maxParticipants: 50,
    currentParticipants: 32,
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Atelier artisanat local",
    description: "Initiez-vous à la fabrication de bijoux et d'objets décoratifs à partir de matériaux locaux.",
    location: "Saint-Pierre, Martinique",
    date: "29 juin 2024, 10:00",
    maxParticipants: 15,
    currentParticipants: 6,
    image: "https://images.unsplash.com/photo-1462927114214-6956d2fddd4e?q=80&w=2069&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Visite d'une distillerie de rhum",
    description: "Découvrez le processus de fabrication du rhum et dégustez différentes variétés de ce spiritueux emblématique.",
    location: "Sainte-Marie, Martinique",
    date: "5 juillet 2024, 11:00",
    maxParticipants: 20,
    currentParticipants: 12,
    image: "https://images.unsplash.com/photo-1584225064785-c62a8b43d148?q=80&w=2074&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Atelier percussion et tambour",
    description: "Apprenez les bases des rythmes traditionnels avec des musiciens locaux expérimentés.",
    location: "Le Gosier, Guadeloupe",
    date: "12 juillet 2024, 16:00",
    maxParticipants: 15,
    currentParticipants: 9,
    image: "https://images.unsplash.com/photo-1485579149621-3123dd979885?q=80&w=2069&auto=format&fit=crop"
  }
];

const LoisirsActivity = () => {
  const [selectedLoisir, setSelectedLoisir] = useState<Loisir | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleRegister = () => {
    if (!name || !email || !phone) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Inscription réussie !",
      description: `Vous êtes inscrit à "${selectedLoisir?.title}". Un email de confirmation a été envoyé à ${email}.`,
    });
    
    setName("");
    setEmail("");
    setPhone("");
    setOpenDialog(false);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-creole-blue mb-8">
        Nos Activités de Loisirs
      </h1>
      
      <p className="text-lg text-center mb-12 max-w-3xl mx-auto">
        Découvrez notre sélection d'activités de loisirs authentiques aux Antilles.
        Inscrivez-vous et immergez-vous dans la culture créole à travers des expériences uniques.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loisirs.map((loisir) => (
          <Card key={loisir.id} className="overflow-hidden flex flex-col h-full">
            <div className="h-48 overflow-hidden">
              <img 
                src={loisir.image} 
                alt={loisir.title} 
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
              />
            </div>
            <CardHeader>
              <CardTitle>{loisir.title}</CardTitle>
              <CardDescription>{loisir.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-creole-blue" />
                  <span className="text-sm">{loisir.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-creole-blue" />
                  <span className="text-sm">{loisir.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-creole-blue" />
                  <span className="text-sm">{loisir.currentParticipants}/{loisir.maxParticipants} participants</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Dialog open={openDialog && selectedLoisir?.id === loisir.id} onOpenChange={(open) => {
                setOpenDialog(open);
                if (open) setSelectedLoisir(loisir);
              }}>
                <DialogTrigger asChild>
                  <Button 
                    className="w-full bg-creole-green hover:bg-creole-green/90"
                    disabled={loisir.currentParticipants >= loisir.maxParticipants}
                  >
                    {loisir.currentParticipants >= loisir.maxParticipants ? 'Complet' : "S'inscrire"}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Inscription à {loisir.title}</DialogTitle>
                    <DialogDescription>
                      Remplissez le formulaire ci-dessous pour vous inscrire à cette activité.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Nom *
                      </Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="phone" className="text-right">
                        Téléphone *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="col-span-3"
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleRegister}>
                      Confirmer l'inscription
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LoisirsActivity;
