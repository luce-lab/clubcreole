
import { Button } from "@/components/ui/button";

interface ConcertInfoCardProps {
  title: string;
  content: string;
  buttonText: string;
}

const ConcertInfoCard: React.FC<ConcertInfoCardProps> = ({ title, content, buttonText }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-bold text-creole-blue mb-2">{title}</h2>
      <p className="text-gray-700 mb-4">
        {content}
      </p>
      <Button className="bg-purple-600 hover:bg-purple-700">
        {buttonText}
      </Button>
    </div>
  );
};

export default ConcertInfoCard;
