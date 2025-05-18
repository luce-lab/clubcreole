
export interface ConsumptionItem {
  id: string;
  date: string;
  type: "réservation" | "achat" | "consultation";
  category: string;
  itemName: string;
  price: number | null;
  status: "complété" | "annulé" | "en cours";
}

export interface ChartDataByCategory {
  name: string;
  montant: number;
}

export interface ChartDataByType {
  name: string;
  value: number;
}

export interface ChartDataByMonth {
  month: string;
  name: string;
  montant: number;
}

export interface ConsumptionHistoryProps {
  userId?: string;
}

export interface FilterConfig {
  categoryFilter: string | null;
  typeFilter: ConsumptionItem["type"] | null;
  statusFilter: ConsumptionItem["status"] | null;
  setCategoryFilter: (value: string | null) => void;
  setTypeFilter: (value: ConsumptionItem["type"] | null) => void;
  setStatusFilter: (value: ConsumptionItem["status"] | null) => void;
  categories: string[];
}
