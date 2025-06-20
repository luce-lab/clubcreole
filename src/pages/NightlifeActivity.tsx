
import NightlifePageHeader from "@/components/nightlife/NightlifePageHeader";
import NightlifeEventsList from "@/components/nightlife/NightlifeEventsList";
import NightlifeInfoCard from "@/components/nightlife/NightlifeInfoCard";

const NightlifeActivity = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <NightlifePageHeader />
      <NightlifeEventsList />
      <NightlifeInfoCard />
    </div>
  );
};

export default NightlifeActivity;
