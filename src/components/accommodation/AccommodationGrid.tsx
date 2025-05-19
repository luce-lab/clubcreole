
import { Accommodation } from "@/components/accommodation/AccommodationTypes";
import { AccommodationCard } from "@/components/accommodation/AccommodationCard";
import { AccommodationEmptyState } from "@/components/accommodation/AccommodationEmptyState";

interface AccommodationGridProps {
  accommodations: Accommodation[];
}

export const AccommodationGrid = ({ accommodations }: AccommodationGridProps) => {
  if (accommodations.length === 0) {
    return <AccommodationEmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
      {accommodations.map((accommodation) => (
        <AccommodationCard key={accommodation.id} accommodation={accommodation} />
      ))}
    </div>
  );
};
