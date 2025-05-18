
import ConcertCard from "./ConcertCard";
import { Concert } from './ConcertTypes';

interface ConcertListProps {
  concerts: Concert[];
}

const ConcertList: React.FC<ConcertListProps> = ({ concerts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      {concerts.map((concert) => (
        <ConcertCard key={concert.id} concert={concert} />
      ))}
    </div>
  );
};

export default ConcertList;
