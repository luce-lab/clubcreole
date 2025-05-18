
import { concerts } from "@/components/concert/ConcertTypes";
import ConcertPageHeader from "@/components/concert/ConcertPageHeader";
import ConcertList from "@/components/concert/ConcertList";
import ConcertInfoCard from "@/components/concert/ConcertInfoCard";

const ConcertActivity = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ConcertPageHeader 
        title="Concerts & Événements Musicaux"
        description="Découvrez les concerts partenaires du Club Créole et profitez d'offres exclusives"
      />

      <ConcertList concerts={concerts} />
      
      <ConcertInfoCard 
        title="Comment profiter des avantages?"
        content="En tant que membre du Club Créole, présentez simplement votre carte de membre ou application mobile
        lors de l'achat de vos billets pour bénéficier des offres exclusives sur les concerts et événements partenaires."
        buttonText="Devenir membre"
      />
    </div>
  );
};

export default ConcertActivity;
