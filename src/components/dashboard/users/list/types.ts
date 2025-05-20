
export interface UserSubscription {
  id: string;
  name: string;
  email: string;
  subscriptionStatus: "active" | "pending" | "expired" | "none";
  subscriptionType: "basic" | "premium" | "none";
  subscriptionEndDate: string | null;
  registeredDate: string;
  lastActivity: string;
}

export interface UsersListProps {
  onSelectUser?: (userId: string) => void;
  onEditUser?: (userId: string) => void;
  searchQuery?: string;
  refreshTrigger?: number;
}
