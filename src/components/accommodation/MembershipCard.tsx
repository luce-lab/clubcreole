
import { Button } from "@/components/ui/button";

export const MembershipCard = () => {
  return (
    <div className="bg-gray-50 rounded-lg p-6 shadow-md mb-10">
      <h2 className="text-2xl font-bold text-creole-blue mb-2">Comment profiter des avantages?</h2>
      <p className="text-gray-700 mb-4">
        En tant que membre du Club Créole, présentez simplement votre carte de membre ou application mobile
        pour bénéficier de réductions exclusives sur votre séjour.
      </p>
      <Button className="bg-creole-green hover:bg-creole-green/90">
        Devenir membre
      </Button>
    </div>
  );
};
