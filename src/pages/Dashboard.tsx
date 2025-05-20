
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardClient } from "@/components/dashboard/DashboardClient";
import { DashboardPartner } from "@/components/dashboard/DashboardPartner";
import { DashboardAdmin } from "@/components/dashboard/DashboardAdmin";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const userRole = user?.role || null;
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  // Redirection automatique vers la gestion des loisirs pour les admins si le paramètre est présent
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('redirect') === 'loisirs' && userRole === 'admin') {
      navigate('/loisirs-management');
    }
  }, [userRole, navigate]);

  return (
    <DashboardLayout>
      {userRole === "admin" && <DashboardAdmin selectedUserId={selectedUserId} onSelectUser={setSelectedUserId} />}
      {userRole === "partner" && <DashboardPartner />}
      {userRole === "client" && <DashboardClient />}
    </DashboardLayout>
  );
};

export default Dashboard;
