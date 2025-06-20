
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TravelHeader } from "@/components/travel/TravelHeader";
import { TravelOffersList } from "@/components/travel/TravelOffersList";

const TravelActivity = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <TravelHeader />
        <TravelOffersList />
      </main>
      <Footer />
    </div>
  );
};

export default TravelActivity;
