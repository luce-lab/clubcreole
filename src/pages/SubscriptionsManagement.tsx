
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/contexts/auth";
import {
  SubscriptionsList,
  SubscriptionDetail,
  SubscriptionStats,
  Subscriber
} from "@/components/subscription/admin";
import {
  Crown,
  BarChart3,
  Users,
  ArrowLeft,
} from "lucide-react";

export default function SubscriptionsManagement() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedSubscriber, setSelectedSubscriber] = useState<Subscriber | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [listKey, setListKey] = useState(0); // For refreshing the list

  // Check if user is admin
  const userRole = user?.user_metadata?.role || user?.role || 'client';
  const isAdmin = user?.email === 'admin@clubcreole.com' || userRole === 'admin';

  if (!isAdmin) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Crown className="h-16 w-16 text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-600 mb-2">Accès refusé</h2>
          <p className="text-gray-500 mb-4">
            Vous n'avez pas les droits pour accéder à cette page.
          </p>
          <Button onClick={() => navigate("/dashboard")}>
            Retour au tableau de bord
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const handleSelectSubscriber = (subscriber: Subscriber) => {
    setSelectedSubscriber(subscriber);
  };

  const handleBack = () => {
    setSelectedSubscriber(null);
  };

  const handleUpdate = () => {
    // Refresh the list after an update
    setListKey(prev => prev + 1);
    setSelectedSubscriber(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Gestion des abonnements</h1>
              <p className="text-muted-foreground">
                Gérez les abonnements Stripe et suivez les performances
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        {selectedSubscriber ? (
          <SubscriptionDetail
            subscriber={selectedSubscriber}
            onBack={handleBack}
            onUpdate={handleUpdate}
          />
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Vue d'ensemble
              </TabsTrigger>
              <TabsTrigger value="subscribers" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Abonnés
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <SubscriptionStats />
            </TabsContent>

            <TabsContent value="subscribers" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="h-5 w-5" />
                    Liste des abonnés
                  </CardTitle>
                  <CardDescription>
                    Consultez et gérez tous les abonnés de la plateforme
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SubscriptionsList
                    key={listKey}
                    onSelectSubscriber={handleSelectSubscriber}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </DashboardLayout>
  );
}
