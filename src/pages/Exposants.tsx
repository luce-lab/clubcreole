import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Phone, Globe, Star, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { matchesIgnoreAccents } from "@/lib/textUtils";

interface Partner {
  id: number;
  business_name: string;
  business_type: string;
  status: string;
  description?: string;
  phone?: string;
  address?: string;
  website?: string;
  logo_url?: string;
  created_at: string;
}

const Exposants = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [filteredPartners, setFilteredPartners] = useState<Partner[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchPartners();
  }, []);

  useEffect(() => {
    filterPartners();
  }, [partners, searchTerm, selectedType]);

  const fetchPartners = async () => {
    try {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .eq('status', 'approuve')
        .order('business_name', { ascending: true });

      if (error) {
        console.error('Erreur lors du chargement des exposants:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les exposants",
          variant: "destructive"
        });
        return;
      }

      setPartners(data || []);
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filterPartners = () => {
    let filtered = partners;

    // Filtrer par type
    if (selectedType !== "all") {
      filtered = filtered.filter(partner =>
        partner.business_type.toLowerCase() === selectedType.toLowerCase()
      );
    }

    // Filtrer par terme de recherche
    if (searchTerm) {
      filtered = filtered.filter(partner =>
        matchesIgnoreAccents(searchTerm, partner.business_name) ||
        matchesIgnoreAccents(searchTerm, partner.business_type) ||
        matchesIgnoreAccents(searchTerm, partner.address || '') ||
        matchesIgnoreAccents(searchTerm, partner.description || '')
      );
    }

    setFilteredPartners(filtered);
  };

  // Obtenir les types uniques pour le filtre
  const uniqueTypes = Array.from(new Set(partners.map(partner => partner.business_type)));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approuve':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approuve':
        return 'Exposant validé';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Nos Exposants</h1>
            <p className="text-lg text-gray-600">Découvrez nos partenaires exposants</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-lg h-64"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nos Exposants</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez les entreprises et artisans qui exposent leurs produits et services
            lors de nos événements. Des partenaires de confiance qui représentent le meilleur
            de la culture créole.
          </p>
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher un exposant..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedType === "all" ? "default" : "outline"}
                onClick={() => setSelectedType("all")}
                className="whitespace-nowrap"
              >
                Tous les types ({partners.length})
              </Button>
              {uniqueTypes.map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type.toLowerCase() ? "default" : "outline"}
                  onClick={() => setSelectedType(type.toLowerCase())}
                  className="whitespace-nowrap"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Grille des exposants */}
        {filteredPartners.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm || selectedType !== "all"
                ? "Aucun exposant trouvé"
                : "Aucun exposant disponible"
              }
            </h3>
            <p className="text-gray-500">
              {searchTerm || selectedType !== "all"
                ? "Essayez de modifier votre recherche ou vos filtres"
                : "Revenez bientôt pour découvrir nos exposants"
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPartners.map((partner) => (
              <Card key={partner.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {partner.logo_url ? (
                        <img
                          src={partner.logo_url}
                          alt={partner.business_name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-creole-green/10 rounded-lg flex items-center justify-center">
                          <div className="w-6 h-6 bg-creole-green rounded-sm"></div>
                        </div>
                      )}
                      <div>
                        <CardTitle className="text-lg line-clamp-1">
                          {partner.business_name}
                        </CardTitle>
                        <Badge
                          variant="outline"
                          className="text-xs mt-1"
                        >
                          {partner.business_type}
                        </Badge>
                      </div>
                    </div>
                    <Badge
                      className={`text-xs ${getStatusColor(partner.status)}`}
                    >
                      {getStatusLabel(partner.status)}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {partner.description && (
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {partner.description}
                    </p>
                  )}

                  <div className="space-y-2">
                    {partner.address && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span className="line-clamp-1">{partner.address}</span>
                      </div>
                    )}

                    {partner.phone && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>{partner.phone}</span>
                      </div>
                    )}

                    {partner.website && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Globe className="h-4 w-4" />
                        <a
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-creole-green hover:underline truncate"
                        >
                          {partner.website.replace(/^https?:\/\//, '')}
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1 pt-2 border-t">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-xs text-green-600 font-medium">
                      Exposant validé
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredPartners.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              {filteredPartners.length} exposant{filteredPartners.length > 1 ? 's' : ''} trouvé{filteredPartners.length > 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Exposants;