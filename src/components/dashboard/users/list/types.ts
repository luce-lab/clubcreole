
export interface UserSubscription {
  id: string;
  name: string;
  email: string;
  subscriptionStatus: "active" | "none" | "pending" | "expired";
  subscriptionType: "basic" | "premium" | "none";
  subscriptionEndDate: string | null;
  registrationDate: string; // Changed from registeredDate to registrationDate to match the data structure
  lastActivity: string;
}

export interface UsersListProps {
  onSelectUser?: (userId: string) => void;
  onEditUser?: (userId: string) => void;
  searchQuery?: string;
  refreshTrigger?: number;
}
