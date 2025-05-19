
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface AccommodationErrorProps {
  error: string;
}

export const AccommodationError = ({ error }: AccommodationErrorProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Réessayer</Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};
