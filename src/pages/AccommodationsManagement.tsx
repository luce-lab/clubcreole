
import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { AccommodationsManagementHeader } from "@/components/accommodations/admin/AccommodationsManagementHeader";
import { AccommodationsAdminList } from "@/components/accommodations/admin/AccommodationsAdminList";
import { CreateAccommodationDialog } from "@/components/accommodations/admin/CreateAccommodationDialog";
import { EditAccommodationDialog } from "@/components/accommodations/admin/EditAccommodationDialog";
import { DeleteAccommodationDialog } from "@/components/accommodations/admin/DeleteAccommodationDialog";
import { Accommodation } from "@/components/accommodation/AccommodationTypes";

const AccommodationsManagement = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingAccommodation, setEditingAccommodation] = useState<Accommodation | null>(null);
  const [deletingAccommodation, setDeletingAccommodation] = useState<Accommodation | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleCreateSuccess = () => {
    setIsCreateDialogOpen(false);
    handleRefresh();
  };

  const handleEditSuccess = () => {
    setEditingAccommodation(null);
    handleRefresh();
  };

  const handleDeleteSuccess = () => {
    setDeletingAccommodation(null);
    handleRefresh();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <AccommodationsManagementHeader 
          onCreateClick={() => setIsCreateDialogOpen(true)}
        />
        
        <AccommodationsAdminList
          refreshTrigger={refreshTrigger}
          onEdit={setEditingAccommodation}
          onDelete={setDeletingAccommodation}
        />

        <CreateAccommodationDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onSuccess={handleCreateSuccess}
        />

        <EditAccommodationDialog
          accommodation={editingAccommodation}
          onOpenChange={(open) => !open && setEditingAccommodation(null)}
          onSuccess={handleEditSuccess}
        />

        <DeleteAccommodationDialog
          accommodation={deletingAccommodation}
          onOpenChange={(open) => !open && setDeletingAccommodation(null)}
          onSuccess={handleDeleteSuccess}
        />
      </div>
    </DashboardLayout>
  );
};

export default AccommodationsManagement;
