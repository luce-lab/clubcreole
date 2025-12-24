
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth";
import { useToast } from "@/components/ui/use-toast";

export interface SubscriptionData {
  subscribed: boolean;
  subscription_tier: string | null;
  subscription_end: string | null;
  subscription_status: string | null;
  cancel_at_period_end: boolean;
  last_invoice_amount: number | null;
  last_invoice_date: string | null;
  trial_end: string | null;
  payment_method: string | null;
  stripe_subscription_id: string | null;
}

export interface FailedPayment {
  id: string;
  amount: number;
  currency: string;
  purchase_date: string;
  stripe_invoice_id: string | null;
  attempt_count?: number;
  next_retry_date?: string | null;
}

const defaultSubscriptionData: SubscriptionData = {
  subscribed: false,
  subscription_tier: null,
  subscription_end: null,
  subscription_status: null,
  cancel_at_period_end: false,
  last_invoice_amount: null,
  last_invoice_date: null,
  trial_end: null,
  payment_method: null,
  stripe_subscription_id: null,
};

export const useSubscription = () => {
  const { user, session } = useAuth();
  const { toast } = useToast();
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData>(defaultSubscriptionData);
  const [failedPayments, setFailedPayments] = useState<FailedPayment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch subscription data from edge function and local database
  const checkSubscription = useCallback(async () => {
    if (!user || !session) return;

    setLoading(true);
    setError(null);

    try {
      // First, call the edge function to sync with Stripe
      const { data: stripeData, error: stripeError } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (stripeError) throw stripeError;

      // Then fetch the complete subscriber data from database
      // Note: Some columns may not exist in production - using only base columns
      const { data: subscriberData, error: dbError } = await supabase
        .from('subscribers')
        .select(`
          subscribed,
          subscription_tier,
          subscription_end
        `)
        .eq('email', user.email)
        .maybeSingle();

      if (dbError && dbError.code !== 'PGRST116') {
        console.error('Database error:', dbError);
      }

      // Merge Stripe data with database data
      // Note: Many fields come from Stripe edge function, not database
      setSubscriptionData({
        subscribed: stripeData?.subscribed ?? subscriberData?.subscribed ?? false,
        subscription_tier: stripeData?.subscription_tier ?? subscriberData?.subscription_tier ?? null,
        subscription_end: stripeData?.subscription_end ?? subscriberData?.subscription_end ?? null,
        subscription_status: stripeData?.subscribed ? 'active' : null,
        cancel_at_period_end: false,
        last_invoice_amount: null,
        last_invoice_date: null,
        trial_end: null,
        payment_method: null,
        stripe_subscription_id: null,
      });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      console.error('Error checking subscription:', err);
      setError(errorMessage);
      toast({
        title: "Erreur",
        description: "Impossible de vérifier le statut d'abonnement",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [user, session, toast]);

  // Fetch failed payments
  const fetchFailedPayments = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('purchases')
        .select('id, amount, currency, purchase_date, metadata')
        .eq('status', 'failed')
        .order('purchase_date', { ascending: false })
        .limit(5);

      if (error) throw error;

      const failedPaymentsData: FailedPayment[] = (data || []).map(p => ({
        id: p.id,
        amount: p.amount,
        currency: p.currency,
        purchase_date: p.purchase_date,
        stripe_invoice_id: null,
        attempt_count: (p.metadata as any)?.attempt_count,
        next_retry_date: (p.metadata as any)?.next_retry,
      }));

      setFailedPayments(failedPaymentsData);
    } catch (err) {
      console.error('Error fetching failed payments:', err);
    }
  }, [user]);

  // Create checkout session
  const createCheckout = async (priceType: string) => {
    if (!user || !session) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour vous abonner",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceType },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      // Open Stripe checkout in a new tab
      window.open(data.url, '_blank');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      console.error('Error creating checkout:', err);
      setError(errorMessage);
      toast({
        title: "Erreur",
        description: "Impossible de créer la session de paiement",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Open customer portal
  const openCustomerPortal = async () => {
    if (!user || !session) return;

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      // Open customer portal in a new tab
      window.open(data.url, '_blank');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      console.error('Error opening customer portal:', err);
      setError(errorMessage);
      toast({
        title: "Erreur",
        description: "Impossible d'ouvrir le portail client",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Retry failed payment by opening customer portal to update payment method
  const retryPayment = async () => {
    toast({
      title: "Mise à jour du paiement",
      description: "Vous allez être redirigé vers le portail de paiement pour mettre à jour vos informations.",
    });
    await openCustomerPortal();
  };

  // Get subscription status label in French
  const getStatusLabel = useCallback((): string => {
    if (!subscriptionData.subscribed) return "Inactif";

    switch (subscriptionData.subscription_status) {
      case 'trialing':
        return "Période d'essai";
      case 'active':
        return subscriptionData.cancel_at_period_end ? "Annulation programmée" : "Actif";
      case 'past_due':
        return "Paiement en retard";
      case 'canceled':
        return "Annulé";
      case 'unpaid':
        return "Impayé";
      case 'paused':
        return "En pause";
      default:
        return subscriptionData.subscription_tier || "Abonné";
    }
  }, [subscriptionData]);

  // Get status color for badges
  const getStatusColor = useCallback((): "default" | "secondary" | "destructive" | "outline" => {
    if (!subscriptionData.subscribed) return "secondary";

    switch (subscriptionData.subscription_status) {
      case 'trialing':
        return "outline";
      case 'active':
        return subscriptionData.cancel_at_period_end ? "outline" : "default";
      case 'past_due':
      case 'unpaid':
        return "destructive";
      case 'canceled':
        return "secondary";
      default:
        return "default";
    }
  }, [subscriptionData]);

  // Check if there are payment issues
  const hasPaymentIssues = useCallback((): boolean => {
    return subscriptionData.subscription_status === 'past_due' ||
           subscriptionData.subscription_status === 'unpaid' ||
           failedPayments.length > 0;
  }, [subscriptionData, failedPayments]);

  // Initial data fetch
  useEffect(() => {
    if (user && session) {
      checkSubscription();
      fetchFailedPayments();
    } else {
      setSubscriptionData(defaultSubscriptionData);
      setFailedPayments([]);
    }
  }, [user, session, checkSubscription, fetchFailedPayments]);

  // Set up real-time subscription for subscribers table
  useEffect(() => {
    if (!user?.email) return;

    const channel = supabase
      .channel('subscription-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'subscribers',
          filter: `email=eq.${user.email}`,
        },
        (payload) => {
          console.log('Subscription update received:', payload);
          // Refresh subscription data when changes are detected
          checkSubscription();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.email, checkSubscription]);

  // Set up real-time subscription for purchases table (failed payments)
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('purchase-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'purchases',
          filter: `status=eq.failed`,
        },
        () => {
          fetchFailedPayments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, fetchFailedPayments]);

  return {
    subscriptionData,
    failedPayments,
    loading,
    error,
    checkSubscription,
    createCheckout,
    openCustomerPortal,
    retryPayment,
    getStatusLabel,
    getStatusColor,
    hasPaymentIssues,
  };
};
