
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Loisir } from "@/components/loisirs/types";
import { getLoisirById } from "@/services/loisirService";
import LoisirsDetailHeader from "@/components/loisirs/LoisirsDetailHeader";
import LoisirsGallery from "@/components/loisirs/LoisirsGallery";
import LoisirsDetailDescription from "@/components/loisirs/LoisirsDetailDescription";
import LoisirsRegistrationBlock from "@/components/loisirs/LoisirsRegistrationBlock";
import LoisirsDetailSkeleton from "@/components/loisirs/LoisirsDetailSkeleton";
import LoisirsDetailError from "@/components/loisirs/LoisirsDetailError";

const LoisirsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [loisir, setLoisir] = useState<Loisir | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLoisirDetails = async () => {
      if (!id) {
        setError("ID d'activité non spécifié");
        setLoading(false);
        return;
      }

      try {
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
          throw new Error("ID d'activité invalide");
        }

        const loisirData = await getLoisirById(parsedId);
        console.log("Données de l'activité chargées:", loisirData);
        setLoisir(loisirData);
      } catch (err) {
        console.error("Erreur lors du chargement de l'activité:", err);
        setError(
          err instanceof Error 
            ? err.message 
            : "Erreur lors du chargement de l'activité"
        );
        toast({
          title: "Erreur",
          description: "Impossible de charger les détails de l'activité.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLoisirDetails();
  }, [id]);

  const handleUpdateLoisir = (updatedLoisir: Loisir) => {
    setLoisir(updatedLoisir);
  };

  if (loading) {
    return <LoisirsDetailSkeleton />;
  }

  if (error || !loisir) {
    return <LoisirsDetailError error={error || "Activité non trouvée"} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <LoisirsDetailHeader title={loisir.title} />
      
      <LoisirsGallery 
        mainImage={loisir.image} 
        galleryImages={loisir.gallery_images as string[]} 
        title={loisir.title} 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <LoisirsDetailDescription 
            title={loisir.title}
            description={loisir.description}
            location={loisir.location}
            startDate={loisir.start_date}
            endDate={loisir.end_date}
            currentParticipants={loisir.current_participants}
            maxParticipants={loisir.max_participants}
          />
        </div>
        
        <div className="md:col-span-1">
          <LoisirsRegistrationBlock 
            loisir={loisir} 
            onUpdateLoisir={handleUpdateLoisir} 
          />
        </div>
      </div>
    </div>
  );
};

export default LoisirsDetail;
