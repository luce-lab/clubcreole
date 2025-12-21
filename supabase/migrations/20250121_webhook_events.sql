-- Create webhook_events table for tracking processed Stripe events
-- This table ensures idempotency by preventing duplicate processing

CREATE TABLE IF NOT EXISTS webhook_events (
    id SERIAL PRIMARY KEY,
    stripe_event_id VARCHAR(255) UNIQUE NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    processing_status VARCHAR(20) NOT NULL DEFAULT 'pending',
    error_message TEXT,
    retry_count INTEGER DEFAULT 0,
    processed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_webhook_events_stripe_event_id ON webhook_events(stripe_event_id);
CREATE INDEX IF NOT EXISTS idx_webhook_events_processing_status ON webhook_events(processing_status);
CREATE INDEX IF NOT EXISTS idx_webhook_events_processed_at ON webhook_events(processed_at);

-- Add comments for documentation
COMMENT ON TABLE webhook_events IS 'Tracks Stripe webhook events to ensure idempotency';
COMMENT ON COLUMN webhook_events.stripe_event_id IS 'Unique identifier from Stripe for the event';
COMMENT ON COLUMN webhook_events.event_type IS 'Type of Stripe event (e.g., invoice.payment_succeeded)';
COMMENT ON COLUMN webhook_events.processing_status IS 'Status of event processing: pending, success, error, retry';
COMMENT ON COLUMN webhook_events.error_message IS 'Error message if processing failed';
COMMENT ON COLUMN webhook_events.retry_count IS 'Number of retry attempts for failed events';
COMMENT ON COLUMN webhook_events.processed_at IS 'Timestamp when the event was processed';

-- Row Level Security (RLS) policies
ALTER TABLE webhook_events ENABLE ROW LEVEL SECURITY;

-- Allow service role to manage webhook events
CREATE POLICY "Service role can manage webhook events" ON webhook_events
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Deny all other access
CREATE POLICY "Deny all other access to webhook events" ON webhook_events
    FOR ALL USING (false);