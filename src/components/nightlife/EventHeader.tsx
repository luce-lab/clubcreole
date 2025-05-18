
import { Badge } from "@/components/ui/badge";
import { Martini } from "lucide-react";
import { NightEvent } from "./NightlifeTypes";

interface EventHeaderProps {
  event: NightEvent;
}

const EventHeader = ({ event }: EventHeaderProps) => {
  return (
    <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
      <img 
        src={event.image} 
        alt={event.name} 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
        <Badge className="self-start mb-2 bg-[#6E59A5] text-white">
          <Martini className="w-4 h-4 mr-1" />
          {event.type}
        </Badge>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">{event.name}</h1>
        <p className="text-xl text-white/90">{event.venue}</p>
      </div>
    </div>
  );
};

export default EventHeader;
