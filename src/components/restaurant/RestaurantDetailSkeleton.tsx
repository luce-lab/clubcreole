
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import RestaurantHeader from "@/components/restaurant/RestaurantHeader";

const RestaurantDetailSkeleton = () => {
  // console.log("Rendering skeleton loading state");
  
  return (
    <div className="container mx-auto px-4 py-8">
      <RestaurantHeader />
      <div className="max-w-5xl mx-auto mt-8">
        <Skeleton className="h-8 w-1/3 mb-4" />
        <div className="flex gap-2 mb-6">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-12" />
          <Skeleton className="h-6 w-32" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Skeleton className="h-96 w-full rounded-lg" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-40 w-full rounded-lg" />
              <Skeleton className="h-40 w-full rounded-lg" />
              <Skeleton className="h-40 w-full rounded-lg" />
            </div>
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="md:col-span-1">
            <Skeleton className="h-80 w-full rounded-lg" />
            <div className="mt-6">
              <Skeleton className="h-8 w-2/3 mb-2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full mt-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailSkeleton;
