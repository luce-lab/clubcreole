
import ActivityCard from "./ActivityCard";

interface Loisir {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  max_participants: number;
  current_participants: number;
  image: string;
}

interface LoisirsGridProps {
  loisirs: Loisir[];
  onUpdateLoisir: (updatedLoisir: Loisir) => void;
}

const LoisirsGrid = ({ loisirs, onUpdateLoisir }: LoisirsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {loisirs.map((loisir) => (
        <ActivityCard 
          key={loisir.id} 
          loisir={loisir} 
          onUpdateLoisir={onUpdateLoisir}
        />
      ))}
    </div>
  );
};

export default LoisirsGrid;
