
import { Button } from "@/components/ui/button";

const NightlifeInfoCard = () => {
  return (
    <div className="bg-gray-50 rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-bold text-[#9b87f5] mb-2">Comment profiter des avantages?</h2>
      <p className="text-gray-700 mb-4">
        En tant que membre du Club Créole, présentez simplement votre carte de membre ou application mobile
        lors de votre arrivée dans les établissements partenaires pour bénéficier des offres exclusives sur les soirées et événements.
      </p>
      <Button className="bg-[#7E69AB] hover:bg-[#6E59A5]">
        Devenir membre
      </Button>
    </div>
  );
};

export default NightlifeInfoCard;
