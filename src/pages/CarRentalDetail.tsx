
import { useState } from "react";
import { ArrowLeft, MapPin, Tag, Star, Car, Route, Shield, Fuel, Calendar, Users } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";

// Car Rental type definition
interface CarRental {
  id: number;
  name: string;
  type: string;
  image: string;
  location: string;
  description: string;
  rating: number;
  offer: string;
  icon: React.ElementType;
  features?: string[];
  models?: {
    name: string;
    image: string;
    pricePerDay: number;
    category: string;
    seats: number;
    transmission: string;
    airCon: boolean;
  }[];
}

// Dummy data for car rentals
const carRentals: CarRental[] = [
  {
    id: 1,
    name: "Caribbean Cars",
    type: "Véhicules économiques",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    location: "Fort-de-France",
    description: "Une large gamme de véhicules économiques et compacts, parfaits pour explorer l'île. Service client réactif et tarifs compétitifs.",
    rating: 4.6,
    offer: "15% de réduction sur toutes les locations de plus de 3 jours pour les membres du Club Créole",
    icon: Car,
    features: [
      "Service de livraison à l'aéroport",
      "Assistance routière 24/7",
      "Kilométrage illimité",
      "Assurance tous risques disponible",
      "Annulation gratuite jusqu'à 48h avant",
      "Véhicules récents (moins de 2 ans)"
    ],
    models: [
      {
        name: "Renault Clio",
        image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        pricePerDay: 35,
        category: "Économique",
        seats: 5,
        transmission: "Manuelle",
        airCon: true
      },
      {
        name: "Peugeot 208",
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        pricePerDay: 38,
        category: "Économique",
        seats: 5,
        transmission: "Automatique",
        airCon: true
      },
      {
        name: "Citroën C3",
        image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        pricePerDay: 36,
        category: "Économique",
        seats: 5,
        transmission: "Manuelle",
        airCon: true
      }
    ]
  },
  {
    id: 2,
    name: "Prestige Auto",
    type: "Véhicules de luxe",
    image: "https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    location: "Les Trois-Îlets",
    description: "Louez des voitures de luxe et profitez d'un service premium. Notre flotte comprend des SUV haut de gamme, des cabriolets et des berlines de luxe.",
    rating: 4.8,
    offer: "Un jour de location offert pour toute réservation d'une semaine ou plus",
    icon: Shield,
    features: [
      "Service de voiturier à l'hôtel",
      "Livraison et récupération gratuite",
      "Véhicules premium récents",
      "GPS et WiFi inclus",
      "Siège enfant gratuit sur demande",
      "Assurance tous risques incluse"
    ],
    models: [
      {
        name: "Mercedes Classe C Cabriolet",
        image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        pricePerDay: 120,
        category: "Luxe",
        seats: 4,
        transmission: "Automatique",
        airCon: true
      },
      {
        name: "BMW X5",
        image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        pricePerDay: 150,
        category: "SUV Premium",
        seats: 5,
        transmission: "Automatique",
        airCon: true
      },
      {
        name: "Audi A5",
        image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        pricePerDay: 110,
        category: "Berline Premium",
        seats: 5,
        transmission: "Automatique",
        airCon: true
      }
    ]
  },
  {
    id: 3,
    name: "Eco Drive",
    type: "Véhicules électriques",
    image: "https://images.unsplash.com/photo-1593941707882-a5bfb1050f50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    location: "Le Lamentin",
    description: "Louez des véhicules 100% électriques pour une expérience écologique. Contribuez à préserver la beauté naturelle des Antilles tout en explorant l'île.",
    rating: 4.5,
    offer: "Recharge gratuite et 10% de réduction pour les membres du Club Créole",
    icon: Fuel,
    features: [
      "Bornes de recharge gratuites",
      "Formation à la conduite électrique",
      "Assistance 24/7",
      "Véhicules zéro émission",
      "Plan des stations de recharge fourni",
      "Assurance incluse"
    ],
    models: [
      {
        name: "Renault Zoe",
        image: "https://images.unsplash.com/photo-1593941707882-a5bfb1050f50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        pricePerDay: 45,
        category: "Électrique",
        seats: 5,
        transmission: "Automatique",
        airCon: true
      },
      {
        name: "Peugeot e-208",
        image: "https://images.unsplash.com/photo-1597766325363-ad9c9f7d620b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        pricePerDay: 48,
        category: "Électrique",
        seats: 5,
        transmission: "Automatique",
        airCon: true
      },
      {
        name: "Hyundai Kona Electric",
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        pricePerDay: 55,
        category: "SUV Électrique",
        seats: 5,
        transmission: "Automatique",
        airCon: true
      }
    ]
  },
  {
    id: 4,
    name: "Aventure 4x4",
    type: "Véhicules tout-terrain",
    image: "https://images.unsplash.com/photo-1533743410561-5c70e1a14cc1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    location: "Sainte-Anne",
    description: "Spécialiste des 4x4 et SUV pour explorer les zones moins accessibles. Idéal pour les aventuriers souhaitant découvrir les trésors cachés de l'île.",
    rating: 4.7,
    offer: "Kit d'aventure offert (GPS, glacière, guides) pour toute location 4x4 de 3 jours ou plus",
    icon: Route,
    features: [
      "Véhicules adaptés tout-terrain",
      "Cartes des chemins de randonnée",
      "Équipement d'aventure disponible",
      "Assistance routière spéciale hors-route",
      "Conseils personnalisés sur les sites",
      "Annulation gratuite jusqu'à 24h avant"
    ],
    models: [
      {
        name: "Jeep Wrangler",
        image: "https://images.unsplash.com/photo-1533743410561-5c70e1a14cc1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        pricePerDay: 85,
        category: "4x4",
        seats: 5,
        transmission: "Manuelle",
        airCon: true
      },
      {
        name: "Toyota Land Cruiser",
        image: "https://images.unsplash.com/photo-1572443490709-e57455e35a33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        pricePerDay: 95,
        category: "4x4 Premium",
        seats: 7,
        transmission: "Automatique",
        airCon: true
      },
      {
        name: "Suzuki Jimny",
        image: "https://images.unsplash.com/photo-1594157381255-2780f961de9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        pricePerDay: 70,
        category: "4x4 Compact",
        seats: 4,
        transmission: "Manuelle",
        airCon: true
      }
    ]
  }
];

// Form schema for reservation
const formSchema = z.object({
  startDate: z.string().min(1, { message: "La date de début est requise" }),
  endDate: z.string().min(1, { message: "La date de fin est requise" }),
  driverName: z.string().min(2, { message: "Le nom est requis" }),
  driverEmail: z.string().email({ message: "Email invalide" }),
  driverPhone: z.string().min(10, { message: "Numéro de téléphone invalide" })
});

const CarRentalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const carRental = carRentals.find(car => car.id === Number(id));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate: "",
      endDate: "",
      driverName: "",
      driverEmail: "",
      driverPhone: ""
    }
  });

  if (!carRental) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Location non trouvée</h2>
        <Button onClick={() => navigate("/location")}>Retour aux locations</Button>
      </div>
    );
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!selectedModel) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un modèle de voiture",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Réservation confirmée !",
      description: `Votre réservation pour ${carRental.name} (${selectedModel}) a été enregistrée.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-creole-blue">{carRental.name}</h1>
          <div className="flex items-center text-gray-600 mt-2">
            <MapPin className="h-5 w-5 mr-2" /> {carRental.location}
            <span className="mx-2">•</span>
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
              <span>{carRental.rating}/5</span>
            </div>
          </div>
        </div>
        <Badge className="text-sm py-1 px-3 bg-creole-green text-white">
          <carRental.icon className="h-4 w-4 mr-1" /> {carRental.type}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Images & Description */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Image */}
          <div className="rounded-lg overflow-hidden shadow-lg h-80">
            <img 
              src={carRental.image} 
              alt={carRental.name}
              className="w-full h-full object-cover" 
            />
          </div>

          {/* Description */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-4">À propos de {carRental.name}</h2>
              <p className="text-gray-700 mb-6">{carRental.description}</p>
              
              <h3 className="text-lg font-semibold mb-3">Caractéristiques</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {carRental.features?.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <carRental.icon className="h-4 w-4 text-creole-green" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-center text-amber-800 mb-2">
                  <Tag className="h-5 w-5 mr-2" />
                  <h3 className="font-semibold">Offre spéciale Club Créole</h3>
                </div>
                <p className="text-amber-700">{carRental.offer}</p>
              </div>
            </CardContent>
          </Card>

          {/* Available Models */}
          <div>
            <h2 className="text-xl font-bold mb-4">Modèles disponibles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {carRental.models?.map((model, index) => (
                <Card 
                  key={index}
                  className={`cursor-pointer transition-all hover:shadow-md ${selectedModel === model.name ? 'ring-2 ring-creole-green' : ''}`}
                  onClick={() => setSelectedModel(model.name)}
                >
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={model.image} 
                      alt={model.name}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-bold">{model.name}</h3>
                    <div className="flex justify-between mt-1 text-sm text-gray-600">
                      <span>{model.category}</span>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{model.seats}</span>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">{model.transmission}</Badge>
                      <span className="text-lg font-semibold text-creole-green">{model.pricePerDay}€ <span className="text-sm font-normal">/jour</span></span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right column - Reservation Form */}
        <div>
          <Card className="sticky top-4">
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-4">Réserver maintenant</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date de début</FormLabel>
                        <FormControl>
                          <div className="flex">
                            <Calendar className="mr-2 h-4 w-4 opacity-50" />
                            <Input type="date" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date de fin</FormLabel>
                        <FormControl>
                          <div className="flex">
                            <Calendar className="mr-2 h-4 w-4 opacity-50" />
                            <Input type="date" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="border-t border-b py-4 my-4">
                    <h3 className="font-semibold mb-2">Informations du conducteur</h3>
                    <FormField
                      control={form.control}
                      name="driverName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom complet</FormLabel>
                          <FormControl>
                            <Input placeholder="Jean Dupont" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="driverEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="jean.dupont@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="driverPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Téléphone</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="+33 6 12 34 56 78" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Modèle sélectionné</span>
                      <span className="font-semibold">{selectedModel || "Aucun"}</span>
                    </div>
                    {selectedModel && (
                      <div className="flex justify-between mt-2 pt-2 border-t">
                        <span className="font-bold">Total estimé</span>
                        <span className="font-bold text-creole-green">
                          {carRental.models?.find(m => m.name === selectedModel)?.pricePerDay}€ / jour
                        </span>
                      </div>
                    )}
                  </div>

                  <Button type="submit" className="w-full bg-creole-green hover:bg-creole-green/90">
                    Confirmer la réservation
                  </Button>

                  <p className="text-xs text-gray-500 text-center mt-2">
                    En réservant, vous acceptez nos conditions générales et notre politique de confidentialité.
                  </p>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CarRentalDetail;
