
import { useState } from "react";
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
  ChartTooltip,
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
  Legend
} from "recharts";

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
  ]);

  // Données pour le graphique de consommation par catégorie
  const consumptionByCategory = [
    { name: "Activités", montant: 120 },
    { name: "Hébergement", montant: 450 },
    { name: "Location", montant: 280 },
    { name: "Événements", montant: 120 },
    { name: "Restauration", montant: 0 },
  ];

  // Configuration du graphique
  const chartConfig = {
    montant: {
      label: "Montant dépensé (€)",
      color: "#10B981",
    },
  };

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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Historique de consommation</CardTitle>
          <CardDescription>
            Détails des activités, réservations et achats de l'utilisateur
          </CardDescription>
        </CardHeader>
        <CardContent>
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
              {history.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{getTypeBadge(item.type)}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="font-medium">{item.itemName}</TableCell>
                  <TableCell>{item.price ? `${item.price}€` : "—"}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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
    </div>
  );
};
