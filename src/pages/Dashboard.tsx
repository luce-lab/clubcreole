
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardClient } from "@/components/dashboard/DashboardClient";
import { DashboardPartner } from "@/components/dashboard/DashboardPartner";
import { DashboardAdmin } from "@/components/dashboard/DashboardAdmin";

const Dashboard = () => {
  const { user } = useAuth();
  const userRole = user?.role || null;

  return (
    <DashboardLayout>
      {userRole === "admin" && <DashboardAdmin />}
      {userRole === "partner" && <DashboardPartner />}
      {userRole === "client" && <DashboardClient />}
    </DashboardLayout>
  );
};

export default Dashboard;
