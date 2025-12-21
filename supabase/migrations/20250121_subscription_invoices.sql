-- Create subscription_invoices table for detailed invoice tracking
-- This table provides comprehensive tracking of all Stripe invoices related to subscriptions

CREATE TABLE IF NOT EXISTS subscription_invoices (
    id SERIAL PRIMARY KEY,
    stripe_invoice_id VARCHAR(255) UNIQUE NOT NULL,
    stripe_subscription_id VARCHAR(255) NOT NULL,
    stripe_customer_id VARCHAR(255) NOT NULL,

    -- Invoice details
    amount_paid DECIMAL(10,2) NOT NULL,
    amount_due DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'eur',
    status VARCHAR(50) NOT NULL, -- draft, open, paid, uncollectible, void

    -- Subscription details at time of invoice
    subscription_tier VARCHAR(50),
    subscription_interval VARCHAR(20), -- month, year
    subscription_interval_count INTEGER DEFAULT 1,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    due_date TIMESTAMP WITH TIME ZONE,
    paid_at TIMESTAMP WITH TIME ZONE,
    voided_at TIMESTAMP WITH TIME ZONE,

    -- Payment attempt tracking
    attempt_count INTEGER DEFAULT 0,
    next_payment_attempt TIMESTAMP WITH TIME ZONE,

    -- Metadata and tracking
    hosted_invoice_url TEXT,
    invoice_pdf TEXT,
    metadata JSONB DEFAULT '{}',

    -- Foreign keys (if we have subscriber/user relationships)
    subscriber_id INTEGER REFERENCES subscribers(id) ON DELETE SET NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,

    -- Audit fields
    created_by_service BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    synced_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_subscription_invoices_stripe_id ON subscription_invoices(stripe_invoice_id);
CREATE INDEX IF NOT EXISTS idx_subscription_invoices_subscription_id ON subscription_invoices(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_subscription_invoices_customer_id ON subscription_invoices(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_subscription_invoices_status ON subscription_invoices(status);
CREATE INDEX IF NOT EXISTS idx_subscription_invoices_created_at ON subscription_invoices(created_at);
CREATE INDEX IF NOT EXISTS idx_subscription_invoices_due_date ON subscription_invoices(due_date);
CREATE INDEX IF NOT EXISTS idx_subscription_invoices_subscriber_id ON subscription_invoices(subscriber_id);

-- Comments for documentation
COMMENT ON TABLE subscription_invoices IS 'Detailed tracking of all Stripe subscription invoices';
COMMENT ON COLUMN subscription_invoices.stripe_invoice_id IS 'Unique identifier from Stripe for the invoice';
COMMENT ON COLUMN subscription_invoices.stripe_subscription_id IS 'Associated Stripe subscription ID';
COMMENT ON COLUMN subscription_invoices.stripe_customer_id IS 'Associated Stripe customer ID';
COMMENT ON COLUMN subscription_invoices.amount_paid IS 'Amount actually paid (in currency units, not cents)';
COMMENT ON COLUMN subscription_invoices.amount_due IS 'Amount that was due (in currency units, not cents)';
COMMENT ON COLUMN subscription_invoices.status IS 'Stripe invoice status: draft, open, paid, uncollectible, void';
COMMENT ON COLUMN subscription_invoices.subscription_tier IS 'Subscription tier at time of invoice (Passionné, Expert)';
COMMENT ON COLUMN subscription_invoices.subscription_interval IS 'Billing interval (month, year)';
COMMENT ON COLUMN subscription_invoices.attempt_count IS 'Number of payment attempts for this invoice';
COMMENT ON COLUMN subscription_invoices.hosted_invoice_url IS 'URL for customer to view invoice';
COMMENT ON COLUMN subscription_invoices.invoice_pdf IS 'URL to download PDF invoice';
COMMENT ON COLUMN subscription_invoices.metadata IS 'Additional metadata from Stripe invoice';
COMMENT ON COLUMN subscription_invoices.subscriber_id IS 'Reference to local subscriber record';
COMMENT ON COLUMN subscription_invoices.user_id IS 'Reference to auth.users record';
COMMENT ON COLUMN subscription_invoices.created_by_service IS 'True if created by webhook/service, false if manual';

-- Row Level Security (RLS)
ALTER TABLE subscription_invoices ENABLE ROW LEVEL SECURITY;

-- Service role can manage all invoices
CREATE POLICY "Service role full access to subscription_invoices" ON subscription_invoices
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Users can view their own invoices
CREATE POLICY "Users can view own subscription invoices" ON subscription_invoices
    FOR SELECT USING (auth.uid() = user_id);

-- Admins can view all invoices (assuming is_admin is in user_metadata)
CREATE POLICY "Admins can view all subscription invoices" ON subscription_invoices
    FOR SELECT USING (
        auth.jwt() ->> 'role' = 'service_role' OR
        (auth.jwt() ->> 'email' IS NOT NULL AND
         EXISTS (
             SELECT 1 FROM auth.users
             WHERE auth.users.id = auth.uid()
             AND auth.users.raw_user_meta_data ->> 'is_admin' = 'true'
         ))
    );

-- Function to sync invoice with subscriber record
CREATE OR REPLACE FUNCTION sync_invoice_with_subscriber()
RETURNS TRIGGER AS $$
BEGIN
    -- Try to find subscriber by Stripe customer ID
    UPDATE subscribers
    SET
        last_invoice_amount = NEW.amount_paid,
        last_invoice_date = NEW.created_at,
        updated_at = NOW()
    WHERE stripe_customer_id = NEW.stripe_customer_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically sync invoice data with subscriber
CREATE TRIGGER trigger_sync_invoice_with_subscriber
    AFTER INSERT OR UPDATE ON subscription_invoices
    FOR EACH ROW
    EXECUTE FUNCTION sync_invoice_with_subscriber();