
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Calendar, Euro } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Purchase {
  id: string;
  item_type: string;
  item_name: string;
  amount: number;
  currency: string;
  purchase_date: string;
  status: string;
}

export const PurchaseHistory = () => {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchPurchaseHistory();
    }
  }, [user]);

  const fetchPurchaseHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('purchases')
        .select('*')
        .order('purchase_date', { ascending: false });

      if (error) throw error;
      setPurchases(data || []);
    } catch (error) {
      console.error('Error fetching purchase history:', error);
    } finally {
      setLoading(false);
    }
  };

  const getItemTypeColor = (type: string) => {
    switch (type) {
      case 'subscription':
        return 'bg-green-100 text-green-800';
      case 'offer':
        return 'bg-blue-100 text-blue-800';
      case 'activity':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getItemTypeLabel = (type: string) => {
    switch (type) {
      case 'subscription':
        return 'Abonnement';
      case 'offer':
        return 'Offre';
      case 'activity':
        return 'Activité';
      default:
        return type;
    }
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-gray-500">
            Connectez-vous pour voir votre historique d'achats
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          Historique des achats
        </CardTitle>
        <CardDescription>
          Consultez l'historique de vos abonnements et achats
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : purchases.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            Aucun achat enregistré pour le moment
          </p>
        ) : (
          <div className="space-y-4">
            {purchases.map((purchase, index) => (
              <div key={purchase.id}>
                {index > 0 && <Separator />}
                <div className="flex items-center justify-between py-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={getItemTypeColor(purchase.item_type)}>
                        {getItemTypeLabel(purchase.item_type)}
                      </Badge>
                      <span className="text-sm font-medium">
                        {purchase.item_name}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(purchase.purchase_date), "d MMMM yyyy", { locale: fr })}
                      </div>
                      <Badge variant={purchase.status === 'completed' ? 'default' : 'secondary'}>
                        {purchase.status === 'completed' ? 'Terminé' : purchase.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 font-semibold">
                      <Euro className="h-4 w-4" />
                      {purchase.amount.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
