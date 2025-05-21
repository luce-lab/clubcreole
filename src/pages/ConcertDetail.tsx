
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { concerts, Concert } from "@/components/concert/ConcertTypes";
import ConcertHeader from "@/components/concert/ConcertHeader";
import ConcertInfo from "@/components/concert/ConcertInfo";
import ConcertAdvantage from "@/components/concert/ConcertAdvantage";
import ConcertAdditionalInfo from "@/components/concert/ConcertAdditionalInfo";
import ReservationCard from "@/components/concert/ReservationCard";
import BackButton from "@/components/common/BackButton";

const ConcertDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [concert, setConcert] = useState<Concert | null>(null);

  useEffect(() => {
    // Find the concert with the matching id
    const foundConcert = concerts.find(c => c.id === parseInt(id || "0"));
    if (foundConcert) {
      setConcert(foundConcert);
      
      // The code setting the selectedDate from the concert date is moved to ReservationCard component
    } else {
      navigate("/concerts");
    }
  }, [id, navigate]);

  const handleShare = () => {
    if (navigator.share && concert) {
      navigator.share({
        title: concert.name,
        text: `Découvrez ${concert.name} par ${concert.artist}`,
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

  if (!concert) {
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center">
        <p>Chargement du concert...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton backTo="/concerts" />

      <ConcertHeader concert={concert} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <ConcertInfo concert={concert} onShare={handleShare} />
          <ConcertAdvantage concert={concert} />
          <ConcertAdditionalInfo />
        </div>
        
        <div>
          <ReservationCard concert={concert} />
        </div>
      </div>
    </div>
  );
};

export default ConcertDetail;
