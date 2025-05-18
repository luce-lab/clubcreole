
import { nightEvents } from "./NightlifeTypes";
import NightlifeCard from "./NightlifeCard";

const NightlifeEventsList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      {nightEvents.map((event) => (
        <NightlifeCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default NightlifeEventsList;
