
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Clock, Users, Tag, ArrowRight, Share2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import BackButton from "@/components/common/BackButton";

interface Offer {
  id: string;
  title: string;
  description: string;
  partner_id: string;
  price: number | null;
  discount_percentage: number | null;
  start_date: string | null;
  end_date: string | null;
  is_active: boolean;
  created_at: string;
  partners?: {
    business_name: string;
    business_type: string;
    description: string | null;
    address: string | null;
    phone: string | null;
    website: string | null;
  };
}

const OfferDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [offer, setOffer] = useState<Offer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        if (!id) {
          throw new Error("ID de l'offre manquant");
        }

        const { data, error } = await supabase
          .from('offers')
          .select(`
            *,
            partners (
              business_name,
              business_type,
              description,
              address,
              phone,
              website
            )
          `)
          .eq('id', id)
          .eq('is_active', true)
          .single();

        if (error) {
          console.error('Erreur base de données:', error);
          throw error;
        }

        if (!data) {
          throw new Error("Bon plan non trouvé");
        }

        setOffer(data);
      } catch (err) {
        console.error('Erreur lors du chargement du bon plan:', err);
        setError(err instanceof Error ? err.message : "Impossible de charger le bon plan");
      } finally {
        setLoading(false);
      }
    };

    fetchOffer();
  }, [id]);

  const handleRedirectToDetails = () => {
    if (!offer?.partners) return;

    const businessType = offer.partners.business_type.toLowerCase();
    
    // Redirection selon le type de partenaire
    switch (businessType) {
      case 'restaurant':
      case 'restauration':
        // Chercher le restaurant dans la base et rediriger vers sa page détail
        findAndRedirectToRestaurant();
        break;
      case 'concert':
        navigate('/concerts');
        break;
      case 'soirée':
      case 'nightlife':
        navigate('/soiree');
        break;
      case 'activité':
      case 'loisirs':
        navigate('/loisirs');
        break;
      case 'hébergement':
      case 'accommodation':
        navigate('/hebergements');
        break;
      default:
        toast({
          title: "Redirection non disponible",
          description: "La page détaillée pour ce type de partenaire n'est pas encore disponible.",
          variant: "destructive"
        });
    }
  };

  const findAndRedirectToRestaurant = async () => {
    try {
      const { data: restaurants } = await supabase
        .from('restaurants')
        .select('id, name')
        .ilike('name', `%${offer?.partners?.business_name}%`)
        .limit(1);

      if (restaurants && restaurants.length > 0) {
        navigate(`/restauration/${restaurants[0].id}`);
      } else {
        navigate('/restauration');
      }
    } catch (error) {
      console.error('Erreur lors de la recherche du restaurant:', error);
      navigate('/restauration');
    }
  };

  const handleShare = () => {
    if (navigator.share && offer) {
      navigator.share({
        title: offer.title,
        text: `Découvrez cette offre: ${offer.title}`,
        url: window.location.href
      }).catch(() => {
        toast({
          description: "Lien copié dans le presse-papier",
        });
        navigator.clipboard.writeText(window.location.href);
      });
    } else {
      toast({
        description: "Lien copié dans le presse-papier",
      });
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !offer) {
    return (
      <div className="container mx-auto px-4 py-8">
        <BackButton backTo="/offers" />
        <div className="max-w-4xl mx-auto mt-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Bon plan non trouvé</h1>
          <p className="text-gray-600 mb-8">{error || "Ce bon plan n'existe pas ou n'est plus disponible."}</p>
          <Button onClick={() => navigate('/offers')}>
            Voir tous les bons plans
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton backTo="/offers" />
      
      <div className="max-w-4xl mx-auto mt-8">
        {/* En-tête */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{offer.title}</h1>
              {offer.partners && (
                <div className="flex items-center gap-2 text-lg text-gray-600">
                  <span>Par {offer.partners.business_name}</span>
                  <Badge variant="outline">{offer.partners.business_type}</Badge>
                </div>
              )}
            </div>
            <Button variant="outline" size="icon" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Informations sur la promotion */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {offer.discount_percentage && (
              <div className="flex items-center gap-1">
                <Tag className="h-4 w-4 text-creole-green" />
                <span className="font-semibold text-creole-green">
                  -{offer.discount_percentage}%
                </span>
              </div>
            )}
            {offer.price && (
              <div className="flex items-center gap-1">
                <span className="font-semibold">{offer.price}€</span>
              </div>
            )}
            {offer.start_date && offer.end_date && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>
                  Du {formatDate(offer.start_date)} au {formatDate(offer.end_date)}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description de l'offre */}
            <Card>
              <CardHeader>
                <CardTitle>Description de l'offre</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{offer.description}</p>
              </CardContent>
            </Card>

            {/* Informations sur le partenaire */}
            {offer.partners && (
              <Card>
                <CardHeader>
                  <CardTitle>À propos de {offer.partners.business_name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {offer.partners.description && (
                    <p className="text-gray-700">{offer.partners.description}</p>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {offer.partners.address && (
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 mt-0.5 text-gray-500" />
                        <span>{offer.partners.address}</span>
                      </div>
                    )}
                    {offer.partners.phone && (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">Tél:</span>
                        <span>{offer.partners.phone}</span>
                      </div>
                    )}
                    {offer.partners.website && (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">Site web:</span>
                        <a 
                          href={offer.partners.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-creole-green hover:underline"
                        >
                          Visiter
                        </a>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Carte d'action */}
            <Card className="border-creole-green">
              <CardHeader>
                <CardTitle className="text-creole-green">Profiter de l'offre</CardTitle>
                <CardDescription>
                  Cliquez pour découvrir plus de détails et réserver
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={handleRedirectToDetails}
                  className="w-full bg-creole-green hover:bg-creole-green/90"
                >
                  Voir les détails
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Informations sur la validité */}
            {(offer.start_date || offer.end_date) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Période de validité
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  {offer.start_date && (
                    <div>
                      <span className="text-gray-600">Début:</span>
                      <span className="ml-2 font-medium">{formatDate(offer.start_date)}</span>
                    </div>
                  )}
                  {offer.end_date && (
                    <div>
                      <span className="text-gray-600">Fin:</span>
                      <span className="ml-2 font-medium">{formatDate(offer.end_date)}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Avantages Club Créole */}
            <Card className="bg-gradient-to-br from-creole-green/10 to-creole-green/5">
              <CardHeader>
                <CardTitle className="text-creole-green">Avantage Club Créole</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">
                  Cette offre est disponible exclusivement pour les membres du Club Créole. 
                  Profitez d'avantages uniques chez nos partenaires !
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferDetail;
