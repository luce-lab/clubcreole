
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface LoadMoreButtonProps {
  onLoadMore: () => void;
  loading: boolean;
  hasMore: boolean;
}

const LoadMoreButton = ({ onLoadMore, loading, hasMore }: LoadMoreButtonProps) => {
  if (!hasMore) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Tous les restaurants ont été chargés</p>
      </div>
    );
  }

  return (
    <div className="text-center py-8">
      <Button 
        onClick={onLoadMore}
        disabled={loading}
        className="bg-creole-green hover:bg-creole-green/90"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Chargement...
          </>
        ) : (
          "Voir plus de restaurants"
        )}
      </Button>
    </div>
  );
};

export default LoadMoreButton;
