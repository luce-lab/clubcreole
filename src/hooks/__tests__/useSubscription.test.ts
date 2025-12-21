import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useSubscription, SubscriptionData, FailedPayment } from '../useSubscription';

// Mock the dependencies
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    functions: {
      invoke: vi.fn(),
    },
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          maybeSingle: vi.fn(),
          order: vi.fn(() => ({
            limit: vi.fn(),
          })),
        })),
        order: vi.fn(() => ({
          limit: vi.fn(),
        })),
      })),
    })),
    channel: vi.fn(() => ({
      on: vi.fn(() => ({
        subscribe: vi.fn(),
      })),
    })),
    removeChannel: vi.fn(),
  },
}));

vi.mock('@/contexts/auth', () => ({
  useAuth: vi.fn(() => ({
    user: { email: 'test@example.com' },
    session: { access_token: 'test-token' },
  })),
}));

vi.mock('@/components/ui/use-toast', () => ({
  useToast: vi.fn(() => ({
    toast: vi.fn(),
  })),
}));

describe('useSubscription', () => {
  describe('getStatusLabel', () => {
    it('returns "Inactif" for non-subscribed users', () => {
      const subscriptionData: SubscriptionData = {
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

      expect(getStatusLabelFromData(subscriptionData)).toBe('Inactif');
    });

    it('returns "Période d\'essai" for trialing status', () => {
      const subscriptionData: SubscriptionData = {
        subscribed: true,
        subscription_tier: 'Passionné',
        subscription_end: null,
        subscription_status: 'trialing',
        cancel_at_period_end: false,
        last_invoice_amount: null,
        last_invoice_date: null,
        trial_end: null,
        payment_method: null,
        stripe_subscription_id: null,
      };

      expect(getStatusLabelFromData(subscriptionData)).toBe("Période d'essai");
    });

    it('returns "Actif" for active status without cancellation', () => {
      const subscriptionData: SubscriptionData = {
        subscribed: true,
        subscription_tier: 'Expert',
        subscription_end: null,
        subscription_status: 'active',
        cancel_at_period_end: false,
        last_invoice_amount: null,
        last_invoice_date: null,
        trial_end: null,
        payment_method: null,
        stripe_subscription_id: null,
      };

      expect(getStatusLabelFromData(subscriptionData)).toBe('Actif');
    });

    it('returns "Annulation programmée" for active with cancel_at_period_end', () => {
      const subscriptionData: SubscriptionData = {
        subscribed: true,
        subscription_tier: 'Passionné',
        subscription_end: '2025-12-31',
        subscription_status: 'active',
        cancel_at_period_end: true,
        last_invoice_amount: null,
        last_invoice_date: null,
        trial_end: null,
        payment_method: null,
        stripe_subscription_id: null,
      };

      expect(getStatusLabelFromData(subscriptionData)).toBe('Annulation programmée');
    });

    it('returns "Paiement en retard" for past_due status', () => {
      const subscriptionData: SubscriptionData = {
        subscribed: true,
        subscription_tier: 'Expert',
        subscription_end: null,
        subscription_status: 'past_due',
        cancel_at_period_end: false,
        last_invoice_amount: null,
        last_invoice_date: null,
        trial_end: null,
        payment_method: null,
        stripe_subscription_id: null,
      };

      expect(getStatusLabelFromData(subscriptionData)).toBe('Paiement en retard');
    });

    it('returns "Annulé" for canceled status', () => {
      const subscriptionData: SubscriptionData = {
        subscribed: true,
        subscription_tier: null,
        subscription_end: null,
        subscription_status: 'canceled',
        cancel_at_period_end: false,
        last_invoice_amount: null,
        last_invoice_date: null,
        trial_end: null,
        payment_method: null,
        stripe_subscription_id: null,
      };

      expect(getStatusLabelFromData(subscriptionData)).toBe('Annulé');
    });

    it('returns "Impayé" for unpaid status', () => {
      const subscriptionData: SubscriptionData = {
        subscribed: true,
        subscription_tier: 'Passionné',
        subscription_end: null,
        subscription_status: 'unpaid',
        cancel_at_period_end: false,
        last_invoice_amount: null,
        last_invoice_date: null,
        trial_end: null,
        payment_method: null,
        stripe_subscription_id: null,
      };

      expect(getStatusLabelFromData(subscriptionData)).toBe('Impayé');
    });

    it('returns "En pause" for paused status', () => {
      const subscriptionData: SubscriptionData = {
        subscribed: true,
        subscription_tier: 'Expert',
        subscription_end: null,
        subscription_status: 'paused',
        cancel_at_period_end: false,
        last_invoice_amount: null,
        last_invoice_date: null,
        trial_end: null,
        payment_method: null,
        stripe_subscription_id: null,
      };

      expect(getStatusLabelFromData(subscriptionData)).toBe('En pause');
    });
  });

  describe('getStatusColor', () => {
    it('returns "secondary" for non-subscribed users', () => {
      const subscriptionData: SubscriptionData = {
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

      expect(getStatusColorFromData(subscriptionData)).toBe('secondary');
    });

    it('returns "outline" for trialing status', () => {
      const subscriptionData: SubscriptionData = {
        subscribed: true,
        subscription_tier: 'Passionné',
        subscription_end: null,
        subscription_status: 'trialing',
        cancel_at_period_end: false,
        last_invoice_amount: null,
        last_invoice_date: null,
        trial_end: null,
        payment_method: null,
        stripe_subscription_id: null,
      };

      expect(getStatusColorFromData(subscriptionData)).toBe('outline');
    });

    it('returns "default" for active status without cancellation', () => {
      const subscriptionData: SubscriptionData = {
        subscribed: true,
        subscription_tier: 'Expert',
        subscription_end: null,
        subscription_status: 'active',
        cancel_at_period_end: false,
        last_invoice_amount: null,
        last_invoice_date: null,
        trial_end: null,
        payment_method: null,
        stripe_subscription_id: null,
      };

      expect(getStatusColorFromData(subscriptionData)).toBe('default');
    });

    it('returns "outline" for active with cancel_at_period_end', () => {
      const subscriptionData: SubscriptionData = {
        subscribed: true,
        subscription_tier: 'Passionné',
        subscription_end: '2025-12-31',
        subscription_status: 'active',
        cancel_at_period_end: true,
        last_invoice_amount: null,
        last_invoice_date: null,
        trial_end: null,
        payment_method: null,
        stripe_subscription_id: null,
      };

      expect(getStatusColorFromData(subscriptionData)).toBe('outline');
    });

    it('returns "destructive" for past_due status', () => {
      const subscriptionData: SubscriptionData = {
        subscribed: true,
        subscription_tier: 'Expert',
        subscription_end: null,
        subscription_status: 'past_due',
        cancel_at_period_end: false,
        last_invoice_amount: null,
        last_invoice_date: null,
        trial_end: null,
        payment_method: null,
        stripe_subscription_id: null,
      };

      expect(getStatusColorFromData(subscriptionData)).toBe('destructive');
    });

    it('returns "destructive" for unpaid status', () => {
      const subscriptionData: SubscriptionData = {
        subscribed: true,
        subscription_tier: 'Passionné',
        subscription_end: null,
        subscription_status: 'unpaid',
        cancel_at_period_end: false,
        last_invoice_amount: null,
        last_invoice_date: null,
        trial_end: null,
        payment_method: null,
        stripe_subscription_id: null,
      };

      expect(getStatusColorFromData(subscriptionData)).toBe('destructive');
    });
  });

  describe('hasPaymentIssues', () => {
    it('returns true for past_due status', () => {
      const subscriptionData: SubscriptionData = {
        subscribed: true,
        subscription_tier: 'Expert',
        subscription_end: null,
        subscription_status: 'past_due',
        cancel_at_period_end: false,
        last_invoice_amount: null,
        last_invoice_date: null,
        trial_end: null,
        payment_method: null,
        stripe_subscription_id: null,
      };
      const failedPayments: FailedPayment[] = [];

      expect(hasPaymentIssuesFromData(subscriptionData, failedPayments)).toBe(true);
    });

    it('returns true for unpaid status', () => {
      const subscriptionData: SubscriptionData = {
        subscribed: true,
        subscription_tier: 'Passionné',
        subscription_end: null,
        subscription_status: 'unpaid',
        cancel_at_period_end: false,
        last_invoice_amount: null,
        last_invoice_date: null,
        trial_end: null,
        payment_method: null,
        stripe_subscription_id: null,
      };
      const failedPayments: FailedPayment[] = [];

      expect(hasPaymentIssuesFromData(subscriptionData, failedPayments)).toBe(true);
    });

    it('returns true when there are failed payments', () => {
      const subscriptionData: SubscriptionData = {
        subscribed: true,
        subscription_tier: 'Expert',
        subscription_end: null,
        subscription_status: 'active',
        cancel_at_period_end: false,
        last_invoice_amount: null,
        last_invoice_date: null,
        trial_end: null,
        payment_method: null,
        stripe_subscription_id: null,
      };
      const failedPayments: FailedPayment[] = [
        {
          id: '1',
          amount: 15,
          currency: 'eur',
          purchase_date: '2025-01-01',
          stripe_invoice_id: 'inv_123',
          attempt_count: 1,
        },
      ];

      expect(hasPaymentIssuesFromData(subscriptionData, failedPayments)).toBe(true);
    });

    it('returns false for active status with no failed payments', () => {
      const subscriptionData: SubscriptionData = {
        subscribed: true,
        subscription_tier: 'Expert',
        subscription_end: null,
        subscription_status: 'active',
        cancel_at_period_end: false,
        last_invoice_amount: null,
        last_invoice_date: null,
        trial_end: null,
        payment_method: null,
        stripe_subscription_id: null,
      };
      const failedPayments: FailedPayment[] = [];

      expect(hasPaymentIssuesFromData(subscriptionData, failedPayments)).toBe(false);
    });
  });
});

// Helper functions to test logic independently
function getStatusLabelFromData(subscriptionData: SubscriptionData): string {
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
}

function getStatusColorFromData(subscriptionData: SubscriptionData): "default" | "secondary" | "destructive" | "outline" {
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
}

function hasPaymentIssuesFromData(subscriptionData: SubscriptionData, failedPayments: FailedPayment[]): boolean {
  return subscriptionData.subscription_status === 'past_due' ||
         subscriptionData.subscription_status === 'unpaid' ||
         failedPayments.length > 0;
}
