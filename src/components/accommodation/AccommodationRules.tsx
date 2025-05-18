
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AccommodationRulesProps {
  rules: string[];
}

export const AccommodationRules = ({ rules }: AccommodationRulesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Règlement intérieur</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside space-y-2 pl-4">
          {rules.map((rule, index) => (
            <li key={index} className="text-gray-700">{rule}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
