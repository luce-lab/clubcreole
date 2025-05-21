
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Users } from "lucide-react";
import { EditLoisirDialog } from "./EditLoisirDialog";
import { DeleteLoisirDialog } from "./DeleteLoisirDialog";
import { InscriptionsDialog } from "./InscriptionsDialog";
import { Loisir } from "@/components/loisirs/types";
import { CreateLoisirDialog } from "./CreateLoisirDialog";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

interface LoisirsAdminListProps {
  loisirs: Loisir[];
  onAdd: (loisir: Loisir) => void;
  onUpdate: (loisir: Loisir) => void;
  onDelete: (id: number) => void;
}

export const LoisirsAdminList = ({ loisirs, onAdd, onUpdate, onDelete }: LoisirsAdminListProps) => {
  const [selectedLoisir, setSelectedLoisir] = useState<Loisir | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isInscriptionsOpen, setIsInscriptionsOpen] = useState(false);

  const handleEditClick = (loisir: Loisir) => {
    setSelectedLoisir(loisir);
    setIsEditOpen(true);
  };

  const handleDeleteClick = (loisir: Loisir) => {
    setSelectedLoisir(loisir);
    setIsDeleteOpen(true);
  };

  const handleInscriptionsClick = (loisir: Loisir) => {
    setSelectedLoisir(loisir);
    setIsInscriptionsOpen(true);
  };

  const formatDate = (dateString: string) => {
    try {
      // Vérifier si la chaîne est une date ISO valide
      const date = parseISO(dateString);
      if (isNaN(date.getTime())) {
        throw new Error("Date invalide");
      }
      return format(date, 'dd/MM/yyyy', { locale: fr });
    } catch (error) {
      // Essayer un autre format si la date n'est pas au format ISO
      try {
        const parts = dateString.split('/');
        if (parts.length === 3) {
          // Supposons que le format est dd/mm/yyyy
          const [day, month, year] = parts;
          const date = new Date(`${year}-${month}-${day}`);
          if (!isNaN(date.getTime())) {
            return format(date, 'dd/MM/yyyy', { locale: fr });
          }
        }
        // En dernier recours, renvoyer la chaîne telle quelle
        return dateString;
      } catch (error) {
        return dateString;
      }
    }
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Lieu</TableHead>
              <TableHead className="text-center">Participants</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loisirs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Aucune activité trouvée
                </TableCell>
              </TableRow>
            ) : (
              loisirs.map((loisir) => (
                <TableRow key={loisir.id}>
                  <TableCell className="font-medium">{loisir.title}</TableCell>
                  <TableCell>{formatDate(loisir.start_date)}</TableCell>
                  <TableCell>{loisir.location}</TableCell>
                  <TableCell className="text-center">
                    {loisir.current_participants} / {loisir.max_participants}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleInscriptionsClick(loisir)}
                        title="Gérer les inscriptions"
                      >
                        <Users className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEditClick(loisir)}
                        title="Modifier"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-red-500 hover:text-red-500"
                        onClick={() => handleDeleteClick(loisir)}
                        title="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {selectedLoisir && (
        <>
          <EditLoisirDialog
            open={isEditOpen}
            onOpenChange={setIsEditOpen}
            loisir={selectedLoisir}
            onSuccess={(updatedLoisir) => {
              onUpdate(updatedLoisir);
              setIsEditOpen(false);
            }}
          />

          <DeleteLoisirDialog
            open={isDeleteOpen}
            onOpenChange={setIsDeleteOpen}
            loisir={selectedLoisir}
            onSuccess={() => {
              onDelete(selectedLoisir.id);
              setIsDeleteOpen(false);
            }}
          />

          <InscriptionsDialog
            open={isInscriptionsOpen}
            onOpenChange={setIsInscriptionsOpen}
            loisir={selectedLoisir}
          />
        </>
      )}

      <CreateLoisirDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSuccess={(newLoisir) => {
          onAdd(newLoisir);
          setIsCreateOpen(false);
        }}
      />
    </>
  );
};
