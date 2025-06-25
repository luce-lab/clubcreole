
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { 
  Card, 
  CardContent, 
  CardHeader,
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShoppingBag, Plus, Search, Edit, Trash2, CheckCircle, XCircle, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Partner {
  id: string;
  business_name: string;
  business_type: string;
  status: string;
  created_at: string;
  phone?: string;
  address?: string;
}

const PartnersManagement = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [partners, setPartners] = useState<Partner[]>([]);
  const [filteredPartners, setFilteredPartners] = useState<Partner[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPartners();
  }, []);

  useEffect(() => {
    filterPartners();
  }, [partners, activeTab, searchTerm]);

  const fetchPartners = async () => {
    try {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erreur lors du chargement des partenaires:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les partenaires",
          variant: "destructive"
        });
        return;
      }

      setPartners(data || []);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPartners = () => {
    let filtered = partners;

    // Filtrer par statut selon l'onglet actif
    if (activeTab !== "all") {
      filtered = filtered.filter(partner => partner.status === activeTab);
    }

    // Filtrer par terme de recherche
    if (searchTerm) {
      filtered = filtered.filter(partner =>
        partner.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        partner.business_type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPartners(filtered);
  };

  const updatePartnerStatus = async (partnerId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('partners')
        .update({ status: newStatus })
        .eq('id', partnerId);

      if (error) {
        console.error('Erreur lors de la mise à jour:', error);
        toast({
          title: "Erreur",
          description: "Impossible de mettre à jour le statut",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Succès",
        description: `Statut mis à jour avec succès`,
      });

      // Recharger les données
      fetchPartners();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approuve':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejete':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-orange-600" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approuve':
        return 'Approuvé';
      case 'rejete':
        return 'Rejeté';
      default:
        return 'En attente';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approuve':
        return 'bg-green-100 text-green-700';
      case 'rejete':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-orange-100 text-orange-700';
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Chargement des partenaires...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-creole-green">Gestion des Partenaires</h1>
            <p className="text-sm text-gray-600">
              Gérez tous les partenaires de la plateforme
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un partenaire
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Partenaires</CardTitle>
                <CardDescription>Liste des partenaires enregistrés sur la plateforme</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher un partenaire..."
                    className="pl-8 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">Tous ({partners.length})</TabsTrigger>
                <TabsTrigger value="en_attente">En attente ({partners.filter(p => p.status === 'en_attente').length})</TabsTrigger>
                <TabsTrigger value="approuve">Approuvés ({partners.filter(p => p.status === 'approuve').length})</TabsTrigger>
                <TabsTrigger value="rejete">Rejetés ({partners.filter(p => p.status === 'rejete').length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab}>
                <PartnersList 
                  partners={filteredPartners} 
                  onUpdateStatus={updatePartnerStatus}
                  getStatusIcon={getStatusIcon}
                  getStatusLabel={getStatusLabel}
                  getStatusColor={getStatusColor}
                  formatDate={formatDate}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

// Sous-composant pour la liste des partenaires
const PartnersList = ({ 
  partners, 
  onUpdateStatus, 
  getStatusIcon, 
  getStatusLabel, 
  getStatusColor, 
  formatDate 
}: { 
  partners: Partner[];
  onUpdateStatus: (id: string, status: string) => void;
  getStatusIcon: (status: string) => JSX.Element;
  getStatusLabel: (status: string) => string;
  getStatusColor: (status: string) => string;
  formatDate: (date: string) => string;
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom de l'entreprise</TableHead>
            <TableHead>Type d'activité</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Date de candidature</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {partners.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                Aucun partenaire trouvé
              </TableCell>
            </TableRow>
          ) : (
            partners.map((partner) => (
              <TableRow key={partner.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <div className="bg-creole-green/10 p-2 rounded-md">
                      <ShoppingBag className="h-4 w-4 text-creole-green" />
                    </div>
                    {partner.business_name}
                  </div>
                </TableCell>
                <TableCell>{partner.business_type}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(partner.status)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(partner.status)}`}>
                      {getStatusLabel(partner.status)}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{formatDate(partner.created_at)}</TableCell>
                <TableCell>{partner.phone || '-'}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {partner.status === 'en_attente' && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onUpdateStatus(partner.id, 'approuve')}
                          className="text-green-600 hover:text-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approuver
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onUpdateStatus(partner.id, 'rejete')}
                          className="text-red-600 hover:text-red-700"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Rejeter
                        </Button>
                      </>
                    )}
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PartnersManagement;
