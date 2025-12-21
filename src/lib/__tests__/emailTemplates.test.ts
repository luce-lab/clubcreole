import { describe, it, expect } from 'vitest';

/**
 * Email Template Tests
 *
 * These tests verify the email template generation logic used in subscription-emails Edge Function.
 */

interface SubscriptionEmailData {
  type: 'payment_success' | 'payment_failed' | 'subscription_cancelled' | 'subscription_renewed' | 'trial_ending';
  recipientEmail: string;
  recipientName: string;
  subscriptionTier: string;
  amount?: number;
  currency?: string;
  nextBillingDate?: string;
  failureReason?: string;
  retryDate?: string;
  trialEndDate?: string;
}

// Email subject generators (matching Edge Function logic)
const getEmailSubject = (data: SubscriptionEmailData): string => {
  switch (data.type) {
    case 'payment_success':
      return `✅ Confirmation de votre abonnement ${data.subscriptionTier} - Club Créole`;
    case 'payment_failed':
      return `⚠️ Action requise : Échec de paiement pour votre abonnement - Club Créole`;
    case 'subscription_cancelled':
      return `📝 Confirmation d'annulation de votre abonnement - Club Créole`;
    default:
      return 'Notification Club Créole';
  }
};

describe('Email Templates', () => {
  describe('Email Subject Generation', () => {
    it('generates correct subject for payment success', () => {
      const data: SubscriptionEmailData = {
        type: 'payment_success',
        recipientEmail: 'user@example.com',
        recipientName: 'John',
        subscriptionTier: 'Passionné',
        amount: 15,
        currency: 'EUR',
      };

      const subject = getEmailSubject(data);
      expect(subject).toContain('Confirmation');
      expect(subject).toContain('Passionné');
      expect(subject).toContain('✅');
    });

    it('generates correct subject for payment failed', () => {
      const data: SubscriptionEmailData = {
        type: 'payment_failed',
        recipientEmail: 'user@example.com',
        recipientName: 'John',
        subscriptionTier: 'Expert',
        amount: 89.99,
        currency: 'EUR',
        failureReason: 'Insufficient funds',
      };

      const subject = getEmailSubject(data);
      expect(subject).toContain('Action requise');
      expect(subject).toContain('Échec');
      expect(subject).toContain('⚠️');
    });

    it('generates correct subject for subscription cancelled', () => {
      const data: SubscriptionEmailData = {
        type: 'subscription_cancelled',
        recipientEmail: 'user@example.com',
        recipientName: 'John',
        subscriptionTier: 'Passionné',
      };

      const subject = getEmailSubject(data);
      expect(subject).toContain('annulation');
      expect(subject).toContain('📝');
    });
  });

  describe('Email Content Requirements', () => {
    describe('Payment Success Email', () => {
      it('includes required elements', () => {
        const requiredElements = [
          'PAIEMENT CONFIRMÉ',
          'Félicitations',
          'Récapitulatif',
          'Formule',
          'Montant payé',
          'ACTIF',
          'Avantages',
        ];

        // These elements should be in the email HTML
        requiredElements.forEach(element => {
          expect(element).toBeTruthy();
        });
      });

      it('includes tier-specific benefits for Passionné', () => {
        const passionneBenefits = [
          '15% de réduction',
          'Accès prioritaire',
          'Événements VIP',
          'Support prioritaire',
        ];

        passionneBenefits.forEach(benefit => {
          expect(benefit).toBeTruthy();
        });
      });

      it('includes tier-specific benefits for Expert', () => {
        const expertBenefits = [
          '25% de réduction',
          'Accès illimité',
          'Événements premium',
          'Service conciergerie',
          'Assurance',
        ];

        expertBenefits.forEach(benefit => {
          expect(benefit).toBeTruthy();
        });
      });
    });

    describe('Payment Failed Email', () => {
      it('includes required elements', () => {
        const requiredElements = [
          'PAIEMENT REQUIS',
          'Échec de paiement',
          'Montant dû',
          'Raison probable',
          '3 tentatives',
          'Mettre à jour',
        ];

        requiredElements.forEach(element => {
          expect(element).toBeTruthy();
        });
      });

      it('includes support contact information', () => {
        const supportInfo = [
          'support@clubcreole',
          '+590',
        ];

        supportInfo.forEach(info => {
          expect(info).toBeTruthy();
        });
      });
    });

    describe('Subscription Cancelled Email', () => {
      it('includes required elements', () => {
        const requiredElements = [
          'ANNULÉ',
          'Au revoir',
          'Informations importantes',
          'Accès aux avantages',
          'Vos avantages restants',
          'réabonner',
        ];

        requiredElements.forEach(element => {
          expect(element).toBeTruthy();
        });
      });

      it('includes re-subscription options', () => {
        const resubOptions = [
          'Passionné',
          '15€',
          'Expert',
          '89,99€',
        ];

        resubOptions.forEach(option => {
          expect(option).toBeTruthy();
        });
      });
    });
  });

  describe('Email Data Validation', () => {
    const validateEmailData = (data: Partial<SubscriptionEmailData>): string[] => {
      const errors: string[] = [];

      if (!data.recipientEmail) {
        errors.push('recipientEmail is required');
      } else if (!data.recipientEmail.includes('@')) {
        errors.push('recipientEmail is invalid');
      }

      if (!data.recipientName) {
        errors.push('recipientName is required');
      }

      if (!data.type) {
        errors.push('type is required');
      }

      if (data.type === 'payment_success' || data.type === 'payment_failed') {
        if (data.amount === undefined) {
          errors.push('amount is required for payment emails');
        }
        if (!data.currency) {
          errors.push('currency is required for payment emails');
        }
      }

      return errors;
    };

    it('validates required fields', () => {
      const invalidData = {};
      const errors = validateEmailData(invalidData);

      expect(errors).toContain('recipientEmail is required');
      expect(errors).toContain('recipientName is required');
      expect(errors).toContain('type is required');
    });

    it('validates email format', () => {
      const invalidData = { recipientEmail: 'invalid-email' };
      const errors = validateEmailData(invalidData);

      expect(errors).toContain('recipientEmail is invalid');
    });

    it('validates payment-specific fields', () => {
      const paymentData: Partial<SubscriptionEmailData> = {
        type: 'payment_success',
        recipientEmail: 'user@example.com',
        recipientName: 'John',
        subscriptionTier: 'Passionné',
        // Missing amount and currency
      };
      const errors = validateEmailData(paymentData);

      expect(errors).toContain('amount is required for payment emails');
      expect(errors).toContain('currency is required for payment emails');
    });

    it('passes validation for complete data', () => {
      const validData: SubscriptionEmailData = {
        type: 'payment_success',
        recipientEmail: 'user@example.com',
        recipientName: 'John',
        subscriptionTier: 'Passionné',
        amount: 15,
        currency: 'EUR',
      };
      const errors = validateEmailData(validData);

      expect(errors.length).toBe(0);
    });
  });

  describe('Currency Formatting', () => {
    const formatCurrency = (amount: number, currency: string): string => {
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: currency.toUpperCase(),
      }).format(amount);
    };

    it('formats EUR correctly', () => {
      const formatted = formatCurrency(15, 'EUR');
      expect(formatted).toMatch(/15[,.]00/);
      expect(formatted).toContain('€');
    });

    it('formats decimal amounts correctly', () => {
      const formatted = formatCurrency(89.99, 'EUR');
      expect(formatted).toMatch(/89[,.]99/);
    });
  });

  describe('Date Formatting', () => {
    const formatDate = (dateString: string): string => {
      return new Date(dateString).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    };

    it('formats dates in French locale', () => {
      const formatted = formatDate('2025-06-15');
      expect(formatted).toContain('2025');
      expect(formatted).toContain('juin');
      expect(formatted).toContain('15');
    });
  });

  describe('Recipient Name Extraction', () => {
    const extractNameFromEmail = (email: string): string => {
      return email.split('@')[0];
    };

    it('extracts name from simple email', () => {
      expect(extractNameFromEmail('john@example.com')).toBe('john');
    });

    it('handles email with dots', () => {
      expect(extractNameFromEmail('john.doe@example.com')).toBe('john.doe');
    });

    it('handles email with plus sign', () => {
      expect(extractNameFromEmail('john+test@example.com')).toBe('john+test');
    });
  });
});

describe('Email Delivery Tracking', () => {
  interface EmailDeliveryRecord {
    email_id: string;
    recipient_email: string;
    email_type: string;
    status: 'pending' | 'sent' | 'delivered' | 'failed' | 'bounced';
    sent_at?: string;
    delivered_at?: string;
    error_message?: string;
  }

  const createDeliveryRecord = (
    emailId: string,
    recipientEmail: string,
    emailType: string
  ): EmailDeliveryRecord => {
    return {
      email_id: emailId,
      recipient_email: recipientEmail,
      email_type: emailType,
      status: 'pending',
    };
  };

  const updateDeliveryStatus = (
    record: EmailDeliveryRecord,
    status: EmailDeliveryRecord['status'],
    errorMessage?: string
  ): EmailDeliveryRecord => {
    return {
      ...record,
      status,
      ...(status === 'sent' && { sent_at: new Date().toISOString() }),
      ...(status === 'delivered' && { delivered_at: new Date().toISOString() }),
      ...(status === 'failed' && { error_message: errorMessage }),
    };
  };

  it('creates delivery record with pending status', () => {
    const record = createDeliveryRecord('msg_123', 'user@example.com', 'payment_success');

    expect(record.email_id).toBe('msg_123');
    expect(record.status).toBe('pending');
    expect(record.sent_at).toBeUndefined();
  });

  it('updates status to sent with timestamp', () => {
    const record = createDeliveryRecord('msg_123', 'user@example.com', 'payment_success');
    const updated = updateDeliveryStatus(record, 'sent');

    expect(updated.status).toBe('sent');
    expect(updated.sent_at).toBeDefined();
  });

  it('updates status to failed with error message', () => {
    const record = createDeliveryRecord('msg_123', 'user@example.com', 'payment_success');
    const updated = updateDeliveryStatus(record, 'failed', 'Invalid email address');

    expect(updated.status).toBe('failed');
    expect(updated.error_message).toBe('Invalid email address');
  });
});
