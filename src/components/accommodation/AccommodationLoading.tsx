
import { Bed } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const AccommodationLoading = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center">
        <div className="text-center">
          <Bed className="h-16 w-16 mx-auto text-creole-blue animate-pulse mb-4" />
          <p className="text-xl text-creole-blue">Chargement des hébergements...</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};
