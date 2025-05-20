
import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { UsersList } from "@/components/dashboard/UsersList";
import { AddUserDialog } from "@/components/dashboard/users/AddUserDialog";
import { EditUserDialog } from "@/components/dashboard/users/EditUserDialog";
import UserConsumptionHistory from "@/components/dashboard/consumption/UserConsumptionHistory";
import { UsersHeader } from "./users/UsersHeader";
import { UsersLayout } from "./users/UsersLayout";
import { UserDetails } from "./users/UserDetails";

const UsersManagement = () => {
  const [activeTab, setActiveTab] = useState<string>("list");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState<boolean>(false);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState<boolean>(false);
  const [refreshCounter, setRefreshCounter] = useState<number>(0);
  
  const handleSelectUser = (userId: string) => {
    setSelectedUserId(userId);
    setActiveTab("details");
  };

  const handleEditUser = (userId: string) => {
    setSelectedUserId(userId);
    setIsEditUserDialogOpen(true);
  };

  const handleUserAdded = () => {
    // Incrémenter le compteur pour déclencher un rafraîchissement
    setRefreshCounter(prev => prev + 1);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <UsersHeader onAddUser={() => setIsAddUserDialogOpen(true)} />
        
        <UsersLayout
          activeTab={activeTab}
          onTabChange={setActiveTab}
          selectedUserId={selectedUserId}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          listContent={
            <UsersList 
              onSelectUser={handleSelectUser} 
              onEditUser={handleEditUser}
              searchQuery={searchQuery}
              refreshTrigger={refreshCounter}
            />
          }
          detailsContent={
            <UserDetails 
              userId={selectedUserId!} 
              onEdit={() => setIsEditUserDialogOpen(true)}
            />
          }
          consumptionContent={
            <UserConsumptionHistory userId={selectedUserId!} />
          }
        />
        
        <AddUserDialog 
          open={isAddUserDialogOpen} 
          onClose={() => setIsAddUserDialogOpen(false)}
          onSuccess={handleUserAdded}
        />
        
        {selectedUserId && (
          <EditUserDialog 
            open={isEditUserDialogOpen} 
            onClose={() => setIsEditUserDialogOpen(false)} 
            userId={selectedUserId}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default UsersManagement;
