import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth/useAuth";
import { PartnerStatusCard } from "@/components/partner-dashboard/PartnerStatusCard";
import { PartnerProfileForm } from "@/components/partner-dashboard/PartnerProfileForm";
import { Loader2, LayoutDashboard, User, Bell, LogOut, ArrowLeft } from "lucide-react";

interface Partner {
  id: number;
  business_name: string;
  business_type: string;
  description: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  contact_name: string | null;
  website: string | null;
  siret: string | null;
  opening_hours: string | null;
  status: string;
  created_at: string;
  user_id: string | null;
}

const PartnerDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isLoading: authLoading, signOut } = useAuth();
  const [partner, setPartner] = useState<Partner | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Redirect if not authenticated
    if (!authLoading && !user) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour accéder à votre espace partenaire",
        variant: "destructive"
      });
      navigate('/login', { state: { from: '/partner-dashboard' } });
      return;
    }

    // Fetch partner data when user is authenticated
    if (user) {
      fetchPartnerData();
    }
  }, [user, authLoading, navigate, toast]);

  const fetchPartnerData = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No partner record found
          toast({
            title: "Aucune candidature trouvée",
            description: "Vous n'avez pas encore soumis de candidature partenaire",
          });
          navigate('/devenir-partenaire');
          return;
        }
        console.error('Error fetching partner:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger vos informations",
          variant: "destructive"
        });
        return;
      }

      setPartner(data);
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  // Show loading state while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-creole-green" />
      </div>
    );
  }

  // User not authenticated
  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l'accueil
          </Button>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-creole-green">
                Espace Partenaire
              </h1>
              <p className="text-gray-600">
                {partner ? partner.business_name : 'Bienvenue dans votre espace'}
              </p>
            </div>

            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">Aperçu</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profil</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <PartnerStatusCard partner={partner} isLoading={isLoading} />

            {partner?.status === 'approuve' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      Statut
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-green-600">Actif</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      Type d'activité
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold capitalize">
                      {partner.business_type.replace('_', ' ')}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      Membre depuis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">
                      {new Date(partner.created_at).toLocaleDateString('fr-FR', {
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            {partner?.status === 'en_attente' && (
              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="p-6">
                  <h3 className="font-medium text-orange-800 mb-2">
                    Que se passe-t-il ensuite ?
                  </h3>
                  <ul className="list-disc list-inside text-sm text-orange-700 space-y-1">
                    <li>Notre équipe examine votre candidature</li>
                    <li>Vous recevrez un email une fois la décision prise</li>
                    <li>Le processus prend généralement 2-3 jours ouvrés</li>
                    <li>Vous pouvez nous contacter si vous avez des questions</li>
                  </ul>
                </CardContent>
              </Card>
            )}

            {partner?.status === 'rejete' && (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-6">
                  <h3 className="font-medium text-red-800 mb-2">
                    Options disponibles
                  </h3>
                  <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                    <li>Contactez-nous pour comprendre les raisons du refus</li>
                    <li>Vous pouvez soumettre une nouvelle candidature après 30 jours</li>
                    <li>Assurez-vous de compléter toutes les informations requises</li>
                  </ul>
                  <Button
                    className="mt-4"
                    variant="outline"
                    onClick={() => navigate('/devenir-partenaire')}
                  >
                    Soumettre une nouvelle candidature
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <PartnerProfileForm partner={partner} onUpdate={fetchPartnerData} />
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                {partner?.status === 'en_attente' ? (
                  <div className="text-center py-8 text-gray-500">
                    <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Aucune notification pour le moment</p>
                    <p className="text-sm mt-2">
                      Vous serez notifié lorsque votre candidature sera traitée
                    </p>
                  </div>
                ) : partner?.status === 'approuve' ? (
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                      <div className="p-2 bg-green-100 rounded-full">
                        <Bell className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-green-800">
                          Candidature approuvée
                        </p>
                        <p className="text-sm text-green-600">
                          Votre candidature a été approuvée. Bienvenue parmi nos partenaires !
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(partner.created_at).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : partner?.status === 'rejete' ? (
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg">
                      <div className="p-2 bg-red-100 rounded-full">
                        <Bell className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium text-red-800">
                          Candidature non retenue
                        </p>
                        <p className="text-sm text-red-600">
                          Votre candidature n'a pas été retenue. Contactez-nous pour plus d'informations.
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(partner.created_at).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Aucune notification</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default PartnerDashboard;
