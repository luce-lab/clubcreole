
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Plus } from "lucide-react";
import { createFleetManager, CreateFleetManagerData } from "@/services/fleetManagerService";

interface CreateFleetManagerDialogProps {
  companyId: string;
  companyName: string;
}

export const CreateFleetManagerDialog = ({ companyId, companyName }: CreateFleetManagerDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<CreateFleetManagerData>({
    email: "",
    first_name: "",
    last_name: "",
    company_id: companyId,
    permissions: {
      manage_vehicles: true,
      view_reservations: true,
      manage_reservations: false,
    },
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createFleetManager,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fleet-managers', companyId] });
      toast({
        title: "Gestionnaire créé",
        description: "Le gestionnaire de flotte a été créé avec succès.",
      });
      setOpen(false);
      setFormData({
        email: "",
        first_name: "",
        last_name: "",
        company_id: companyId,
        permissions: {
          manage_vehicles: true,
          view_reservations: true,
          manage_reservations: false,
        },
      });
    },
    onError: (error: any) => {
      console.error("Erreur lors de la création:", error);
      toast({
        title: "Erreur",
        description: error.message || "Impossible de créer le gestionnaire.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.first_name || !formData.last_name) {
      toast({
        title: "Erreur",
        description: "Tous les champs sont requis.",
        variant: "destructive",
      });
      return;
    }
    createMutation.mutate(formData);
  };

  const handlePermissionChange = (permission: keyof CreateFleetManagerData['permissions'], value: boolean) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: value,
      },
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-1" />
          Ajouter Gestionnaire
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Créer un gestionnaire de flotte</DialogTitle>
          <DialogDescription>
            Créez un nouveau gestionnaire pour {companyName}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="first_name">Prénom</Label>
            <Input
              id="first_name"
              value={formData.first_name}
              onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
              placeholder="Prénom du gestionnaire"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="last_name">Nom</Label>
            <Input
              id="last_name"
              value={formData.last_name}
              onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
              placeholder="Nom du gestionnaire"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="email@exemple.com"
              required
            />
          </div>
          
          <div className="space-y-3">
            <Label>Permissions</Label>
            
            <div className="flex items-center space-x-2">
              <Switch
                checked={formData.permissions?.manage_vehicles}
                onCheckedChange={(checked) => handlePermissionChange('manage_vehicles', checked)}
              />
              <span className="text-sm">Gérer les véhicules</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                checked={formData.permissions?.view_reservations}
                onCheckedChange={(checked) => handlePermissionChange('view_reservations', checked)}
              />
              <span className="text-sm">Voir les réservations</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                checked={formData.permissions?.manage_reservations}
                onCheckedChange={(checked) => handlePermissionChange('manage_reservations', checked)}
              />
              <span className="text-sm">Gérer les réservations</span>
            </div>
          </div>
        </form>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Annuler
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={createMutation.isPending}
          >
            {createMutation.isPending ? "Création..." : "Créer le gestionnaire"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
