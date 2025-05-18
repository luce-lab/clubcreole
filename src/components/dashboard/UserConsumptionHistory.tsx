
import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";

import { ConsumptionItem } from "./consumption/types";
import { ConsumptionFilters } from "./consumption/ConsumptionFilters";
import { ConsumptionTable } from "./consumption/ConsumptionTable";
import { ConsumptionCharts } from "./consumption/ConsumptionCharts";
import { 
  calculateConsumptionByCategory, 
  calculateConsumptionByType, 
  calculateConsumptionByMonth 
} from "./consumption/utils";

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
    setConsumptionByCategory(calculateConsumptionByCategory(filteredHistory));
    setConsumptionByType(calculateConsumptionByType(filteredHistory));
    setConsumptionByMonth(calculateConsumptionByMonth(filteredHistory));
  }, [filteredHistory]);

  // Obtenir la liste unique des catégories
  const categories = Array.from(new Set(history.map(item => item.category)));
  
  // Vérifier s'il y a des données à afficher dans les graphiques
  const hasChartData = filteredHistory.some(item => item.price && item.status === "complété");

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
          <ConsumptionFilters
            categoryFilter={categoryFilter}
            typeFilter={typeFilter}
            statusFilter={statusFilter}
            setCategoryFilter={setCategoryFilter}
            setTypeFilter={setTypeFilter}
            setStatusFilter={setStatusFilter}
            categories={categories}
          />
          
          <ConsumptionTable filteredHistory={filteredHistory} />
        </CardContent>
      </Card>

      <ConsumptionCharts
        consumptionByCategory={consumptionByCategory}
        consumptionByType={consumptionByType}
        consumptionByMonth={consumptionByMonth}
        hasData={hasChartData}
      />
    </div>
  );
};
