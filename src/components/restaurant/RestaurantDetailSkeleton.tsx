
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import RestaurantHeader from "@/components/restaurant/RestaurantHeader";

const RestaurantDetailSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <RestaurantHeader />
      <div className="max-w-5xl mx-auto mt-8">
        <Skeleton className="h-8 w-1/3 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Skeleton className="h-96 w-full rounded-lg" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <Skeleton className="h-96 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailSkeleton;
