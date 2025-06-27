
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const RestaurantCardSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <Skeleton className="w-full h-full" />
        <div className="absolute top-3 right-3">
          <Skeleton className="h-6 w-20" />
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-32" />
          <div className="flex items-center">
            <Skeleton className="h-5 w-5 mr-1" />
            <Skeleton className="h-4 w-8" />
          </div>
        </div>
        <Skeleton className="h-4 w-40" />
      </CardHeader>
      
      <CardContent>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-3" />
        <div className="flex items-center">
          <Skeleton className="h-4 w-4 mr-2" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardContent>
      
      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
};

export default RestaurantCardSkeleton;
