
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { CheckCircle2, Clock, MapPin, Users, Film, Martini, Map, ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface Loisir {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  max_participants: number;
  current_participants: number;
  image: string;
}

const LoisirsActivity = () => {
  const [loisirs, setLoisirs] = useState<Loisir[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLoisir, setSelectedLoisir] = useState<Loisir | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  // Charger les données depuis Supabase
  useEffect(() => {
    const fetchLoisirs = async () => {
      try {
        const { data, error } = await supabase
          .from('loisirs')
          .select('*')
          .order('date', { ascending: true });
        
        if (error) {
          throw error;
        }
        
        if (data) {
          setLoisirs(data);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des loisirs:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les activités de loisirs.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLoisirs();
  }, []);

  const handleRegister = async () => {
    if (!name || !email || !phone) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    // Incrémenter le nombre de participants
    if (selectedLoisir) {
      try {
        const { error } = await supabase
          .from('loisirs')
          .update({ current_participants: selectedLoisir.current_participants + 1 })
          .eq('id', selectedLoisir.id);
        
        if (error) throw error;
        
        // Mettre à jour l'état local
        setLoisirs(loisirs.map(loisir => 
          loisir.id === selectedLoisir.id 
            ? { ...loisir, current_participants: loisir.current_participants + 1 } 
            : loisir
        ));

        toast({
          title: "Inscription réussie !",
          description: `Vous êtes inscrit à "${selectedLoisir.title}". Un email de confirmation a été envoyé à ${email}.`,
        });
        
        setName("");
        setEmail("");
        setPhone("");
        setOpenDialog(false);
      } catch (error) {
        console.error("Erreur lors de l'inscription:", error);
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite lors de l'inscription. Veuillez réessayer.",
          variant: "destructive",
        });
      }
    }
  };

  const getActivityIcon = (title: string) => {
    if (title.includes("boite")) return <Martini className="h-4 w-4 text-creole-blue" />;
    if (title.includes("cinéma")) return <Film className="h-4 w-4 text-creole-blue" />;
    if (title.includes("Balade") || title.includes("Randonnée") || title.includes("forêt")) return <Map className="h-4 w-4 text-creole-blue" />;
    return <CheckCircle2 className="h-4 w-4 text-creole-blue" />;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-creole-blue mb-4" />
        <p className="text-lg text-creole-blue">Chargement des activités...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Button 
        onClick={() => navigate(-1)} 
        variant="ghost" 
        className="mb-6 group flex items-center gap-1 hover:gap-2 transition-all"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Retour</span>
      </Button>
      
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
              <div className="flex items-center gap-2 mb-2">
                {getActivityIcon(loisir.title)}
                <CardTitle>{loisir.title}</CardTitle>
              </div>
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
                  <span className="text-sm">{loisir.current_participants}/{loisir.max_participants} participants</span>
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
                    disabled={loisir.current_participants >= loisir.max_participants}
                  >
                    {loisir.current_participants >= loisir.max_participants ? 'Complet' : "S'inscrire"}
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
