
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
  Tooltip,
  Legend
} from "recharts";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { ChartDataByCategory } from "../types";
import { chartConfig } from "../utils";

interface CategoryChartProps {
  data: ChartDataByCategory[];
}

export const CategoryChart: React.FC<CategoryChartProps> = ({ data }) => {
  return (
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
            <BarChart data={data}>
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
  );
};
