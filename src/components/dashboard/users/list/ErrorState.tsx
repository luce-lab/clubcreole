
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  error: string;
}

export const ErrorState = ({ error }: ErrorStateProps) => {
  return (
    <div className="w-full text-center py-8">
      <p className="text-red-500">{error}</p>
      <Button 
        variant="outline" 
        className="mt-4"
        onClick={() => window.location.reload()}
      >
        Réessayer
      </Button>
    </div>
  );
};
