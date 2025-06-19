
import { useState, useEffect } from "react";
import { getNightlifeEvents, NightEvent } from "./NightlifeTypes";
import NightlifeCard from "./NightlifeCard";

const NightlifeEventsList = () => {
  const [events, setEvents] = useState<NightEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getNightlifeEvents();
        setEvents(eventsData);
      } catch (error) {
        console.error('Error loading nightlife events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-300 h-48 rounded-t-lg"></div>
            <div className="p-4 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      {events.map((event) => (
        <NightlifeCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default NightlifeEventsList;
