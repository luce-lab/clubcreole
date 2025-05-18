
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CategoryChart } from "./charts/CategoryChart";
import { TypeChart } from "./charts/TypeChart";
import { MonthlyChart } from "./charts/MonthlyChart";
import { ChartDataByCategory, ChartDataByType, ChartDataByMonth } from "./types";

interface ConsumptionChartsProps {
  consumptionByCategory: ChartDataByCategory[];
  consumptionByType: ChartDataByType[];
  consumptionByMonth: ChartDataByMonth[];
  hasData: boolean;
}

export const ConsumptionCharts: React.FC<ConsumptionChartsProps> = ({ 
  consumptionByCategory, 
  consumptionByType, 
  consumptionByMonth,
  hasData 
}) => {
  if (!hasData) return null;

  return (
    <Tabs defaultValue="categories" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="categories">Par catégorie</TabsTrigger>
        <TabsTrigger value="types">Par type</TabsTrigger>
        <TabsTrigger value="timeline">Évolution mensuelle</TabsTrigger>
      </TabsList>
      
      <TabsContent value="categories">
        <CategoryChart data={consumptionByCategory} />
      </TabsContent>
      
      <TabsContent value="types">
        <TypeChart data={consumptionByType} />
      </TabsContent>
      
      <TabsContent value="timeline">
        <MonthlyChart data={consumptionByMonth} />
      </TabsContent>
    </Tabs>
  );
};
