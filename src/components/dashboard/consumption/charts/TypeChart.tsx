
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { 
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";
import { ChartDataByType } from "../types";
import { COLORS } from "../utils";

interface TypeChartProps {
  data: ChartDataByType[];
}

export const TypeChart: React.FC<TypeChartProps> = ({ data }) => {
  return (
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
                data={data}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
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
  );
};
