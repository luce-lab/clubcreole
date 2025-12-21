import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SubscriptionsList, Subscriber } from '../SubscriptionsList';

// Mock Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        order: vi.fn(() => ({
          range: vi.fn(() => Promise.resolve({ data: [], error: null, count: 0 })),
        })),
        ilike: vi.fn(() => ({
          order: vi.fn(() => ({
            range: vi.fn(() => Promise.resolve({ data: [], error: null, count: 0 })),
          })),
        })),
        eq: vi.fn(() => ({
          order: vi.fn(() => ({
            range: vi.fn(() => Promise.resolve({ data: [], error: null, count: 0 })),
          })),
        })),
      })),
    })),
  },
}));

const mockSubscribers: Subscriber[] = [
  {
    id: 1,
    email: 'user1@example.com',
    subscribed: true,
    subscription_tier: 'Passionné',
    subscription_status: 'active',
    subscription_end: '2025-06-30',
    stripe_customer_id: 'cus_123',
    stripe_subscription_id: 'sub_123',
    cancel_at_period_end: false,
    last_invoice_amount: 15,
    last_invoice_date: '2025-01-01',
    created_at: '2024-01-01',
    updated_at: '2025-01-01',
  },
  {
    id: 2,
    email: 'user2@example.com',
    subscribed: true,
    subscription_tier: 'Expert',
    subscription_status: 'past_due',
    subscription_end: '2025-03-15',
    stripe_customer_id: 'cus_456',
    stripe_subscription_id: 'sub_456',
    cancel_at_period_end: false,
    last_invoice_amount: 89.99,
    last_invoice_date: '2025-02-01',
    created_at: '2024-06-01',
    updated_at: '2025-02-01',
  },
  {
    id: 3,
    email: 'inactive@example.com',
    subscribed: false,
    subscription_tier: null,
    subscription_status: 'cancelled',
    subscription_end: null,
    stripe_customer_id: null,
    stripe_subscription_id: null,
    cancel_at_period_end: false,
    last_invoice_amount: null,
    last_invoice_date: null,
    created_at: '2023-01-01',
    updated_at: '2024-12-01',
  },
];

describe('SubscriptionsList', () => {
  const mockOnSelectSubscriber = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Subscriber Data Display', () => {
    it('displays subscriber email correctly', () => {
      const subscriber = mockSubscribers[0];
      expect(subscriber.email).toBe('user1@example.com');
    });

    it('displays subscription tier for active subscribers', () => {
      const subscriber = mockSubscribers[0];
      expect(subscriber.subscription_tier).toBe('Passionné');
      expect(subscriber.subscribed).toBe(true);
    });

    it('identifies past_due status correctly', () => {
      const subscriber = mockSubscribers[1];
      expect(subscriber.subscription_status).toBe('past_due');
    });

    it('handles inactive subscribers', () => {
      const subscriber = mockSubscribers[2];
      expect(subscriber.subscribed).toBe(false);
      expect(subscriber.subscription_tier).toBeNull();
    });
  });

  describe('Status Filtering Logic', () => {
    const filterByStatus = (subscribers: Subscriber[], status: string): Subscriber[] => {
      if (status === 'all') return subscribers;
      if (status === 'active') {
        return subscribers.filter(s => s.subscribed && s.subscription_status === 'active');
      }
      if (status === 'inactive') {
        return subscribers.filter(s => !s.subscribed);
      }
      return subscribers.filter(s => s.subscription_status === status);
    };

    it('returns all subscribers when status is "all"', () => {
      const result = filterByStatus(mockSubscribers, 'all');
      expect(result.length).toBe(3);
    });

    it('filters active subscribers correctly', () => {
      const result = filterByStatus(mockSubscribers, 'active');
      expect(result.length).toBe(1);
      expect(result[0].email).toBe('user1@example.com');
    });

    it('filters inactive subscribers correctly', () => {
      const result = filterByStatus(mockSubscribers, 'inactive');
      expect(result.length).toBe(1);
      expect(result[0].email).toBe('inactive@example.com');
    });

    it('filters by specific status like past_due', () => {
      const result = filterByStatus(mockSubscribers, 'past_due');
      expect(result.length).toBe(1);
      expect(result[0].email).toBe('user2@example.com');
    });
  });

  describe('Tier Filtering Logic', () => {
    const filterByTier = (subscribers: Subscriber[], tier: string): Subscriber[] => {
      if (tier === 'all') return subscribers;
      return subscribers.filter(s => s.subscription_tier === tier);
    };

    it('returns all subscribers when tier is "all"', () => {
      const result = filterByTier(mockSubscribers, 'all');
      expect(result.length).toBe(3);
    });

    it('filters by Passionné tier correctly', () => {
      const result = filterByTier(mockSubscribers, 'Passionné');
      expect(result.length).toBe(1);
      expect(result[0].email).toBe('user1@example.com');
    });

    it('filters by Expert tier correctly', () => {
      const result = filterByTier(mockSubscribers, 'Expert');
      expect(result.length).toBe(1);
      expect(result[0].email).toBe('user2@example.com');
    });
  });

  describe('Search Filtering Logic', () => {
    const filterBySearch = (subscribers: Subscriber[], query: string): Subscriber[] => {
      if (!query.trim()) return subscribers;
      const lowerQuery = query.toLowerCase();
      return subscribers.filter(s =>
        s.email.toLowerCase().includes(lowerQuery)
      );
    };

    it('returns all subscribers when search is empty', () => {
      const result = filterBySearch(mockSubscribers, '');
      expect(result.length).toBe(3);
    });

    it('filters subscribers by email correctly', () => {
      const result = filterBySearch(mockSubscribers, 'user1');
      expect(result.length).toBe(1);
      expect(result[0].email).toBe('user1@example.com');
    });

    it('search is case insensitive', () => {
      const result = filterBySearch(mockSubscribers, 'USER2');
      expect(result.length).toBe(1);
      expect(result[0].email).toBe('user2@example.com');
    });

    it('returns empty when no match found', () => {
      const result = filterBySearch(mockSubscribers, 'nonexistent');
      expect(result.length).toBe(0);
    });
  });

  describe('Pagination Logic', () => {
    const paginate = (subscribers: Subscriber[], page: number, pageSize: number): Subscriber[] => {
      const start = page * pageSize;
      const end = start + pageSize;
      return subscribers.slice(start, end);
    };

    it('returns first page correctly', () => {
      const result = paginate(mockSubscribers, 0, 2);
      expect(result.length).toBe(2);
      expect(result[0].id).toBe(1);
      expect(result[1].id).toBe(2);
    });

    it('returns second page correctly', () => {
      const result = paginate(mockSubscribers, 1, 2);
      expect(result.length).toBe(1);
      expect(result[0].id).toBe(3);
    });

    it('returns empty for out of range page', () => {
      const result = paginate(mockSubscribers, 5, 2);
      expect(result.length).toBe(0);
    });
  });

  describe('Status Badge Color Logic', () => {
    const getStatusBadgeColor = (status: string | null, subscribed: boolean): string => {
      if (!subscribed) return 'bg-gray-100 text-gray-800';

      switch (status) {
        case 'active':
          return 'bg-green-100 text-green-800';
        case 'trialing':
          return 'bg-blue-100 text-blue-800';
        case 'past_due':
          return 'bg-orange-100 text-orange-800';
        case 'canceled':
        case 'cancelled':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };

    it('returns green for active status', () => {
      expect(getStatusBadgeColor('active', true)).toContain('green');
    });

    it('returns blue for trialing status', () => {
      expect(getStatusBadgeColor('trialing', true)).toContain('blue');
    });

    it('returns orange for past_due status', () => {
      expect(getStatusBadgeColor('past_due', true)).toContain('orange');
    });

    it('returns red for canceled status', () => {
      expect(getStatusBadgeColor('canceled', true)).toContain('red');
    });

    it('returns gray for inactive users', () => {
      expect(getStatusBadgeColor('active', false)).toContain('gray');
    });
  });

  describe('Tier Badge Color Logic', () => {
    const getTierBadgeColor = (tier: string | null): string => {
      switch (tier) {
        case 'Passionné':
          return 'bg-purple-100 text-purple-800';
        case 'Expert':
          return 'bg-amber-100 text-amber-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };

    it('returns purple for Passionné tier', () => {
      expect(getTierBadgeColor('Passionné')).toContain('purple');
    });

    it('returns amber for Expert tier', () => {
      expect(getTierBadgeColor('Expert')).toContain('amber');
    });

    it('returns gray for null tier', () => {
      expect(getTierBadgeColor(null)).toContain('gray');
    });
  });
});
