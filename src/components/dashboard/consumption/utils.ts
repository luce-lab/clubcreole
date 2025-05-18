
import { ConsumptionItem } from "./types";

// Format date for display
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('fr-FR');
};

// Chart configuration
export const chartConfig = {
  montant: {
    label: "Montant dépensé (€)",
    color: "#10B981",
  },
};

// Chart colors
export const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

// Calculate consumption by category
export const calculateConsumptionByCategory = (filteredHistory: ConsumptionItem[]) => {
  return filteredHistory.reduce((acc, item) => {
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
};

// Calculate consumption by type
export const calculateConsumptionByType = (filteredHistory: ConsumptionItem[]) => {
  return filteredHistory.reduce((acc, item) => {
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
};

// Calculate consumption by month
export const calculateConsumptionByMonth = (filteredHistory: ConsumptionItem[]) => {
  return filteredHistory.reduce((acc, item) => {
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
};
