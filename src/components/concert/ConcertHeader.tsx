
import { Concert } from './ConcertTypes';
import { Badge } from "@/components/ui/badge";

interface ConcertHeaderProps {
  concert: Concert;
}

const ConcertHeader: React.FC<ConcertHeaderProps> = ({ concert }) => {
  const Icon = concert.icon;
  
  return (
    <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
      <img 
        src={concert.image} 
        alt={concert.name} 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
        <Badge className="self-start mb-2 bg-purple-600 text-white">
          <Icon className="w-4 h-4 mr-1" />
          {concert.genre}
        </Badge>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">{concert.name}</h1>
        <p className="text-xl text-white/90">{concert.artist}</p>
      </div>
    </div>
  );
};

export default ConcertHeader;
