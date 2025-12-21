-- Enhance subscribers table with additional fields for comprehensive subscription management

-- Add new columns to subscribers table
ALTER TABLE subscribers
ADD COLUMN IF NOT EXISTS subscription_status VARCHAR(50) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS cancel_at_period_end BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS canceled_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
ADD COLUMN IF NOT EXISTS trial_start TIMESTAMP WITH TIME ZONE DEFAULT NULL,
ADD COLUMN IF NOT EXISTS trial_end TIMESTAMP WITH TIME ZONE DEFAULT NULL,
ADD COLUMN IF NOT EXISTS last_invoice_amount DECIMAL(10,2) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS last_invoice_date TIMESTAMP WITH TIME ZONE DEFAULT NULL,
ADD COLUMN IF NOT EXISTS payment_method VARCHAR(100) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS billing_cycle_anchor TIMESTAMP WITH TIME ZONE DEFAULT NULL,
ADD COLUMN IF NOT EXISTS stripe_subscription_id VARCHAR(255) UNIQUE DEFAULT NULL,
ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS sync_status VARCHAR(20) DEFAULT 'synced',
ADD COLUMN IF NOT EXISTS last_sync_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Update the subscription_tier column to be more specific
ALTER TABLE subscribers
ALTER COLUMN subscription_tier SET DEFAULT NULL;

-- Add constraints for data integrity
ALTER TABLE subscribers
ADD CONSTRAINT IF NOT EXISTS check_subscription_status
    CHECK (subscription_status IS NULL OR subscription_status IN (
        'trialing', 'active', 'past_due', 'canceled', 'unpaid', 'incomplete', 'incomplete_expired', 'paused'
    ));

ALTER TABLE subscribers
ADD CONSTRAINT IF NOT EXISTS check_sync_status
    CHECK (sync_status IN ('synced', 'pending', 'error', 'syncing'));

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_subscribers_stripe_subscription_id ON subscribers(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_subscribers_subscription_status ON subscribers(subscription_status);
CREATE INDEX IF NOT EXISTS idx_subscribers_cancel_at_period_end ON subscribers(cancel_at_period_end);
CREATE INDEX IF NOT EXISTS idx_subscribers_last_invoice_date ON subscribers(last_invoice_date);
CREATE INDEX IF NOT EXISTS idx_subscribers_sync_status ON subscribers(sync_status);
CREATE INDEX IF NOT EXISTS idx_subscribers_trial_end ON subscribers(trial_end);

-- Update existing comments and add new ones
COMMENT ON TABLE subscribers IS 'Subscriber information with enhanced Stripe integration';
COMMENT ON COLUMN subscribers.subscription_status IS 'Stripe subscription status: trialing, active, past_due, canceled, unpaid, etc.';
COMMENT ON COLUMN subscribers.cancel_at_period_end IS 'True if subscription will cancel at period end';
COMMENT ON COLUMN subscribers.canceled_at IS 'Timestamp when subscription was canceled';
COMMENT ON COLUMN subscribers.trial_start IS 'Start timestamp for trial period';
COMMENT ON COLUMN subscribers.trial_end IS 'End timestamp for trial period';
COMMENT ON COLUMN subscribers.last_invoice_amount IS 'Amount of the most recent invoice';
COMMENT ON COLUMN subscribers.last_invoice_date IS 'Date of the most recent invoice';
COMMENT ON COLUMN subscribers.payment_method IS 'Payment method type (card, sepa, etc.)';
COMMENT ON COLUMN subscribers.billing_cycle_anchor IS 'Anchor date for billing cycle';
COMMENT ON COLUMN subscribers.stripe_subscription_id IS 'Unique Stripe subscription ID (indexed for performance)';
COMMENT ON COLUMN subscribers.metadata IS 'Additional subscription metadata from Stripe';
COMMENT ON COLUMN subscribers.sync_status IS 'Sync status with Stripe: synced, pending, error, syncing';
COMMENT ON COLUMN subscribers.last_sync_at IS 'Timestamp of last sync operation with Stripe';

-- Create function to get subscriber health status
CREATE OR REPLACE FUNCTION get_subscriber_health_status(subscriber_record subscribers)
RETURNS TEXT AS $$
BEGIN
    -- Return health status based on various factors
    IF NOT subscriber_record.subscribed THEN
        RETURN 'inactive';
    END IF;

    IF subscriber_record.subscription_end < NOW() THEN
        RETURN 'expired';
    END IF;

    IF subscriber_record.subscription_status IN ('past_due', 'unpaid') THEN
        RETURN 'payment_issue';
    END IF;

    IF subscriber_record.subscription_status = 'canceled' THEN
        RETURN 'canceled';
    END IF;

    IF subscriber_record.subscription_status = 'trialing' THEN
        RETURN 'trial';
    END IF;

    IF subscriber_record.sync_status != 'synced' THEN
        RETURN 'sync_issue';
    END IF;

    RETURN 'healthy';
END;
$$ LANGUAGE plpgsql;

-- Function to update subscription status based on dates
CREATE OR REPLACE FUNCTION update_subscription_status_by_dates()
RETURNS TRIGGER AS $$
BEGIN
    -- Auto-update subscription status based on dates
    IF NEW.subscription_end IS NOT NULL AND NEW.subscription_end < NOW() THEN
        NEW.subscribed = FALSE;
        NEW.subscription_status = 'expired';
    ELSIF NEW.subscribed AND NEW.subscription_status IS NULL THEN
        NEW.subscription_status = 'active';
    END IF;

    -- Update sync timestamp
    NEW.last_sync_at = NOW();

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update status based on dates
CREATE TRIGGER trigger_update_subscription_status_by_dates
    BEFORE UPDATE OF subscription_end, subscribed, subscription_status ON subscribers
    FOR EACH ROW
    EXECUTE FUNCTION update_subscription_status_by_dates();

-- Function to clean up old canceled subscribers (run periodically)
CREATE OR REPLACE FUNCTION cleanup_old_canceled_subscribers(days_old INTEGER DEFAULT 90)
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM subscribers
    WHERE subscription_status = 'canceled'
      AND canceled_at < NOW() - INTERVAL '1 day' * days_old
      AND subscribed = FALSE
      AND stripe_subscription_id IS NULL;

    GET DIAGNOSTICS deleted_count = ROW_COUNT;

    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;