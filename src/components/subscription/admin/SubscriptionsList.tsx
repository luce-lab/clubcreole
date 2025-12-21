
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  RefreshCw,
  Eye,
  Crown,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export interface Subscriber {
  id: number;
  email: string;
  subscribed: boolean;
  subscription_tier: string | null;
  subscription_status: string | null;
  subscription_end: string | null;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  cancel_at_period_end: boolean;
  last_invoice_amount: number | null;
  last_invoice_date: string | null;
  created_at: string;
  updated_at: string;
}

interface SubscriptionsListProps {
  onSelectSubscriber: (subscriber: Subscriber) => void;
}

type StatusFilter = 'all' | 'active' | 'trialing' | 'past_due' | 'canceled' | 'inactive';
type TierFilter = 'all' | 'Passionné' | 'Expert' | 'none';

const ITEMS_PER_PAGE = 10;

export const SubscriptionsList = ({ onSelectSubscriber }: SubscriptionsListProps) => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [tierFilter, setTierFilter] = useState<TierFilter>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchSubscribers = async () => {
    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from('subscribers')
        .select('*', { count: 'exact' });

      // Apply search filter
      if (searchQuery) {
        query = query.ilike('email', `%${searchQuery}%`);
      }

      // Apply status filter
      if (statusFilter !== 'all') {
        if (statusFilter === 'inactive') {
          query = query.eq('subscribed', false);
        } else {
          query = query.eq('subscription_status', statusFilter);
        }
      }

      // Apply tier filter
      if (tierFilter !== 'all') {
        if (tierFilter === 'none') {
          query = query.is('subscription_tier', null);
        } else {
          query = query.eq('subscription_tier', tierFilter);
        }
      }

      // Order and paginate
      const from = (currentPage - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      const { data, error, count } = await query
        .order('updated_at', { ascending: false })
        .range(from, to);

      if (error) throw error;

      setSubscribers(data || []);
      setTotalCount(count || 0);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      console.error('Error fetching subscribers:', err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, [searchQuery, statusFilter, tierFilter, currentPage]);

  const getStatusBadge = (subscriber: Subscriber) => {
    if (!subscriber.subscribed) {
      return <Badge variant="secondary">Inactif</Badge>;
    }

    switch (subscriber.subscription_status) {
      case 'active':
        return subscriber.cancel_at_period_end ? (
          <Badge variant="outline" className="border-amber-500 text-amber-700">Annulation prévue</Badge>
        ) : (
          <Badge className="bg-green-100 text-green-800">Actif</Badge>
        );
      case 'trialing':
        return <Badge variant="outline" className="border-blue-500 text-blue-700">Essai</Badge>;
      case 'past_due':
        return <Badge variant="destructive">Paiement en retard</Badge>;
      case 'canceled':
        return <Badge variant="secondary">Annulé</Badge>;
      case 'unpaid':
        return <Badge variant="destructive">Impayé</Badge>;
      default:
        return <Badge variant="secondary">{subscriber.subscription_status || 'Inconnu'}</Badge>;
    }
  };

  const getTierBadge = (tier: string | null) => {
    if (!tier) return <span className="text-gray-400">-</span>;

    switch (tier) {
      case 'Passionné':
        return <Badge className="bg-blue-100 text-blue-800">{tier}</Badge>;
      case 'Expert':
        return <Badge className="bg-purple-100 text-purple-800">{tier}</Badge>;
      default:
        return <Badge variant="outline">{tier}</Badge>;
    }
  };

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher par email..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10"
          />
        </div>

        <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v as StatusFilter); setCurrentPage(1); }}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="active">Actif</SelectItem>
            <SelectItem value="trialing">Période d'essai</SelectItem>
            <SelectItem value="past_due">Paiement en retard</SelectItem>
            <SelectItem value="canceled">Annulé</SelectItem>
            <SelectItem value="inactive">Inactif</SelectItem>
          </SelectContent>
        </Select>

        <Select value={tierFilter} onValueChange={(v) => { setTierFilter(v as TierFilter); setCurrentPage(1); }}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Abonnement" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les plans</SelectItem>
            <SelectItem value="Passionné">Passionné</SelectItem>
            <SelectItem value="Expert">Expert</SelectItem>
            <SelectItem value="none">Sans abonnement</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" size="icon" onClick={fetchSubscribers} disabled={loading}>
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      {/* Error state */}
      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-md">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
          <Button onClick={fetchSubscribers} variant="ghost" size="sm" className="ml-auto">
            Réessayer
          </Button>
        </div>
      )}

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Dernier paiement</TableHead>
              <TableHead>Expiration</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              [...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-28" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : subscribers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  <Crown className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>Aucun abonné trouvé</p>
                </TableCell>
              </TableRow>
            ) : (
              subscribers.map((subscriber) => (
                <TableRow key={subscriber.id} className="cursor-pointer hover:bg-gray-50">
                  <TableCell className="font-medium">{subscriber.email}</TableCell>
                  <TableCell>{getTierBadge(subscriber.subscription_tier)}</TableCell>
                  <TableCell>{getStatusBadge(subscriber)}</TableCell>
                  <TableCell>
                    {subscriber.last_invoice_amount ? (
                      <span>{subscriber.last_invoice_amount.toFixed(2)} €</span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {subscriber.subscription_end ? (
                      format(new Date(subscriber.subscription_end), "d MMM yyyy", { locale: fr })
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onSelectSubscriber(subscriber)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {totalCount} abonné(s) au total
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1 || loading}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              Page {currentPage} sur {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || loading}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
