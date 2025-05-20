
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { CreateLoisirDialog } from "./CreateLoisirDialog";

export const LoisirsManagementHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-creole-blue">Gestion des Loisirs</h1>
        <p className="text-muted-foreground">
          Créez, modifiez ou supprimez des activités de loisirs et gérez les inscriptions
        </p>
      </div>
      <Button 
        onClick={() => setIsDialogOpen(true)}
        className="bg-creole-green hover:bg-creole-green/90"
      >
        <PlusCircle className="mr-2 h-4 w-4" /> Ajouter une activité
      </Button>
      
      <CreateLoisirDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
      />
    </div>
  );
};
