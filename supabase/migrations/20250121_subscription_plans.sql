-- Create subscription_plans table for comprehensive tier management
-- This centralizes plan configuration and makes it easier to manage pricing

CREATE TABLE IF NOT EXISTS subscription_plans (
    id SERIAL PRIMARY KEY,

    -- Plan identification
    plan_id VARCHAR(100) UNIQUE NOT NULL, -- Internal plan identifier (passionne, expert, etc.)
    name VARCHAR(100) NOT NULL,           -- Display name
    description TEXT,

    -- Stripe configuration
    stripe_price_id VARCHAR(255),         -- Stripe price ID for this plan
    stripe_product_id VARCHAR(255),       -- Stripe product ID

    -- Pricing details (all amounts in currency units, not cents)
    price DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'eur',

    -- Billing configuration
    interval VARCHAR(20) NOT NULL,        -- month, year
    interval_count INTEGER DEFAULT 1,     -- Number of intervals (e.g., 2 for "every 2 months")

    -- Plan features (JSON structure)
    features JSONB DEFAULT '{}',
    benefits JSONB DEFAULT '{}',

    -- Access control and permissions
    access_level INTEGER DEFAULT 0,       -- Higher number = more features
    is_active BOOLEAN DEFAULT TRUE,
    is_public BOOLEAN DEFAULT TRUE,

    -- Display and marketing
    display_order INTEGER DEFAULT 0,      -- For ordering in UI
    badge_text VARCHAR(50),               -- e.g., "Popular", "Best Value"
    badge_color VARCHAR(20) DEFAULT 'green', -- green, blue, red, yellow

    -- Limits and quotas
    max_projects INTEGER DEFAULT NULL,
    max_users INTEGER DEFAULT NULL,
    storage_limit_gb INTEGER DEFAULT NULL,
    api_calls_per_month INTEGER DEFAULT NULL,

    -- Trial settings
    trial_days INTEGER DEFAULT NULL,      -- Number of free trial days
    trial_price DECIMAL(10,2) DEFAULT 0, -- Price during trial (usually 0)

    -- Migration settings
    upgrade_from_plans TEXT[],            -- Array of plan_ids this can upgrade from
    downgrade_to_plans TEXT[],            -- Array of plan_ids this can downgrade to

    -- Discounts and promotions
    annual_discount_percentage INTEGER DEFAULT 0, -- Discount for annual billing
    promotional_price DECIMAL(10,2),     -- Temporary promotional price
    promotional_end_date TIMESTAMP WITH TIME ZONE,

    -- Revenue tracking
    revenue_share_percentage DECIMAL(5,2), -- For partner revenue sharing
    setup_fee DECIMAL(10,2) DEFAULT 0,

    -- Tax and legal
    tax_rate DECIMAL(5,2) DEFAULT NULL,   -- Percentage tax rate (0 if tax handled by Stripe)
    terms_required BOOLEAN DEFAULT FALSE,

    -- Metadata
    metadata JSONB DEFAULT '{}',

    -- Audit fields
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),

    -- Soft delete
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);

-- Insert default subscription plans
INSERT INTO subscription_plans (plan_id, name, description, price, interval, interval_count, features, access_level, display_order, badge_text) VALUES
(
    'gratuit',
    'Gratuit',
    'Pour découvrir nos activités',
    0,
    'month',
    1,
    '{
        "access_activities": true,
        "discount_percentage": 0,
        "priority_booking": false,
        "vip_events": false,
        "support_priority": "standard",
        "equipment_access": "limited"
    }',
    1,
    1,
    null
),
(
    'passionne',
    'Passionné',
    'Pour les amateurs d''activités nautiques',
    15,
    'month',
    2,
    '{
        "access_activities": true,
        "discount_percentage": 15,
        "priority_booking": true,
        "vip_events": true,
        "support_priority": "high",
        "equipment_access": "extended",
        "newsletter": "premium",
        "exclusive_content": true
    }',
    2,
    2,
    'Populaire'
),
(
    'expert',
    'Expert',
    'L''expérience ultime',
    90,
    'month',
    1,
    '{
        "access_activities": true,
        "discount_percentage": 25,
        "priority_booking": true,
        "vip_events": true,
        "support_priority": "dedicated",
        "equipment_access": "unlimited",
        "newsletter": "premium",
        "exclusive_content": true,
        "concierge_service": true,
        "insurance_included": true,
        "personal_trainer": true
    }',
    3,
    3,
    'Premium'
) ON CONFLICT (plan_id) DO NOTHING;

-- Annual versions with discounts
INSERT INTO subscription_plans (plan_id, name, description, price, interval, interval_count, features, access_level, display_order, annual_discount_percentage) VALUES
(
    'passionne_annual',
    'Passionné (Annuel)',
    'Pour les amateurs d''activités nautiques - Facturation annuelle',
    150,
    'year',
    1,
    '{
        "access_activities": true,
        "discount_percentage": 15,
        "priority_booking": true,
        "vip_events": true,
        "support_priority": "high",
        "equipment_access": "extended",
        "newsletter": "premium",
        "exclusive_content": true
    }',
    2,
    4,
    17
),
(
    'expert_annual',
    'Expert (Annuel)',
    'L''expérience ultime - Facturation annuelle',
    900,
    'year',
    1,
    '{
        "access_activities": true,
        "discount_percentage": 25,
        "priority_booking": true,
        "vip_events": true,
        "support_priority": "dedicated",
        "equipment_access": "unlimited",
        "newsletter": "premium",
        "exclusive_content": true,
        "concierge_service": true,
        "insurance_included": true,
        "personal_trainer": true
    }',
    3,
    5,
    17
) ON CONFLICT (plan_id) DO NOTHING;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_subscription_plans_plan_id ON subscription_plans(plan_id);
CREATE INDEX IF NOT EXISTS idx_subscription_plans_stripe_price_id ON subscription_plans(stripe_price_id);
CREATE INDEX IF NOT EXISTS idx_subscription_plans_is_active ON subscription_plans(is_active);
CREATE INDEX IF NOT EXISTS idx_subscription_plans_access_level ON subscription_plans(access_level);
CREATE INDEX IF NOT EXISTS idx_subscription_plans_display_order ON subscription_plans(display_order);
CREATE INDEX IF NOT EXISTS idx_subscription_plans_promotional_end_date ON subscription_plans(promotional_end_date) WHERE promotional_end_date IS NOT NULL;

-- Comments for documentation
COMMENT ON TABLE subscription_plans IS 'Centralized configuration for subscription tiers and pricing';
COMMENT ON COLUMN subscription_plans.plan_id IS 'Internal plan identifier used in code';
COMMENT ON COLUMN subscription_plans.stripe_price_id IS 'Corresponding Stripe price ID';
COMMENT ON COLUMN subscription_plans.stripe_product_id IS 'Corresponding Stripe product ID';
COMMENT ON COLUMN subscription_plans.interval_count IS 'Number of intervals between billings (e.g., 2 for every 2 months)';
COMMENT ON COLUMN subscription_plans.features IS 'JSON object containing plan features and permissions';
COMMENT ON COLUMN subscription_plans.access_level IS 'Numeric access level for permission comparison';
COMMENT ON COLUMN subscription_plans.badge_text IS 'Text to show as badge on pricing cards';
COMMENT ON COLUMN subscription_plans.upgrade_from_plans IS 'Array of plan_ids that can upgrade to this plan';
COMMENT ON COLUMN subscription_plans.annual_discount_percentage IS 'Discount percentage for annual billing vs monthly';

-- Row Level Security
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;

-- Everyone can read active plans
CREATE POLICY "Public read access to active subscription plans" ON subscription_plans
    FOR SELECT USING (is_active = TRUE AND deleted_at IS NULL);

-- Service role can manage all plans
CREATE POLICY "Service role full access to subscription plans" ON subscription_plans
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Function to get plan features
CREATE OR REPLACE FUNCTION get_plan_features(p_plan_id TEXT)
RETURNS JSONB AS $$
DECLARE
    plan_features JSONB;
BEGIN
    SELECT features INTO plan_features
    FROM subscription_plans
    WHERE plan_id = p_plan_id
      AND is_active = TRUE
      AND deleted_at IS NULL;

    RETURN COALESCE(plan_features, '{}'::jsonb);
END;
$$ LANGUAGE plpgsql;

-- Function to check if user has access to a feature
CREATE OR REPLACE FUNCTION has_feature_access(
    p_user_id UUID,
    p_feature_name TEXT
) RETURNS BOOLEAN AS $$
DECLARE
    subscriber_plan_id TEXT;
    user_access_level INTEGER;
    required_access_level INTEGER;
BEGIN
    -- Get user's current plan and access level
    SELECT sp.plan_id, sp.access_level
    INTO subscriber_plan_id, user_access_level
    FROM subscribers s
    JOIN subscription_plans sp ON s.subscription_tier = sp.plan_id
    WHERE s.user_id = p_user_id
      AND s.subscribed = TRUE
      AND s.subscription_end > NOW()
    LIMIT 1;

    -- If no active subscription, check if feature is in free plan
    IF subscriber_plan_id IS NULL THEN
        SELECT features INTO required_access_level
        FROM subscription_plans
        WHERE plan_id = 'gratuit'
          AND is_active = TRUE
          AND deleted_at IS NULL;

        -- Check if feature exists in free plan features
        RETURN required_access_level ? p_feature_name;
    END IF;

    -- Get required access level for the feature
    SELECT COALESCE((features -> p_feature_name)::boolean, FALSE)
    FROM subscription_plans
    WHERE plan_id = subscriber_plan_id
      AND is_active = TRUE
      AND deleted_at IS NULL
    LIMIT 1;

    RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate proration for plan changes
CREATE OR REPLACE FUNCTION calculate_proration(
    p_from_plan_id TEXT,
    p_to_plan_id TEXT,
    p_days_remaining INTEGER,
    p_period_days INTEGER DEFAULT 30
) RETURNS DECIMAL(10,2) AS $$
DECLARE
    from_price DECIMAL(10,2);
    to_price DECIMAL(10,2);
    from_interval_count INTEGER;
    to_interval_count INTEGER;
    proration_amount DECIMAL(10,2);
    remaining_value DECIMAL(10,2);
    new_period_value DECIMAL(10,2);
BEGIN
    -- Get plan details
    SELECT price, interval_count
    INTO from_price, from_interval_count
    FROM subscription_plans
    WHERE plan_id = p_from_plan_id
      AND is_active = TRUE
      AND deleted_at IS NULL;

    SELECT price, interval_count
    INTO to_price, to_interval_count
    FROM subscription_plans
    WHERE plan_id = p_to_plan_id
      AND is_active = TRUE
      AND deleted_at IS NULL;

    -- Calculate remaining value of current plan
    remaining_value := (from_price * from_interval_count / p_period_days) * p_days_remaining;

    -- Calculate value of new period
    new_period_value := to_price * to_interval_count;

    -- Calculate proration (difference)
    proration_amount := new_period_value - remaining_value;

    RETURN GREATEST(proration_amount, 0); -- Never return negative proration
END;
$$ LANGUAGE plpgsql;

-- View for active subscription plans
CREATE OR REPLACE VIEW active_subscription_plans AS
SELECT
    plan_id,
    name,
    description,
    price,
    currency,
    interval,
    interval_count,
    CASE
        WHEN interval = 'year' THEN price / 12
        WHEN interval_count > 1 THEN price / interval_count
        ELSE price
    END as monthly_equivalent,
    features,
    access_level,
    display_order,
    badge_text,
    badge_color,
    trial_days,
    annual_discount_percentage,
    promotional_price,
    promotional_end_date,
    CASE
        WHEN promotional_end_date IS NOT NULL AND promotional_end_date > NOW() THEN promotional_price
        ELSE price
    END as effective_price
FROM subscription_plans
WHERE is_active = TRUE
  AND deleted_at IS NULL
ORDER BY access_level, display_order;

-- Trigger to automatically updated updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_subscription_plans_updated_at
    BEFORE UPDATE ON subscription_plans
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to validate plan configurations
CREATE OR REPLACE FUNCTION validate_plan_configurations()
RETURNS TABLE (
    plan_id TEXT,
    issues TEXT[]
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        sp.plan_id,
        ARRAY_AGG(issue) as issues
    FROM subscription_plans sp,
    LATERAL (
        VALUES
            CASE WHEN sp.price < 0 THEN 'Negative price' END,
            CASE WHEN sp.interval_count <= 0 THEN 'Invalid interval count' END,
            CASE WHEN sp.access_level < 0 THEN 'Negative access level' END,
            CASE WHEN sp.annual_discount_percentage > 100 OR sp.annual_discount_percentage < 0 THEN 'Invalid annual discount' END,
            CASE WHEN sp.trial_days < 0 THEN 'Negative trial days' END,
            CASE WHEN sp.promotional_end_date IS NOT NULL AND sp.promotional_end_date <= NOW() THEN 'Expired promotion without deactivation' END
    ) AS issues(issue)
    WHERE sp.is_active = TRUE
      AND sp.deleted_at IS NULL
    GROUP BY sp.plan_id
    HAVING COUNT(issue) > 0;
END;
$$ LANGUAGE plpgsql;