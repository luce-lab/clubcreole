
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { 
  Calendar,
  Star, 
  MapPin, 
  Wifi, 
  Tv, 
  Coffee, 
  Car, 
  Bath,
  Users,
  ArrowLeft,
  Check,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useToast } from "@/components/ui/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Liste temporaire des hébergements (idéalement, cela viendrait d'une API ou d'une base de données)
const accommodations = [
  {
    id: 1,
    name: "Villa Paradis",
    type: "Villa",
    location: "Basse-Terre",
    price: 120,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    galleryImages: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1543968332-f99478b1ebdc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1501117716987-c8c394bb29df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1549638441-b787d2e11f14?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
    ],
    features: ["WiFi", "TV", "Cuisine", "Parking", "Climatisation", "Piscine"],
    description: "Magnifique villa avec vue sur la mer, parfaite pour des vacances en famille ou entre amis. Située à seulement 5 minutes à pied de la plage, cette villa spacieuse offre tout le confort nécessaire pour un séjour inoubliable.",
    rooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    amenities: [
      { name: "WiFi gratuit", available: true },
      { name: "Petit-déjeuner inclus", available: true },
      { name: "Piscine privée", available: true },
      { name: "Vue sur la mer", available: true },
      { name: "Service de ménage", available: true },
      { name: "Animaux acceptés", available: false },
      { name: "Parking gratuit", available: true },
      { name: "Climatisation", available: true }
    ],
    rules: [
      "Check-in: 15h00",
      "Check-out: 11h00",
      "Interdiction de fumer",
      "Pas de fêtes ou événements"
    ]
  },
  {
    id: 2,
    name: "Hôtel Tropical",
    type: "Hôtel",
    location: "Grande-Terre",
    price: 85,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    galleryImages: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590073844006-33379778ae09?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
    ],
    features: ["WiFi", "TV", "Restaurant", "Parking", "Climatisation", "Piscine"],
    description: "Hôtel confortable et élégant situé à quelques pas de la plage. Profitez de nos installations modernes et d'un service de qualité pour un séjour relaxant dans un cadre idyllique.",
    rooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    amenities: [
      { name: "WiFi gratuit", available: true },
      { name: "Petit-déjeuner inclus", available: true },
      { name: "Piscine", available: true },
      { name: "Vue sur la mer", available: true },
      { name: "Service de ménage", available: true },
      { name: "Animaux acceptés", available: false },
      { name: "Parking gratuit", available: true },
      { name: "Climatisation", available: true }
    ],
    rules: [
      "Check-in: 14h00",
      "Check-out: 11h00",
      "Interdiction de fumer dans les chambres",
      "Petit-déjeuner servi de 7h à 10h"
    ]
  },
  // ... Les autres hébergements restent identiques
];

const AccommodationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [accommodation, setAccommodation] = useState<typeof accommodations[0] | null>(null);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Simuler une récupération de données
    const accommodationId = parseInt(id || "0");
    const foundAccommodation = accommodations.find(acc => acc.id === accommodationId);
    
    if (foundAccommodation) {
      setAccommodation(foundAccommodation);
    } else {
      navigate("/hebergements");
    }
  }, [id, navigate]);

  useEffect(() => {
    if (accommodation && selectedStartDate && selectedEndDate) {
      const nights = Math.ceil((selectedEndDate.getTime() - selectedStartDate.getTime()) / (1000 * 60 * 60 * 24));
      setTotalPrice(accommodation.price * nights);
    } else {
      setTotalPrice(0);
    }
  }, [accommodation, selectedStartDate, selectedEndDate]);

  const handleReservation = () => {
    if (!selectedStartDate || !selectedEndDate) {
      toast({
        title: "Information manquante",
        description: "Veuillez sélectionner les dates de séjour",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Réservation confirmée !",
      description: `Votre séjour chez ${accommodation?.name} a été réservé avec succès.`,
    });
  };

  const handleDateSelect = (date: Date) => {
    if (!selectedStartDate) {
      setSelectedStartDate(date);
    } else if (!selectedEndDate && date > selectedStartDate) {
      setSelectedEndDate(date);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    }
  };

  // Fonction pour générer l'affichage du calendrier
  const renderCalendarDay = (date: Date) => {
    const isStartDate = selectedStartDate && date.toDateString() === selectedStartDate.toDateString();
    const isEndDate = selectedEndDate && date.toDateString() === selectedEndDate.toDateString();
    const isInRange = selectedStartDate && selectedEndDate && 
                     date > selectedStartDate && date < selectedEndDate;
    
    let className = "";
    if (isStartDate) className = "bg-creole-green text-white rounded-l-full";
    else if (isEndDate) className = "bg-creole-green text-white rounded-r-full";
    else if (isInRange) className = "bg-creole-green/20";
    
    return <div className={className + " h-full w-full flex items-center justify-center"}>{date.getDate()}</div>;
  };

  const renderFeatureIcon = (feature: string) => {
    switch (feature) {
      case "WiFi":
        return <Wifi className="h-5 w-5" />;
      case "TV":
        return <Tv className="h-5 w-5" />;
      case "Cuisine":
        return <Coffee className="h-5 w-5" />;
      case "Parking":
        return <Car className="h-5 w-5" />;
      default:
        return <Bath className="h-5 w-5" />;
    }
  };

  // Si aucun hébergement n'est trouvé
  if (!accommodation) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="flex justify-center items-center h-full">
            <p className="text-xl text-gray-500">Chargement en cours...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-creole-blue">{accommodation.name}</h1>
          <div className="flex items-center mt-2 text-gray-600">
            <MapPin className="h-5 w-5 mr-1" />
            <span>{accommodation.location}</span>
            <span className="mx-2">•</span>
            <Star className="h-5 w-5 text-yellow-400 mr-1" fill="currentColor" />
            <span>{accommodation.rating}</span>
          </div>
        </div>

        {/* Galerie d'images */}
        <div className="mb-8">
          <Carousel className="w-full">
            <CarouselContent>
              {accommodation.galleryImages.map((image, index) => (
                <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/3">
                  <AspectRatio ratio={16 / 9}>
                    <img 
                      src={image} 
                      alt={`${accommodation.name} - photo ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </AspectRatio>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-4">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-8">
            {/* Informations principales */}
            <Card>
              <CardHeader>
                <CardTitle>À propos de cet hébergement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">{accommodation.description}</p>
                
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                    <Users className="h-6 w-6 text-creole-green mb-2" />
                    <div className="text-sm text-center">
                      <span className="block font-medium">{accommodation.maxGuests}</span>
                      <span className="text-gray-500">voyageurs</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                    <Wifi className="h-6 w-6 text-creole-green mb-2" />
                    <div className="text-sm text-center">
                      <span className="block font-medium">{accommodation.rooms}</span>
                      <span className="text-gray-500">chambres</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                    <Bath className="h-6 w-6 text-creole-green mb-2" />
                    <div className="text-sm text-center">
                      <span className="block font-medium">{accommodation.bathrooms}</span>
                      <span className="text-gray-500">salles de bain</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Équipements */}
            <Card>
              <CardHeader>
                <CardTitle>Équipements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {accommodation.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      {amenity.available ? (
                        <Check className="h-5 w-5 text-creole-green mr-2" />
                      ) : (
                        <X className="h-5 w-5 text-gray-400 mr-2" />
                      )}
                      <span className={amenity.available ? "" : "text-gray-400 line-through"}>
                        {amenity.name}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Règles */}
            <Card>
              <CardHeader>
                <CardTitle>Règlement intérieur</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  {accommodation.rules.map((rule, index) => (
                    <li key={index} className="text-gray-700">{rule}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Questions fréquentes */}
            <Card>
              <CardHeader>
                <CardTitle>Questions fréquentes</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Les animaux sont-ils acceptés ?</AccordionTrigger>
                    <AccordionContent>
                      {accommodation.amenities.find(a => a.name === "Animaux acceptés")?.available
                        ? "Oui, les animaux domestiques sont les bienvenus."
                        : "Non, les animaux ne sont pas acceptés dans cet hébergement."}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Y a-t-il un parking gratuit ?</AccordionTrigger>
                    <AccordionContent>
                      {accommodation.amenities.find(a => a.name === "Parking gratuit")?.available
                        ? "Oui, un parking gratuit est disponible pour les clients."
                        : "Non, cet hébergement ne dispose pas de parking gratuit."}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Comment puis-je annuler ma réservation ?</AccordionTrigger>
                    <AccordionContent>
                      Vous pouvez annuler gratuitement jusqu'à 48 heures avant votre arrivée. Au-delà, des frais d'annulation peuvent s'appliquer.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Colonne de réservation */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{accommodation.price}€</span>
                    <span className="text-sm font-normal text-gray-500">par nuit</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Dates de séjour */}
                  <div>
                    <h3 className="font-medium mb-2">Sélectionnez vos dates</h3>
                    <div className="border rounded-lg p-4">
                      <Calendar
                        mode="single"
                        onSelect={handleDateSelect}
                        disabled={(date) => date < new Date()}
                        className="w-full"
                        DayComponent={renderCalendarDay}
                      />
                      <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
                        <div>
                          {selectedStartDate ? (
                            <span>Arrivée: {selectedStartDate.toLocaleDateString()}</span>
                          ) : (
                            <span>Sélectionnez une date d'arrivée</span>
                          )}
                        </div>
                        <div>
                          {selectedEndDate ? (
                            <span>Départ: {selectedEndDate.toLocaleDateString()}</span>
                          ) : (
                            selectedStartDate && <span>Sélectionnez une date de départ</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Nombre de voyageurs */}
                  <div>
                    <h3 className="font-medium mb-2">Voyageurs</h3>
                    <div className="flex items-center border rounded-lg p-3">
                      <Users className="h-5 w-5 text-gray-500 mr-2" />
                      <select 
                        className="flex-grow bg-transparent focus:outline-none"
                        value={guests}
                        onChange={(e) => setGuests(parseInt(e.target.value))}
                      >
                        {Array.from({ length: accommodation.maxGuests }, (_, i) => (
                          <option key={i} value={i + 1}>
                            {i + 1} voyageur{i > 0 ? "s" : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Maximum: {accommodation.maxGuests} voyageurs
                    </p>
                  </div>

                  {/* Récapitulatif du prix */}
                  {totalPrice > 0 && (
                    <div className="border-t pt-4">
                      <div className="flex justify-between mb-2">
                        <span>{accommodation.price}€ x {Math.ceil((selectedEndDate!.getTime() - selectedStartDate!.getTime()) / (1000 * 60 * 60 * 24))} nuits</span>
                        <span>{totalPrice}€</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Frais de service</span>
                        <span>{Math.round(totalPrice * 0.10)}€</span>
                      </div>
                      <div className="flex justify-between font-bold border-t pt-2 mt-2">
                        <span>Total</span>
                        <span>{totalPrice + Math.round(totalPrice * 0.10)}€</span>
                      </div>
                    </div>
                  )}

                  <Button 
                    className="w-full bg-creole-green hover:bg-creole-green/90"
                    size="lg"
                    onClick={handleReservation}
                    disabled={!selectedStartDate || !selectedEndDate}
                  >
                    Réserver
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AccommodationDetail;
