
import { Loader2 } from "lucide-react";

interface AuthLoadingStateProps {
  message: string;
}

export const AuthLoadingState = ({ message }: AuthLoadingStateProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-creole-green" />
        <p className="text-lg">{message}</p>
      </div>
    </div>
  );
};
