
import { useState, useEffect } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ChartContainer, 
  ChartLegend, 
  ChartLegendContent 
} from "@/components/ui/chart";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface ConsumptionItem {
  id: string;
  date: string;
  type: "réservation" | "achat" | "consultation";
  category: string;
  itemName: string;
  price: number | null;
  status: "complété" | "annulé" | "en cours";
}

interface UserConsumptionHistoryProps {
  userId?: string;
}

export const UserConsumptionHistory = ({ userId = "1" }: UserConsumptionHistoryProps) => {
  // Données fictives pour l'historique de consommation
  const [history, setHistory] = useState<ConsumptionItem[]>([
    {
      id: "1",
      date: "2025-05-15",
      type: "réservation",
      category: "Activité",
      itemName: "Plongée découverte - Aqua Plongée",
      price: 75,
      status: "complété"
    },
    {
      id: "2",
      date: "2025-05-10",
      type: "réservation",
      category: "Hébergement",
      itemName: "Hotel Karibea - 3 nuits",
      price: 450,
      status: "complété"
    },
    {
      id: "3",
      date: "2025-05-05",
      type: "achat",
      category: "Événement",
      itemName: "Concert Reggae Festival - 2 billets",
      price: 120,
      status: "complété"
    },
    {
      id: "4",
      date: "2025-04-20",
      type: "réservation",
      category: "Location",
      itemName: "Voiture compact - 5 jours",
      price: 280,
      status: "complété"
    },
    {
      id: "5",
      date: "2025-04-12",
      type: "consultation",
      category: "Restauration",
      itemName: "Consulté plusieurs restaurants",
      price: null,
      status: "complété"
    },
    {
      id: "6",
      date: "2025-04-05",
      type: "réservation",
      category: "Activité",
      itemName: "Randonnée guidée - Mont Pelé",
      price: 45,
      status: "annulé"
    },
    {
      id: "7",
      date: "2025-03-22",
      type: "réservation",
      category: "Activité",
      itemName: "Sortie Jet-Ski - 2 heures",
      price: 130,
      status: "complété"
    },
    {
      id: "8",
      date: "2025-03-15",
      type: "achat",
      category: "Événement",
      itemName: "Soirée Carnaval - Pass VIP",
      price: 85,
      status: "complété"
    },
  ]);

  // Filtres
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<ConsumptionItem["type"] | null>(null);
  const [statusFilter, setStatusFilter] = useState<ConsumptionItem["status"] | null>(null);
  const [filteredHistory, setFilteredHistory] = useState<ConsumptionItem[]>(history);

  // Données pour les graphiques
  const [consumptionByCategory, setConsumptionByCategory] = useState<any[]>([]);
  const [consumptionByType, setConsumptionByType] = useState<any[]>([]);
  const [consumptionByMonth, setConsumptionByMonth] = useState<any[]>([]);

  // Appliquer les filtres
  useEffect(() => {
    let result = history;
    
    if (categoryFilter) {
      result = result.filter(item => item.category === categoryFilter);
    }
    
    if (typeFilter) {
      result = result.filter(item => item.type === typeFilter);
    }
    
    if (statusFilter) {
      result = result.filter(item => item.status === statusFilter);
    }
    
    setFilteredHistory(result);
  }, [history, categoryFilter, typeFilter, statusFilter]);

  // Préparer les données pour les graphiques
  useEffect(() => {
    // Données par catégorie
    const categoryData = filteredHistory.reduce((acc, item) => {
      if (item.price && item.status === "complété") {
        const existingCategory = acc.find(c => c.name === item.category);
        if (existingCategory) {
          existingCategory.montant += item.price;
        } else {
          acc.push({ name: item.category, montant: item.price });
        }
      }
      return acc;
    }, [] as { name: string; montant: number }[]);
    
    setConsumptionByCategory(categoryData);

    // Données par type
    const typeData = filteredHistory.reduce((acc, item) => {
      if (item.price && item.status === "complété") {
        const existingType = acc.find(t => t.name === item.type);
        if (existingType) {
          existingType.value += item.price;
        } else {
          acc.push({ name: item.type, value: item.price });
        }
      }
      return acc;
    }, [] as { name: string; value: number }[]);
    
    setConsumptionByType(typeData);

    // Données par mois
    const monthData = filteredHistory.reduce((acc, item) => {
      if (item.price && item.status === "complété") {
        const month = item.date.substring(0, 7); // Format 'YYYY-MM'
        const monthName = new Date(item.date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
        
        const existingMonth = acc.find(m => m.month === month);
        if (existingMonth) {
          existingMonth.montant += item.price;
        } else {
          acc.push({ month, name: monthName, montant: item.price });
        }
      }
      return acc;
    }, [] as { month: string; name: string; montant: number }[]).sort((a, b) => a.month.localeCompare(b.month));
    
    setConsumptionByMonth(monthData);
  }, [filteredHistory]);

  // Configuration du graphique
  const chartConfig = {
    montant: {
      label: "Montant dépensé (€)",
      color: "#10B981",
    },
  };

  // Couleurs pour les graphiques
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  const getStatusBadge = (status: ConsumptionItem["status"]) => {
    switch (status) {
      case "complété":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Complété
          </Badge>
        );
      case "annulé":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Annulé
          </Badge>
        );
      case "en cours":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            En cours
          </Badge>
        );
      default:
        return null;
    }
  };

  const getTypeBadge = (type: ConsumptionItem["type"]) => {
    switch (type) {
      case "réservation":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Réservation
          </Badge>
        );
      case "achat":
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
            Achat
          </Badge>
        );
      case "consultation":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            Consultation
          </Badge>
        );
      default:
        return null;
    }
  };

  // Obtenir la liste unique des catégories
  const categories = Array.from(new Set(history.map(item => item.category)));
  
  // Formater la date pour l'affichage
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {userId ? `Historique de consommation - Utilisateur #${userId}` : "Historique de consommation"}
          </CardTitle>
          <CardDescription>
            Filtrez et analysez les activités, réservations et achats
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="w-full md:w-auto">
              <label className="text-sm font-medium">Catégorie</label>
              <Select value={categoryFilter || "all"} onValueChange={(value) => setCategoryFilter(value === "all" ? null : value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Toutes les catégories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-auto">
              <label className="text-sm font-medium">Type</label>
              <Select value={typeFilter || "all"} onValueChange={(value: any) => setTypeFilter(value === "all" ? null : value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tous les types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="réservation">Réservation</SelectItem>
                  <SelectItem value="achat">Achat</SelectItem>
                  <SelectItem value="consultation">Consultation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-auto">
              <label className="text-sm font-medium">Statut</label>
              <Select value={statusFilter || "all"} onValueChange={(value: any) => setStatusFilter(value === "all" ? null : value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="complété">Complété</SelectItem>
                  <SelectItem value="annulé">Annulé</SelectItem>
                  <SelectItem value="en cours">En cours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Détail</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.length > 0 ? (
                filteredHistory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{formatDate(item.date)}</TableCell>
                    <TableCell>{getTypeBadge(item.type)}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className="font-medium">{item.itemName}</TableCell>
                    <TableCell>{item.price ? `${item.price}€` : "—"}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Aucune activité trouvée avec ces critères
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredHistory.some(item => item.price && item.status === "complété") && (
        <Tabs defaultValue="categories" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="categories">Par catégorie</TabsTrigger>
            <TabsTrigger value="types">Par type</TabsTrigger>
            <TabsTrigger value="timeline">Évolution mensuelle</TabsTrigger>
          </TabsList>
          
          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <CardTitle>Dépenses par catégorie</CardTitle>
                <CardDescription>
                  Répartition des dépenses par type de service
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ChartContainer config={chartConfig}>
                    <BarChart data={consumptionByCategory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => `${value}€`}
                        labelFormatter={(name) => `${name}`}
                      />
                      <Legend />
                      <Bar dataKey="montant" fill="#10B981" name="Montant" />
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="types">
            <Card>
              <CardHeader>
                <CardTitle>Répartition par type</CardTitle>
                <CardDescription>
                  Distribution des dépenses entre réservations et achats
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={consumptionByType}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {consumptionByType.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}€`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="timeline">
            <Card>
              <CardHeader>
                <CardTitle>Évolution mensuelle des dépenses</CardTitle>
                <CardDescription>
                  Suivi des dépenses sur les derniers mois
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ChartContainer config={chartConfig}>
                    <BarChart data={consumptionByMonth}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => `${value}€`}
                      />
                      <Legend />
                      <Bar dataKey="montant" fill="#10B981" name="Montant" />
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};
