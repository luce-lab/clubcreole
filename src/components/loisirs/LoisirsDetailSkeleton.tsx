
import { Skeleton } from "@/components/ui/skeleton";
import LoisirsDetailHeader from "./LoisirsDetailHeader";

const LoisirsDetailSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <LoisirsDetailHeader />
      
      <div className="mb-8">
        <Skeleton className="h-64 w-full rounded-lg mb-4" />
        <div className="flex gap-2 justify-center">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-start mb-4">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-40" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-32" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-24" />
              </div>
            </div>
            
            <div>
              <Skeleton className="h-6 w-32 mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
        
        <div className="md:col-span-1">
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default LoisirsDetailSkeleton;
