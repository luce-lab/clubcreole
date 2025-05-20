
import React from "react";
import RestaurantHeader from "@/components/restaurant/RestaurantHeader";

interface RestaurantDetailErrorProps {
  error: string;
}

const RestaurantDetailError = ({ error }: RestaurantDetailErrorProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <RestaurantHeader />
      <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700 max-w-5xl mx-auto mt-8">
        {error || "Restaurant non trouvé"}
      </div>
    </div>
  );
};

export default RestaurantDetailError;
