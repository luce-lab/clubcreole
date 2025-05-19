import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { 
  Bed, 
  Star, 
  MapPin, 
  Wifi, 
  Tv, 
  Coffee, 
  Car, 
  Bath, 
  Search,
  ArrowLeft
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Accommodation, Amenity } from "@/components/accommodation/AccommodationTypes";
import { FeatureIcon } from "@/components/accommodation/FeatureIcon";

const AccommodationActivity = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState<string>("");
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("accommodations")
          .select("*");
        
        if (error) throw error;

        // Transformer les données JSON de la base
        const formattedData = data.map(item => ({
          ...item,
          gallery_images: item.gallery_images as string[],
          features: item.features as string[],
          amenities: item.amenities as Amenity[],
          rules: item.rules as string[]
        }));
        
        setAccommodations(formattedData);
      } catch (err) {
        console.error("Erreur lors de la récupération des hébergements:", err);
        setError("Impossible de charger les hébergements. Veuillez réessayer plus tard.");
      } finally {
        setLoading(false);
      }
    };

    fetchAccommodations();
  }, []);

  const filteredAccommodations = accommodations.filter(accommodation => {
    const matchesSearch = accommodation.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        accommodation.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        accommodation.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPrice = priceFilter === "" || 
                        (priceFilter === "low" && accommodation.price < 80) ||
                        (priceFilter === "medium" && accommodation.price >= 80 && accommodation.price < 100) ||
                        (priceFilter === "high" && accommodation.price >= 100);
    
    return matchesSearch && matchesPrice;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center">
          <div className="text-center">
            <Bed className="h-16 w-16 mx-auto text-creole-blue animate-pulse mb-4" />
            <p className="text-xl text-creole-blue">Chargement des hébergements...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl text-red-500 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Réessayer</Button>
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

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-creole-blue">Hébergements en Guadeloupe</h1>
          <p className="text-gray-600 mt-2">
            Découvrez notre sélection d'hébergements pour un séjour inoubliable. Villas, hôtels, bungalows et plus encore!
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-10">
          <h2 className="text-2xl font-bold mb-6 text-creole-green">Trouvez votre hébergement idéal</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Rechercher par nom, lieu ou type..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="md:w-1/4">
              <select
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
              >
                <option value="">Prix (Tous)</option>
                <option value="low">Économique (≤ 80€)</option>
                <option value="medium">Modéré (80-100€)</option>
                <option value="high">Premium (≥ 100€)</option>
              </select>
            </div>
            <Button 
              className="bg-creole-green hover:bg-creole-green/90"
              onClick={() => {
                setSearchTerm("");
                setPriceFilter("");
              }}
            >
              Réinitialiser
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {filteredAccommodations.map((accommodation) => (
            <Card key={accommodation.id} className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gray-200 relative cursor-pointer" onClick={() => navigate(`/hebergements/${accommodation.id}`)}>
                <img 
                  src={accommodation.image} 
                  alt={accommodation.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-sm font-bold flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" />
                  {accommodation.rating}
                </div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle 
                      className="text-xl cursor-pointer hover:text-creole-green" 
                      onClick={() => navigate(`/hebergements/${accommodation.id}`)}
                    >
                      {accommodation.name}
                    </CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {accommodation.location}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-creole-green">{accommodation.price}€</span>
                    <p className="text-sm text-gray-500">par nuit</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{accommodation.description.substring(0, 100)}...</p>
                <div className="flex flex-wrap gap-2">
                  {accommodation.features.slice(0, 4).map((feature, index) => (
                    <span 
                      key={index}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs flex items-center"
                    >
                      <FeatureIcon feature={feature} />
                      <span className="ml-1">{feature}</span>
                    </span>
                  ))}
                  {accommodation.features.length > 4 && (
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                      +{accommodation.features.length - 4}
                    </span>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-creole-green hover:bg-creole-green/90"
                  onClick={() => navigate(`/hebergements/${accommodation.id}`)}
                >
                  Voir les détails
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredAccommodations.length === 0 && (
          <div className="text-center py-12">
            <Bed className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-700">Aucun hébergement trouvé</h3>
            <p className="text-gray-500 mt-2">Essayez de modifier vos critères de recherche</p>
          </div>
        )}

        <div className="bg-gray-50 rounded-lg p-6 shadow-md mb-10">
          <h2 className="text-2xl font-bold text-creole-blue mb-2">Comment profiter des avantages?</h2>
          <p className="text-gray-700 mb-4">
            En tant que membre du Club Créole, présentez simplement votre carte de membre ou application mobile
            pour bénéficier de réductions exclusives sur votre séjour.
          </p>
          <Button className="bg-creole-green hover:bg-creole-green/90">
            Devenir membre
          </Button>
        </div>

        <section className="bg-gray-50 py-16 rounded-lg shadow-md mb-10">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-creole-blue mb-12">
              Pourquoi réserver avec Club Créole ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-creole-green/10 rounded-full flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-creole-green" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Qualité garantie</h3>
                <p className="text-gray-600">
                  Tous nos hébergements sont soigneusement sélectionnés et régulièrement inspectés pour garantir votre confort.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-creole-green/10 rounded-full flex items-center justify-center mb-4">
                  <Bed className="h-6 w-6 text-creole-green" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Large choix</h3>
                <p className="text-gray-600">
                  Des villas luxueuses aux gîtes authentiques, nous avons l'hébergement parfait pour tous les goûts et budgets.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-creole-green/10 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-creole-green" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Emplacements stratégiques</h3>
                <p className="text-gray-600">
                  Nos hébergements sont idéalement situés pour vous permettre de profiter pleinement de toutes les activités de l'île.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AccommodationActivity;
