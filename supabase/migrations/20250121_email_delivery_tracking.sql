-- Create email_delivery_tracking table for monitoring email notifications
-- This table tracks the delivery status of all subscription-related emails

CREATE TABLE IF NOT EXISTS email_delivery_tracking (
    id SERIAL PRIMARY KEY,

    -- Email identification
    email_id VARCHAR(255) UNIQUE NOT NULL,        -- Resend email ID or UUID
    message_id VARCHAR(255),                       -- Additional message identifier

    -- Recipient information
    recipient_email VARCHAR(255) NOT NULL,
    recipient_name VARCHAR(100),

    -- Email content
    email_type VARCHAR(50) NOT NULL,                -- payment_success, payment_failed, etc.
    subject VARCHAR(255) NOT NULL,
    template_version VARCHAR(20) DEFAULT '1.0',

    -- Delivery status
    status VARCHAR(50) NOT NULL DEFAULT 'pending', -- pending, sent, delivered, failed, bounced
    provider VARCHAR(50) NOT NULL DEFAULT 'resend', -- Email provider (resend, sendgrid, etc.)

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    sent_at TIMESTAMP WITH TIME ZONE,
    delivered_at TIMESTAMP WITH TIME ZONE,
    opened_at TIMESTAMP WITH TIME ZONE,
    clicked_at TIMESTAMP WITH TIME ZONE,

    -- Error handling
    error_code VARCHAR(100),
    error_message TEXT,
    retry_count INTEGER DEFAULT 0,
    last_retry_at TIMESTAMP WITH TIME ZONE,

    -- Related data
    webhook_event_id VARCHAR(255),                  -- Associated webhook event ID
    subscriber_id INTEGER REFERENCES subscribers(id) ON DELETE SET NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    subscription_tier VARCHAR(50),

    -- Analytics
    opens_count INTEGER DEFAULT 0,
    clicks_count INTEGER DEFAULT 0,
    last_opened_at TIMESTAMP WITH TIME ZONE,
    last_clicked_at TIMESTAMP WITH TIME ZONE,

    -- Provider-specific data
    provider_data JSONB DEFAULT '{}',

    -- Metadata
    metadata JSONB DEFAULT '{}'
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_email_delivery_tracking_email_id ON email_delivery_tracking(email_id);
CREATE INDEX IF NOT EXISTS idx_email_delivery_tracking_recipient_email ON email_delivery_tracking(recipient_email);
CREATE INDEX IF NOT EXISTS idx_email_delivery_tracking_email_type ON email_delivery_tracking(email_type);
CREATE INDEX IF NOT EXISTS idx_email_delivery_tracking_status ON email_delivery_tracking(status);
CREATE INDEX IF NOT EXISTS idx_email_delivery_tracking_created_at ON email_delivery_tracking(created_at);
CREATE INDEX IF NOT EXISTS idx_email_delivery_tracking_webhook_event_id ON email_delivery_tracking(webhook_event_id);
CREATE INDEX IF NOT EXISTS idx_email_delivery_tracking_subscriber_id ON email_delivery_tracking(subscriber_id);

-- Add comments for documentation
COMMENT ON TABLE email_delivery_tracking IS 'Tracks delivery status of subscription-related email notifications';
COMMENT ON COLUMN email_delivery_tracking.email_id IS 'Unique email identifier (Resend message ID or UUID)';
COMMENT ON COLUMN email_delivery_tracking.email_type IS 'Type of email: payment_success, payment_failed, subscription_cancelled, etc.';
COMMENT ON COLUMN email_delivery_tracking.status IS 'Delivery status: pending, sent, delivered, failed, bounced';
COMMENT ON COLUMN email_delivery_tracking.provider IS 'Email service provider (resend, sendgrid, etc.)';
COMMENT ON COLUMN email_delivery_tracking.error_code IS 'Error code from email provider';
COMMENT ON COLUMN email_delivery_tracking.retry_count IS 'Number of delivery retry attempts';
COMMENT ON COLUMN email_delivery_tracking.webhook_event_id IS 'Associated webhook event that triggered this email';
COMMENT ON COLUMN email_delivery_tracking.provider_data IS 'Provider-specific data and raw response';

-- Row Level Security (RLS)
ALTER TABLE email_delivery_tracking ENABLE ROW LEVEL SECURITY;

-- Service role can manage all email tracking
CREATE POLICY "Service role full access to email_delivery_tracking" ON email_delivery_tracking
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Users can view their own email tracking
CREATE POLICY "Users can view own email delivery tracking" ON email_delivery_tracking
    FOR SELECT USING (auth.uid() = user_id);

-- Admins can view all email tracking
CREATE POLICY "Admins can view all email delivery tracking" ON email_delivery_tracking
    FOR SELECT USING (
        auth.jwt() ->> 'role' = 'service_role' OR
        (auth.jwt() ->> 'email' IS NOT NULL AND
         EXISTS (
             SELECT 1 FROM auth.users
             WHERE auth.users.id = auth.uid()
             AND auth.users.raw_user_meta_data ->> 'is_admin' = 'true'
         ))
    );

-- Function to create email delivery record
CREATE OR REPLACE FUNCTION create_email_delivery_record(
    p_email_id VARCHAR(255),
    p_recipient_email VARCHAR(255),
    p_recipient_name VARCHAR(100),
    p_email_type VARCHAR(50),
    p_subject VARCHAR(255),
    p_status VARCHAR(50) DEFAULT 'pending',
    p_provider VARCHAR(50) DEFAULT 'resend',
    p_webhook_event_id VARCHAR(255) DEFAULT NULL,
    p_subscriber_id INTEGER DEFAULT NULL,
    p_user_id UUID DEFAULT NULL,
    p_subscription_tier VARCHAR(50) DEFAULT NULL,
    p_provider_data JSONB DEFAULT '{}',
    p_metadata JSONB DEFAULT '{}'
) RETURNS UUID AS $$
DECLARE
    record_id UUID;
BEGIN
    -- Generate UUID for the record
    record_id := gen_random_uuid();

    -- Create email delivery tracking record
    INSERT INTO email_delivery_tracking (
        id,
        email_id,
        recipient_email,
        recipient_name,
        email_type,
        subject,
        status,
        provider,
        webhook_event_id,
        subscriber_id,
        user_id,
        subscription_tier,
        provider_data,
        metadata
    ) VALUES (
        record_id,
        p_email_id,
        p_recipient_email,
        p_recipient_name,
        p_email_type,
        p_subject,
        p_status,
        p_provider,
        p_webhook_event_id,
        p_subscriber_id,
        p_user_id,
        p_subscription_tier,
        p_provider_data,
        p_metadata
    );

    RETURN record_id;
END;
$$ LANGUAGE plpgsql;

-- Function to update email delivery status
CREATE OR REPLACE FUNCTION update_email_delivery_status(
    p_email_id VARCHAR(255),
    p_status VARCHAR(50),
    p_error_code VARCHAR(100) DEFAULT NULL,
    p_error_message TEXT DEFAULT NULL,
    p_provider_data JSONB DEFAULT NULL
) RETURNS BOOLEAN AS $$
BEGIN
    UPDATE email_delivery_tracking
    SET
        status = p_status,
        error_code = p_error_code,
        error_message = p_error_message,
        provider_data = COALESCE(p_provider_data, provider_data),
        updated_at = NOW()
    WHERE email_id = p_email_id;

    RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

-- Function to get email delivery analytics
CREATE OR REPLACE FUNCTION get_email_delivery_analytics(
    start_date DATE DEFAULT NULL,
    end_date DATE DEFAULT NULL
) RETURNS TABLE (
    email_type VARCHAR(50),
    total_sent BIGINT,
    delivered BIGINT,
    failed BIGINT,
    pending BIGINT,
    delivery_rate DECIMAL(5,2),
    open_rate DECIMAL(5,2),
    click_rate DECIMAL(5,2)
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        et.email_type,
        COUNT(*)::BIGINT as total_sent,
        COUNT(CASE WHEN et.status = 'delivered' THEN 1 END)::BIGINT as delivered,
        COUNT(CASE WHEN et.status = 'failed' THEN 1 END)::BIGINT as failed,
        COUNT(CASE WHEN et.status = 'pending' THEN 1 END)::BIGINT as pending,
        ROUND(
            (COUNT(CASE WHEN et.status = 'delivered' THEN 1 END)::DECIMAL /
             NULLIF(COUNT(*), 0)) * 100, 2
        ) as delivery_rate,
        ROUND(
            (COALESCE(et.opens_count, 0)::DECIMAL /
             NULLIF(COUNT(CASE WHEN et.status = 'delivered' THEN 1 END), 0)) * 100, 2
        ) as open_rate,
        ROUND(
            (COALESCE(et.clicks_count, 0)::DECIMAL /
             NULLIF(COUNT(CASE WHEN et.status = 'delivered' THEN 1 END), 0)) * 100, 2
        ) as click_rate
    FROM email_delivery_tracking et
    WHERE (start_date IS NULL OR et.created_at::DATE >= start_date)
      AND (end_date IS NULL OR et.created_at::DATE <= end_date)
    GROUP BY et.email_type
    ORDER BY total_sent DESC;
END;
$$ LANGUAGE plpgsql;

-- View for email delivery dashboard
CREATE OR REPLACE VIEW email_delivery_dashboard AS
SELECT
    created_at::DATE as email_date,
    email_type,
    status,
    COUNT(*) as email_count,
    COUNT(CASE WHEN status = 'delivered' THEN 1 END) as delivered_count,
    COUNT(CASE WHEN status = 'failed' THEN 1 END) as failed_count,
    AVG(opens_count) as avg_opens,
    AVG(clicks_count) as avg_clicks
FROM email_delivery_tracking
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY created_at::DATE, email_type, status
ORDER BY email_date DESC, email_type, status;

-- Function to cleanup old email tracking records
CREATE OR REPLACE FUNCTION cleanup_email_tracking_records(days_to_keep INTEGER DEFAULT 180)
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM email_delivery_tracking
    WHERE created_at < NOW() - INTERVAL '1 day' * days_to_keep
      AND status IN ('delivered', 'failed');

    GET DIAGNOSTICS deleted_count = ROW_COUNT;

    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically create email delivery records for webhooks
CREATE OR REPLACE FUNCTION auto_create_email_tracking()
RETURNS TRIGGER AS $$
BEGIN
    -- This trigger would be called from the subscription-emails function
    -- when an email is sent to create the tracking record
    NULL;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Example usage for the subscription-emails function:
-- SELECT create_email_delivery_record(
--     'resend_msg_12345', -- email_id from Resend
--     'user@example.com',
--     'John Doe',
--     'payment_success',
--     'Confirmation de votre abonnement Passionné - Club Créole',
--     'sent',
--     'resend',
--     'evt_abc123', -- webhook event ID
--     123, -- subscriber_id
--     'uuid-here', -- user_id
--     'Passionné',
--     '{"resend_response": {"id": "resend_msg_12345"}}',
--     '{"source": "webhook_invoice_payment_succeeded"}'
-- );