
import ActivityCard from "./ActivityCard";
import { Loisir } from "./types";

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
