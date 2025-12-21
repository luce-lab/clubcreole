-- Enhance purchases table with Stripe integration and better subscription support

-- Add new columns to purchases table for Stripe integration
ALTER TABLE purchases
ADD COLUMN IF NOT EXISTS stripe_invoice_id VARCHAR(255) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS stripe_subscription_id VARCHAR(255) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS stripe_payment_intent_id VARCHAR(255) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS stripe_charge_id VARCHAR(255) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS stripe_customer_id VARCHAR(255) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS payment_method VARCHAR(50) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS payment_status VARCHAR(50) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS failure_code VARCHAR(100) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS failure_message TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS refund_amount DECIMAL(10,2) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS refund_status VARCHAR(50) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS refund_reason TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS webhook_event_id VARCHAR(255) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS processed_at TIMESTAMP WITH TIME ZONE DEFAULT NULL;

-- Add constraints for data consistency
ALTER TABLE purchases
ADD CONSTRAINT IF NOT EXISTS check_payment_status
    CHECK (payment_status IS NULL OR payment_status IN (
        'succeeded', 'pending', 'failed', 'canceled', 'requires_action', 'requires_confirmation',
        'requires_payment_method', 'processing', 'refunded', 'partially_refunded'
    ));

ALTER TABLE purchases
ADD CONSTRAINT IF NOT EXISTS check_refund_status
    CHECK (refund_status IS NULL OR refund_status IN (
        'succeeded', 'pending', 'failed', 'canceled'
    ));

-- Create unique indexes for Stripe IDs
CREATE UNIQUE INDEX IF NOT EXISTS idx_purchases_stripe_invoice_id ON purchases(stripe_invoice_id) WHERE stripe_invoice_id IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_purchases_stripe_payment_intent_id ON purchases(stripe_payment_intent_id) WHERE stripe_payment_intent_id IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_purchases_stripe_charge_id ON purchases(stripe_charge_id) WHERE stripe_charge_id IS NOT NULL;

-- Create additional indexes for performance
CREATE INDEX IF NOT EXISTS idx_purchases_stripe_subscription_id ON purchases(stripe_subscription_id) WHERE stripe_subscription_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_purchases_stripe_customer_id ON purchases(stripe_customer_id) WHERE stripe_customer_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_purchases_payment_status ON purchases(payment_status);
CREATE INDEX IF NOT EXISTS idx_purchases_refund_status ON purchases(refund_status);
CREATE INDEX IF NOT EXISTS idx_purchases_processed_at ON purchases(processed_at);
CREATE INDEX IF NOT EXISTS idx_purchases_webhook_event_id ON purchases(webhook_event_id);

-- Update existing comments and add new ones
COMMENT ON TABLE purchases IS 'Enhanced purchase history with Stripe integration';
COMMENT ON COLUMN purchases.stripe_invoice_id IS 'Stripe invoice ID for subscription payments';
COMMENT ON COLUMN purchases.stripe_subscription_id IS 'Associated Stripe subscription ID';
COMMENT ON COLUMN purchases.stripe_payment_intent_id IS 'Stripe payment intent ID for one-time payments';
COMMENT ON COLUMN purchases.stripe_charge_id IS 'Stripe charge ID for successful payments';
COMMENT ON COLUMN purchases.stripe_customer_id IS 'Associated Stripe customer ID';
COMMENT ON COLUMN purchases.payment_method IS 'Payment method type (card, sepa_debit, etc.)';
COMMENT ON COLUMN purchases.payment_status IS 'Detailed payment status from Stripe';
COMMENT ON COLUMN purchases.failure_code IS 'Stripe error code for failed payments';
COMMENT ON COLUMN purchases.failure_message IS 'Human-readable error message for failed payments';
COMMENT ON COLUMN purchases.refund_amount IS 'Amount refunded (if any)';
COMMENT ON COLUMN purchases.refund_status IS 'Status of any refunds';
COMMENT ON COLUMN purchases.refund_reason IS 'Reason for refund';
COMMENT ON COLUMN purchases.metadata IS 'Additional metadata from Stripe';
COMMENT ON COLUMN purchases.webhook_event_id IS 'ID of the webhook event that created this record';
COMMENT ON COLUMN purchases.processed_at IS 'Timestamp when this purchase record was processed';

-- Function to create purchase from Stripe webhook event
CREATE OR REPLACE FUNCTION create_purchase_from_webhook(
    p_item_type TEXT,
    p_item_name TEXT,
    p_amount DECIMAL(10,2),
    p_currency TEXT,
    p_purchase_date TIMESTAMP WITH TIME ZONE,
    p_status TEXT,
    p_user_id UUID,
    p_email TEXT,
    p_stripe_invoice_id TEXT DEFAULT NULL,
    p_stripe_subscription_id TEXT DEFAULT NULL,
    p_stripe_customer_id TEXT DEFAULT NULL,
    p_webhook_event_id TEXT DEFAULT NULL,
    p_metadata JSONB DEFAULT '{}'
) RETURNS UUID AS $$
DECLARE
    purchase_id UUID;
BEGIN
    -- Create the purchase record
    INSERT INTO purchases (
        item_type,
        item_name,
        amount,
        currency,
        purchase_date,
        status,
        user_id,
        email,
        stripe_invoice_id,
        stripe_subscription_id,
        stripe_customer_id,
        webhook_event_id,
        metadata,
        processed_at
    ) VALUES (
        p_item_type,
        p_item_name,
        p_amount,
        p_currency,
        p_purchase_date,
        p_status,
        p_user_id,
        p_email,
        p_stripe_invoice_id,
        p_stripe_subscription_id,
        p_stripe_customer_id,
        p_webhook_event_id,
        p_metadata,
        NOW()
    ) RETURNING id INTO purchase_id;

    RETURN purchase_id;
END;
$$ LANGUAGE plpgsql;

-- Function to update purchase payment status
CREATE OR REPLACE FUNCTION update_purchase_payment_status(
    p_stripe_payment_intent_id TEXT,
    p_payment_status TEXT,
    p_failure_code TEXT DEFAULT NULL,
    p_failure_message TEXT DEFAULT NULL,
    p_charge_id TEXT DEFAULT NULL,
    p_payment_method TEXT DEFAULT NULL
) RETURNS BOOLEAN AS $$
BEGIN
    UPDATE purchases
    SET
        payment_status = p_payment_status,
        failure_code = p_failure_code,
        failure_message = p_failure_message,
        stripe_charge_id = p_charge_id,
        payment_method = p_payment_method,
        processed_at = NOW()
    WHERE stripe_payment_intent_id = p_stripe_payment_intent_id;

    RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

-- Function to process refund for a purchase
CREATE OR REPLACE FUNCTION process_purchase_refund(
    p_stripe_charge_id TEXT,
    p_refund_amount DECIMAL(10,2),
    p_refund_status TEXT,
    p_refund_reason TEXT DEFAULT NULL
) RETURNS BOOLEAN AS $$
BEGIN
    UPDATE purchases
    SET
        refund_amount = p_refund_amount,
        refund_status = p_refund_status,
        refund_reason = p_refund_reason,
        processed_at = NOW()
    WHERE stripe_charge_id = p_stripe_charge_id
      AND refund_amount IS NULL; -- Only process first refund

    RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

-- Trigger to sync purchase status with payment status
CREATE OR REPLACE FUNCTION sync_purchase_with_payment_status()
RETURNS TRIGGER AS $$
BEGIN
    -- Update the main status field based on payment status
    IF NEW.payment_status = 'succeeded' THEN
        NEW.status = 'completed';
    ELSIF NEW.payment_status = 'failed' OR NEW.payment_status = 'canceled' THEN
        NEW.status = 'failed';
    ELSIF NEW.payment_status = 'refunded' THEN
        NEW.status = 'refunded';
    ELSIF NEW.payment_status = 'partially_refunded' THEN
        NEW.status = 'partially_refunded';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to sync statuses
CREATE TRIGGER trigger_sync_purchase_with_payment_status
    BEFORE INSERT OR UPDATE OF payment_status ON purchases
    FOR EACH ROW
    EXECUTE FUNCTION sync_purchase_with_payment_status();

-- View for subscription payment analytics
CREATE OR REPLACE VIEW subscription_payment_analytics AS
SELECT
    s.email,
    s.subscription_tier,
    s.subscribed,
    s.subscription_status,
    COUNT(pi.id) as total_invoices,
    COALESCE(SUM(pi.amount_paid), 0) as total_paid,
    COALESCE(SUM(pi.amount_due), 0) as total_billed,
    MAX(pi.created_at) as last_invoice_date,
    MIN(pi.created_at) as first_invoice_date,
    COUNT(CASE WHEN pi.status = 'paid' THEN 1 END) as paid_invoices,
    COUNT(CASE WHEN pi.status = 'open' OR pi.status = 'draft' THEN 1 END) as pending_invoices
FROM subscribers s
LEFT JOIN subscription_invoices pi ON s.stripe_customer_id = pi.stripe_customer_id
WHERE s.stripe_customer_id IS NOT NULL
GROUP BY s.id, s.email, s.subscription_tier, s.subscribed, s.subscription_status;

-- Function to get subscription revenue analytics
CREATE OR REPLACE FUNCTION get_subscription_revenue_analysis(
    start_date DATE DEFAULT NULL,
    end_date DATE DEFAULT NULL
) RETURNS TABLE (
    period TEXT,
    total_revenue DECIMAL(12,2),
    total_subscribers INTEGER,
    new_subscribers INTEGER,
    canceled_subscribers INTEGER,
    churn_rate DECIMAL(5,2)
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        DATE_TRUNC('month', COALESCE(pi.created_at, s.created_at))::TEXT as period,
        COALESCE(SUM(pi.amount_paid), 0) as total_revenue,
        COUNT(DISTINCT s.id) as total_subscribers,
        COUNT(DISTINCT CASE WHEN s.created_at::DATE BETWEEN COALESCE(start_date, '1970-01-01') AND COALESCE(end_date, CURRENT_DATE) THEN s.id END) as new_subscribers,
        COUNT(DISTINCT CASE WHEN s.canceled_at::DATE BETWEEN COALESCE(start_date, '1970-01-01') AND COALESCE(end_date, CURRENT_DATE) THEN s.id END) as canceled_subscribers,
        ROUND(
            (COUNT(DISTINCT CASE WHEN s.canceled_at::DATE BETWEEN COALESCE(start_date, '1970-01-01') AND COALESCE(end_date, CURRENT_DATE) THEN s.id END)::DECIMAL /
            NULLIF(COUNT(DISTINCT s.id), 0)) * 100, 2
        ) as churn_rate
    FROM subscribers s
    LEFT JOIN subscription_invoices pi ON s.stripe_customer_id = pi.stripe_customer_id
    WHERE (start_date IS NULL OR
            (pi.created_at::DATE >= start_date OR s.created_at::DATE >= start_date))
      AND (end_date IS NULL OR
            (pi.created_at::DATE <= end_date OR s.created_at::DATE <= end_date))
      AND s.stripe_customer_id IS NOT NULL
    GROUP BY DATE_TRUNC('month', COALESCE(pi.created_at, s.created_at))
    ORDER BY period;
END;
$$ LANGUAGE plpgsql;