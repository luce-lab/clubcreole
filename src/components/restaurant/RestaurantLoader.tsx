
import { Loader2 } from "lucide-react";

const RestaurantLoader = () => {
  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[50vh]">
      <Loader2 className="h-8 w-8 animate-spin text-creole-blue mb-4" />
      <p className="text-lg text-creole-blue">Chargement des restaurants...</p>
    </div>
  );
};

export default RestaurantLoader;
