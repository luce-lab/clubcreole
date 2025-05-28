
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardClient } from "@/components/dashboard/DashboardClient";
import { DashboardPartner } from "@/components/dashboard/DashboardPartner";
import { DashboardAdmin } from "@/components/dashboard/DashboardAdmin";
import { SubscriptionStatus, PurchaseHistory, SubscriptionStats } from "@/components/subscription";
import { useAuth } from "@/contexts/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const { user } = useAuth();
  
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Tableau de bord</h1>
          <p className="text-gray-600">Vous devez être connecté pour accéder au tableau de bord.</p>
        </div>
      </div>
    );
  }

  // Vérifier d'abord dans user_metadata, puis dans user.role, avec fallback vers 'client'
  const userRole = user.user_metadata?.role || user.role || 'client';
  
  // Pour l'utilisateur admin@clubcreole.com, forcer le rôle admin
  const finalUserRole = user.email === 'admin@clubcreole.com' ? 'admin' : userRole;

  console.log('User email:', user.email);
  console.log('User role from metadata:', user.user_metadata?.role);
  console.log('User role from user:', user.role);
  console.log('Final user role:', finalUserRole);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-creole-green">Tableau de bord</h1>
          <p className="text-sm text-gray-600">
            Bienvenue dans votre espace personnel ({finalUserRole})
          </p>
        </div>

        {finalUserRole === 'client' && (
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="subscription">Abonnement</TabsTrigger>
              <TabsTrigger value="history">Historique</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <SubscriptionStats />
              <DashboardClient />
            </TabsContent>
            
            <TabsContent value="subscription" className="space-y-6">
              <SubscriptionStatus />
            </TabsContent>
            
            <TabsContent value="history" className="space-y-6">
              <PurchaseHistory />
            </TabsContent>
          </Tabs>
        )}

        {finalUserRole === 'partner' && <DashboardPartner />}
        {finalUserRole === 'admin' && <DashboardAdmin />}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
