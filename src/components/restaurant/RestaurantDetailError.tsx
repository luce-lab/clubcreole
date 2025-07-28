
import React from "react";
import RestaurantHeader from "@/components/restaurant/RestaurantHeader";

interface RestaurantDetailErrorProps {
  error: string;
}

const RestaurantDetailError = ({ error }: RestaurantDetailErrorProps) => {
  // console.log("Rendering error state with:", error);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <RestaurantHeader />
      <div className="p-6 bg-red-50 border border-red-200 rounded-md text-red-700 max-w-5xl mx-auto mt-8">
        <h2 className="text-xl font-semibold mb-2">Erreur</h2>
        <p>{error || "Restaurant non trouvé"}</p>
      </div>
    </div>
  );
};

export default RestaurantDetailError;
