
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { LoisirsManagementHeader } from "@/components/loisirs/admin/LoisirsManagementHeader";
import { LoisirsAdminList } from "@/components/loisirs/admin/LoisirsAdminList";
import { useAuth } from "@/contexts/auth";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Loisir } from "@/components/loisirs/types";
import { supabase } from "@/integrations/supabase/client";

const LoisirsManagement = () => {
  const [loisirs, setLoisirs] = useState<Loisir[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Rediriger si l'utilisateur n'est pas administrateur
    if (user && user.role !== "admin") {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchLoisirs = async () => {
      try {
        const { data, error } = await supabase
          .from('loisirs')
          .select('*')
          .order('date', { ascending: true });
        
        if (error) {
          throw error;
        }
        
        if (data) {
          setLoisirs(data);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des loisirs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoisirs();
  }, []);

  const handleAddLoisir = (newLoisir: Loisir) => {
    setLoisirs(prevLoisirs => [...prevLoisirs, newLoisir]);
  };

  const handleUpdateLoisir = (updatedLoisir: Loisir) => {
    setLoisirs(prevLoisirs => 
      prevLoisirs.map(loisir => 
        loisir.id === updatedLoisir.id ? updatedLoisir : loisir
      )
    );
  };

  const handleDeleteLoisir = (id: number) => {
    setLoisirs(prevLoisirs => 
      prevLoisirs.filter(loisir => loisir.id !== id)
    );
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <LoisirsManagementHeader />
        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <LoisirsAdminList 
            loisirs={loisirs} 
            onAdd={handleAddLoisir}
            onUpdate={handleUpdateLoisir}
            onDelete={handleDeleteLoisir}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default LoisirsManagement;
