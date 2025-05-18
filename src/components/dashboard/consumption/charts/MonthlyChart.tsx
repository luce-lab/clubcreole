
import { 
  ChartContainer,
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
import { ChartDataByMonth } from "../types";
import { chartConfig } from "../utils";

interface MonthlyChartProps {
  data: ChartDataByMonth[];
}

export const MonthlyChart: React.FC<MonthlyChartProps> = ({ data }) => {
  return (
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
            <BarChart data={data}>
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
  );
};
