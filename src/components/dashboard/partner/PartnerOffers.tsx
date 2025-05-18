
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export const PartnerOffers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [isAddOfferOpen, setIsAddOfferOpen] = useState(false);
  const [partnerType, setPartnerType] = useState<"activity" | "restaurant">("activity");
  
  // On utiliserait normalement un contexte ou un hook pour obtenir le type du partenaire
  // Pour la démo, on peut le définir ici
  
  // Données fictives pour la démonstration
  const offers = [
    {
      id: "1", 
      name: "Découverte plongée - 20% de réduction", 
      description: "20% de réduction sur les baptêmes de plongée pour les réservations de groupes (3+)",
      category: "discount",
      startDate: "01/04/2025",
      endDate: "30/04/2025",
      status: "active",
      isRestaurantOffer: false
    },
    {
      id: "2", 
      name: "Forfait exploration complète", 
      description: "3 plongées d'exploration + équipement complet pour 180€",
      category: "package",
      startDate: "15/03/2025",
      endDate: "15/05/2025",
      status: "active",
      isRestaurantOffer: false
    },
    {
      id: "3", 
      name: "Menu dégustation 2 personnes", 
      description: "Menu complet avec entrée, plat, dessert et boisson pour 2 personnes à 60€",
      category: "package",
      startDate: "01/04/2025",
      endDate: "31/05/2025",
      status: "active",
      isRestaurantOffer: true
    },
    {
      id: "4", 
      name: "Happy hour - 50% sur les cocktails", 
      description: "50% de réduction sur tous les cocktails entre 17h et 19h",
      category: "discount",
      startDate: "01/04/2025",
      endDate: "01/06/2025",
      status: "scheduled",
      isRestaurantOffer: true
    },
    {
      id: "5", 
      name: "Dessert offert", 
      description: "Un dessert offert pour tout achat d'un menu",
      category: "gift",
      startDate: "10/04/2025",
      endDate: "30/04/2025",
      status: "active",
      isRestaurantOffer: true
    }
  ];

  // Filtrage des offres en fonction de la recherche et de la catégorie
  const filteredOffers = offers.filter(offer => {
    const matchesSearch = offer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         offer.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || offer.category === filterCategory;
    
    // Filtrer selon le type de partenaire (activité ou restaurant)
    const matchesPartnerType = partnerType === "restaurant" ? offer.isRestaurantOffer : !offer.isRestaurantOffer;
    
    return matchesSearch && matchesCategory && matchesPartnerType;
  });

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "discount":
        return "Réduction";
      case "package":
        return "Forfait";
      case "gift":
        return "Cadeau";
      default:
        return category;
    }
  };

  const getCategoryBadgeVariant = (category: string): "default" | "secondary" | "outline" => {
    switch (category) {
      case "discount":
        return "default";
      case "package":
        return "secondary";
      case "gift":
        return "outline";
      default:
        return "default";
    }
  };

  const getStatusBadgeClasses = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "expired":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Active";
      case "scheduled":
        return "Programmée";
      case "expired":
        return "Expirée";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher une offre..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrer par catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les catégories</SelectItem>
              <SelectItem value="discount">Réductions</SelectItem>
              <SelectItem value="package">Forfaits</SelectItem>
              <SelectItem value="gift">Cadeaux</SelectItem>
            </SelectContent>
          </Select>
          
          <Dialog open={isAddOfferOpen} onOpenChange={setIsAddOfferOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter une offre
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Créer une nouvelle offre</DialogTitle>
                <DialogDescription>
                  Définissez les détails de votre offre spéciale.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="offer-name" className="text-right">
                    Nom
                  </Label>
                  <Input
                    id="offer-name"
                    placeholder="Nom de l'offre"
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="offer-category" className="text-right">
                    Catégorie
                  </Label>
                  <Select defaultValue="discount">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Sélectionnez une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="discount">Réduction</SelectItem>
                      <SelectItem value="package">Forfait</SelectItem>
                      <SelectItem value="gift">Cadeau</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="offer-description" className="text-right pt-2">
                    Description
                  </Label>
                  <Textarea
                    id="offer-description"
                    placeholder="Description de l'offre"
                    className="col-span-3"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="start-date" className="text-right">
                    Début
                  </Label>
                  <Input
                    id="start-date"
                    type="date"
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="end-date" className="text-right">
                    Fin
                  </Label>
                  <Input
                    id="end-date"
                    type="date"
                    className="col-span-3"
                  />
                </div>
                
                {partnerType === "restaurant" && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="offer-conditions" className="text-right">
                      Conditions
                    </Label>
                    <Input
                      id="offer-conditions"
                      placeholder="Conditions d'application (optionnel)"
                      className="col-span-3"
                    />
                  </div>
                )}
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddOfferOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit">Créer l'offre</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {/* Option pour basculer entre les types de partenaire pour la démo */}
      <div className="flex items-center space-x-2 justify-end">
        <Label htmlFor="partner-type">Mode restaurant</Label>
        <Switch 
          id="partner-type" 
          checked={partnerType === "restaurant"}
          onCheckedChange={(checked) => setPartnerType(checked ? "restaurant" : "activity")}
        />
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Période</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Actif</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOffers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Aucune offre trouvée
                </TableCell>
              </TableRow>
            ) : (
              filteredOffers.map((offer) => (
                <TableRow key={offer.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{offer.name}</div>
                      <div className="text-sm text-muted-foreground line-clamp-1">{offer.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getCategoryBadgeVariant(offer.category)}>
                      {getCategoryLabel(offer.category)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {offer.startDate} - {offer.endDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClasses(offer.status)}`}>
                      {getStatusLabel(offer.status)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Switch checked={offer.status === "active"} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
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
    </div>
  );
};
