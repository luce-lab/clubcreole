
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2, Download, UserPlus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Loisir } from "@/components/loisirs/types";
import { AddParticipantDialog } from "./AddParticipantDialog";

interface Participant {
  id: number;
  name: string;
  email: string;
  phone: string;
  loisir_id: number;
  inscription_date: string;
}

interface InscriptionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loisir: Loisir;
}

export const InscriptionsDialog = ({
  open,
  onOpenChange,
  loisir,
}: InscriptionsDialogProps) => {
  const { toast } = useToast();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [addParticipantOpen, setAddParticipantOpen] = useState(false);

  // Pour l'instant, nous utilisons des données fictives
  useEffect(() => {
    if (open) {
      // Simuler le chargement des participants
      const mockParticipants: Participant[] = [
        {
          id: 1,
          name: "Jean Dupont",
          email: "jean.dupont@example.com",
          phone: "0612345678",
          loisir_id: loisir.id,
          inscription_date: new Date().toISOString(),
        },
        {
          id: 2,
          name: "Marie Martin",
          email: "marie.martin@example.com",
          phone: "0698765432",
          loisir_id: loisir.id,
          inscription_date: new Date().toISOString(),
        },
      ];

      setTimeout(() => {
        setParticipants(mockParticipants);
        setLoading(false);
      }, 500);
    } else {
      setLoading(true);
    }
  }, [open, loisir.id]);

  const handleAddParticipant = (participant: Omit<Participant, "id" | "inscription_date">) => {
    const newParticipant: Participant = {
      ...participant,
      id: participants.length + 1,
      inscription_date: new Date().toISOString(),
    };
    
    setParticipants([...participants, newParticipant]);
    toast({
      title: "Participant ajouté",
      description: "Le participant a été ajouté avec succès",
    });
  };

  const handleExportCSV = () => {
    try {
      // Créer le contenu CSV
      const headers = ["Nom", "Email", "Téléphone", "Date d'inscription"];
      const rows = participants.map(p => [
        p.name, 
        p.email, 
        p.phone, 
        new Date(p.inscription_date).toLocaleDateString('fr-FR')
      ]);
      
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
      ].join('\n');
      
      // Créer un blob et un lien de téléchargement
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      
      link.setAttribute("href", url);
      link.setAttribute("download", `participants_${loisir.title.replace(/\s+/g, '_')}.csv`);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Export réussi",
        description: "La liste des participants a été exportée avec succès",
      });
    } catch (error) {
      console.error("Erreur lors de l'export CSV:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de l'export",
      });
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('fr-FR');
    } catch (error) {
      return dateString;
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Participants à {loisir.title}
            </DialogTitle>
            <DialogDescription>
              Liste des participants inscrits à cette activité ({loisir.current_participants}/{loisir.max_participants})
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-between mb-4">
            <Button
              variant="outline"
              onClick={() => setAddParticipantOpen(true)}
              disabled={loisir.current_participants >= loisir.max_participants}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Ajouter un participant
            </Button>

            <Button 
              variant="outline" 
              onClick={handleExportCSV}
              disabled={participants.length === 0}
            >
              <Download className="mr-2 h-4 w-4" />
              Exporter CSV
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Téléphone</TableHead>
                    <TableHead>Date d'inscription</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {participants.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        Aucun participant inscrit
                      </TableCell>
                    </TableRow>
                  ) : (
                    participants.map((participant) => (
                      <TableRow key={participant.id}>
                        <TableCell className="font-medium">{participant.name}</TableCell>
                        <TableCell>{participant.email}</TableCell>
                        <TableCell>{participant.phone}</TableCell>
                        <TableCell>{formatDate(participant.inscription_date)}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AddParticipantDialog 
        open={addParticipantOpen}
        onOpenChange={setAddParticipantOpen}
        loisirId={loisir.id}
        onSuccess={handleAddParticipant}
        remainingSpots={loisir.max_participants - loisir.current_participants}
      />
    </>
  );
};
