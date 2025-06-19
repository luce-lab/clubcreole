
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { getNightlifeEvents, NightEvent } from "@/components/nightlife/NightlifeTypes";
import BackButton from "@/components/common/BackButton";

// Imported components
import EventHeader from "@/components/nightlife/EventHeader";
import EventDetailsCard from "@/components/nightlife/EventDetailsCard";
import EventFeatures from "@/components/nightlife/EventFeatures";
import EventAdvantages from "@/components/nightlife/EventAdvantages";
import EventSideCard from "@/components/nightlife/EventSideCard";
import ReservationDialog from "@/components/nightlife/ReservationDialog";
import InvitationDialog from "@/components/nightlife/InvitationDialog";
import PastEventAlert from "@/components/nightlife/PastEventAlert";

const NightlifeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [event, setEvent] = useState<NightEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [isReservationDialogOpen, setIsReservationDialogOpen] = useState(false);
  const [isInvitationDialogOpen, setIsInvitationDialogOpen] = useState(false);
  const [isEventPassed, setIsEventPassed] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const events = await getNightlifeEvents();
        const foundEvent = events.find(e => e.id === parseInt(id || "0"));
        
        if (foundEvent) {
          setEvent(foundEvent);
          
          // Vérifier si l'événement est passé (pour cet exemple, on vérifie si la date contient "Mercredis" ou "Jeudis")
          // Dans une application réelle, vous compareriez avec la date actuelle
          const isPassed = foundEvent.date.includes("Mercredis") || foundEvent.date.includes("Jeudis");
          setIsEventPassed(isPassed);
        } else {
          navigate("/soiree");
        }
      } catch (error) {
        console.error('Error loading event:', error);
        navigate("/soiree");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, navigate]);

  const handleShare = () => {
    if (navigator.share && event) {
      navigator.share({
        title: event.name,
        text: `Découvrez ${event.name} à ${event.venue}`,
        url: window.location.href
      }).catch(() => {
        toast({
          description: "Lien copié dans le presse-papier",
        });
        navigator.clipboard.writeText(window.location.href);
      });
    } else {
      toast({
        description: "Lien copié dans le presse-papier",
      });
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center">
        <p>Événement non trouvé</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton backTo="/soiree" />

      {/* Image et titre */}
      <EventHeader event={event} />

      {/* Alerte si l'événement est passé */}
      {isEventPassed && <PastEventAlert />}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* Informations sur l'événement */}
          <EventDetailsCard event={event} onShare={handleShare} />
          
          {/* Caractéristiques */}
          <EventFeatures event={event} />
          
          {/* Avantages Club Créole */}
          <EventAdvantages event={event} />
        </div>
        
        {/* Carte de réservation */}
        <div>
          <EventSideCard 
            event={event}
            isEventPassed={isEventPassed}
            onOpenReservationDialog={() => setIsReservationDialogOpen(true)}
            onOpenInvitationDialog={() => setIsInvitationDialogOpen(true)}
          />
        </div>
      </div>

      {/* Dialogs */}
      <ReservationDialog 
        event={event}
        isOpen={isReservationDialogOpen} 
        onOpenChange={setIsReservationDialogOpen} 
      />
      
      <InvitationDialog 
        isOpen={isInvitationDialogOpen} 
        onOpenChange={setIsInvitationDialogOpen} 
      />
    </div>
  );
};

export default NightlifeDetail;
