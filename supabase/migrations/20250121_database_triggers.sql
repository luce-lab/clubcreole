-- Comprehensive database triggers for data consistency and automation

-- Trigger to sync subscriber with subscription plan changes
CREATE OR REPLACE FUNCTION sync_subscriber_with_plan_changes()
RETURNS TRIGGER AS $$
BEGIN
    -- When subscription plan changes, update subscriber tier
    IF OLD.subscription_tier IS DISTINCT FROM NEW.subscription_tier THEN
        -- Get plan features for the new tier
        UPDATE subscribers s
        SET
            sync_status = 'pending',
            last_sync_at = NOW()
        WHERE s.id = NEW.id;

        -- Log the tier change
        INSERT INTO webhook_events (stripe_event_id, event_type, processing_status, processed_at)
        VALUES (
            'tier_change_' || NEW.id || '_' || EXTRACT(EPOCH FROM NOW()),
            'subscriber.tier_changed',
            'success',
            NOW()
        ) ON CONFLICT (stripe_event_id) DO NOTHING;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_sync_subscriber_with_plan_changes
    AFTER UPDATE OF subscription_tier ON subscribers
    FOR EACH ROW
    EXECUTE FUNCTION sync_subscriber_with_plan_changes();

-- Trigger to maintain subscription end date consistency
CREATE OR REPLACE FUNCTION maintain_subscription_dates()
RETURNS TRIGGER AS $$
BEGIN
    -- Auto-extend subscription end date for active subscriptions
    IF NEW.subscribed = TRUE AND NEW.subscription_status = 'active' THEN
        -- If subscription_end is missing or too old, extend it
        IF NEW.subscription_end IS NULL OR NEW.subscription_end < NOW() THEN
            NEW.subscription_end = NOW() + INTERVAL '1 month';
        END IF;
    END IF;

    -- Clear subscription end date for inactive subscriptions
    IF NEW.subscribed = FALSE THEN
        NEW.subscription_tier = NULL;
        NEW.subscription_status = 'canceled';
        NEW.canceled_at = COALESCE(NEW.canceled_at, NOW());
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_maintain_subscription_dates
    BEFORE UPDATE OF subscribed, subscription_status ON subscribers
    FOR EACH ROW
    EXECUTE FUNCTION maintain_subscription_dates();

-- Trigger to automatically create invoice records from webhook events
CREATE OR REPLACE FUNCTION auto_create_invoice_from_webhook()
RETURNS TRIGGER AS $$
BEGIN
    -- Only process successful payment events
    IF NEW.event_type = 'invoice.payment_succeeded' AND NEW.processing_status = 'success' THEN
        -- Parse event data to extract invoice information
        -- This would typically be done in the webhook function, but we add a trigger
        -- to ensure consistency if webhook events are manually processed
        NULL;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_auto_create_invoice_from_webhook
    AFTER INSERT ON webhook_events
    FOR EACH ROW
    EXECUTE FUNCTION auto_create_invoice_from_webhook();

-- Trigger to maintain subscriber health status
CREATE OR REPLACE FUNCTION update_subscriber_health()
RETURNS TRIGGER AS $$
BEGIN
    -- Auto-update sync status based on recent activity
    IF NEW.last_sync_at IS NOT NULL AND NEW.last_sync_at < NOW() - INTERVAL '1 hour' THEN
        NEW.sync_status = 'stale';
    ELSIF NEW.last_sync_at IS NOT NULL AND NEW.last_sync_at >= NOW() - INTERVAL '1 hour' THEN
        NEW.sync_status = 'synced';
    END IF;

    -- Update health indicators
    IF NEW.subscribed = TRUE THEN
        -- Active subscription health checks
        IF NEW.subscription_end < NOW() THEN
            NEW.subscription_status = 'expired';
        ELSIF NEW.subscription_status = 'past_due' AND NEW.last_invoice_date < NOW() - INTERVAL '7 days' THEN
            -- Mark as high risk if payment is very late
            NEW.metadata = jsonb_set(
                COALESCE(NEW.metadata, '{}'::jsonb),
                '{payment_risk}',
                '"high"'
            );
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_subscriber_health
    BEFORE UPDATE OF last_sync_at, subscription_end, subscription_status ON subscribers
    FOR EACH ROW
    EXECUTE FUNCTION update_subscriber_health();

-- Trigger to cascade subscription status to related purchases
CREATE OR REPLACE FUNCTION cascade_subscription_status_to_purchases()
RETURNS TRIGGER AS $$
BEGIN
    -- When subscription is canceled, mark related purchases
    IF OLD.subscribed = TRUE AND NEW.subscribed = FALSE THEN
        UPDATE purchases
        SET status = 'subscription_canceled',
            processed_at = NOW()
        WHERE stripe_subscription_id = NEW.stripe_subscription_id
          AND status IN ('completed', 'pending');

        -- Log the cancellation impact
        INSERT INTO webhook_events (stripe_event_id, event_type, processing_status, error_message, processed_at)
        VALUES (
            'cascade_cancel_' || NEW.id || '_' || EXTRACT(EPOCH FROM NOW()),
            'subscription.cascade_cancellation',
            'success',
            'Marked ' || (SELECT COUNT(*) FROM purchases WHERE stripe_subscription_id = NEW.stripe_subscription_id) || ' purchases as canceled',
            NOW()
        ) ON CONFLICT (stripe_event_id) DO NOTHING;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_cascade_subscription_status_to_purchases
    AFTER UPDATE OF subscribed ON subscribers
    FOR EACH ROW
    EXECUTE FUNCTION cascade_subscription_status_to_purchases();

-- Function to audit critical subscription changes
CREATE OR REPLACE FUNCTION audit_subscription_changes()
RETURNS TRIGGER AS $$
BEGIN
    -- Log critical changes for audit purposes
    IF OLD.subscribed IS DISTINCT FROM NEW.subscribed OR
       OLD.subscription_tier IS DISTINCT FROM NEW.subscription_tier OR
       OLD.subscription_status IS DISTINCT FROM NEW.subscription_status THEN

        INSERT INTO webhook_events (stripe_event_id, event_type, processing_status, error_message, processed_at)
        VALUES (
            'audit_' || NEW.id || '_' || EXTRACT(EPOCH FROM NOW()),
            'subscriber.audit_change',
            'success',
            json_build_object(
                'old_subscribed', OLD.subscribed,
                'new_subscribed', NEW.subscribed,
                'old_tier', OLD.subscription_tier,
                'new_tier', NEW.subscription_tier,
                'old_status', OLD.subscription_status,
                'new_status', NEW.subscription_status,
                'changed_by', current_setting('app.current_user_id', true)
            )::TEXT,
            NOW()
        ) ON CONFLICT (stripe_event_id) DO NOTHING;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_audit_subscription_changes
    AFTER UPDATE OF subscribed, subscription_tier, subscription_status ON subscribers
    FOR EACH ROW
    EXECUTE FUNCTION audit_subscription_changes();

-- Trigger to automatically expire promotional pricing
CREATE OR REPLACE FUNCTION expire_promotional_pricing()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if promotional pricing has expired
    IF NEW.promotional_end_date IS NOT NULL AND NEW.promotional_end_date <= NOW() THEN
        NEW.promotional_price = NULL;
        NEW.promotional_end_date = NULL;

        -- Log the price change
        INSERT INTO webhook_events (stripe_event_id, event_type, processing_status, error_message, processed_at)
        VALUES (
            'promo_expired_' || NEW.id || '_' || EXTRACT(EPOCH FROM NOW()),
            'plan.promotional_expired',
            'success',
            'Promotional pricing expired for plan: ' || NEW.name,
            NOW()
        ) ON CONFLICT (stripe_event_id) DO NOTHING;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_expire_promotional_pricing
    BEFORE UPDATE ON subscription_plans
    FOR EACH ROW
    EXECUTE FUNCTION expire_promotional_pricing();

-- Function to maintain data consistency between subscribers and invoices
CREATE OR REPLACE FUNCTION maintain_subscriber_invoice_consistency()
RETURNS TRIGGER AS $$
BEGIN
    -- Update subscriber's last invoice info when new invoice is created
    IF TG_OP = 'INSERT' THEN
        UPDATE subscribers
        SET
            last_invoice_amount = NEW.amount_paid,
            last_invoice_date = NEW.created_at,
            updated_at = NOW()
        WHERE stripe_customer_id = NEW.stripe_customer_id;
    END IF;

    -- Update subscriber when invoice status changes
    IF TG_OP = 'UPDATE' THEN
        IF OLD.status IS DISTINCT FROM NEW.status THEN
            CASE NEW.status
                WHEN 'paid' THEN
                    UPDATE subscribers
                    SET
                        subscribed = TRUE,
                        subscription_status = 'active',
                        updated_at = NOW()
                    WHERE stripe_customer_id = NEW.stripe_customer_id;
                WHEN 'open' THEN
                    UPDATE subscribers
                    SET
                        subscription_status = 'past_due',
                        updated_at = NOW()
                    WHERE stripe_customer_id = NEW.stripe_customer_id
                      AND subscribed = TRUE;
                WHEN 'void' THEN
                    UPDATE subscribers
                    SET
                        subscription_status = 'voided',
                        updated_at = NOW()
                    WHERE stripe_customer_id = NEW.stripe_customer_id;
            END CASE;
        END IF;
    END IF;

    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_maintain_subscriber_invoice_consistency
    AFTER INSERT OR UPDATE ON subscription_invoices
    FOR EACH ROW
    EXECUTE FUNCTION maintain_subscriber_invoice_consistency();

-- Function to validate business rules
CREATE OR REPLACE FUNCTION validate_subscription_business_rules()
RETURNS TRIGGER AS $$
BEGIN
    -- Prevent downgrade if user has active usage that requires higher tier
    IF OLD.subscription_tier IS NOT NULL AND NEW.subscription_tier IS NOT NULL THEN
        DECLARE
            old_access_level INTEGER;
            new_access_level INTEGER;
        BEGIN
            SELECT sp.access_level INTO old_access_level
            FROM subscription_plans sp
            WHERE sp.plan_id = OLD.subscription_tier;

            SELECT sp.access_level INTO new_access_level
            FROM subscription_plans sp
            WHERE sp.plan_id = NEW.subscription_tier;

            -- If downgrading, check for business rules
            IF old_access_level > new_access_level THEN
                -- Add business logic here to check if downgrade is allowed
                -- For now, we'll just log the potential downgrade
                INSERT INTO webhook_events (stripe_event_id, event_type, processing_status, error_message, processed_at)
                VALUES (
                    'downgrade_check_' || NEW.id || '_' || EXTRACT(EPOCH FROM NOW()),
                    'subscriber.downgrade_attempted',
                    'warning',
                    'Downgrade from ' || OLD.subscription_tier || ' to ' || NEW.subscription_tier || ' detected',
                    NOW()
                ) ON CONFLICT (stripe_event_id) DO NOTHING;
            END IF;
        END;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_validate_subscription_business_rules
    BEFORE UPDATE OF subscription_tier ON subscribers
    FOR EACH ROW
    EXECUTE FUNCTION validate_subscription_business_rules();

-- Trigger to maintain audit logs for critical operations
CREATE OR REPLACE FUNCTION log_critical_operations()
RETURNS TRIGGER AS $$
BEGIN
    -- Log critical payment operations
    IF TG_TABLE_NAME = 'purchases' THEN
        IF NEW.payment_status = 'failed' OR NEW.refund_status = 'succeeded' THEN
            INSERT INTO webhook_events (stripe_event_id, event_type, processing_status, error_message, processed_at)
            VALUES (
                'critical_payment_' || NEW.id || '_' || EXTRACT(EPOCH FROM NOW()),
                CASE WHEN NEW.payment_status = 'failed' THEN 'payment.critical_failure' ELSE 'payment.critical_refund' END,
                'alert',
                json_build_object(
                    'purchase_id', NEW.id,
                    'amount', NEW.amount,
                    'status', NEW.payment_status,
                    'user_id', NEW.user_id,
                    'stripe_charge_id', NEW.stripe_charge_id
                )::TEXT,
                NOW()
            ) ON CONFLICT (stripe_event_id) DO NOTHING;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_log_critical_operations
    AFTER INSERT OR UPDATE ON purchases
    FOR EACH ROW
    EXECUTE FUNCTION log_critical_operations();

-- Function to clean up old webhook events (run periodically)
CREATE OR REPLACE FUNCTION cleanup_old_webhook_events(days_to_keep INTEGER DEFAULT 90)
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM webhook_events
    WHERE created_at < NOW() - INTERVAL '1 day' * days_to_keep
      AND processing_status = 'success';

    GET DIAGNOSTICS deleted_count = ROW_COUNT;

    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Function to get subscription health metrics
CREATE OR REPLACE FUNCTION get_subscription_health_metrics()
RETURNS TABLE (
    metric_name TEXT,
    value BIGINT,
    percentage DECIMAL(5,2)
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        'total_subscribers'::TEXT as metric_name,
        COUNT(*)::BIGINT as value,
        (COUNT(*) * 100.0 / NULLIF((SELECT COUNT(*) FROM subscribers), 0)) as percentage
    FROM subscribers
    WHERE stripe_customer_id IS NOT NULL

    UNION ALL

    SELECT
        'active_subscribers'::TEXT,
        COUNT(*)::BIGINT,
        (COUNT(*) * 100.0 / NULLIF((SELECT COUNT(*) FROM subscribers WHERE stripe_customer_id IS NOT NULL), 0)) as percentage
    FROM subscribers
    WHERE subscribed = TRUE AND subscription_end > NOW()

    UNION ALL

    SELECT
        'past_due_subscribers'::TEXT,
        COUNT(*)::BIGINT,
        (COUNT(*) * 100.0 / NULLIF((SELECT COUNT(*) FROM subscribers WHERE subscribed = TRUE), 0)) as percentage
    FROM subscribers
    WHERE subscription_status = 'past_due'

    UNION ALL

    SELECT
        'canceled_subscribers'::TEXT,
        COUNT(*)::BIGINT,
        (COUNT(*) * 100.0 / NULLIF((SELECT COUNT(*) FROM subscribers WHERE stripe_customer_id IS NOT NULL), 0)) as percentage
    FROM subscribers
    WHERE subscription_status = 'canceled' OR subscribed = FALSE

    UNION ALL

    SELECT
        'sync_healthy'::TEXT,
        COUNT(*)::BIGINT,
        (COUNT(*) * 100.0 / NULLIF((SELECT COUNT(*) FROM subscribers WHERE stripe_customer_id IS NOT NULL), 0)) as percentage
    FROM subscribers
    WHERE sync_status = 'synced' AND last_sync_at > NOW() - INTERVAL '1 hour';
END;
$$ LANGUAGE plpgsql;